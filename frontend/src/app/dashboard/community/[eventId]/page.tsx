'use client'
import { FC } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Örnek veriyi burada tutuyoruz, gerçek uygulamada bu veri API'den gelecek
const events = [
  {
    id: 1,
    title: "Milano Şehir Turu",
    image: "/images/milan-tour.jpg",
    description: "Milano'nun tarihi yerlerini keşfetmek için muhteşem bir fırsat!",
    eventDate: "2024-04-15",
    lastRegistrationDate: "2024-04-10",
    location: "Duomo Meydanı",
    category: "Şehir Turu",
    capacity: 30,
    enrolledCount: 18,
    detailedDescription: "Milano'nun tarihi dokusunu keşfedeceğimiz bu turda, Duomo Katedrali, Galleria Vittorio Emanuele II, Scala Operası gibi önemli yapıları ziyaret edeceğiz. Yerel bir rehber eşliğinde Milano'nun zengin tarihini ve kültürünü yakından tanıma fırsatı bulacaksınız.",
    meetingPoint: "Duomo Meydanı, Ana Katedral Girişi",
    duration: "4 saat",
    includedServices: ["Profesyonel rehber", "Müze giriş ücretleri", "Su"],
    requirements: ["Rahat yürüyüş ayakkabıları", "Fotoğraf makinesi (opsiyonel)"]
  },
  // ... diğer etkinlikler
];

const EventDetailPage: FC = () => {
  const params = useParams();
  const event = events.find(e => e.id === Number(params.eventId));

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
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {event.category}
              </span>
            </div>
            <div className="text-right">
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-lg font-semibold">Kontenjan Durumu</p>
                <p className="text-2xl font-bold text-blue-600">
                  {event.enrolledCount}/{event.capacity}
                </p>
                <p className="text-sm text-gray-600">
                  {event.capacity - event.enrolledCount} kişilik yer kaldı
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-gray-600">Etkinlik Tarihi</p>
                <p className="font-semibold">
                  {new Date(event.eventDate).toLocaleDateString('tr-TR')}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-gray-600">Son Kayıt Tarihi</p>
                <p className="font-semibold">
                  {new Date(event.lastRegistrationDate).toLocaleDateString('tr-TR')}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Etkinlik Detayları</h2>
              <p className="text-gray-600">{event.detailedDescription}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Buluşma Noktası</h2>
              <p className="text-gray-600">{event.meetingPoint}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Süre</h2>
              <p className="text-gray-600">{event.duration}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Dahil Olan Hizmetler</h2>
              <ul className="list-disc list-inside text-gray-600">
                {event.includedServices.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Gereksinimler</h2>
              <ul className="list-disc list-inside text-gray-600">
                {event.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <button 
              className={`w-full py-3 rounded-lg text-white text-lg font-semibold ${
                event.enrolledCount === event.capacity 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-500 hover:bg-green-600'
              }`}
              disabled={event.enrolledCount === event.capacity}
            >
              {event.enrolledCount === event.capacity ? 'Kontenjan Doldu' : 'Kayıt Ol'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage; 