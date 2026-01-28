'use client'
import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { EventsAPI } from '@/services/eventService';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

// Event interface
interface Event {
    id: number;
    attributes: {
        title: string;
        event_time: string;
        last_enroll_time: string;
        summary?: string;
        description?: string;
        details?: any;
        person_limit: number;
        current_person_count: number;
        location: string;
        category?: 'City Tour' | 'Workshop' | 'Cultural' | 'Food' | 'Sport' | 'Meeting';
        cover: {
            data: {
                attributes: {
                    url: string;
                };
            } | null;
        };
    };
}

export default function EventContent({ eventId }: { eventId: string }) {
    const router = useRouter();
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [enrollingEventId, setEnrollingEventId] = useState<number | null>(null);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const { user, isStaticMode } = useAuth();

    useEffect(() => {
        fetchEvent();
        if (user) {
            checkEnrollmentStatus();
        }
    }, [eventId, user]);

    const fetchEvent = async () => {
        try {
            const data = await EventsAPI.getById(Number(eventId));
            setEvent(data.data);
        } catch (error) {
            console.error('Error fetching event:', error);
        } finally {
            setLoading(false);
        }
    };

    const checkEnrollmentStatus = async () => {
        try {
            const status = await EventsAPI.checkEnrollmentStatus(Number(eventId));
            setIsEnrolled(status.isEnrolled);
        } catch (error) {
            console.error('Kayıt durumu kontrol hatası:', error);
        }
    };

    const getImageUrl = (coverData: any) => {
        if (!coverData?.data?.attributes?.url) {
            return null;
        }
        // In static mode, images are served from public folder
        return coverData.data.attributes.url;
    };

    const handleEnroll = async () => {
        try {
            if (!user) {
                toast.error('Kayıt olmak için giriş yapmanız gerekmektedir.');
                setTimeout(() => {
                    router.push('/giris');
                }, 1500);
                return;
            }

            if (isStaticMode) {
                toast.info('Etkinlik kaydı için lütfen bizimle iletişime geçin.');
                return;
            }

            await EventsAPI.enrollEvent(Number(eventId));
            toast.success('Etkinliğe başarıyla kayıt oldunuz!');
            setIsEnrolled(true);
            fetchEvent();

        } catch (error: any) {
            toast.error(error.message || 'Kayıt işlemi sırasında bir hata oluştu');
        }
    };

    const handleCancelEnrollment = async () => {
        try {
            setEnrollingEventId(Number(eventId));

            if (isStaticMode) {
                toast.info('Bu özellik şu anda aktif değil.');
                setEnrollingEventId(null);
                return;
            }

            await EventsAPI.cancelEnrollment(Number(eventId));
            toast.success('Etkinlik kaydınız iptal edildi');
            setIsEnrolled(false);
            fetchEvent();
        } catch (error: any) {
            toast.error(error.message || 'Kayıt iptal işlemi sırasında bir hata oluştu');
        } finally {
            setEnrollingEventId(null);
        }
    };

    const isEnrollmentClosed = (lastEnrollTime: string) => {
        return new Date(lastEnrollTime) < new Date();
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="max-w-4xl mx-auto p-8">
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    Etkinlik bulunamadı.
                </div>
            </div>
        );
    }

    const imageUrl = getImageUrl(event.attributes.cover);

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
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={event.attributes.title}
                            className="w-full h-full object-cover"
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
                            {event.attributes.category && (
                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                    {event.attributes.category}
                                </span>
                            )}
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
                            <p className="text-gray-600">{event.attributes.description || event.attributes.summary}</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-2">Buluşma Noktası</h2>
                            <p className="text-gray-600">{event.attributes.location}</p>
                        </div>
                    </div>

                    <div className="mt-8">
                        {isStaticMode && (
                            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm text-center">
                                🔔 Etkinliklere kayıt için lütfen sosyal medya hesaplarımızdan bizimle iletişime geçin.
                            </div>
                        )}

                        {isEnrolled ? (
                            <button
                                onClick={handleCancelEnrollment}
                                disabled={enrollingEventId === event?.id}
                                className={`w-full py-3 rounded-lg text-white text-lg font-semibold ${enrollingEventId === event?.id
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
                                className={`w-full py-3 rounded-lg text-white text-lg font-semibold ${event.attributes.current_person_count === event.attributes.person_limit
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

                        <p className="text-sm text-gray-500 text-center mt-2">
                            Son Kayıt Tarihi: {new Date(event.attributes.last_enroll_time).toLocaleDateString('tr-TR')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
