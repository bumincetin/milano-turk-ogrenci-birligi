'use client'
import { FC } from 'react';
import Link from 'next/link';
import { Event } from './types';

interface EventCardProps {
  event: Event;
  isEnrolled: boolean;
  onEnroll: (eventId: number) => void;
  onCancel: (eventId: number) => void;
  enrollingEventId: number | null;
  cancelingEventId: number | null;
  isEnrollmentClosed: (lastEnrollTime: string) => boolean;
}

export const EventCard: FC<EventCardProps> = ({
  event,
  isEnrolled,
  onEnroll,
  onCancel,
  enrollingEventId,
  cancelingEventId,
  isEnrollmentClosed
}) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <div className="relative h-48 overflow-hidden">
        {event.attributes.cover?.data?.attributes?.url ? (
          <img
            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${event.attributes.cover.data.attributes.url}`}
            alt={event.attributes.title}
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
      
      {/* Kart içeriği */}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{event.attributes.title}</h3>
        <p className="text-gray-600 mb-3">{event.attributes.summary}</p>
        
        {/* Etkinlik detayları */}
        <div className="text-sm text-gray-500 space-y-1">
          <p>🗓 Etkinlik: {new Date(event.attributes.event_time).toLocaleDateString('tr-TR')}</p>
          <p>⏰ Son Kayıt: {new Date(event.attributes.last_enroll_time).toLocaleDateString('tr-TR')}</p>
          <p>📍 Konum: {event.attributes.location}</p>
          
          {/* Kontenjan durumu */}
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
        
        {/* Butonlar */}
        <div className="mt-4 flex gap-2">
          <Link 
            href={`/dashboard/events/${event.id}`}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Detayları Gör
          </Link>
          {isEnrolled ? (
            <button 
              onClick={() => onCancel(event.id)}
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
              onClick={() => onEnroll(event.id)}
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
  );
}; 