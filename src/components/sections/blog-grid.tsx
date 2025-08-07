'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { BlogPostMeta } from '@/lib/blog'
import ViewCounter from '@/components/ui/view-counter'
import { Calendar, Clock, User, ArrowRight, Search, BookOpen } from 'lucide-react'

interface BlogGridProps {
  posts: BlogPostMeta[]
  currentCategory?: string
  currentSearch?: string
}

export default function BlogGrid({ posts, currentCategory, currentSearch }: BlogGridProps) {
  const getHeadingText = () => {
    if (currentSearch) {
      return `Search Results for "${currentSearch}"`
    }
    if (currentCategory) {
      return `${currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)} Articles`
    }
    return 'All Articles'
  }

  const getSubheadingText = () => {
    const count = posts.length
    const articleText = count === 1 ? 'article' : 'articles'
    
    if (currentSearch) {
      return `${count} ${articleText} found`
    }
    if (currentCategory) {
      return `${count} ${articleText} in this category`
    }
    return `${count} ${articleText} available`
  }

  return (
    <section>
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          {getHeadingText()}
        </h2>
        <p className="text-gray-300 text-lg">
          {getSubheadingText()}
        </p>
      </motion.div>

      {/* Articles Grid */}
      <AnimatePresence mode="wait">
        {posts.length > 0 ? (
          <motion.div
            key={`${currentCategory}-${currentSearch}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          >
            {posts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-white/20 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 hover:scale-[1.02] hover:border-purple-400/50">
                    {/* Image */}
                    <div className="relative h-40 sm:h-48 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                        <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                          {post.category}
                        </span>
                      </div>
                      
                      {/* Featured Badge */}
                      {post.featured && (
                        <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                          <div className="flex items-center gap-1 text-yellow-400 text-xs bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full">
                            <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                            <span className="hidden sm:inline">Featured</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-6">
                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 line-clamp-2 group-hover:text-purple-400 transition-colors duration-300 leading-tight">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-300 text-sm line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>

                      {/* Meta Information */}
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-gray-400 mb-3 sm:mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span className="hidden sm:inline">
                            {new Date(post.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                          <span className="sm:hidden">
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
                        <div className="flex items-center gap-1 hidden sm:flex">
                          <User className="w-3 h-3" />
                          {post.author}
                        </div>
                        <ViewCounter slug={post.slug} className="hidden sm:flex" />
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="bg-white/10 text-gray-300 px-2 py-1 rounded-md text-xs hover:bg-purple-500/20 hover:text-purple-300 transition-colors duration-200 border border-white/20"
                          >
                            #{tag}
                          </span>
                        ))}
                        {post.tags.length > 2 && (
                          <span className="text-gray-500 text-xs py-1">
                            +{post.tags.length - 2}
                          </span>
                        )}
                      </div>

                      {/* Read More */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                          <span>Read More</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-white/10 to-white/5 rounded-full flex items-center justify-center border border-white/20">
              {currentSearch ? (
                <Search className="w-10 h-10 text-gray-400" />
              ) : (
                <BookOpen className="w-10 h-10 text-gray-400" />
              )}
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4">
              {currentSearch ? 'No articles found' : 'No articles available'}
            </h3>
            
            <p className="text-gray-300 mb-8 max-w-md mx-auto">
              {currentSearch 
                ? `We couldn't find any articles matching "${currentSearch}". Try adjusting your search terms or browse all articles.`
                : 'We\'re working on creating amazing content for you. Check back soon for our latest insights!'
              }
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Browse All Articles
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:bg-white/30"
              >
                Back to Home
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
