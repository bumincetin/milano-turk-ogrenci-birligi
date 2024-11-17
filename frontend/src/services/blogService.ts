import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

export const blogService = {
  async getBlogs(page = 1) {
    try {
      const pageSize = 6;
      const queryParams = {
        'pagination[page]': page,
        'pagination[pageSize]': pageSize,
        'populate': '*',
        'sort': 'published:desc'
      };

      const response = await axios.get(
        `${API_URL}/api/blog-posts`,
        { 
          params: queryParams,
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      return {
        data: response.data.data,
        meta: response.data.meta
      };
    } catch (error: any) {
      console.error('Blog verileri alınırken hata detayı:', error.response?.data || error);
      throw error;
    }
  }
}; 