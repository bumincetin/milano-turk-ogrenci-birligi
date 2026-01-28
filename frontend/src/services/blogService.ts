import blogsData from '@/data/blogs.json';

export const blogService = {
  async getBlogs(page = 1) {
    // Simulate async behavior for consistency
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const pageSize = 6;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = blogsData.data.slice(startIndex, endIndex);
    
    return {
      data: paginatedData,
      meta: {
        pagination: {
          page,
          pageSize,
          pageCount: Math.ceil(blogsData.data.length / pageSize),
          total: blogsData.data.length
        }
      }
    };
  },

  async getBlogBySlug(slug: string) {
    // Simulate async behavior
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const blog = blogsData.data.find(
      (b) => b.attributes.slug === slug
    );

    if (!blog) {
      throw new Error('Blog yazısı bulunamadı');
    }

    return {
      data: [blog],
      meta: blogsData.meta
    };
  }
};
