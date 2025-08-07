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
      return NextResponse.json([])
    }

    const filenames = fs.readdirSync(postsDirectory)
    const posts = filenames
      .filter(name => name.endsWith('.md'))
      .map(name => {
        const fullPath = path.join(postsDirectory, name)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)
        
        return {
          slug: name.replace(/\.md$/, ''),
          title: data.title || 'Untitled',
          date: data.date || '',
          featured: data.featured || false,
          published: data.published || false,
          category: data.category || 'Uncategorized',
          tags: data.tags || [],
          author: data.author || 'Uplab Team',
          excerpt: data.excerpt || content.substring(0, 150) + '...',
          image: data.image || '',
          readTime: data.readTime || '5 min read',
          ...data
        }
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return NextResponse.json(posts)
  } catch (error) {
    console.error('Posts API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const isAuthenticated = await checkAdminAuth()
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { 
      title, 
      content, 
      category, 
      tags, 
      featured, 
      excerpt, 
      author,
      image,
      imageAlt,
      readTime,
      published,
      metaDescription
    } = await request.json()
    
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()

    const postsDirectory = path.join(process.cwd(), 'content/blog')
    
    // Ensure directory exists
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true })
    }

    const filename = `${slug}.md`
    const filepath = path.join(postsDirectory, filename)
    
    // Check if file already exists
    if (fs.existsSync(filepath)) {
      return NextResponse.json(
        { error: 'A post with this title already exists' },
        { status: 409 }
      )
    }

    // Create frontmatter
    const frontmatter = {
      title,
      date: new Date().toISOString().split('T')[0],
      category: category || 'Uncategorized',
      tags: tags || [],
      featured: featured || false,
      excerpt: excerpt || content.substring(0, 150) + '...',
      author: author || 'Uplab Team',
      image: image || '',
      imageAlt: imageAlt || '',
      readTime: readTime || Math.ceil(content.split(' ').length / 200) + ' min read',
      published: published || false,
      metaDescription: metaDescription || excerpt || content.substring(0, 160) + '...'
    }

    // Create the markdown content
    const fileContent = matter.stringify(content, frontmatter)

    // Write the file
    fs.writeFileSync(filepath, fileContent, 'utf8')

    return NextResponse.json({
      success: true,
      slug,
      message: 'Post created successfully'
    })
  } catch (error) {
    console.error('Create post error:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const isAuthenticated = await checkAdminAuth()
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { 
      slug, 
      title, 
      content, 
      category, 
      tags, 
      featured, 
      excerpt,
      author,
      image,
      imageAlt,
      readTime,
      published,
      metaDescription
    } = await request.json()
    
    if (!slug || !title || !content) {
      return NextResponse.json(
        { error: 'Slug, title and content are required' },
        { status: 400 }
      )
    }

    const postsDirectory = path.join(process.cwd(), 'content/blog')
    const filepath = path.join(postsDirectory, `${slug}.md`)
    
    // Check if file exists
    if (!fs.existsSync(filepath)) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    // Read existing file to preserve some metadata
    const existingContent = fs.readFileSync(filepath, 'utf8')
    const { data: existingData } = matter(existingContent)

    // Update frontmatter
    const frontmatter = {
      ...existingData,
      title,
      category: category || existingData.category || 'Uncategorized',
      tags: tags || existingData.tags || [],
      featured: featured !== undefined ? featured : existingData.featured || false,
      excerpt: excerpt || content.substring(0, 150) + '...',
      author: author || existingData.author || 'Uplab Team',
      image: image !== undefined ? image : existingData.image || '',
      imageAlt: imageAlt !== undefined ? imageAlt : existingData.imageAlt || '',
      readTime: readTime || Math.ceil(content.split(' ').length / 200) + ' min read',
      published: published !== undefined ? published : existingData.published || false,
      metaDescription: metaDescription || excerpt || content.substring(0, 160) + '...',
      updatedAt: new Date().toISOString().split('T')[0]
    }

    // Create the updated markdown content
    const fileContent = matter.stringify(content, frontmatter)

    // Write the file
    fs.writeFileSync(filepath, fileContent, 'utf8')

    return NextResponse.json({
      success: true,
      slug,
      message: 'Post updated successfully'
    })
  } catch (error) {
    console.error('Update post error:', error)
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const isAuthenticated = await checkAdminAuth()
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    
    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      )
    }

    const postsDirectory = path.join(process.cwd(), 'content/blog')
    const filepath = path.join(postsDirectory, `${slug}.md`)
    
    // Check if file exists
    if (!fs.existsSync(filepath)) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    // Delete the file
    fs.unlinkSync(filepath)

    return NextResponse.json({
      success: true,
      message: 'Post deleted successfully'
    })
  } catch (error) {
    console.error('Delete post error:', error)
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}
