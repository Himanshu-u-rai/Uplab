'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { BlogPostMeta } from '@/lib/blog'
import { Calendar, Clock, User, ArrowRight, Star } from 'lucide-react'

interface BlogFeaturedProps {
  posts: BlogPostMeta[]
}

export default function BlogFeatured({ posts }: BlogFeaturedProps) {
  if (posts.length === 0) return null

  return (
    <section className="mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-500/20 text-yellow-300 text-sm font-semibold mb-6 border border-yellow-400/30">
          <Star className="w-4 h-4" />
          Featured Articles
        </div>
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
          Editor's <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Picks</span>
        </h2>
        
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Handpicked articles featuring the latest trends, expert insights, and actionable strategies.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {posts.slice(0, 3).map((post, index) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative"
          >
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-white/20 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:border-purple-400/50">
                {/* Featured Badge */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10">
                  <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                    <Star className="w-3 h-3" />
                    <span className="hidden sm:inline">Featured</span>
                  </div>
                </div>

                {/* Image */}
                <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  {/* Category */}
                  <div className="inline-flex items-center gap-1 bg-purple-500/20 text-purple-300 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold mb-3 sm:mb-4 border border-purple-400/30">
                    {post.category}
                  </div>

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
                  <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
