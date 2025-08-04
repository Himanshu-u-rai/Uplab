import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  date: string
  category: string
  tags: string[]
  author: string
  excerpt: string
  image: string
  readTime: string
  featured: boolean
  content: string
}

export interface BlogPostMeta {
  slug: string
  title: string
  date: string
  category: string
  tags: string[]
  author: string
  excerpt: string
  image: string
  readTime: string
  featured: boolean
}

// Get all blog post slugs
export function getAllPostSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames
      .filter(name => name.endsWith('.md'))
      .map(name => name.replace(/\.md$/, ''))
  } catch (error) {
    console.error('Error reading posts directory:', error)
    return []
  }
}

// Get blog post data by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    // Convert markdown to HTML
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(content)
    const htmlContent = processedContent.toString()
    
    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      category: data.category || '',
      tags: data.tags || [],
      author: data.author || '',
      excerpt: data.excerpt || '',
      image: data.image || '',
      readTime: data.readTime || '',
      featured: data.featured || false,
      content: htmlContent
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

// Get all blog posts metadata (without content)
export function getAllPosts(): BlogPostMeta[] {
  try {
    const slugs = getAllPostSlugs()
    const posts = slugs
      .map(slug => {
        try {
          const fullPath = path.join(postsDirectory, `${slug}.md`)
          const fileContents = fs.readFileSync(fullPath, 'utf8')
          const { data } = matter(fileContents)
          
          return {
            slug,
            title: data.title || '',
            date: data.date || '',
            category: data.category || '',
            tags: data.tags || [],
            author: data.author || '',
            excerpt: data.excerpt || '',
            image: data.image || '',
            readTime: data.readTime || '',
            featured: data.featured || false
          }
        } catch (error) {
          console.error(`Error processing post ${slug}:`, error)
          return null
        }
      })
      .filter((post): post is BlogPostMeta => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
    return posts
  } catch (error) {
    console.error('Error getting all posts:', error)
    return []
  }
}

// Get featured blog posts
export function getFeaturedPosts(): BlogPostMeta[] {
  return getAllPosts().filter(post => post.featured)
}

// Get posts by category
export function getPostsByCategory(category: string): BlogPostMeta[] {
  return getAllPosts().filter(post => 
    post.category.toLowerCase() === category.toLowerCase()
  )
}

// Get posts by tag
export function getPostsByTag(tag: string): BlogPostMeta[] {
  return getAllPosts().filter(post => 
    post.tags.some(postTag => 
      postTag.toLowerCase() === tag.toLowerCase()
    )
  )
}

// Get all unique categories
export function getAllCategories(): string[] {
  const posts = getAllPosts()
  const categories = posts.map(post => post.category)
  return [...new Set(categories)].filter(Boolean).sort()
}

// Get all unique tags
export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tags = posts.flatMap(post => post.tags)
  return [...new Set(tags)].filter(Boolean).sort()
}

// Search posts by title, excerpt, or tags
export function searchPosts(query: string): BlogPostMeta[] {
  const searchTerm = query.toLowerCase()
  return getAllPosts().filter(post => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.excerpt.toLowerCase().includes(searchTerm) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    post.category.toLowerCase().includes(searchTerm)
  )
}

// Get recent posts (default: 3)
export function getRecentPosts(limit: number = 3): BlogPostMeta[] {
  return getAllPosts().slice(0, limit)
}

// Get related posts (same category or tags)
export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPostMeta[] {
  const allPosts = getAllPosts()
  const currentPost = allPosts.find(post => post.slug === currentSlug)
  
  if (!currentPost) return []
  
  const relatedPosts = allPosts
    .filter(post => post.slug !== currentSlug)
    .filter(post => 
      post.category === currentPost.category ||
      post.tags.some(tag => currentPost.tags.includes(tag))
    )
    .slice(0, limit)
  
  return relatedPosts
}
