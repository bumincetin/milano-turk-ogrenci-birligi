'use client'
import React from 'react';
import { OrganizationChart } from 'primereact/organizationchart';
import Image from 'next/image';

interface PersonData {
  name: string;
  role: string;
  image?: string;
}

interface OrgNode {
  expanded: boolean;
  type: string;
  data: PersonData;
  children?: OrgNode[];
}

const AboutComponent: React.FC = () => {
  const orgData: OrgNode[] = [
    {
      expanded: true,
      type: 'person',
      data: {
        name: 'Başkan',
        role: 'Mustafa Şandırlı',
        image: '/mtob-team/Mustafa_Sandirli.jpg'
      },
      children: [
        {
          expanded: true,
          type: 'person',
          data: {
            name: 'Başkan Yardımcısı',
            role: 'Muhammet Talha Çoğalmış',
            image: '/mtob-team/Muhammet_Talha_Cogalmis.jpg'
          }
        },
        {
          expanded: true,
          type: 'person',
          data: {
            name: 'Genel Sekreter',
            role: 'Bumin Kağan Çetin',
            image: '/mtob-team/Bumin_Kagan.jpg'
          }
        },
        {
          expanded: true,
          type: 'person',
          data: {
            name: 'Tanıtım ve Sosyal Medya',
            role: 'Alize Ataç',
            image: '/mtob-team/Alize_Atac.jpg'
          }
        },
        {
          expanded: true,
          type: 'person',
          data: {
            name: 'Akademik ve Öğrenci İşleri',
            role: 'Pınar Ürün',
            image: '/mtob-team/Pinar_Urun.jpg'
          }
        },
        {
          expanded: true,
          type: 'person',
          data: {
            name: 'Etkinlik ve Organizasyon',
            role: 'Aleyna Şenol',
            image: '/mtob-team/Aleyna_Senol.jpg'
          }
        }
      ]
    }
  ];

  const nodeTemplate = (node: OrgNode) => {
    return (
      <div className="p-2 border-2 border-gray-200 rounded-lg bg-white shadow-lg min-w-[150px] transition-all duration-300 hover:shadow-xl hover:border-blue-400 hover:-translate-y-1">
        <div className="flex flex-col items-center gap-1.5">
          {node.data.image ? (
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-50 shadow-inner transform transition-transform hover:scale-105">
              <Image
                src={node.data.image}
                alt={node.data.name}
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="currentColor" />
              </svg>
            </div>
          )}
          <div className="text-center">
            <div className="font-bold text-sm text-gray-800">{node.data.name}</div>
            <div className="text-xs text-blue-600 font-medium leading-tight">{node.data.role}</div>
          </div>
        </div>
      </div>
    );
  };

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
          <div className="relative">
            {/* Onursal Başkanlar */}
            <div className="absolute right-0 -top-12 bg-white p-4 rounded-lg shadow-lg border-2 border-gray-200">
              <h3 className="text-lg font-bold mb-3 text-gray-800">Onursal Başkanlar</h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-50">
                    <Image
                      src="/mtob-team/Emre_Burak_Duger.jpg"
                      alt="Onursal Başkan 1"
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-gray-800">Emre Burak Duğer</div>
                    <div className="text-xs text-blue-600">Onursal Başkan</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-50">
                    <Image
                      src="/mtob-team/Merve_Korkmaz.jpg"
                      alt="Onursal Başkan 2"
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-gray-800">Merve Korkmaz</div>
                    <div className="text-xs text-blue-600">Onursal Başkan</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-white p-2 sm:p-4 md:p-6 rounded-xl overflow-x-auto">
              <div className="min-w-fit">
                <OrganizationChart
                  value={orgData}
                  nodeTemplate={nodeTemplate}
                  className="w-full [&_.p-organizationchart]:flex [&_.p-organizationchart]:justify-center [&_.p-organizationchart-table]:w-auto [&_.p-organizationchart-lines]:hidden sm:[&_.p-organizationchart-lines]:block"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutComponent;
