import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export const userService = {
  async updateProfile(userId: string, userData: any, token: string) {
    try {
      console.log('Token:', token);
      
      // FormData kontrolü yap
      if (userData instanceof FormData) {
        const response = await axios.put(
          `${API_URL}/api/users/${userId}`,
          userData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              // Content-Type header'ı FormData için otomatik ayarlanacak
            }
          }
        );
        console.log('Strapi yanıtı:', response.data);
        return response.data;
      } else {
        // Eski JSON formatında gönderim için
        const response = await axios.put(
          `${API_URL}/api/users/${userId}`,
          userData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          }
        );
        console.log('Strapi yanıtı:', response.data);
        return response.data;
      }
    } catch (error: any) {
      console.error('Güncelleme hatası detayı:', error.response?.data || error);
      throw error;
    }
  },

  async getProfile(userId: string, token: string) {
    try {
      console.log("GET USER PROFILE",token)

      const response = await axios.get(
        `${API_URL}/api/users/${userId}?populate=*`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      const userData = response.data;
      console.log("Backend'den gelen ham veri:", userData); // Debug için

      return {
        firstName: userData.name || '',
        lastName: userData.lastname || '',
        email: userData.email || '',
        university: userData.universityName || '',
        department: userData.universityDepartment || '',
        universityClass: userData.universityClass || 'hazırlık', // Değeri olduğu gibi al
        linkedin: userData.linkedin || '',
        twitter: userData.twitter || '',
        phone: userData.telephone || '',
        description: userData.description || '',
        website: userData.website || '',
        position: userData.position || '',
        birthday: userData.birthday || '',
        username: userData.username || '',
        avatar: userData.avatar || null,
        role: userData.role || ''
      };
    } catch (error) {
      console.error('Profil getirme hatası:', error);
      throw error;
    }
  }
}; 