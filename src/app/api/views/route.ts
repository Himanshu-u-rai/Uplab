import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const VIEWS_FILE = path.join(process.cwd(), 'data', 'views.json')

// Ensure the data directory exists
async function ensureDataDir() {
  const dataDir = path.dirname(VIEWS_FILE)
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// Get current views data
async function getViewsData() {
  try {
    await ensureDataDir()
    const data = await fs.readFile(VIEWS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    // Return default structure if file doesn't exist
    return {
      totalViews: 0,
      posts: {},
      dailyViews: {},
      lastUpdated: new Date().toISOString()
    }
  }
}

// Save views data
async function saveViewsData(data: any) {
  await ensureDataDir()
  await fs.writeFile(VIEWS_FILE, JSON.stringify(data, null, 2))
}

// GET - Retrieve view statistics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    
    const viewsData = await getViewsData()
    
    if (slug) {
      // Return views for specific post
      return NextResponse.json({
        success: true,
        views: viewsData.posts[slug] || 0
      })
    }
    
    // Return all view statistics
    return NextResponse.json({
      success: true,
      data: viewsData
    })
  } catch (error) {
    console.error('Error getting views:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get views' },
      { status: 500 }
    )
  }
}

// POST - Track a view
export async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json()
    
    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Slug is required' },
        { status: 400 }
      )
    }
    
    const viewsData = await getViewsData()
    
    // Get today's date for daily tracking
    const today = new Date().toISOString().split('T')[0]
    
    // Update total views
    viewsData.totalViews = (viewsData.totalViews || 0) + 1
    
    // Update post-specific views
    if (!viewsData.posts[slug]) {
      viewsData.posts[slug] = 0
    }
    viewsData.posts[slug] += 1
    
    // Update daily views
    if (!viewsData.dailyViews[today]) {
      viewsData.dailyViews[today] = 0
    }
    viewsData.dailyViews[today] += 1
    
    // Update last modified
    viewsData.lastUpdated = new Date().toISOString()
    
    // Save the updated data
    await saveViewsData(viewsData)
    
    return NextResponse.json({
      success: true,
      views: viewsData.posts[slug],
      totalViews: viewsData.totalViews
    })
  } catch (error) {
    console.error('Error tracking view:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to track view' },
      { status: 500 }
    )
  }
}
