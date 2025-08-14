'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote, MessageSquare, Heart, Award } from 'lucide-react'
import Image from 'next/image'
import { getImagePath, createImageProps } from '@/lib/image-utils'
import SchemaComponent from '@/components/ui/schema-component'
import { createReviewSchema } from '@/lib/schema'

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'CEO & Founder',
    company: 'StyleVogue Fashion',
    avatar: getImagePath('testimonials', 'female.png'),
    rating: 5,
    text: 'Uplab completely transformed our fashion e-commerce platform. Their understanding of Indian market dynamics and modern UI/UX design helped us achieve 400% growth in online sales within 6 months. Absolutely phenomenal work!',
    projectType: 'Fashion E-commerce Platform',
    results: ['400% sales increase', '60% faster checkout', '92% customer satisfaction'],
    featured: true,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 2,
    name: 'Arjun Mehta',
    role: 'Founder & CTO',
    company: 'FoodieExpress',
    avatar: getImagePath('testimonials', 'male.png'),
    rating: 5,
    text: 'Working with Uplab was an incredible experience. They developed our food delivery app with amazing attention to detail. The app now serves over 200,000+ users across 15+ cities. Their technical expertise is unmatched!',
    projectType: 'Food Delivery Mobile App',
    results: ['200K+ active users', '4.8 app store rating', '50% faster delivery tracking'],
    featured: true,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 4,
    name: 'Rohit Agarwal',
    role: 'Co-founder',
    company: 'FinSecure Banking',
    avatar: getImagePath('testimonials', 'male.png'),
    rating: 5,
    text: 'Uplab built our secure banking platform with exceptional attention to security and compliance. Their expertise in fintech development helped us launch successfully with zero security incidents and 99.9% uptime.',
    projectType: 'Secure Banking Platform',
    results: ['99.9% uptime', 'RBI compliance', '100K+ secure transactions'],
    featured: true,
    gradient: 'from-orange-500 to-red-500',
  },
  {
    id: 5,
    name: 'Sneha Reddy',
    role: 'Brand Director',
    company: 'Heritage Crafts Studio',
    avatar: getImagePath('testimonials', 'female.png'),
    rating: 5,
    text: 'The website Uplab created for our traditional crafts business perfectly blends our cultural heritage with modern design. It beautifully showcases our artisan work and has increased our online orders by 250%.',
    projectType: 'Heritage Crafts Website',
    results: ['250% order increase', '80% mobile traffic', '95% customer retention'],
    featured: false,
    gradient: 'from-amber-500 to-yellow-500',
  },
]

const stats = [
  { number: '15+', label: 'Projects Completed', icon: Heart },
  { number: '5+', label: 'Awards Won', icon: Award },
  { number: '100%', label: 'Satisfaction Rate', icon: Star },
  { number: '24/7', label: 'Support', icon: MessageSquare },
]

export default function EnhancedTestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const autoPlay = true // Always auto-play
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  // Generate reviews schema
  const reviewsSchema = createReviewSchema(
    testimonials.map(testimonial => ({
      author: testimonial.name,
      rating: testimonial.rating,
      reviewBody: testimonial.text,
      datePublished: '2024-01-01' // You can make this dynamic based on actual dates
    }))
  )

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return
    
    const timer = setInterval(() => {
      nextTestimonial()
    }, 5000)

    return () => clearInterval(timer)
  }, [autoPlay, currentIndex])

  return (
    <>
      {/* Schema Markup */}
      <SchemaComponent schema={reviewsSchema} id="testimonials-schema" />
      
      <section ref={sectionRef} className="py-8 sm:py-16 md:py-24 lg:py-32 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements - Mobile Optimized */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-purple-500/10 rounded-full blur-2xl sm:blur-3xl animate-pulse" />
        <div className="absolute top-1/2 right-0 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-pink-500/10 rounded-full blur-2xl sm:blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-0 left-1/3 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-cyan-500/10 rounded-full blur-2xl sm:blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Floating Particles - Hidden on mobile */}
        <div className="hidden sm:block">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100, -20],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Section Header - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 sm:mb-12 md:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-xl border border-purple-500/20 text-purple-300 text-xs sm:text-sm font-semibold mb-3 sm:mb-4"
          >
            <Quote className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Client Stories</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Loved by Businesses
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-sm sm:text-base md:text-lg text-gray-300 max-w-xl sm:max-w-2xl mx-auto leading-relaxed px-2"
          >
            Here's what our clients say about working with Uplab.
          </motion.p>
        </motion.div>

        {/* Stats Section - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-12 md:mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              className="text-center group bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10"
            >
              <div className="relative mb-2 sm:mb-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                </div>
              </div>
              <div className="text-sm sm:text-base md:text-lg font-bold text-white mb-1">{stat.number}</div>
              <div className="text-gray-400 text-xs sm:text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Testimonial Display - Mobile Polished */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-6 sm:mb-12 md:mb-16"
        >
          <div className="max-w-3xl mx-auto px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-5 sm:p-6 border border-white/20 shadow-2xl relative overflow-hidden"
              >
                {/* Background Gradient Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${currentTestimonial.gradient} opacity-5 rounded-2xl`} />
                
                {/* Content */}
                <div className="relative z-10">
                {/* Mobile Polished Layout */}
                <div className="space-y-4">
                  {/* Header Section with Avatar and Rating */}
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br ${currentTestimonial.gradient} flex items-center justify-center shadow-lg p-0.5 flex-shrink-0`}>
                      <Image 
                        src={currentTestimonial.avatar}
                        alt={currentTestimonial.name}
                        width={64}
                        height={64}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    
                    {/* Client Info and Rating */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base sm:text-lg font-bold text-white truncate">{currentTestimonial.name}</h3>
                        {currentTestimonial.featured && (
                          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow-sm flex-shrink-0">
                            ⭐
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-300 truncate">{currentTestimonial.role}</p>
                      <p className="text-xs text-gray-400 truncate mb-2">{currentTestimonial.company}</p>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-1">
                        {[...Array(currentTestimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-yellow-400 text-xs font-medium ml-1">5.0</span>
                      </div>
                    </div>
                  </div>

                  {/* Quote Section */}
                  <div className="relative">
                    <div className="absolute -left-1 -top-1 opacity-30">
                      <Quote className="w-4 h-4 text-purple-400" />
                    </div>
                    <blockquote className="text-sm sm:text-base text-white leading-relaxed pl-4 italic">
                      "{currentTestimonial.text}"
                    </blockquote>
                  </div>
                  
                  {/* Project Type and Results */}
                  <div className="space-y-3">
                    {/* Project Type */}
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-xs font-medium">Project:</span>
                      <span className={`inline-block px-2 py-1 rounded-md bg-gradient-to-r ${currentTestimonial.gradient} text-white text-xs font-semibold`}>
                        {currentTestimonial.projectType}
                      </span>
                    </div>
                    
                    {/* Results Grid - Mobile Optimized */}
                    <div className="space-y-2">
                      <span className="text-gray-400 text-xs font-medium">Key Results:</span>
                      <div className="grid grid-cols-1 gap-2">
                        {currentTestimonial.results.map((result, index) => (
                          <div 
                            key={index}
                            className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10"
                          >
                            <div className={`w-4 h-4 rounded-sm bg-gradient-to-r ${currentTestimonial.gradient} flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}>
                              {index + 1}
                            </div>
                            <span className="text-white text-xs font-medium">{result}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Navigation Controls - Compact Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex items-center justify-center gap-4 sm:gap-6"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevTestimonial}
            className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>

          {/* Pagination Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-gradient-to-r from-purple-400 to-pink-400 w-4 sm:w-6' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextTestimonial}
            className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
    </>
  )
}
