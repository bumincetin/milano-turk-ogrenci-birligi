'use client';
import React, { useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import IndexSectionHeadersWhitePattern2 from '@/components/common/headers-white-pattern/IndexSectionHeadersWhitePattern2';
import IndexSectionFootersWhitePattern14 from '@/components/common/footers-white-pattern/IndexSectionFootersWhitePattern14';
import { blogService } from '@/services/blogService';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

function BlogContent({ slug }: { slug: string }) {
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await blogService.getBlogBySlug(slug);
        if (!response.data || response.data.length === 0) {
          notFound();
        }
        setBlog(response.data[0]);
      } catch (error: any) {
        console.error('Blog detayı yüklenirken hata:', error);
        setError('Blog yazısı yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [slug]);

  const getImageUrl = (imageData: any) => {
    if (!imageData?.data?.attributes?.url) {
      return "/flex-ui-assets/images/blog/default.jpg";
    }
    
    const imageUrl = imageData.data.attributes.url;
    return imageUrl.startsWith('http') 
      ? imageUrl 
      : `${API_URL}${imageUrl}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  function renderContent(content: any[]) {
    if (!Array.isArray(content)) return null;

    return content.map((block, index) => {
      switch (block.type) {
        case 'heading':
          const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements;
          return (
            <HeadingTag 
              key={index} 
              className="text-2xl font-bold mb-4 mt-6"
            >
              {block.children[0].text}
            </HeadingTag>
          );

        case 'paragraph':
          return (
            <p 
              key={index} 
              className="mb-4 text-base leading-relaxed"
            >
              {block.children[0].text}
            </p>
          );

        case 'list':
          const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
          return (
            <ListTag 
              key={index} 
              className={`mb-4 ml-4 ${block.format === 'ordered' ? 'list-decimal' : 'list-disc'}`}
            >
              {block.children.map((item: any, itemIndex: number) => (
                <li key={itemIndex} className="mb-2">
                  {item.children[0].text}
                </li>
              ))}
            </ListTag>
          );

        case 'link':
          return (
            <a 
              key={index}
              href={block.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 hover:text-primary-600 underline"
            >
              {block.children[0].text}
            </a>
          );

        case 'image':
          return (
            <div key={index} className="my-6">
              <Image
                src={block.url}
                alt={block.caption || ''}
                width={800}
                height={400}
                className="rounded-lg"
              />
              {block.caption && (
                <p className="text-sm text-gray-500 mt-2 text-center">
                  {block.caption}
                </p>
              )}
            </div>
          );

        case 'quote':
          return (
            <blockquote 
              key={index}
              className="border-l-4 border-primary-500 pl-4 my-4 italic"
            >
              {block.children[0].text}
            </blockquote>
          );

        case 'code':
          return (
            <pre 
              key={index}
              className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4"
            >
              <code>{block.children[0].text}</code>
            </pre>
          );

        case 'table':
          return (
            <div key={index} className="overflow-x-auto my-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  {block.children[0].children.map((cell: any, cellIndex: number) => (
                    <th 
                      key={cellIndex}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {cell.children[0].text}
                    </th>
                  ))}
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {block.children.slice(1).map((row: any, rowIndex: number) => (
                    <tr key={rowIndex}>
                      {row.children.map((cell: any, cellIndex: number) => (
                        <td 
                          key={cellIndex}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        >
                          {cell.children[0].text}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );

        default:
          console.warn(`Bilinmeyen blok tipi: ${block.type}`);
          return null;
      }
    });
  }

  if (loading) return <div className="text-center py-8">Yükleniyor...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!blog) return <div className="text-center py-8">Blog yazısı bulunamadı.</div>;

  return (
    <article className="container mx-auto px-4 py-16 max-w-4xl bg-white">
      <div className="mb-8">
        <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-primary-500 bg-primary-100 font-medium uppercase rounded-full shadow-sm">
          Blog
        </span>
        <h1 className="mb-4 text-3xl md:text-5xl leading-tight text-darkCoolGray-900 font-bold tracking-tighter">
          {blog.attributes.title}
        </h1>
        <div className="mb-6 text-gray-500">
          <time>{formatDate(blog.attributes.publishedAt)}</time>
        </div>
      </div>

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

      <div className="prose prose-lg max-w-none text-gray-500 bg-white">
        {blog.attributes.content && renderContent(blog.attributes.content)}
      </div>
    </article>
  );
}

export default function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = React.use(params);

  return (
    <div className="min-h-screen bg-white">
      <IndexSectionHeadersWhitePattern2 />
      <Suspense fallback={<div className="text-center py-8">Yükleniyor...</div>}>
        <BlogContent slug={resolvedParams.slug} />
      </Suspense>
      <IndexSectionFootersWhitePattern14 />
    </div>
  );
} 