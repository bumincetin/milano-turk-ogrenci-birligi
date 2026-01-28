export interface Event {
  id: number;
  attributes: {
    title: string;
    event_time: string;
    last_enroll_time: string;
    summary: string;
    description?: string;
    person_limit: number;
    current_person_count: number;
    location: string;
    blocked: boolean;
    category: 'City Tour' | 'Workshop' | 'Cultural' | 'Food' | 'Sport' | 'Meeting';
    cover: {
      data: {
        attributes: {
          url: string;
        };
      } | null;
    };
  };
}

export const events: Event[] = [
  {
    id: 1,
    attributes: {
      title: "Milano Şehir Turu",
      event_time: "2025-01-15T10:00:00.000Z",
      last_enroll_time: "2025-01-14T23:59:00.000Z",
      summary: "Duomo, Galleria Vittorio Emanuele II ve daha fazlasını keşfedin!",
      description: "Milano'nun en ikonik yerlerini birlikte gezeceğimiz bu turda, şehrin tarihini ve kültürünü yakından tanıyacaksınız.",
      person_limit: 30,
      current_person_count: 18,
      location: "Duomo di Milano",
      blocked: false,
      category: "City Tour",
      cover: {
        data: {
          attributes: {
            url: "/flex-ui-assets/images/headers/photo-header-1.jpg"
          }
        }
      }
    }
  },
  {
    id: 2,
    attributes: {
      title: "İtalyanca Workshop",
      event_time: "2025-01-20T14:00:00.000Z",
      last_enroll_time: "2025-01-19T23:59:00.000Z",
      summary: "Temel İtalyanca konuşma pratiği yapın!",
      description: "Günlük hayatta kullanabileceğiniz temel İtalyanca cümleler ve konuşma pratiği.",
      person_limit: 20,
      current_person_count: 12,
      location: "Politecnico di Milano - Leonardo Campus",
      blocked: false,
      category: "Workshop",
      cover: {
        data: {
          attributes: {
            url: "/flex-ui-assets/images/headers/photo-header-2.jpg"
          }
        }
      }
    }
  },
  {
    id: 3,
    attributes: {
      title: "Türk Kahvaltısı Buluşması",
      event_time: "2025-01-25T11:00:00.000Z",
      last_enroll_time: "2025-01-24T23:59:00.000Z",
      summary: "Geleneksel Türk kahvaltısı ile hafta sonu buluşması",
      description: "Simit, peynir, zeytin ve daha fazlası ile geleneksel bir Türk kahvaltısı keyfi.",
      person_limit: 40,
      current_person_count: 25,
      location: "Hanedan Restaurant",
      blocked: false,
      category: "Food",
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
    id: 4,
    attributes: {
      title: "Kariyer Networking Etkinliği",
      event_time: "2025-02-01T18:00:00.000Z",
      last_enroll_time: "2025-01-31T23:59:00.000Z",
      summary: "İtalya'da çalışan Türk profesyonellerle tanışın",
      description: "Kariyerinize yön verecek bağlantılar kurun ve deneyimlerden yararlanın.",
      person_limit: 50,
      current_person_count: 30,
      location: "WeWork Porta Nuova",
      blocked: false,
      category: "Meeting",
      cover: {
        data: {
          attributes: {
            url: "/flex-ui-assets/images/headers/photo-header-3.jpg"
          }
        }
      }
    }
  },
  {
    id: 5,
    attributes: {
      title: "Futbol Turnuvası",
      event_time: "2025-02-10T15:00:00.000Z",
      last_enroll_time: "2025-02-08T23:59:00.000Z",
      summary: "Öğrenci takımları arası futbol turnuvası",
      description: "Farklı üniversitelerden öğrenci takımlarının katılacağı dostluk maçları.",
      person_limit: 60,
      current_person_count: 40,
      location: "Centro Sportivo Saini",
      blocked: false,
      category: "Sport",
      cover: {
        data: {
          attributes: {
            url: "/flex-ui-assets/images/headers/photo-header-4.jpg"
          }
        }
      }
    }
  },
  {
    id: 6,
    attributes: {
      title: "La Scala Opera Gecesi",
      event_time: "2025-02-15T20:00:00.000Z",
      last_enroll_time: "2025-02-10T23:59:00.000Z",
      summary: "Dünyaca ünlü La Scala'da opera keyfi",
      description: "İndirimli öğrenci biletleri ile unutulmaz bir opera deneyimi.",
      person_limit: 25,
      current_person_count: 20,
      location: "Teatro alla Scala",
      blocked: false,
      category: "Cultural",
      cover: {
        data: {
          attributes: {
            url: "/flex-ui-assets/images/headers/photo-header-5.jpg"
          }
        }
      }
    }
  }
];

export const getEvents = () => {
  return {
    data: events.filter(e => !e.attributes.blocked),
    meta: {
      pagination: {
        page: 1,
        pageSize: events.length,
        pageCount: 1,
        total: events.length
      }
    }
  };
};

export const getEventById = (id: number) => {
  const event = events.find(e => e.id === id);
  return event ? { data: event } : null;
};

