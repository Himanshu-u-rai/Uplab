'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'

export default function AdvancedHeroSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 500])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-32 pb-16 sm:pb-32 z-20">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.15),transparent_50%)]" />
      </div>

      {/* Floating Particles - Reduced for mobile */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-50 sm:opacity-100"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Geometric Shapes - Responsive sizing */}
      <motion.div
        className="absolute top-10 sm:top-20 right-4 sm:right-20 w-48 sm:w-96 h-48 sm:h-96 bg-gradient-to-r from-purple-500/10 sm:from-purple-500/20 to-pink-500/10 sm:to-pink-500/20 rounded-full blur-2xl sm:blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <motion.div
        className="absolute bottom-10 sm:bottom-20 left-4 sm:left-20 w-32 sm:w-72 h-32 sm:h-72 bg-gradient-to-r from-blue-500/10 sm:from-blue-500/20 to-cyan-500/10 sm:to-cyan-500/20 rounded-full blur-2xl sm:blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <motion.div style={{ y, opacity }} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
        <div className="text-center max-w-6xl mx-auto">
          {/* Main Heading with Advanced Typography - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mb-4 sm:mb-6 md:mb-8"
          >
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-none tracking-tight">
              <motion.span
                className="block"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Digital
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Excellence
              </motion.span>
              <motion.span
                className="block text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light text-white/80 mt-2 sm:mt-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                Redefined
              </motion.span>
            </h1>
          </motion.div>

          {/* Enhanced Subtitle - Mobile Optimized */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 mb-4 sm:mb-6 md:mb-8 lg:mb-12 max-w-3xl lg:max-w-4xl mx-auto leading-relaxed font-light px-2 sm:px-4"
          >
            We craft exceptional digital experiences that drive growth, 
            engagement, and success in the modern digital landscape.
          </motion.p>

          {/* Advanced CTA Section - Mobile First */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8 md:mb-12 lg:mb-16 px-2 sm:px-4"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-5 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4 md:py-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl rounded-lg sm:rounded-xl md:rounded-2xl shadow-2xl overflow-hidden cursor-pointer inline-block w-full sm:w-auto text-center max-w-sm sm:max-w-none"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                })
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center justify-center gap-2 sm:gap-3">
                <span>Start Your Journey</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </motion.div>
              </div>
              
              {/* Shimmer Effect */}
              <motion.div
                className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
            </motion.a>

            <motion.a
              href="#portfolio"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-semibold text-sm sm:text-base md:text-lg rounded-xl sm:rounded-2xl hover:bg-white/20 transition-all duration-300 cursor-pointer inline-block w-full sm:w-auto text-center max-w-xs sm:max-w-none"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('portfolio')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                })
              }}
            >
              View Our Work
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

    </section>
  )
}
