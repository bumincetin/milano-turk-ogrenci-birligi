'use client'
import { FC, useState, useEffect } from 'react';
import { EventsAPI } from '@/services/eventService';
import Link from 'next/link';
import { Event } from '@/components/EventsList/types';

export const EventsSlider: FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await EventsAPI.getAll();
        if (data?.data) {
          // En yakın 5 etkinliği al ve tür tanımlamasını ekle
          const sortedEvents = data.data
            .sort((a: Event, b: Event) => 
              new Date(a.attributes.event_time).getTime() - new Date(b.attributes.event_time).getTime()
            )
            .slice(0, 5);
          setEvents(sortedEvents);
        }
      } catch (err) {
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div className="p-4">Yükleniyor...</div>;

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Yaklaşan Etkinlikler</h2>
          <Link 
            href="/etkinlikler" 
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Tüm Etkinlikler →
          </Link>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 snap-x">
          {events.map((event) => (
            <div 
              key={event.id}
              className="min-w-[300px] max-w-[300px] snap-start"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-32 relative">
                  {event.attributes.cover?.data?.attributes?.url ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${event.attributes.cover.data.attributes.url}`}
                      alt={event.attributes.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">Resim Yok</span>
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs">
                    {event.attributes.person_limit - event.attributes.current_person_count} kişilik
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold mb-2 truncate">{event.attributes.title}</h3>
                  
                  <div className="text-sm text-gray-600 space-y-1">
                    <p className="flex items-center gap-1">
                      <span>��</span>
                      {new Date(event.attributes.event_time).toLocaleDateString('tr-TR')}
                    </p>
                    <p className="flex items-center gap-1">
                      <span>📍</span>
                      {event.attributes.location}
                    </p>
                  </div>

                  <Link 
                    href={`/dashboard/events/${event.id}`}
                    className="mt-4 block text-center bg-primary-500 text-white py-2 px-4 rounded-md hover:bg-primary-600 transition-colors text-sm"
                  >
                    Detayları Gör
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsSlider; 