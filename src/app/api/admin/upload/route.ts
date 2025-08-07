import { NextResponse } from 'next/server'
import { checkAdminAuth } from '@/lib/admin-auth'
import fs from 'fs'
import path from 'path'

export async function POST(request: Request) {
  try {
    const isAuthenticated = await checkAdminAuth()
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('image') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      )
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 5MB' },
        { status: 400 }
      )
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'images', 'blog')
    console.log('Upload directory:', uploadsDir)
    
    if (!fs.existsSync(uploadsDir)) {
      console.log('Creating upload directory...')
      fs.mkdirSync(uploadsDir, { recursive: true })
    }

    // Check if directory is writable
    try {
      fs.accessSync(uploadsDir, fs.constants.W_OK)
      console.log('Directory is writable')
    } catch (error) {
      console.error('Directory is not writable:', error)
      return NextResponse.json(
        { error: 'Upload directory is not writable' },
        { status: 500 }
      )
    }

    // Generate unique filename
    const timestamp = Date.now()
    const fileExtension = path.extname(file.name)
    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_').replace(fileExtension, '')
    const fileName = `${timestamp}-${cleanName}${fileExtension}`
    const filePath = path.join(uploadsDir, fileName)

    console.log('Uploading file:', {
      originalName: file.name,
      fileName,
      filePath,
      size: file.size,
      type: file.type
    })

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    fs.writeFileSync(filePath, buffer)

    // Verify file was written
    if (!fs.existsSync(filePath)) {
      throw new Error('File was not saved successfully')
    }

    console.log('File saved successfully:', filePath)

    // Return the public URL
    const imageUrl = `/images/blog/${fileName}`

    return NextResponse.json({
      success: true,
      imageUrl,
      fileName,
      message: 'Image uploaded successfully'
    })
  } catch (error) {
    console.error('Image upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    )
  }
}
