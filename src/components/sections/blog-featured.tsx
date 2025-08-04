'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { BlogPostMeta } from '@/lib/blog'
import { Calendar, Clock, User, ArrowRight, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface BlogFeaturedProps {
  posts: BlogPostMeta[]
}

// Reusable Blog Card Component
function BlogCard({ post, index }: { post: BlogPostMeta; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative h-full"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        {/* Gradient border container */}
        <div className="relative p-[2px] rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-400 hover:via-pink-400 hover:to-orange-400 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-purple-500/25 group-hover:scale-[1.02] animate-pulse-slow hover:animate-none">
          <div className="bg-gray-900/95 backdrop-blur-lg rounded-xl overflow-hidden h-full flex flex-col relative">
            {/* Featured Badge */}
            <div className="absolute top-3 left-3 z-10">
              <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
                <Star className="w-3 h-3" />
                <span>Featured</span>
              </div>
            </div>

            {/* Image */}
            <div className="relative h-48 overflow-hidden flex-shrink-0">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
              {/* Category */}
              <div className="inline-flex items-center gap-1 bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs font-semibold border border-purple-400/30 w-fit mb-3">
                {post.category}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors duration-300 leading-tight mb-3">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-gray-300 text-sm leading-relaxed flex-1 mb-4">
                {post.excerpt.length > 120 ? `${post.excerpt.substring(0, 120)}...` : post.excerpt}
              </p>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mb-3">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="bg-white/10 text-gray-300 px-2 py-1 rounded-md text-xs border border-white/20"
                  >
                    #{tag}
                  </span>
                ))}
                {post.tags.length > 3 && (
                  <span className="text-gray-400 text-xs py-1">
                    +{post.tags.length - 3}
                  </span>
                )}
              </div>

              {/* Read More */}
              <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                <span>Read Article</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

export default function BlogFeatured({ posts }: BlogFeaturedProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  if (posts.length === 0) return null

  // Check scroll position
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
      
      // Calculate current index based on scroll position (one card per view)
      const newIndex = Math.round(scrollLeft / clientWidth)
      setCurrentIndex(Math.min(newIndex, posts.slice(0, 6).length - 1))
    }
  }

  // Auto scroll functionality
  useEffect(() => {
    if (!isAutoScrolling || !scrollContainerRef.current) return

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
        
        if (scrollLeft >= scrollWidth - clientWidth - 1) {
          // Reset to beginning
          scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' })
        } else {
          // Scroll to next card (full width)
          scrollContainerRef.current.scrollBy({ left: clientWidth, behavior: 'smooth' })
        }
      }
    }, 4000) // Auto scroll every 4 seconds

    return () => clearInterval(interval)
  }, [isAutoScrolling])

  // Manual scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      setIsAutoScrolling(false)
      const { clientWidth } = scrollContainerRef.current
      scrollContainerRef.current.scrollBy({ left: -clientWidth, behavior: 'smooth' })
      setTimeout(() => setIsAutoScrolling(true), 8000) // Resume auto scroll after 8 seconds
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      setIsAutoScrolling(false)
      const { clientWidth } = scrollContainerRef.current
      scrollContainerRef.current.scrollBy({ left: clientWidth, behavior: 'smooth' })
      setTimeout(() => setIsAutoScrolling(true), 8000) // Resume auto scroll after 8 seconds
    }
  }

  // Pause auto scroll on hover
  const handleMouseEnter = () => setIsAutoScrolling(false)
  const handleMouseLeave = () => setIsAutoScrolling(true)

  // Touch gesture support
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
    setIsAutoScrolling(false)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && canScrollRight) {
      scrollRight()
    }
    if (isRightSwipe && canScrollLeft) {
      scrollLeft()
    }

    setTimeout(() => setIsAutoScrolling(true), 8000)
  }

  return (
    <section className="mb-12 sm:mb-16 md:mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 sm:mb-10 md:mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-500/20 text-yellow-300 text-sm font-semibold mb-6 border border-yellow-400/30">
          <Star className="w-4 h-4" />
          Featured Articles
        </div>
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
          Latest <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Insights</span>
        </h2>
        
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Stay ahead with expert insights on web development, mobile apps, and digital marketing strategies that drive results.
        </p>
      </motion.div>

      {/* Desktop Grid / Mobile Horizontal Scroll Container */}
      <div className="relative">
        {/* Desktop View - Grid Layout */}
        <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {posts.slice(0, 3).map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>

        {/* Mobile View - Horizontal Scroll */}
        <div className="md:hidden relative">
          {/* Controls Container - Properly spaced */}
          <div className="flex justify-between items-center mb-6">
            {/* Auto-scroll indicator */}
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <div className={`w-2 h-2 rounded-full transition-colors ${isAutoScrolling ? 'bg-green-400' : 'bg-gray-500'}`} />
              <span>{isAutoScrolling ? 'Auto-scrolling' : 'Manual control'}</span>
            </div>

            {/* Scroll Navigation Buttons */}
            <div className="flex gap-2">
              <button
                onClick={scrollLeft}
                disabled={!canScrollLeft}
                className={`p-2 rounded-full border transition-all duration-300 ${
                  canScrollLeft
                    ? 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-purple-400/50'
                    : 'bg-white/5 border-white/10 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={scrollRight}
                disabled={!canScrollRight}
                className={`p-2 rounded-full border transition-all duration-300 ${
                  canScrollRight
                    ? 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-purple-400/50'
                    : 'bg-white/5 border-white/10 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scroll Container with proper positioning */}
          <div className="relative">
            {/* Horizontal Scroll Container */}
            <div
              ref={scrollContainerRef}
              onScroll={checkScrollPosition}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
              style={{
                scrollBehavior: 'smooth',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {posts.slice(0, 6).map((post, index) => (
                <div key={post.slug} className="flex-none w-full snap-center px-2">
                  <div className="h-auto min-h-[420px] max-w-sm mx-auto">
                    <BlogCard post={post} index={index} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {posts.slice(0, 6).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-purple-400 w-6' 
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* View All Posts Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mt-12"
      >
        <Link
          href="/blog"
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl group"
        >
          <span>Explore All Articles</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
        
        <p className="text-gray-400 text-sm mt-4">
          Discover more insights, tutorials, and industry trends in our complete blog
        </p>
      </motion.div>
    </section>
  )
}
