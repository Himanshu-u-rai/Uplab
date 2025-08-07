import { NextResponse } from 'next/server'
import { checkAdminAuth } from '@/lib/admin-auth'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const isAuthenticated = await checkAdminAuth()
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { slug } = await params
    const postsDirectory = path.join(process.cwd(), 'content/blog')
    const filepath = path.join(postsDirectory, `${slug}.md`)
    
    if (!fs.existsSync(filepath)) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    const fileContents = fs.readFileSync(filepath, 'utf8')
    const { data, content } = matter(fileContents)
    
    const post = {
      slug,
      title: data.title || 'Untitled',
      date: data.date || '',
      category: data.category || 'Uncategorized',
      tags: data.tags || [],
      author: data.author || 'Uplab Team',
      excerpt: data.excerpt || '',
      image: data.image || '',
      imageAlt: data.imageAlt || '',
      readTime: data.readTime || '5 min read',
      featured: data.featured || false,
      published: data.published || false,
      metaDescription: data.metaDescription || '',
      content
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error('Get post error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const isAuthenticated = await checkAdminAuth()
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { slug } = await params
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

    const postsDirectory = path.join(process.cwd(), 'content/blog')
    const filepath = path.join(postsDirectory, `${slug}.md`)
    
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
      author: author || existingData.author || 'Uplab Team',
      excerpt: excerpt || content.substring(0, 150) + '...',
      image: image !== undefined ? image : existingData.image || '',
      imageAlt: imageAlt !== undefined ? imageAlt : existingData.imageAlt || '',
      readTime: readTime || existingData.readTime || Math.ceil(content.split(' ').length / 200) + ' min read',
      featured: featured !== undefined ? featured : existingData.featured || false,
      published: published !== undefined ? published : existingData.published || false,
      metaDescription: metaDescription !== undefined ? metaDescription : existingData.metaDescription || '',
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

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const isAuthenticated = await checkAdminAuth()
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { slug } = await params
    const postsDirectory = path.join(process.cwd(), 'content/blog')
    const filepath = path.join(postsDirectory, `${slug}.md`)
    
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
