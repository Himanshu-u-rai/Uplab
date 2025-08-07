'use client'

import { useState, useEffect } from 'react'
import { Eye } from 'lucide-react'

interface ViewCounterProps {
  slug: string
  className?: string
}

export default function ViewCounter({ slug, className = '' }: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const response = await fetch(`/api/views?slug=${encodeURIComponent(slug)}`)
        if (response.ok) {
          const data = await response.json()
          if (data.success) {
            setViews(data.views)
          }
        }
      } catch (error) {
        console.error('Error fetching views:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchViews()
  }, [slug])

  if (loading) {
    return (
      <div className={`flex items-center gap-2 text-gray-400 ${className}`}>
        <Eye className="w-4 h-4" />
        <span className="text-sm">Loading...</span>
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-2 text-gray-400 ${className}`}>
      <Eye className="w-4 h-4" />
      <span className="text-sm">
        {views !== null ? `${views.toLocaleString()} views` : '0 views'}
      </span>
    </div>
  )
}
