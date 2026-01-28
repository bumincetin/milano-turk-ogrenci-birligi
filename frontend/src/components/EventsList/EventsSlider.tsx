'use client'
import { FC, useState, useEffect } from 'react';
import { EventsAPI } from '@/services/eventService';
import Link from 'next/link';
import { Event } from '@/components/EventsList/types';
import { motion } from 'framer-motion';

export const EventsSlider: FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await EventsAPI.getAll();
        if (data?.data) {
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

  const getImageUrl = (coverData: any) => {
    if (!coverData?.data?.attributes?.url) {
      return null;
    }
    return coverData.data.attributes.url;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('tr-TR', { month: 'short' }).toUpperCase(),
      full: date.toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' })
    };
  };

  if (loading) {
    return (
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (events.length === 0) {
    return (
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
            <div>
              <span className="badge-primary mb-3">Etkinlikler</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Yaklaşan Etkinlikler</h2>
            </div>
            <Link 
              href="/etkinlikler" 
              className="btn-secondary text-sm"
            >
              Tüm Etkinlikler
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-slate-500 font-medium">Henüz planlanmış etkinlik bulunmuyor.</p>
            <p className="text-sm text-slate-400 mt-1">Yeni etkinlikler için bizi takip edin!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-500/5 rounded-full blur-3xl" />
      
      <div className="container-custom relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="badge-primary mb-3">Etkinlikler</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Yaklaşan Etkinlikler</h2>
            <p className="text-slate-500 mt-2">Topluluğumuzun düzenlediği etkinliklere katılın</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link 
              href="/etkinlikler" 
              className="btn-secondary text-sm group"
            >
              <span>Tüm Etkinlikler</span>
              <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => {
            const imageUrl = getImageUrl(event.attributes.cover);
            const date = formatDate(event.attributes.event_time);
            const spotsLeft = event.attributes.person_limit - event.attributes.current_person_count;
            
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/dashboard/events/${event.id}`} className="group block">
                  <article className="card-hover h-full flex flex-col">
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={event.attributes.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                          <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      
                      {/* Date badge */}
                      <div className="absolute top-4 left-4 bg-white rounded-xl shadow-lg p-3 text-center min-w-[60px]">
                        <span className="block text-2xl font-bold text-slate-900">{date.day}</span>
                        <span className="block text-xs font-semibold text-primary-500">{date.month}</span>
                      </div>
                      
                      {/* Spots badge */}
                      <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold ${
                        spotsLeft <= 5 
                          ? 'bg-red-500 text-white' 
                          : 'bg-white/90 backdrop-blur-sm text-slate-700'
                      }`}>
                        {spotsLeft <= 0 ? 'Doldu' : `${spotsLeft} kişilik yer`}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-5">
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {event.attributes.title}
                      </h3>
                      
                      <div className="space-y-2 text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{date.full}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="truncate">{event.attributes.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="px-5 pb-5">
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            {[1, 2, 3].map((i) => (
                              <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 border-2 border-white" />
                            ))}
                          </div>
                          <span className="text-xs text-slate-500">
                            +{event.attributes.current_person_count} katılımcı
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-primary-600 group-hover:text-primary-700 flex items-center gap-1">
                          Detaylar
                          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EventsSlider;
