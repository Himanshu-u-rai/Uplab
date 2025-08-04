import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/layout/header'
import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from '@/lib/blog'
import { createArticleSchema } from '@/lib/schema'
import SchemaComponent from '@/components/ui/schema-component'
import ShareButton from '@/components/ui/share-button'
import { 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  ArrowLeft, 
  ArrowRight,
  BookOpen
} from 'lucide-react'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate metadata for the blog post
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found | Uplab Digital Agency Blog'
    }
  }

  return {
    title: `${post.title} | Uplab Digital Agency Blog`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [{ url: post.image, alt: post.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : undefined,
    }
  }
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(slug, 3)

  // Generate article schema
  const articleSchema = createArticleSchema({
    title: post.title,
    description: post.excerpt,
    content: post.content,
    author: post.author,
    datePublished: post.date,
    dateModified: post.date,
    image: post.image,
    url: `https://uplab.dev/blog/${post.slug}`
  })

  return (
    <>
      <Header />
      <SchemaComponent schema={articleSchema} />
      
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-blue-600 transition-colors">
                Blog
              </Link>
              <span>/</span>
              <span className="text-gray-900 font-medium truncate">{post.title}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-12 sm:py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold mb-6 hover:bg-white/30 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold mb-4">
                <Tag className="w-3 h-3" />
                {post.category}
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-white/90 mb-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              
              <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed mb-6">
                {post.excerpt}
              </p>
              
              <ShareButton 
                title={post.title}
                excerpt={post.excerpt}
              />
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-[28rem] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="py-8 sm:py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div 
                className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl max-w-none
                  prose-headings:text-gray-900 prose-headings:font-bold
                  prose-h1:text-2xl prose-h1:sm:text-3xl prose-h1:mb-6
                  prose-h2:text-xl prose-h2:sm:text-2xl prose-h2:mb-4 prose-h2:mt-8
                  prose-h3:text-lg prose-h3:sm:text-xl prose-h3:mb-3 prose-h3:mt-6
                  prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                  prose-a:text-blue-600 prose-a:no-underline hover:prose-a:text-blue-700 hover:prose-a:underline
                  prose-strong:text-gray-900 prose-strong:font-semibold
                  prose-ul:mb-4 prose-ol:mb-4 prose-li:text-gray-700
                  prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:p-4 prose-blockquote:my-6
                  prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:text-gray-800
                  prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
                  prose-table:w-full prose-table:border-collapse
                  prose-th:bg-gray-50 prose-th:border prose-th:border-gray-300 prose-th:p-3 prose-th:text-left
                  prose-td:border prose-td:border-gray-300 prose-td:p-3
                  prose-img:rounded-lg prose-img:shadow-lg prose-img:my-8"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>
        </article>

        {/* Tags */}
        <section className="py-8 border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-12 sm:py-16 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                    Related Articles
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <RelatedPostCard key={relatedPost.slug} post={relatedPost} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="py-12 sm:py-16 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto text-white">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Digital Presence?
              </h2>
              <p className="text-base sm:text-lg text-blue-100 mb-8">
                Let our expert team help you build amazing web experiences that drive results.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Get Free Quote
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  More Articles
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

// Related Post Card Component
function RelatedPostCard({ post }: { post: any }) {
  return (
    <article className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-3 text-xs sm:text-sm text-gray-500">
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
            {new Date(post.date).toLocaleDateString()}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            {post.readTime}
          </span>
        </div>
        
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
            <Tag className="w-3 h-3" />
            {post.category}
          </span>
          
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            Read More
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </article>
  )
}
