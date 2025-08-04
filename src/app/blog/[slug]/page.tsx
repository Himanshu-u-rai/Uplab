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
      
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-slate-900">
        {/* Enhanced Back Button & Breadcrumb */}
        <div className="relative bg-gray-900/50 backdrop-blur-sm border-b border-white/10 pt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex items-center justify-between">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:border-purple-400/50 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-[-2px] transition-transform duration-300" />
                <span className="font-semibold text-sm sm:text-base">Back to Blog</span>
              </Link>
              
              <nav className="hidden sm:flex items-center gap-2 text-sm text-gray-400">
                <Link href="/" className="hover:text-purple-400 transition-colors">
                  Home
                </Link>
                <span>/</span>
                <Link href="/blog" className="hover:text-purple-400 transition-colors">
                  Blog
                </Link>
                <span>/</span>
                <span className="text-white font-medium truncate max-w-[200px]">{post.title}</span>
              </nav>
            </div>
          </div>
        </div>

        {/* Compact Hero Section */}
        <section className="py-8 sm:py-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs sm:text-sm font-semibold mb-4 sm:mb-6 text-white">
                <Tag className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                {post.category}
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 leading-tight text-white">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-300 mb-4 sm:mb-6">
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
              
              <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8">
                {post.excerpt}
              </p>
              
              <ShareButton 
                title={post.title}
                excerpt={post.excerpt}
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-purple-400/50 transition-all duration-300 text-sm font-semibold text-white"
              />
            </div>
          </div>
        </section>

        {/* Compact Featured Image */}
        <section className="pb-6 sm:pb-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-none mx-auto">
              <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[28rem] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="py-6 sm:py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-none mx-auto">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-white/20 shadow-2xl p-4 sm:p-6 lg:p-8 xl:p-12">
                <div 
                  className="prose prose-lg sm:prose-xl lg:prose-2xl max-w-none
                    prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
                    prose-h1:text-2xl prose-h1:sm:text-3xl prose-h1:lg:text-4xl prose-h1:mb-6 prose-h1:mt-0
                    prose-h2:text-xl prose-h2:sm:text-2xl prose-h2:lg:text-3xl prose-h2:mb-4 prose-h2:mt-8
                    prose-h3:text-lg prose-h3:sm:text-xl prose-h3:lg:text-2xl prose-h3:mb-3 prose-h3:mt-6
                    prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:lg:text-xl
                    prose-a:text-purple-400 prose-a:font-medium prose-a:no-underline hover:prose-a:text-purple-300 hover:prose-a:underline
                    prose-strong:text-white prose-strong:font-semibold
                    prose-ul:mb-4 prose-ol:mb-4 prose-li:text-gray-300 prose-li:text-base prose-li:sm:text-lg prose-li:lg:text-xl prose-li:mb-1
                    prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:bg-purple-500/10 prose-blockquote:p-4 prose-blockquote:my-6 prose-blockquote:rounded-r-lg prose-blockquote:text-gray-200
                    prose-code:bg-gray-800 prose-code:text-purple-300 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:lg:text-base prose-code:font-mono prose-code:border prose-code:border-white/20
                    prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:lg:p-6 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:my-6 prose-pre:border prose-pre:border-white/20
                    prose-table:w-full prose-table:border-collapse prose-table:my-6
                    prose-th:bg-white/10 prose-th:border prose-th:border-white/20 prose-th:p-3 prose-th:lg:p-4 prose-th:text-left prose-th:font-semibold prose-th:text-white
                    prose-td:border prose-td:border-white/20 prose-td:p-3 prose-td:lg:p-4 prose-td:text-gray-300
                    prose-img:rounded-lg prose-img:shadow-lg prose-img:my-6 prose-img:lg:my-8 prose-img:w-full prose-img:max-w-4xl prose-img:mx-auto"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            </div>
          </div>
        </article>

        {/* Tags */}
        <section className="py-6 border-t border-white/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-none mx-auto">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-4 sm:p-6 shadow-lg">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm text-purple-300 rounded-full text-xs sm:text-sm font-semibold hover:bg-purple-500/20 hover:text-purple-200 transition-colors border border-white/20"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-8 sm:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8 sm:mb-12">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-400/30">
                      <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                      Related Articles
                    </h2>
                  </div>
                  <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
                    Continue exploring our expert insights
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <RelatedPostCard key={relatedPost.slug} post={relatedPost} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="py-8 sm:py-12 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="max-w-4xl mx-auto text-white">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                Ready to Transform Your Digital Presence?
              </h2>
              <p className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8 leading-relaxed">
                Let our expert team help you build amazing web experiences that drive results.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 bg-white text-purple-600 font-bold px-6 py-3 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg text-sm sm:text-base"
                >
                  Get Free Quote
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 text-sm sm:text-base"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
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
    <article className="group bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-white/20 overflow-hidden hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/50">
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded-full text-xs font-semibold">
            {post.category}
          </span>
        </div>
      </div>
      
      <div className="p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-3 text-xs sm:text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </span>
        </div>
        
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors line-clamp-2 leading-tight">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>
        
        <p className="text-gray-300 text-sm sm:text-base mb-4 line-clamp-2 leading-relaxed">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold text-sm group-hover:gap-3 transition-all"
          >
            Read More
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  )
}
