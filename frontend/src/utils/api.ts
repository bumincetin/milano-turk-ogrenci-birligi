// Static mode API utility
// This file is kept for compatibility but returns mock data

const fetchAPI = async (path: string, options = {}) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));

  console.log('Static mode: API call to', path, 'simulated');

  // Return empty data structure
  return {
    data: [],
    meta: {
      pagination: {
        page: 1,
        pageSize: 10,
        pageCount: 0,
        total: 0
      }
    }
  };
};

export { fetchAPI };
