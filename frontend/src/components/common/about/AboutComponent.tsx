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
        name: 'Yönetim Kurulu Başkanı',
        role: 'Başkan',
        image: '/flex-ui-assets/images/blog/avatar.png'
      },
      children: [
        {
          expanded: true,
          type: 'person',
          data: {
            name: 'Genel Sekreter',
            role: 'Sekreter',
            image: '/flex-ui-assets/images/blog/avatar.png'
          },
          children: [
            {
              expanded: true,
              type: 'person',
              data: {
                name: 'İdari İşler Sorumlusu',
                role: 'Yönetici',
                image: '/flex-ui-assets/images/blog/avatar.png'
              }
            }
          ]
        },
        {
          expanded: true,
          type: 'person',
          data: {
            name: 'Etkinlik Koordinatörü',
            role: 'Koordinatör',
            image: '/flex-ui-assets/images/blog/avatar.png'
          },
          children: [
            {
              expanded: true,
              type: 'person',
              data: {
                name: 'Sosyal Medya Sorumlusu',
                role: 'Yönetici',
                image: '/flex-ui-assets/images/blog/avatar.png'
              }
            },
            {
              expanded: true,
              type: 'person',
              data: {
                name: 'Etkinlik Organizatörü',
                role: 'Yönetici',
                image: '/flex-ui-assets/images/blog/avatar.png'
              }
            }
          ]
        }
      ]
    }
  ];

  const nodeTemplate = (node: OrgNode) => {
    return (
      <div className="p-4 border-2 border-gray-200 rounded-xl bg-white shadow-lg min-w-[220px] transition-all duration-300 hover:shadow-xl hover:border-blue-400">
        <div className="flex flex-col items-center gap-3">
          {node.data.image && (
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gray-100 shadow-inner">
              <Image
                src={node.data.image}
                alt={node.data.name}
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </div>
          )}
          <div className="text-center">
            <div className="font-bold text-lg text-gray-800">{node.data.name}</div>
            <div className="text-sm text-gray-600 font-medium">{node.data.role}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
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
          <div className="bg-gray-50 p-8 rounded-xl">
            <OrganizationChart
              value={orgData}
              nodeTemplate={nodeTemplate}
              className="w-full [&_.p-organizationchart]:flex [&_.p-organizationchart]:justify-center [&_.p-organizationchart-table]:w-auto [&_.p-organizationchart-line-down]:border-2 [&_.p-organizationchart-line-down]:border-gray-300"
            />
          </div>
        </section>

      </div>
    </div>
  );
};

export default AboutComponent;
