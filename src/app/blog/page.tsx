import { Metadata } from 'next'
import { Suspense } from 'react'
import Header from '@/components/layout/header'
import { 
  getAllPosts, 
  getFeaturedPosts, 
  getAllCategories,
  BlogPostMeta 
} from '@/lib/blog'
import BlogHero from '@/components/sections/blog-hero'
import BlogSearch from '@/components/sections/blog-search'
import BlogFeatured from '@/components/sections/blog-featured'
import BlogGrid from '@/components/sections/blog-grid'
import SchemaComponent from '@/components/ui/schema-component'

export const metadata: Metadata = {
  title: 'Blog - Expert Insights & Digital Trends | Uplab Digital Agency',
  description: 'Stay ahead with expert insights on web development, mobile apps, SEO, and digital marketing. Latest trends and actionable tips from Uplab\'s team of specialists.',
  keywords: ['blog', 'web development', 'mobile apps', 'SEO', 'digital marketing', 'Uplab', 'expert insights'],
  openGraph: {
    title: 'Blog - Expert Insights & Digital Trends | Uplab Digital Agency',
    description: 'Expert insights and actionable tips from Uplab\'s digital specialists.',
    type: 'website',
    url: '/blog',
  },
}

interface BlogPageProps {
  searchParams: { 
    category?: string
    search?: string 
  }
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  
  // Get blog data
  const allPosts = getAllPosts()
  const featuredPosts = getFeaturedPosts()
  const categories = getAllCategories()
  
  // Filter posts based on search params
  let filteredPosts = allPosts
  
  if (params.category) {
    filteredPosts = allPosts.filter(post => 
      post.category.toLowerCase() === params.category?.toLowerCase()
    )
  }
  
  if (params.search) {
    const searchTerm = params.search.toLowerCase()
    filteredPosts = filteredPosts.filter(post =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    )
  }

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Uplab Digital Agency Blog",
    "description": "Expert insights on web development, mobile apps, SEO, and digital marketing",
    "url": "https://uplab.agency/blog"
  }

  return (
    <>
      <Header />
      <SchemaComponent schema={blogSchema} />
      
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-slate-900">
        <BlogHero />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <BlogSearch 
            categories={categories}
            allPostsCount={allPosts.length}
            currentCategory={params.category}
            currentSearch={params.search}
          />
          
          {!params.category && !params.search && featuredPosts.length > 0 && (
            <BlogFeatured posts={featuredPosts} />
          )}
          
          <BlogGrid 
            posts={filteredPosts}
            currentCategory={params.category}
            currentSearch={params.search}
          />
        </div>
      </main>
    </>
  )
}
