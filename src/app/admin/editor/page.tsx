'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import AdminLayout from '@/components/admin/AdminLayout'
import { motion } from 'framer-motion'
import { 
  Save, 
  Eye, 
  ArrowLeft,
  Star,
  Calendar,
  Tag,
  Image,
  FileText
} from 'lucide-react'

interface PostData {
  title: string
  date: string
  category: string
  tags: string[]
  author: string
  excerpt: string
  image: string
  imageAlt: string
  readTime: string
  featured: boolean
  published: boolean
  metaDescription: string
  content: string
}

const defaultPost: PostData = {
  title: '',
  date: new Date().toISOString().split('T')[0],
  category: '',
  tags: [],
  author: 'Uplab Team',
  excerpt: '',
  image: '',
  imageAlt: '',
  readTime: '5 min read',
  featured: false,
  published: false,
  metaDescription: '',
  content: ''
}

export default function AdminEditor() {
  const [post, setPost] = useState<PostData>(defaultPost)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setSisSaving] = useState(false)
  const [tagInput, setTagInput] = useState('')
  const [imagePreview, setImagePreview] = useState<string>('')
  const [isUploading, setIsUploading] = useState(false)
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved')
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit')
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const slug = searchParams.get('slug')

  useEffect(() => {
    if (slug) {
      setIsEditing(true)
      fetchPost(slug)
    }
  }, [slug])

  const fetchPost = async (slug: string) => {
    try {
      const response = await fetch(`/api/admin/posts/${slug}`)
      if (response.ok) {
        const data = await response.json()
        setPost(data)
      }
    } catch (error) {
      console.error('Failed to fetch post:', error)
    }
  }

  const handleSave = async () => {
    setSisSaving(true)
    try {
      const url = isEditing ? `/api/admin/posts/${slug}` : '/api/admin/posts'
      const method = isEditing ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
      })

      if (response.ok) {
        const result = await response.json()
        if (!isEditing) {
          router.push(`/admin/editor?slug=${result.slug}`)
        }
        alert('Post saved successfully!')
      } else {
        alert('Failed to save post')
      }
    } catch (error) {
      console.error('Save error:', error)
      alert('Failed to save post')
    } finally {
      setSisSaving(false)
    }
  }

  const addTag = () => {
    if (tagInput.trim() && !post.tags.includes(tagInput.trim())) {
      setPost({
        ...post,
        tags: [...post.tags, tagInput.trim()]
      })
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setPost({
      ...post,
      tags: post.tags.filter(tag => tag !== tagToRemove)
    })
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB')
      return
    }

    setIsUploading(true)
    try {
      // Create FormData for file upload
      const formData = new FormData()
      formData.append('image', file)

      console.log('Uploading file:', {
        name: file.name,
        size: file.size,
        type: file.type
      })

      // Upload to server
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()
      console.log('Upload response:', result)

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed')
      }

      // Update post with the actual server URL
      setPost(prev => ({ 
        ...prev, 
        image: result.imageUrl,
        imageAlt: prev.imageAlt || file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ')
      }))
      
      // Create preview URL for immediate display
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)

      console.log('Image uploaded successfully:', result.imageUrl)
      alert('Image uploaded successfully!')
    } catch (error) {
      console.error('Image upload error:', error)
      alert(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsUploading(false)
    }
  }

  const removeImage = () => {
    setPost({ ...post, image: '', imageAlt: '' })
    setImagePreview('')
    // Reset the file input
    const fileInput = document.getElementById('image-upload') as HTMLInputElement
    if (fileInput) {
      fileInput.value = ''
    }
  }

  const autoSave = async () => {
    if (!post.title || !post.content) return
    
    setAutoSaveStatus('saving')
    try {
      // Auto-save logic here (could save as draft)
      setTimeout(() => {
        setAutoSaveStatus('saved')
      }, 1000)
    } catch (error) {
      setAutoSaveStatus('unsaved')
    }
  }

  // Auto-save effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (post.title || post.content) {
        autoSave()
      }
    }, 2000) // Auto-save after 2 seconds of inactivity

    return () => clearTimeout(timer)
  }, [post.title, post.content])

  // Calculate read time automatically
  useEffect(() => {
    if (post.content) {
      const words = post.content.split(' ').length
      const readTime = Math.ceil(words / 200) // Average reading speed: 200 words per minute
      setPost(prev => ({ ...prev, readTime: `${readTime} min read` }))
    }
  }, [post.content])

  // Auto-generate excerpt if not provided
  useEffect(() => {
    if (post.content && !post.excerpt) {
      const excerpt = post.content.substring(0, 150).replace(/[#*`]/g, '') + '...'
      setPost(prev => ({ ...prev, excerpt }))
    }
  }, [post.content])

  // Update image preview when image URL changes
  useEffect(() => {
    if (post.image && post.image.startsWith('http')) {
      setImagePreview('')
    }
  }, [post.image])

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim()
  }

  return (
    <AdminLayout title={isEditing ? 'Edit Post' : 'New Post'}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/admin/posts')}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-white">
                {isEditing ? 'Edit Post' : 'Create New Post'}
              </h2>
              <div className="flex items-center gap-4">
                <p className="text-gray-400">
                  {isEditing ? `Editing: ${post.title}` : 'Write and publish your blog post'}
                </p>
                {/* Auto-save status */}
                <div className="text-sm text-gray-400 flex items-center gap-2">
                  {autoSaveStatus === 'saving' && (
                    <>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                      Saving...
                    </>
                  )}
                  {autoSaveStatus === 'saved' && (
                    <>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Auto-saved
                    </>
                  )}
                  {autoSaveStatus === 'unsaved' && (
                    <>
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      Unsaved changes
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            {slug && (
              <a
                href={`/blog/${slug}`}
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                <Eye className="w-4 h-4" />
                Preview
              </a>
            )}
            
            <button
              onClick={() => {
                setPost({ ...post, published: false })
                handleSave()
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Save as Draft
            </button>

            <button
              onClick={() => {
                setPost({ ...post, published: true })
                handleSave()
              }}
              disabled={isSaving || !post.title.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Publishing...' : 'Publish Post'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-xl font-semibold placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                placeholder="Enter post title..."
              />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Content *
              </label>
              <textarea
                value={post.content}
                onChange={(e) => setPost({ ...post, content: e.target.value })}
                className="w-full h-96 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 font-mono text-sm"
                placeholder="Write your post content in Markdown..."
              />
              <p className="text-xs text-gray-400 mt-2">
                You can use Markdown syntax for formatting
              </p>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Post Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Post Settings</h3>
              
              <div className="space-y-4">
                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Publish Date
                  </label>
                  <input
                    type="date"
                    value={post.date}
                    onChange={(e) => setPost({ ...post, date: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    value={post.category}
                    onChange={(e) => setPost({ ...post, category: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                    placeholder="Technology, Marketing, etc."
                  />
                </div>

                {/* Featured */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-300">
                    <Star className="w-4 h-4 inline mr-1" />
                    Featured Post
                  </label>
                  <button
                    onClick={() => setPost({ ...post, featured: !post.featured })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      post.featured ? 'bg-purple-600' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        post.featured ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                <Tag className="w-4 h-4 inline mr-1" />
                Tags
              </h3>
              
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                    placeholder="Add tag..."
                  />
                  <button
                    onClick={addTag}
                    className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm"
                  >
                    Add
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-gray-700 text-gray-300 rounded text-sm"
                    >
                      #{tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="text-gray-400 hover:text-red-400 ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Featured Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Image className="w-4 h-4 mr-2" />
                Featured Image
              </h3>
              
              <div className="space-y-4">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Upload Image
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                      disabled={isUploading}
                    />
                    <label
                      htmlFor="image-upload"
                      className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-purple-400 transition-colors ${
                        isUploading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {isUploading ? (
                        <div className="text-gray-400">Uploading...</div>
                      ) : (
                        <>
                          <Image className="w-8 h-8 text-gray-400 mb-2" />
                          <p className="text-gray-400 text-sm">Click to upload image</p>
                          <p className="text-gray-500 text-xs">PNG, JPG up to 5MB</p>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                {/* Image Preview */}
                {(post.image || imagePreview) && (
                  <div className="relative">
                    <img
                      src={imagePreview || post.image}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded-lg"
                      onError={(e) => {
                        console.error('Image failed to load:', post.image)
                        e.currentTarget.src = '/images/blog/default.svg'
                      }}
                    />
                    <button
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-1 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors text-sm"
                      title="Remove image"
                    >
                      ×
                    </button>
                    {post.image && (
                      <div className="absolute bottom-2 left-2 px-2 py-1 bg-black bg-opacity-75 text-white text-xs rounded">
                        {post.image.startsWith('/images/blog/') ? 'Uploaded' : 'External URL'}
                      </div>
                    )}
                  </div>
                )}

                {/* Image URL (fallback) */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Or enter image URL
                  </label>
                  <input
                    type="url"
                    value={post.image}
                    onChange={(e) => setPost({ ...post, image: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                {/* Image Alt Text */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Alt Text *
                  </label>
                  <input
                    type="text"
                    value={post.imageAlt}
                    onChange={(e) => setPost({ ...post, imageAlt: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                    placeholder="Describe the image for accessibility"
                  />
                </div>
              </div>
            </motion.div>

            {/* Meta Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                SEO & Meta
              </h3>
              
              <div className="space-y-4">
                {/* Author */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    value={post.author}
                    onChange={(e) => setPost({ ...post, author: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                    placeholder="Author name"
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Excerpt
                  </label>
                  <textarea
                    value={post.excerpt}
                    onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
                    className="w-full h-20 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                    placeholder="Short description for social media and search results..."
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    {post.excerpt.length}/160 characters (recommended for meta descriptions)
                  </p>
                </div>

                {/* Meta Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    value={post.metaDescription}
                    onChange={(e) => setPost({ ...post, metaDescription: e.target.value })}
                    className="w-full h-16 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                    placeholder="SEO meta description..."
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    {post.metaDescription.length}/160 characters
                  </p>
                </div>

                {/* Read Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={post.readTime}
                    onChange={(e) => setPost({ ...post, readTime: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                    placeholder="5 min read"
                    disabled
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Auto-calculated from content length
                  </p>
                </div>

                {/* Publish Status */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                  <label className="text-sm font-medium text-gray-300">
                    Published
                  </label>
                  <button
                    onClick={() => setPost({ ...post, published: !post.published })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      post.published ? 'bg-green-600' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        post.published ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
