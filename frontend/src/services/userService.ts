import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

export const userService = {
  async updateProfile(userId: string, userData: any) {
    try {
      const formData = new FormData();
      
      // Eğer yeni bir avatar yüklendiyse
      if (userData.avatar instanceof File) {
        formData.append('files.avatar', userData.avatar);
      }

      // Diğer kullanıcı bilgileri
      formData.append('data', JSON.stringify({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        role: userData.role,
        birthDate: userData.birthDate,
        description: userData.description,
        linkedin: userData.linkedin,
        university: userData.university,
        department: userData.department,
        year: userData.year,
        bio: userData.bio
      }));

      const response = await axios.put(
        `${API_URL}/api/users/${userId}`, 
        formData,
        {
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'multipart/form-data',
          }
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getProfile(userId: string,token: string) {
    try {
      console.log("token: ",token)

      const response = await axios.get(
        `${API_URL}/api/users/${userId}?populate=*`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      
      const userData = response.data;
      console.log('Strapi response:', userData); // Debug için
      
      return {
        firstName: userData.name || '',
        lastName: userData.lastname || '',
        email: userData.email || '',
        university: userData.UniversityName || '',
        department: userData.UniversityDepartment || '',
        year: userData.UniversityClass || '',
        linkedin: userData.linkedin || '',
        twitter: userData.twitter || '',
        phone: userData.telephone || '',
        description: userData.description || '',
        website: userData.website || '',
        position: userData.position || '',
        companyEmail: userData.company_email || '',
        birthday: userData.birthday || '',
        username: userData.username || ''
      };
    } catch (error) {
      console.error('Profil getirme hatası:', error);
      throw error;
    }
  }
}; 