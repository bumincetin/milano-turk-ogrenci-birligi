'use client'
import { FC, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { EventsAPI } from '@/services/eventService';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import { useAuth } from '@/contexts/AuthContext'

// Event tipi tanımı
interface Event {
  id: number;
  attributes: {
    title: string;
    event_time: string;
    last_enroll_time: string;
    summary: string;
    person_limit: number;
    current_person_count: number;
    location: string;
    category: 'City Tour' | 'Workshop' | 'Cultural' | 'Food' | 'Sport' | 'Meeting';
    cover: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

// Kategori listesi
const categories = [
  "Tümü",
  "City Tour",
  "Workshop",
  "Cultural",
  "Food",
  "Sport",
  "Meeting"
];

const COOKIE_NAME = process.env.NEXT_PUBLIC_USER_COOKIE_NAME as string || "mtob_user"; // Strapi'nin default cookie ismi

const CommunityPage: FC = () => {
  const { user, logout } = useAuth()

  const [events, setEvents] = useState<Event[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [sortBy, setSortBy] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const [enrollingEventId, setEnrollingEventId] = useState<number | null>(null);
  const [enrolledEvents, setEnrolledEvents] = useState<number[]>([]);
  const [cancelingEventId, setCancelingEventId] = useState<number | null>(null);

  useEffect(() => {
    fetchEvents();
    if (user) {
      checkEnrollments();
    }
  }, [user]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await EventsAPI.getAll();
      setEvents(data.data);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const checkEnrollments = async () => {
    try {
      // Tüm etkinlikler için kayıt durumunu kontrol et
      const statuses = await Promise.all(
        events.map(event => EventsAPI.checkEnrollmentStatus(event.id))
      );
      
      const enrolledIds = events
        .filter((_, index) => statuses[index].isEnrolled)
        .map(event => event.id);
      
      setEnrolledEvents(enrolledIds);
    } catch (error) {
      console.error('Kayıt durumu kontrol hatası:', error);
    }
  };

  const handleCancelEnrollment = async (eventId: number) => {
    try {
      setCancelingEventId(eventId);
      await EventsAPI.cancelEnrollment(eventId);
      await fetchEvents();
      setEnrolledEvents(enrolledEvents.filter(id => id !== eventId));
      toast.success('Etkinlik kaydınız iptal edildi');
    } catch (error: any) {
      toast.error(error.message || 'Kayıt iptal işlemi sırasında bir hata oluştu');
    } finally {
      setCancelingEventId(null);
    }
  };

  const getFilteredAndSortedEvents = () => {
    let filteredEvents = [...events];
    
    // Kategori filtresi
    if (selectedCategory !== "Tümü") {
      filteredEvents = events.filter(event => 
        event.attributes.category === selectedCategory
      );
    }
    
    // Sıralama
    return filteredEvents.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.attributes.event_time).getTime() - 
               new Date(a.attributes.event_time).getTime();
      } else {
        return new Date(a.attributes.event_time).getTime() - 
               new Date(b.attributes.event_time).getTime();
      }
    });
  };

  const handleEnroll = async (eventId: number) => {
    try {
      // if (!session?.user) {
      //   toast.error('Kayıt olmak için giriş yapmalısınız.');
      //   return;
      // }

      const token = Cookies.get(COOKIE_NAME);

      console.log("TOKEN ON KAYIT OL :", token);
      console.log("USER ON KAYIT OL :", user);
      // if (!token) {
      //   toast.error('Oturum bilginiz bulunamadı. Lütfen sayfayı yenileyip tekrar deneyin.');
      //   return;
      // }

      setEnrollingEventId(eventId);
      await EventsAPI.enrollEvent(eventId);
      await fetchEvents(); // Etkinlik listesini güncelle
      toast.success('Etkinliğe başarıyla kayıt oldunuz!');
    } catch (error: any) {
      console.error('Kayıt Hatası:', error);
      
      // Hata mesajını daha anlaşılır hale getir
      if (error.message.includes('401')) {
        toast.error('Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.');
      } else {
        toast.error(error.message || 'Kayıt işlemi sırasında bir hata oluştu');
      }
    } finally {
      setEnrollingEventId(null);
    }
  };

  // Son kayıt tarihi kontrolü için yardımcı fonksiyon
  const isEnrollmentClosed = (lastEnrollTime: string) => {
    return new Date(lastEnrollTime) < new Date();
  };

  if (loading) {
    return <div className="p-8">Yükleniyor...</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        <p>{error}</p>
        <button 
          onClick={fetchEvents}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Tekrar Dene
        </button>
      </div>
    );
  }

  return (
    <div className='max-w-7xl px-4 bg-white'>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Etkinlikler</h1>
        <div className="flex flex-wrap gap-4 mb-6 items-center">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Kategori:</span>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-600">Sırala:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">En Yakın Tarih</option>
              <option value="oldest">En Uzak Tarih</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-start">
          {getFilteredAndSortedEvents().map((event) => (
            <div key={event.id} className="border rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-48">
                {event.attributes.cover?.data?.attributes?.url ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${event.attributes.cover.data.attributes.url}`}
                    alt={event.attributes.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Resim Yok</span>
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-sm">
                  {event.attributes.person_limit - event.attributes.current_person_count} kişilik yer kaldı
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{event.attributes.title}</h3>
                <p className="text-gray-600 mb-3">{event.attributes.summary}</p>
                
                <div className="text-sm text-gray-500 space-y-1">
                  <p>🗓 Etkinlik: {new Date(event.attributes.event_time).toLocaleDateString('tr-TR')}</p>
                  <p>⏰ Son Kayıt: {new Date(event.attributes.last_enroll_time).toLocaleDateString('tr-TR')}</p>
                  <p>📍 Konum: {event.attributes.location}</p>
                  
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span>Kontenjan Durumu</span>
                      <span className="text-sm font-medium">
                        {event.attributes.current_person_count}/{event.attributes.person_limit}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ 
                          width: `${(event.attributes.current_person_count / event.attributes.person_limit) * 100}%`,
                          backgroundColor: event.attributes.current_person_count === event.attributes.person_limit ? '#EF4444' : '#2563EB'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex gap-2">
                  <Link 
                    href={`/dashboard/community/${event.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Detayları Gör
                  </Link>
                  {enrolledEvents.includes(event.id) ? (
                    <button 
                      onClick={() => handleCancelEnrollment(event.id)}
                      disabled={cancelingEventId === event.id}
                      className={`px-4 py-2 rounded-md text-sm ml-auto ${
                        cancelingEventId === event.id
                          ? 'bg-red-400 cursor-wait'
                          : 'bg-red-500 hover:bg-red-600 text-white'
                      }`}
                    >
                      {cancelingEventId === event.id ? 'İptal Ediliyor...' : 'Katılmayacağım'}
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleEnroll(event.id)}
                      disabled={
                        event.attributes.current_person_count === event.attributes.person_limit ||
                        enrollingEventId === event.id ||
                        isEnrollmentClosed(event.attributes.last_enroll_time)
                      }
                      className={`px-4 py-2 rounded-md text-sm ml-auto ${
                        event.attributes.current_person_count === event.attributes.person_limit 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : isEnrollmentClosed(event.attributes.last_enroll_time)
                          ? 'bg-gray-400 cursor-not-allowed'
                          : enrollingEventId === event.id
                          ? 'bg-primary-400 cursor-wait'
                          : 'bg-primary-500 hover:bg-primary-600 text-white'
                      }`}
                    >
                      {event.attributes.current_person_count === event.attributes.person_limit 
                        ? 'Kontenjan Doldu' 
                        : isEnrollmentClosed(event.attributes.last_enroll_time)
                        ? 'Kayıt Süresi Doldu'
                        : enrollingEventId === event.id
                        ? 'Kaydediliyor...'
                        : 'Kayıt Ol'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityPage; 