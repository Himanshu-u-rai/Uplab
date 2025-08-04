'use client'

import { Share2 } from 'lucide-react'

interface ShareButtonProps {
  title: string
  excerpt: string
  className?: string
}

export default function ShareButton({ title, excerpt, className }: ShareButtonProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text: excerpt,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <button
      onClick={handleShare}
      className={className || "flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"}
    >
      <Share2 className="w-4 h-4" />
      Share
    </button>
  )
}
