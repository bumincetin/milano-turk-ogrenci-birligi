'use client';
import React, { useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import IndexSectionHeadersWhitePattern2 from '@/components/common/headers-white-pattern/IndexSectionHeadersWhitePattern2';
import IndexSectionFootersWhitePattern14 from '@/components/common/footers-white-pattern/IndexSectionFootersWhitePattern14';
import { blogService } from '@/services/blogService';

export default function BlogContent({ slug }: { slug: string }) {
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
                console.log('Blog verisi:', response.data[0]);
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

        // In static mode, images are served from public folder
        return imageData.data.attributes.url;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    function renderContent(content: any[] | string) {
        // If content is a string (markdown), render it simply
        if (typeof content === 'string') {
            return (
                <div className="prose prose-lg max-w-none">
                    {content.split('\n').map((paragraph, index) => {
                        if (paragraph.startsWith('# ')) {
                            return <h1 key={index} className="text-3xl font-bold mb-4 mt-6">{paragraph.slice(2)}</h1>;
                        }
                        if (paragraph.startsWith('## ')) {
                            return <h2 key={index} className="text-2xl font-bold mb-4 mt-6">{paragraph.slice(3)}</h2>;
                        }
                        if (paragraph.startsWith('### ')) {
                            return <h3 key={index} className="text-xl font-bold mb-3 mt-4">{paragraph.slice(4)}</h3>;
                        }
                        if (paragraph.trim() === '') {
                            return null;
                        }
                        return <p key={index} className="mb-4 text-base leading-relaxed">{paragraph}</p>;
                    })}
                </div>
            );
        }

        // If content is an array (Strapi blocks format)
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
        <div className="min-h-screen bg-white">
            <IndexSectionHeadersWhitePattern2 />
            <article className="container mx-auto px-4 py-16 max-w-4xl bg-white">
                <div className="mb-8">
                    <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-primary-500 bg-primary-100 font-medium uppercase rounded-full shadow-sm">
                        Blog
                    </span>
                    <h1 className="mb-4 text-3xl md:text-5xl leading-tight text-black-900 font-bold tracking-tighter">
                        {blog.attributes.title}
                    </h1>
                    <div className="mb-6 text-gray-500">
                        <time>{formatDate(blog.attributes.published || blog.attributes.publishedAt)}</time>
                    </div>
                </div>

                {blog.attributes.cover?.data?.attributes?.url ? (
                    <div className="mb-8 rounded-lg overflow-hidden">
                        <img
                            src={getImageUrl(blog.attributes.cover)}
                            alt={blog.attributes.title}
                            style={{ objectFit: 'cover', width: '100%', maxHeight: '500px' }}
                            className="object-cover rounded-lg"
                        />
                    </div>
                ) : null}

                <div className="prose prose-lg max-w-none text-gray-500 bg-white">
                    {blog.attributes.content && renderContent(blog.attributes.content)}
                </div>
            </article>
            <IndexSectionFootersWhitePattern14 />
        </div>
    );
}
