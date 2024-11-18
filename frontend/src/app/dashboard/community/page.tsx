'use client'
import { FC, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
  "Şehir Turu",
  "Workshop",
  "Kültürel",
  "Spor",
  "Yemek",
];

// Örnek etkinlik verisi - category eklenmiş hali
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
    enrolledCount: 18
  },
  {
    id: 2,
    title: "İtalyan Mutfağı Workshop",
    image: "/images/cooking.jpg",
    description: "Geleneksel İtalyan yemeklerini öğrenme şansı",
    eventDate: "2024-04-20",
    lastRegistrationDate: "2024-04-15",
    location: "Öğrenci Merkezi",
    category: "Workshop",
    capacity: 15,
    enrolledCount: 12
  },
  {
    id: 3,
    title: "Fransa Mutfağı Workshop",
    image: "/images/cooking.jpg",
    description: "Geleneksel Fransız yemeklerini öğrenme şansı",
    eventDate: "2024-04-25",
    lastRegistrationDate: "2024-04-20",
    location: "Öğrenci Merkezi",
    category: "Workshop",
    capacity: 20,
    enrolledCount: 15
  },
  // ... diğer etkinlikler
];

const CommunityPage: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [sortBy, setSortBy] = useState("newest");

  // Filtreleme ve sıralama fonksiyonu
  const getFilteredAndSortedEvents = () => {
    let filteredEvents = events;
    
    // Kategori filtresi
    if (selectedCategory !== "Tümü") {
      filteredEvents = events.filter(event => event.category === selectedCategory);
    }
    
    // Sıralama
    return filteredEvents.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime();
      } else {
        return new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime();
      }
    });
  };

  return (
    <div className='max-w-7xl px-4 bg-white'>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Etkinlikler</h1>
        
        {/* Filtreleme ve Sıralama Alanı */}
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

        {/* Etkinlik Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-start">
          {getFilteredAndSortedEvents().map((event) => (
            <div key={event.id} className="border rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-48">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-sm">
                  {event.capacity - event.enrolledCount} kişilik yer kaldı
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-3">{event.description}</p>
                
                <div className="text-sm text-gray-500 space-y-1">
                  <p>🗓 Etkinlik: {new Date(event.eventDate).toLocaleDateString('tr-TR')}</p>
                  <p>⏰ Son Kayıt: {new Date(event.lastRegistrationDate).toLocaleDateString('tr-TR')}</p>
                  <p>📍 Konum: {event.location}</p>
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span>Kontenjan Durumu</span>
                      <span className="text-sm font-medium">
                        {event.enrolledCount}/{event.capacity}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ 
                          width: `${(event.enrolledCount / event.capacity) * 100}%`,
                          backgroundColor: event.enrolledCount === event.capacity ? '#EF4444' : '#2563EB'
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
                  <button 
                    className={`px-4 py-2 rounded-md text-sm ml-auto ${
                      event.enrolledCount === event.capacity 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                    disabled={event.enrolledCount === event.capacity}
                  >
                    {event.enrolledCount === event.capacity ? 'Kontenjan Doldu' : 'Kayıt Ol'}
                  </button>
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