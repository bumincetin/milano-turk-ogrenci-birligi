'use client'
import { FC, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { EventsAPI } from '@/services/eventService';
import { toast } from 'sonner';
import Cookies from 'js-cookie';

const COOKIE_NAME = 'jwt';

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
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrollingEventId, setEnrollingEventId] = useState<number | null>(null);

  useEffect(() => {
    fetchEvent();
  }, [params.eventId]);

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

  const handleEnroll = async () => {
    if (!event) return;

    const token = Cookies.get(COOKIE_NAME);
    
    if (!token) {
      toast.error('Kayıt olmak için giriş yapmalısınız.');
      return;
    }

    try {
      setEnrollingEventId(event.id);
      await EventsAPI.enrollEvent(event.id, token);
      
      // Kayıt başarılı olduktan sonra etkinlik bilgilerini güncelle
      await fetchEvent();
      
      toast.success('Etkinliğe başarıyla kayıt oldunuz!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Bir hata oluştu');
    } finally {
      setEnrollingEventId(null);
    }
  };

  if (!event) {
    return <div className="p-8">Etkinlik bulunamadı.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <Link 
        href="/dashboard/community" 
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
            <button 
              onClick={handleEnroll}
              disabled={
                event.attributes.current_person_count === event.attributes.person_limit ||
                enrollingEventId === event.id
              }
              className={`w-full py-3 rounded-lg text-white text-lg font-semibold ${
                event.attributes.current_person_count === event.attributes.person_limit 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : enrollingEventId === event.id
                  ? 'bg-green-400 cursor-wait'
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {event.attributes.current_person_count === event.attributes.person_limit 
                ? 'Kontenjan Doldu' 
                : enrollingEventId === event.id
                ? 'Kaydediliyor...'
                : 'Kayıt Ol'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage; 