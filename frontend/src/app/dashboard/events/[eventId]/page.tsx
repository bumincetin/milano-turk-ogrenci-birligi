'use client'
import { FC, useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { EventsAPI } from '@/services/eventService';
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import { useAuth } from '@/contexts/AuthContext';
const COOKIE_NAME = process.env.NEXT_PUBLIC_USER_COOKIE_NAME as string || "mtob_user";

// Event interface'i ekleyelim
interface Event {
  id: number;
  attributes: {
    title: string;
    event_time: string;
    last_enroll_time: string;
    summary: string;
    details: any; // veya daha spesifik bir tip
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

const EventDetailPage: FC = () => {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrollingEventId, setEnrollingEventId] = useState<number | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const { user, logout } = useAuth()

  useEffect(() => {
    fetchEvent();
    if (user) {
      checkEnrollmentStatus();
    }
  }, [params.eventId, user]);

  const fetchEvent = async () => {
    try {
      const data = await EventsAPI.getById(Number(params.eventId));
      setEvent(data.data);
    } catch (error) {
      console.error('Error fetching event:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkEnrollmentStatus = async () => {
    try {
      const status = await EventsAPI.checkEnrollmentStatus(Number(params.eventId));
      setIsEnrolled(status.isEnrolled);
    } catch (error) {
      console.error('Kayıt durumu kontrol hatası:', error);
    }
  };

  const handleEnroll = async () => {
    try {
      // Oturum kontrolü
      const isAuthenticated = user !== null;
      
      if (!isAuthenticated) {
        toast.error('Kayıt olmak için giriş yapmanız gerekmektedir.');
        
        // 2 saniye bekle ve sonra yönlendir
        setTimeout(() => {
          router.push('/giris');
        }, 1500);
        
        return;
      }

      // Cookie token kontrolü
      const token = Cookies.get(COOKIE_NAME);
      if (!token) {
        toast.error('Oturum bilgileriniz bulunamadı. Lütfen tekrar giriş yapın.');
        
        // 2 saniye bekle ve sonra yönlendir
        setTimeout(() => {
          logout();
          router.push('/giris');
        }, 1500);
        
        return;
      }

      // Etkinliğe kayıt ol
      await EventsAPI.enrollEvent(Number(params.eventId));
      
      toast.success('Etkinliğe başarıyla kayıt oldunuz!');
      setIsEnrolled(true);
      fetchEvent();
      
    } catch (error: any) {
      toast.error(error.message || 'Kayıt işlemi sırasında bir hata oluştu');
      
      if (error.message.includes('Oturum süreniz dolmuş')) {
        // 2 saniye bekle ve sonra yönlendir
        setTimeout(() => {
          logout();
          router.push('/giris');
        }, 1500);
      }
    }
  };

  const handleCancelEnrollment = async () => {
    try {
      setEnrollingEventId(Number(params.eventId));
      await EventsAPI.cancelEnrollment(Number(params.eventId));
      toast.success('Etkinlik kaydınız iptal edildi');
      setIsEnrolled(false);
      fetchEvent(); // Etkinlik bilgilerini güncelle
    } catch (error: any) {
      toast.error(error.message || 'Kayıt iptal işlemi sırasında bir hata oluştu');
    } finally {
      setEnrollingEventId(null);
    }
  };

  // Son kayıt tarihi kontrolü için yardımcı fonksiyon
  const isEnrollmentClosed = (lastEnrollTime: string) => {
    return new Date(lastEnrollTime) < new Date();
  };

  // Yükleme durumunda loading göster
  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  // Etkinlik bulunamadığında hata mesajı göster
  if (!event) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Etkinlik bulunamadı.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <Link 
        href="/dashboard/events" 
        className="text-blue-600 hover:text-blue-800 mb-6 inline-block"
      >
        ← Etkinliklere Dön
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-96">
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
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">{event.attributes.title}</h1>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {event.attributes.category}
              </span>
            </div>
            <div className="text-right">
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-lg font-semibold">Kontenjan Durumu</p>
                <p className="text-2xl font-bold text-blue-600">
                  {event.attributes.current_person_count}/{event.attributes.person_limit}
                </p>
                <p className="text-sm text-gray-600">
                  {event.attributes.person_limit - event.attributes.current_person_count} kişilik yer kaldı
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-gray-600">Etkinlik Tarihi</p>
                <p className="font-semibold">
                  {new Date(event.attributes.event_time).toLocaleDateString('tr-TR')}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-gray-600">Son Kayıt Tarihi</p>
                <p className="font-semibold">
                  {new Date(event.attributes.last_enroll_time).toLocaleDateString('tr-TR')}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Etkinlik Detayları</h2>
              <p className="text-gray-600">{event.attributes.summary}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Buluşma Noktası</h2>
              <p className="text-gray-600">{event.attributes.location}</p>
            </div>

            {/* Detaylar kısmını Strapi'den gelen details alanına göre render edelim */}
            {event.attributes.details && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Detaylı Bilgi</h2>
                <div className="text-gray-600">
                  {/* Strapi blocks içeriğini render etmek için özel bir component kullanabilirsiniz */}
                  {/* <pre>{JSON.stringify(event.attributes.details, null, 2)}</pre> */}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8">
            {isEnrolled ? (
              <button 
                onClick={handleCancelEnrollment}
                disabled={enrollingEventId === event?.id}
                className={`w-full py-3 rounded-lg text-white text-lg font-semibold ${
                  enrollingEventId === event?.id
                    ? 'bg-red-400 cursor-wait'
                    : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                {enrollingEventId === event?.id ? 'İptal Ediliyor...' : 'Kaydı İptal Et'}
              </button>
            ) : (
              <button 
                onClick={handleEnroll}
                disabled={
                  event.attributes.current_person_count === event.attributes.person_limit ||
                  enrollingEventId === event.id ||
                  isEnrollmentClosed(event.attributes.last_enroll_time)
                }
                className={`w-full py-3 rounded-lg text-white text-lg font-semibold ${
                  event.attributes.current_person_count === event.attributes.person_limit 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : isEnrollmentClosed(event.attributes.last_enroll_time)
                    ? 'bg-gray-400 cursor-not-allowed'
                    : enrollingEventId === event.id
                    ? 'bg-primary-400 cursor-wait'
                    : 'bg-primary-500 hover:bg-primary-600'
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

            {/* Son kayıt tarihi bilgisi */}
            <p className="text-sm text-gray-500 text-center mt-2">
              Son Kayıt Tarihi: {new Date(event.attributes.last_enroll_time).toLocaleDateString('tr-TR')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage; 