const fetchAPI = async (path: string, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.token}`,
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };

  const requestUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api${path}`;
  const response = await fetch(requestUrl, mergedOptions);

  if (!response.ok) {
    throw new Error(`API hatası: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

export { fetchAPI }; 