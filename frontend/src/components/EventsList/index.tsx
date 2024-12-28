'use client'
import { FC, useState, useEffect } from 'react';
import { EventsAPI } from '@/services/eventService';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import { Event } from './types';
import { EventCard } from './EventCard';

const categories = [
  "Tümü",
  "City Tour",
  "Workshop",
  "Cultural",
  "Food",
  "Sport",
  "Meeting"
];

const COOKIE_NAME = process.env.NEXT_PUBLIC_USER_COOKIE_NAME as string || "mtob_user";

export const EventsList: FC = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [sortBy, setSortBy] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
      if (!data || !data.data) {
        throw new Error('Etkinlik verileri alınamadı');
      }
      setEvents(data.data);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError(err instanceof Error ? err.message : 'Etkinlikler yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const checkEnrollments = async () => {
    try {
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
      setEnrollingEventId(eventId);
      
      // Önce kayıt durumunu kontrol edelim
      const enrollmentStatus = await EventsAPI.checkEnrollmentStatus(eventId);
      if (enrollmentStatus.isEnrolled) {
        toast.warning('Bu etkinliğe zaten kayıt olmuşsunuz.');
        return;
      }

      await EventsAPI.enrollEvent(eventId);
      await fetchEvents();
      setEnrolledEvents([...enrolledEvents, eventId]);
      toast.success('Etkinliğe başarıyla kayıt oldunuz!');
    } catch (error: any) {
      // Hata objesinin yapısını kontrol edelim
      const errorMessage = error?.response?.data?.error?.message || 
                          error?.message || 
                          'Beklenmeyen bir hata oluştu';
      
      console.error('Kayıt Hatası:', errorMessage);
      
      if (typeof errorMessage === 'string') {
        if (errorMessage.toLowerCase().includes('zaten kayıtlısınız')) {
          toast.warning('Bu etkinliğe zaten kayıt olmuşsunuz.');
        } else if (errorMessage.includes('401')) {
          toast.error('Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.');
        } else if (errorMessage.toLowerCase().includes('kontenjan')) {
          toast.error('Üzgünüz, etkinlik kontenjanı dolmuştur.');
        } else {
          toast.error('Kayıt işlemi sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        }
      } else {
        toast.error('Kayıt işlemi sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      }
    } finally {
      setEnrollingEventId(null);
    }
  };

  const isEnrollmentClosed = (lastEnrollTime: string) => {
    return new Date(lastEnrollTime) < new Date();
  };

  if (loading) return <div className="p-8">Yükleniyor...</div>;
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
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Etkinlikler</h1>
      
      {/* Filtreler */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Kategori:</span>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
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

      {/* Etkinlik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-start">
        {getFilteredAndSortedEvents().map((event) => (
          <EventCard
            key={event.id}
            event={event}
            isEnrolled={enrolledEvents.includes(event.id)}
            onEnroll={handleEnroll}
            onCancel={handleCancelEnrollment}
            enrollingEventId={enrollingEventId}
            cancelingEventId={cancelingEventId}
            isEnrollmentClosed={isEnrollmentClosed}
          />
        ))}
      </div>
    </div>
  );
}; 