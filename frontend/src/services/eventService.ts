const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export const EventsAPI = {
  getAll: async () => {
    try {
      if (!API_URL) {
        throw new Error('API URL tanımlanmamış');
      }

      const response = await fetch(`${API_URL}/api/events?populate=*`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('API Error:', {
          status: response.status,
          statusText: response.statusText,
          errorData
        });
        throw new Error(`API Hatası: ${response.status} ${response.statusText}`);
      }

      return await response.json();
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

      const response = await fetch(`${API_URL}/api/events/${id}?populate=*`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error('API isteği başarısız oldu');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },
}; 