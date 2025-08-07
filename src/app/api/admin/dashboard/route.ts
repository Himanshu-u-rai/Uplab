import { NextResponse } from 'next/server'
import { checkAdminAuth } from '@/lib/admin-auth'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function GET() {
  try {
    const isAuthenticated = await checkAdminAuth()
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const postsDirectory = path.join(process.cwd(), 'content/blog')
    
    if (!fs.existsSync(postsDirectory)) {
      return NextResponse.json({
        totalPosts: 0,
        featuredPosts: 0,
        recentPosts: []
      })
    }

    const filenames = fs.readdirSync(postsDirectory)
    const posts = filenames
      .filter(name => name.endsWith('.md'))
      .map(name => {
        const fullPath = path.join(postsDirectory, name)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data } = matter(fileContents)
        
        return {
          slug: name.replace(/\.md$/, ''),
          title: data.title || 'Untitled',
          date: data.date || '',
          featured: data.featured || false,
          ...data
        }
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    const totalPosts = posts.length
    const featuredPosts = posts.filter(post => post.featured).length
    const recentPosts = posts.slice(0, 10)

    return NextResponse.json({
      totalPosts,
      featuredPosts,
      recentPosts
    })
  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
