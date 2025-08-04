'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function BlogHero() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden pt-28">
      {/* Background Elements - Matching main website */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-slate-900" />
      <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      
      {/* Floating Elements */}
      <div className="absolute top-32 right-20 opacity-30">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-4 h-4 bg-purple-400 rounded-full"
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold mb-8 shadow-lg"
          >
            <Sparkles className="w-4 h-4" />
            Latest Insights & Expert Tips
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-8 leading-[1.1]"
          >
            <span className="block mb-2">Stay Ahead of the</span>
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Digital Revolution
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12"
          >
            Discover cutting-edge strategies, expert insights, and actionable tips 
            to accelerate your digital transformation journey and stay competitive.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
