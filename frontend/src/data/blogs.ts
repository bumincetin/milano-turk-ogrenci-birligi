export interface Blog {
  id: number;
  attributes: {
    title: string;
    slug: string;
    summary: string;
    content: string;
    published: string;
    cover: {
      data: {
        attributes: {
          url: string;
        };
      } | null;
    };
  };
}

export const blogs: Blog[] = [
  {
    id: 1,
    attributes: {
      title: "Milano'da Öğrenci Olmanın Avantajları",
      slug: "milanoda-ogrenci-olmanin-avantajlari",
      summary: "Milano, dünya çapında ünlü üniversiteleri, zengin kültürel mirası ve kariyer fırsatlarıyla öğrenciler için ideal bir şehir.",
      content: `# Milano'da Öğrenci Olmanın Avantajları

Milano, İtalya'nın ekonomik ve kültürel başkenti olarak öğrencilere benzersiz fırsatlar sunmaktadır.

## Eğitim Kalitesi
- Politecnico di Milano, Bocconi ve Cattolica gibi dünya sıralamasında üst sıralarda yer alan üniversiteler
- Uluslararası öğrenci programları ve İngilizce eğitim seçenekleri

## Kariyer Fırsatları
- Moda, tasarım ve finans sektörlerinde staj imkanları
- Networking etkinlikleri ve kariyer fuarları

## Kültürel Zenginlik
- Dünyaca ünlü müzeler ve sanat galerileri
- Opera ve tiyatro gösterileri`,
      published: "2024-12-01",
      cover: {
        data: {
          attributes: {
            url: "/mtob-images/milano-turk-ogrenci-birligi-kahvalti.jpg"
          }
        }
      }
    }
  },
  {
    id: 2,
    attributes: {
      title: "Türk Öğrenciler İçin Milano Rehberi",
      slug: "turk-ogrenciler-icin-milano-rehberi",
      summary: "Milano'ya yeni gelen Türk öğrenciler için kapsamlı bir şehir rehberi. Ulaşım, konaklama ve günlük yaşam ipuçları.",
      content: `# Türk Öğrenciler İçin Milano Rehberi

Milano'ya hoş geldiniz! Bu rehber, şehre yeni gelen Türk öğrenciler için hazırlanmıştır.

## Ulaşım
- ATM Metro kartı nasıl alınır
- Şehir içi ulaşım ücretleri
- Havalimanı transferleri

## Konaklama
- Öğrenci yurtları
- Paylaşımlı ev bulma
- Kira sözleşmesi ipuçları

## Günlük Yaşam
- Türk marketleri ve restoranları
- Helal yemek seçenekleri
- Önemli telefon numaraları`,
      published: "2024-11-15",
      cover: {
        data: {
          attributes: {
            url: "/flex-ui-assets/images/blog/photo-blog-medium.jpg"
          }
        }
      }
    }
  },
  {
    id: 3,
    attributes: {
      title: "MTÖB 2024 Yılı Değerlendirmesi",
      slug: "mtob-2024-yili-degerlendirmesi",
      summary: "Milano Türk Öğrenci Birliği olarak 2024 yılında gerçekleştirdiğimiz etkinlikler ve başarılarımız.",
      content: `# MTÖB 2024 Yılı Değerlendirmesi

2024 yılı, MTÖB için oldukça verimli geçti.

## Etkinliklerimiz
- 12 sosyal etkinlik
- 6 kariyer etkinliği
- 4 kültürel gezi

## Üye Sayımız
500+ aktif üye ile büyümeye devam ediyoruz.

## Teşekkürler
Tüm üyelerimize ve destekçilerimize teşekkür ederiz!`,
      published: "2024-10-20",
      cover: {
        data: {
          attributes: {
            url: "/flex-ui-assets/images/blog/photo-blog-wide.jpg"
          }
        }
      }
    }
  },
  {
    id: 4,
    attributes: {
      title: "İtalyanca Öğrenme Rehberi",
      slug: "italyanca-ogrenme-rehberi",
      summary: "Milano'da yaşarken İtalyanca öğrenmek için en iyi kaynaklar ve ipuçları.",
      content: `# İtalyanca Öğrenme Rehberi

İtalya'da yaşarken İtalyanca bilmek hayatı çok kolaylaştırır.

## Ücretsiz Kaynaklar
- Duolingo ve Babbel uygulamaları
- YouTube kanalları
- Podcast önerileri

## Dil Okulları
- Milano'daki dil okulları
- Üniversite dil kursları

## Pratik Yapma
- Tandem partner bulma
- Dil değişimi etkinlikleri`,
      published: "2024-09-10",
      cover: {
        data: {
          attributes: {
            url: "/flex-ui-assets/images/blog/photo-blog-small.jpg"
          }
        }
      }
    }
  }
];

export const getBlogsMeta = (page: number = 1, pageSize: number = 6) => {
  const total = blogs.length;
  const pageCount = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  
  return {
    data: blogs.slice(start, end),
    meta: {
      pagination: {
        page,
        pageSize,
        pageCount,
        total
      }
    }
  };
};

export const getBlogBySlug = (slug: string) => {
  const blog = blogs.find(b => b.attributes.slug === slug);
  return blog ? { data: [blog], meta: { pagination: { page: 1, pageSize: 1, pageCount: 1, total: 1 } } } : null;
};

