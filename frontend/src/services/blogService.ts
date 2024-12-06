import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export const blogService = {
  async getBlogs(page = 1) {
    try {
      const pageSize = 6;
      const queryParams = {
        'pagination[page]': page,
        'pagination[pageSize]': pageSize,
        'populate': '*',
        'sort': 'published:desc',
        'publicationState': 'live'
      };

      const response = await axios.get(
        `${API_URL}/api/blog-posts`,
        { 
          params: queryParams,
          headers: {
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
  },

  async getBlogBySlug(slug: string) {
    try {
      const queryParams = {
        'filters[slug][$eq]': slug,
        'populate': '*',
        'publicationState': 'live'
      };

      const response = await axios.get(
        `${API_URL}/api/blog-posts`,
        {
          params: queryParams,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.data.data || response.data.data.length === 0) {
        throw new Error('Blog yazısı bulunamadı');
      }

      return {
        data: response.data.data,
        meta: response.data.meta
      };
      
    } catch (error: any) {
      console.error('Blog detayı alınırken hata:', error.response?.data || error);
      throw error;
    }
  }
}; 