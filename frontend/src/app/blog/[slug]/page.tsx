import blogsData from '@/data/blogs.json';
import BlogContent from './BlogContent';

// Generate static params for all blog slugs at build time
export async function generateStaticParams() {
  return blogsData.data.map((blog) => ({
    slug: blog.attributes.slug,
  }));
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return <BlogContent slug={resolvedParams.slug} />;
}
