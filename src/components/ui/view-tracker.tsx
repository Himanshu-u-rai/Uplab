'use client'

import { useEffect, useRef } from 'react'

interface ViewTrackerProps {
  slug: string
  onViewTracked?: (views: number) => void
}

export default function ViewTracker({ slug, onViewTracked }: ViewTrackerProps) {
  const hasTracked = useRef(false)

  useEffect(() => {
    const trackView = async () => {
      // Only track once per page load
      if (hasTracked.current) return
      
      try {
        const response = await fetch('/api/views', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ slug }),
        })

        if (response.ok) {
          const data = await response.json()
          if (data.success && onViewTracked) {
            onViewTracked(data.views)
          }
          hasTracked.current = true
        }
      } catch (error) {
        console.error('Error tracking view:', error)
      }
    }

    // Track view after a short delay to ensure the page has loaded
    const timer = setTimeout(trackView, 1000)

    return () => clearTimeout(timer)
  }, [slug, onViewTracked])

  // This component doesn't render anything
  return null
}
