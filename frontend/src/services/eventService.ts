import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export const EventsAPI = {
  getAll: async () => {
    try {
      if (!API_URL) {
        throw new Error('API URL tanımlanmamış');
      }

      const queryParams = new URLSearchParams({
        'populate': '*',
        'filters[blocked][$eq]': 'false',
        'publicationState': 'live'
      }).toString();

      const response = await fetch(`${API_URL}/api/events?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('API Error:', {
          status: response.status,
          statusText: response.statusText,
          errorData,
          url: response.url
        });
        throw new Error(`API Hatası: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Fetch Error:', error);
      throw error;
    }
  },

  getById: async (id: number) => {
    try {
      if (!API_URL) {
        throw new Error('API URL tanımlanmamış');
      }

      const queryParams = new URLSearchParams({
        'populate': '*',
        'publicationState': 'live'
      }).toString();

      const response = await fetch(`${API_URL}/api/events/${id}?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error?.message || 'API isteği başarısız oldu');
      }

      return await response.json();
    } catch (error) {
      console.error('Event detayı alınırken hata:', error);
      throw error;
    }
  },

  enrollEvent: async (eventId: number) => {
    try {
      if (!API_URL) {
        throw new Error('API URL tanımlanmamış');
      }

      // Önce etkinlik detaylarını kontrol et
      const event = await EventsAPI.getById(eventId);
      
      if (event.data.attributes.blocked) {
        throw new Error('Bu etkinliğe kayıt alınmamaktadır.');
      }

      if (event.data.attributes.current_person_count >= event.data.attributes.person_limit) {
        throw new Error('Etkinlik kontenjanı dolmuştur.');
      }

      if (new Date(event.data.attributes.last_enroll_time) < new Date()) {
        throw new Error('Etkinlik kayıt süresi dolmuştur.');
      }

      // Cookie'den token'ı al
      const token = Cookies.get('jwt');

      // Debug için
      console.log('JWT Token:', token);

      if (!token) {
        throw new Error('Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.');
      }

      const response = await fetch(`${API_URL}/api/events/${eventId}/enroll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      // Debug için
      console.log('Enroll Response:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      });

      if (!response.ok) {
        let errorMessage = 'Kayıt işlemi sırasında bir hata oluştu';
        
        try {
          const errorData = await response.json();
          console.log('Error Data:', errorData); // Debug için
          errorMessage = errorData.error?.message || errorData.message || errorMessage;
        } catch (e) {
          console.log('Error Parse Failed:', e); // Debug için
        }

        switch (response.status) {
          case 401:
            throw new Error('Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.');
          case 403:
            throw new Error('Bu işlem için yetkiniz bulunmuyor.');
          case 400:
            throw new Error(errorMessage);
          default:
            throw new Error('Kayıt işlemi sırasında bir hata oluştu');
        }
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error('Kayıt Hatası:', error);
      throw error;
    }
  },

  cancelEnrollment: async (eventId: number) => {
    try {
      if (!API_URL) {
        throw new Error('API URL tanımlanmamış');
      }

      const token = Cookies.get('jwt');
      if (!token) {
        throw new Error('Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.');
      }

      const response = await fetch(`${API_URL}/api/events/${eventId}/cancel-enrollment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Kayıt silme işlemi sırasında bir hata oluştu');
      }

      return await response.json();
    } catch (error) {
      console.error('Kayıt silme hatası:', error);
      throw error;
    }
  },

  checkEnrollmentStatus: async (eventId: number) => {
    try {
      if (!API_URL) {
        throw new Error('API URL tanımlanmamış');
      }

      const token = Cookies.get('jwt');
      if (!token) {
        throw new Error('Oturum süreniz dolmuş');
      }

      const response = await fetch(`${API_URL}/api/events/${eventId}/check-enrollment`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Kayıt durumu kontrol edilemedi');
      }

      return await response.json();
    } catch (error) {
      console.error('Kayıt durumu kontrol hatası:', error);
      throw error;
    }
  }
}; 