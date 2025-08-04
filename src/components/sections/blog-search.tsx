'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Tag, X } from 'lucide-react'
import Link from 'next/link'

interface BlogSearchProps {
  categories: string[]
  allPostsCount: number
  currentCategory?: string
  currentSearch?: string
}

export default function BlogSearch({ 
  categories, 
  allPostsCount, 
  currentCategory, 
  currentSearch 
}: BlogSearchProps) {
  const [searchValue, setSearchValue] = useState(currentSearch || '')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const search = formData.get('search') as string
    
    if (search.trim()) {
      window.location.href = `/blog?search=${encodeURIComponent(search.trim())}`
    } else {
      window.location.href = '/blog'
    }
  }

  return (
    <section className="mb-16">
      <div className="max-w-4xl mx-auto">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative group mb-6 sm:mb-8"
        >
          {/* Gradient Border Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
          
          <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-4 sm:p-6 lg:p-8">
            <form onSubmit={handleSearch} className="space-y-4">
              {/* Premium Search Input */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 focus-within:border-purple-400/50 focus-within:ring-2 focus-within:ring-purple-400/20 transition-all duration-300 overflow-hidden">
                  <Search className="absolute left-4 sm:left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400 z-10" />
                  
                  <input
                    type="text"
                    name="search"
                    placeholder="Search for insights, tips, and expert articles..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="w-full pl-12 sm:pl-14 pr-4 py-4 sm:py-5 text-sm sm:text-base bg-transparent text-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-500 transition-all duration-300"
                  />
                  
                  {/* Subtle Inner Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-cyan-500/5 pointer-events-none"></div>
                </div>
              </div>
              
              {/* Premium Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  type="submit"
                  className="group/btn relative w-full sm:flex-1 overflow-hidden rounded-xl"
                >
                  {/* Animated background layers */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 transition-all duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 opacity-0 group-hover/btn:opacity-100 transition-all duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover/btn:opacity-100 transition-all duration-300"></div>
                  
                  {/* Glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 rounded-xl opacity-0 group-hover/btn:opacity-30 blur-sm transition-all duration-500"></div>
                  
                  {/* Button content */}
                  <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white font-bold py-4 sm:py-5 px-6 sm:px-8 rounded-xl transition-all duration-300 transform group-hover/btn:scale-[1.02] active:scale-[0.98] shadow-2xl group-hover/btn:shadow-purple-500/40 text-sm sm:text-base border border-white/10 group-hover/btn:border-white/20">
                    <span className="flex items-center justify-center gap-2.5 relative z-10">
                      <div className="relative">
                        <Search className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover/btn:scale-110" />
                        <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover/btn:scale-150 transition-transform duration-300 blur-sm"></div>
                      </div>
                      <span className="font-semibold tracking-wide">Search Articles</span>
                    </span>
                    
                    {/* Shine effect */}
                    <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-out"></div>
                  </div>
                </button>
                
                <button
                  type="button"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="group/filter relative w-full sm:w-auto overflow-hidden rounded-xl"
                >
                  {/* Background layers */}
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-sm transition-all duration-300 group-hover/filter:bg-white/10"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 opacity-0 group-hover/filter:opacity-100 transition-all duration-500"></div>
                  
                  {/* Subtle border glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400/30 via-pink-400/30 to-cyan-400/30 rounded-xl opacity-0 group-hover/filter:opacity-50 blur-sm transition-all duration-500"></div>
                  
                  {/* Button content */}
                  <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold py-4 sm:py-5 px-4 sm:px-6 rounded-xl transition-all duration-300 group-hover/filter:bg-white/15 group-hover/filter:border-purple-400/40 group-hover/filter:shadow-lg group-hover/filter:shadow-purple-500/20 text-sm sm:text-base transform group-hover/filter:scale-[1.02] active:scale-[0.98]">
                    <span className="flex items-center justify-center gap-2.5">
                      <div className="relative">
                        <Filter className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${isFilterOpen ? 'rotate-180 text-purple-400' : 'text-gray-300 group-hover/filter:text-purple-400'}`} />
                        {isFilterOpen && (
                          <div className="absolute inset-0 bg-purple-400/30 rounded-full scale-150 blur-sm"></div>
                        )}
                      </div>
                      <span className="font-medium tracking-wide">Categories</span>
                    </span>
                  </div>
                </button>
              </div>
            </form>

            {/* Active Filters */}
            {(currentCategory || currentSearch) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/10"
              >
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="text-xs sm:text-sm font-medium text-gray-300">Active filters:</span>
                  
                  {currentSearch && (
                    <div className="flex items-center gap-1 sm:gap-2 bg-purple-500/20 text-purple-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm border border-purple-400/30">
                      <Search className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="truncate max-w-[120px] sm:max-w-none">"{currentSearch}"</span>
                      <Link href="/blog" className="hover:text-purple-100 ml-1">
                        <X className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Link>
                    </div>
                  )}
                  
                  {currentCategory && (
                    <div className="flex items-center gap-1 sm:gap-2 bg-cyan-500/20 text-cyan-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm border border-cyan-400/30">
                      <Tag className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="truncate max-w-[100px] sm:max-w-none">{currentCategory}</span>
                      <Link href="/blog" className="hover:text-cyan-100 ml-1">
                        <X className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Link>
                    </div>
                  )}
                  
                  <Link 
                    href="/blog" 
                    className="text-xs sm:text-sm text-gray-400 hover:text-gray-200 underline"
                  >
                    Clear all
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Categories Filter */}
        <AnimatePresence>
          {(isFilterOpen || currentCategory) && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="relative group overflow-hidden"
            >
              {/* Gradient Border Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              
              <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-4 sm:p-6 lg:p-8">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-400/30">
                    <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white">Browse by Category</h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-purple-500/30 to-transparent ml-4"></div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap gap-2 sm:gap-3">
                  <Link
                    href="/blog"
                    className={`group/cat relative overflow-hidden inline-flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                      !currentCategory 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25 border border-purple-400/30' 
                        : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20 hover:border-purple-400/30 hover:text-white'
                    }`}
                  >
                    <Tag className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="truncate">All Articles ({allPostsCount})</span>
                    {!currentCategory && (
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-hover/cat:opacity-100 transition-opacity duration-300"></div>
                    )}
                  </Link>
                  
                  {categories.map((category) => {
                    const isActive = currentCategory === category.toLowerCase()
                    
                    return (
                      <Link
                        key={category}
                        href={`/blog?category=${encodeURIComponent(category.toLowerCase())}`}
                        className={`group/cat relative overflow-hidden inline-flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                          isActive
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25 border border-purple-400/30'
                            : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20 hover:border-purple-400/30 hover:text-white'
                        }`}
                      >
                        <Tag className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="truncate">{category}</span>
                        {isActive && (
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-hover/cat:opacity-100 transition-opacity duration-300"></div>
                        )}
                      </Link>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
