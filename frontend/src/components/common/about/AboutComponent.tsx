'use client'
import React from 'react';
import Image from 'next/image';

interface PersonData {
  name: string;
  role: string;
  image?: string;
}

const AboutComponent: React.FC = () => {
  const teamMembers: PersonData[] = [
    {
      name: 'Başkan',
      role: 'Mustafa Şandırlı',
      image: '/mtob-team/Mustafa_Sandirli.jpg'
    },
    {
      name: 'Başkan Yardımcısı',
      role: 'Muhammet Talha Çoğalmış',
      image: '/mtob-team/Muhammet_Talha_Cogalmis.jpg'
    },
    {
      name: 'Genel Sekreter',
      role: 'Bumin Kağan Çetin',
      image: '/mtob-team/Bumin_Kagan.jpg'
    },
    {
      name: 'Tanıtım ve Sosyal Medya',
      role: 'Alize Ataç',
      image: '/mtob-team/Alize_Atac.jpg'
    },
    {
      name: 'Akademik ve Öğrenci İşleri',
      role: 'Pınar Ürün',
      image: '/mtob-team/Pinar_Urun.jpg'
    },
    {
      name: 'Etkinlik ve Organizasyon',
      role: 'Aleyna Şenol',
      image: '/mtob-team/Aleyna_Senol.jpg'
    },
    {
      name: 'Sayman',
      role: 'Berkay Öztürk',
      image: '/mtob-team/Berkay_Ozturk.jpg'
    }
  ];

  const PersonCard = ({ person }: { person: PersonData }) => (
    <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="w-16 h-16 mb-2">
        <Image
          src={person.image || '/placeholder.jpg'}
          alt={person.role}
          width={64}
          height={64}
          className="rounded-full object-cover border-2 border-blue-100"
        />
      </div>
      <div className="text-center">
        <h3 className="text-sm font-semibold text-gray-700">{person.name}</h3>
        <p className="text-xs text-blue-600">{person.role}</p>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Biz Kimiz?</h2>
          <p className="text-gray-700">
            Milano Türk Öğrenci Birliği, İtalya'da yaşayan Türk toplumunun sosyal, kültürel ve eğitim
            alanlarındaki ilerlemesine katkıda bulunmayı amaçlayan bir topluluktur. Birliğimiz, Türk
            öğrencilerin İtalya'ya uyumunu sağlamak için sosyal, kültürel, eğitimsel ve sportif
            faaliyetlerde bulunmaktadır.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Misyonumuz</h2>
          <p className="text-gray-700">
            Misyonumuz, Türkiye'den gelen öğrencilere rehberlik ve destek sunarak entegrasyonlarını
            sağlamaktır. Bu kapsamda öğrencilere İtalyan eğitim sistemi ve İtalya'da yaşam hakkında
            rehberlik etmekteyiz. Ayrıca Türk gençlerinin kariyer gelişimlerine destek olmak amacıyla
            yerel şirketlerle işbirlikleri kurmaktayız.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Vizyonumuz</h2>
          <p className="text-gray-700">
            Vizyonumuz, İtalya'da eğitim gören Türk öğrencilere, bilimsel, sosyal ve kültürel alanlarda
            destek sağlamaktır. Hedefimiz, Türk ve İtalyan toplumları arasında hoşgörü ve diyaloğun
            gelişmesine katkıda bulunmaktır. Eğitimde fırsat eşitliğini sağlamak ve Türk toplumunun
            Avrupa'daki varlığını güçlendirmek amacıyla hareket etmekteyiz.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Yönetim Yapımız</h2>
          
          {/* Onursal Başkanlar */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-8">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Onursal Başkanlar</h3>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <Image
                  src="/mtob-team/Emre_Burak_Duger.jpg"
                  alt="Onursal Başkan 1"
                  width={48}
                  height={48}
                  className="rounded-full object-cover border-2 border-blue-100"
                />
                <div>
                  <div className="font-bold text-sm text-gray-800">Emre Burak Duğer</div>
                  <div className="text-xs text-blue-600">Onursal Başkan</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Image
                  src="/mtob-team/Merve_Korkmaz.jpg"
                  alt="Onursal Başkan 2"
                  width={48}
                  height={48}
                  className="rounded-full object-cover border-2 border-blue-100"
                />
                <div>
                  <div className="font-bold text-sm text-gray-800">Merve Korkmaz</div>
                  <div className="text-xs text-blue-600">Onursal Başkan</div>
                </div>
              </div>
            </div>
          </div>

          {/* Yönetim Ekibi Grid */}
          <div className="space-y-4">
            {/* Başkan - Üst satır */}
            <div className="flex justify-center">
              <PersonCard person={teamMembers[0]} />
            </div>
            
            {/* Diğer Üyeler - Alt satırlar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {teamMembers.slice(1).map((member, index) => (
                <PersonCard key={index} person={member} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutComponent;
