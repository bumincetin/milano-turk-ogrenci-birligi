const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export default function BlogDetail({ params }: { params: { slug: string } }) {
  // ... diğer kodlar ...

  const getImageUrl = (imageData: any) => {
    if (!imageData?.data?.attributes?.url) {
      return "/flex-ui-assets/images/blog/default.jpg";
    }
    
    const imageUrl = imageData.data.attributes.url;
    return imageUrl.startsWith('http') 
      ? imageUrl 
      : `${API_URL}${imageUrl}`;
  };

  return (
    <>
      <IndexSectionHeadersWhitePattern2 />
      <article className="container mx-auto px-4 py-16 max-w-4xl">
        {/* ... diğer içerik ... */}

        {/* Kapak Görseli */}
        {blog.attributes.over?.data?.attributes?.url && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <Image
              src={getImageUrl(blog.attributes.over)}
              alt={blog.attributes.title}
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* ... diğer içerik ... */}
      </article>
      <IndexSectionFootersWhitePattern14 />
    </>
  );
} 