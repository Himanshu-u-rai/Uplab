'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { BlogPostMeta } from '@/lib/blog'
import { Calendar, Clock, User, ArrowRight, Star, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
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
            <div className="relative h-36 sm:h-40 md:h-48 overflow-hidden flex-shrink-0">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-3 sm:p-4 md:p-5 flex-1 flex flex-col">
              {/* Category */}
              <div className="inline-flex items-center gap-1 bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs font-semibold border border-purple-400/30 w-fit mb-2 sm:mb-3">
                {post.category}
              </div>

              {/* Title */}
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-white group-hover:text-purple-400 transition-colors duration-300 leading-tight mb-2 sm:mb-3 line-clamp-2">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed flex-1 mb-3 sm:mb-4 line-clamp-3">
                {post.excerpt.length > 100 ? `${post.excerpt.substring(0, 100)}...` : post.excerpt}
              </p>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-gray-400 mb-2 sm:mb-3">
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
              <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="bg-white/10 text-gray-300 px-2 py-1 rounded-md text-xs border border-white/20"
                  >
                    #{tag}
                  </span>
                ))}
                {post.tags.length > 2 && (
                  <span className="text-gray-400 text-xs py-1">
                    +{post.tags.length - 2}
                  </span>
                )}
              </div>

              {/* Read More */}
              <div className="flex items-center gap-2 text-purple-400 font-semibold text-xs sm:text-sm group-hover:gap-3 transition-all duration-300">
                <span>Read Article</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

export default function BlogFeatured({ posts }: BlogFeaturedProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  
  // Featured articles carousel state (mobile only)
  const [featuredCurrentIndex, setFeaturedCurrentIndex] = useState(0)
  const [featuredIsAutoScrolling, setFeaturedIsAutoScrolling] = useState(true)
  const [featuredTouchStart, setFeaturedTouchStart] = useState<number | null>(null)
  const [featuredTouchEnd, setFeaturedTouchEnd] = useState<number | null>(null)
  
  const featuredPosts = posts.filter(post => post.featured)

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (featuredPosts.length === 0) return null

  // Touch swipe functionality for main carousel
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      handleNext()
    } else if (isRightSwipe) {
      handlePrevious()
    }
  }

  // Touch swipe functionality for featured articles carousel
  const onFeaturedTouchStart = (e: React.TouchEvent) => {
    setFeaturedTouchEnd(null)
    setFeaturedTouchStart(e.targetTouches[0].clientX)
  }

  const onFeaturedTouchMove = (e: React.TouchEvent) => {
    setFeaturedTouchEnd(e.targetTouches[0].clientX)
  }

  const onFeaturedTouchEnd = () => {
    if (!featuredTouchStart || !featuredTouchEnd) return
    
    const distance = featuredTouchStart - featuredTouchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      handleFeaturedNext()
    } else if (isRightSwipe) {
      handleFeaturedPrevious()
    }
  }

  // Get items per page based on screen size
  const getItemsPerPage = () => isMobile ? 1 : 3

  // Auto scroll functionality for additional carousel
  useEffect(() => {
    if (!isAutoScrolling || featuredPosts.length <= 3 + getItemsPerPage()) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = Math.ceil((featuredPosts.length - 3) / getItemsPerPage()) - 1
        return prevIndex >= maxIndex ? 0 : prevIndex + 1
      })
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoScrolling, featuredPosts.length, isMobile])

  // Auto scroll functionality for featured articles carousel (mobile only)
  useEffect(() => {
    if (!isMobile || !featuredIsAutoScrolling || featuredPosts.length <= 1) return

    const interval = setInterval(() => {
      setFeaturedCurrentIndex((prevIndex) => {
        const maxIndex = Math.min(featuredPosts.length - 1, 2) // Max 3 featured articles
        return prevIndex >= maxIndex ? 0 : prevIndex + 1
      })
    }, 4000) // Change every 4 seconds (faster for featured)

    return () => clearInterval(interval)
  }, [featuredIsAutoScrolling, featuredPosts.length, isMobile])

  // Get current posts to display in additional carousel (skip first 3)
  const getCurrentCarouselPosts = () => {
    const itemsPerPage = getItemsPerPage()
    const startIndex = currentIndex * itemsPerPage + 3 // Skip first 3 featured articles
    return featuredPosts.slice(startIndex, startIndex + itemsPerPage)
  }

  // Navigation functions for featured articles carousel
  const handleFeaturedPrevious = () => {
    setFeaturedIsAutoScrolling(false)
    setFeaturedCurrentIndex((prevIndex) => {
      const maxIndex = Math.min(featuredPosts.length - 1, 2)
      return prevIndex <= 0 ? maxIndex : prevIndex - 1
    })
    setTimeout(() => setFeaturedIsAutoScrolling(true), 8000)
  }

  const handleFeaturedNext = () => {
    setFeaturedIsAutoScrolling(false)
    setFeaturedCurrentIndex((prevIndex) => {
      const maxIndex = Math.min(featuredPosts.length - 1, 2)
      return prevIndex >= maxIndex ? 0 : prevIndex + 1
    })
    setTimeout(() => setFeaturedIsAutoScrolling(true), 8000)
  }

  const handlePrevious = () => {
    setIsAutoScrolling(false)
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.ceil((featuredPosts.length - 3) / getItemsPerPage()) - 1
      return prevIndex <= 0 ? maxIndex : prevIndex - 1
    })
    // Resume auto-scroll after 10 seconds of manual control
    setTimeout(() => setIsAutoScrolling(true), 10000)
  }

  const handleNext = () => {
    setIsAutoScrolling(false)
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.ceil((featuredPosts.length - 3) / getItemsPerPage()) - 1
      return prevIndex >= maxIndex ? 0 : prevIndex + 1
    })
    // Resume auto-scroll after 10 seconds of manual control
    setTimeout(() => setIsAutoScrolling(true), 10000)
  }

  const toggleAutoScroll = () => {
    setIsAutoScrolling(!isAutoScrolling)
  }

  const maxIndex = Math.ceil((featuredPosts.length - 3) / getItemsPerPage()) - 1 // Subtract first 3 featured
  const currentCarouselPosts = getCurrentCarouselPosts()
  const showAdditionalCarousel = featuredPosts.length > 3 // Show if more than 3 articles

  return (
    <section className="mb-12 sm:mb-16 md:mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6 sm:mb-8 md:mb-12 px-4"
      >
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-500/20 text-yellow-300 text-xs sm:text-sm font-semibold mb-4 sm:mb-6 border border-yellow-400/30">
          <Star className="w-3 h-3 sm:w-4 sm:h-4" />
          Featured Articles
        </div>
        
        <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
          Latest <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Insights</span>
        </h2>
        
        <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto mb-2">
          Stay ahead with expert insights on web development, mobile apps, and digital marketing strategies that drive results.
        </p>
        
        {/* Mobile featured carousel hint */}
        {isMobile && (
          <p className="text-xs text-yellow-400/80 max-w-md mx-auto">
            ✨ Swipe through our top featured articles below
          </p>
        )}
      </motion.div>

      {/* Featured Articles - Grid on Desktop, Carousel on Mobile */}
      {isMobile ? (
        // Mobile: Carousel for featured articles
        <div className="mb-12 sm:mb-16">
          <div 
            className="relative min-h-[400px]"
            onTouchStart={onFeaturedTouchStart}
            onTouchMove={onFeaturedTouchMove}
            onTouchEnd={onFeaturedTouchEnd}
          >
            <div className="absolute inset-0 px-4">
              <div className="flex justify-center h-full">
                <div className="w-full max-w-xs">
                  <motion.div
                    key={`featured-${featuredCurrentIndex}`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="h-full"
                  >
                    <BlogCard 
                      post={featuredPosts[featuredCurrentIndex]} 
                      index={0} 
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Featured articles carousel controls */}
          <div className="flex justify-between items-center px-4 mt-4">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full transition-colors ${featuredIsAutoScrolling ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`} />
              <span className="text-xs text-gray-400">
                {featuredCurrentIndex + 1} of {Math.min(featuredPosts.length, 3)}
              </span>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={handleFeaturedPrevious}
                className="p-2 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                aria-label="Previous featured article"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleFeaturedNext}
                className="p-2 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                aria-label="Next featured article"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Featured articles indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {featuredPosts.slice(0, 3).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setFeaturedCurrentIndex(index)
                  setFeaturedIsAutoScrolling(false)
                  setTimeout(() => setFeaturedIsAutoScrolling(true), 8000)
                }}
                className={`transition-all duration-300 ${
                  index === featuredCurrentIndex 
                    ? 'w-6 h-2 bg-yellow-400 rounded-full' 
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40 rounded-full'
                }`}
                aria-label={`Go to featured article ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Swipe hint */}
          <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-500">
            <span>← Swipe for more featured →</span>
          </div>
        </div>
      ) : (
        // Desktop: Grid for featured articles
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 px-4 sm:px-0">
          {featuredPosts.slice(0, 3).map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      )}

      {/* Additional Carousel Section - Only show if there are more than 3 featured articles */}
      {showAdditionalCarousel && (
        <div className="relative">
          {/* Separator for mobile */}
          {isMobile && (
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
              <span className="px-4 text-xs text-gray-400 font-medium">More Articles</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
            </div>
          )}

          {/* Carousel Header - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-6 sm:mb-8"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 px-4">
              More <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Featured Articles</span>
            </h3>
            <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base px-4">
              {isMobile 
                ? "Swipe left or right to browse additional insights and expert content" 
                : "Discover additional insights and expert content from our featured collection"
              }
            </p>
            
            {/* Mobile swipe indicator */}
            {isMobile && showAdditionalCarousel && (
              <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-500">
                <span>← Swipe →</span>
              </div>
            )}
          </motion.div>

          {/* Carousel Controls - Mobile Optimized */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 sm:mb-8">
            {/* Auto-scroll indicator and toggle */}
            <div className="flex items-center gap-3 sm:gap-4 order-2 sm:order-1">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                <div className={`w-2 h-2 rounded-full transition-colors ${isAutoScrolling ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`} />
                <span className="hidden xs:inline">
                  {isAutoScrolling 
                    ? (isMobile ? 'Auto-browsing' : 'Auto-rotating') 
                    : 'Manual control'
                  }
                </span>
              </div>
              <button
                onClick={toggleAutoScroll}
                className="flex items-center gap-2 px-2 sm:px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs border border-white/20 transition-all duration-300"
              >
                {isAutoScrolling ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                <span className="hidden xs:inline">{isAutoScrolling ? 'Pause' : 'Play'}</span>
              </button>
            </div>

            {/* Navigation buttons */}
            <div className="flex gap-2 order-1 sm:order-2">
              <button
                onClick={handlePrevious}
                className="p-2 sm:p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:border-purple-400/50 transition-all duration-300"
                aria-label="Previous articles"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 sm:p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:border-purple-400/50 transition-all duration-300"
                aria-label="Next articles"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Carousel Container - Mobile Responsive (1 card on mobile, 3 on desktop) */}
          <div 
            className="relative min-h-[400px] sm:min-h-[450px] md:min-h-[500px] lg:h-[520px]" 
            style={{ perspective: "1200px" }}
            onTouchStart={isMobile ? onTouchStart : undefined}
            onTouchMove={isMobile ? onTouchMove : undefined}
            onTouchEnd={isMobile ? onTouchEnd : undefined}
          >
            <div className="absolute inset-0 px-2 sm:px-4 py-2 sm:py-4">
              <div className={`grid gap-3 sm:gap-4 md:gap-6 lg:gap-8 h-full ${
                isMobile 
                  ? 'grid-cols-1 place-items-center w-full max-w-xs mx-auto' 
                  : 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'
              }`}>
                {currentCarouselPosts.map((post, index) => (
                  <motion.div
                    key={`carousel-${currentIndex}-${post.slug}`}
                    initial={{ 
                      rotateY: 90,
                      opacity: 0,
                      scale: 0.8,
                      z: -100
                    }}
                    animate={{ 
                      rotateY: 0,
                      opacity: 1,
                      scale: 1,
                      z: 0
                    }}
                    transition={{ 
                      duration: 1.2,
                      delay: index * 0.2,
                      ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier for smooth easing
                      type: "tween"
                    }}
                    style={{ 
                      transformStyle: "preserve-3d",
                      transformOrigin: "center center",
                      height: "100%"
                    }}
                    className="transform-gpu will-change-transform flex"
                    whileHover={{ 
                      scale: 1.02,
                      rotateY: -2,
                      z: 50,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <motion.div
                      initial={{ boxShadow: "0 0 0 rgba(139, 92, 246, 0)" }}
                      animate={{ 
                        boxShadow: [
                          "0 0 0 rgba(139, 92, 246, 0)",
                          "0 10px 25px rgba(139, 92, 246, 0.1)",
                          "0 5px 15px rgba(139, 92, 246, 0.05)"
                        ]
                      }}
                      transition={{ 
                        duration: 1.2,
                        delay: index * 0.2 + 0.3,
                        ease: "easeOut"
                      }}
                      whileHover={{
                        boxShadow: "0 15px 30px rgba(139, 92, 246, 0.15)",
                        transition: { duration: 0.3 }
                      }}
                      className="h-full rounded-xl w-full flex-1"
                    >
                      <div className="h-full">
                        <BlogCard post={post} index={index} />
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Carousel Indicators - Mobile Optimized */}
          <div className="flex justify-center gap-2 mt-6 sm:mt-8 px-4">
            {Array.from({ length: maxIndex + 1 }, (_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  setIsAutoScrolling(false)
                  setTimeout(() => setIsAutoScrolling(true), 10000)
                }}
                className={`transition-all duration-300 touch-manipulation ${
                  index === currentIndex 
                    ? 'w-6 sm:w-8 h-2 bg-purple-400 rounded-full' 
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40 rounded-full'
                }`}
                aria-label={`Go to carousel page ${index + 1} of ${maxIndex + 1}`}
              />
            ))}
          </div>
        </div>
      )}

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
