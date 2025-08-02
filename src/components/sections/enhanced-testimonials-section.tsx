'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote, MessageSquare, Heart, Award } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'CEO & Founder',
    company: 'StyleVogue Fashion',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
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
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
    rating: 5,
    text: 'Working with Uplab was an incredible experience. They developed our food delivery app with amazing attention to detail. The app now serves over 200,000+ users across 15+ cities. Their technical expertise is unmatched!',
    projectType: 'Food Delivery Mobile App',
    results: ['200K+ active users', '4.8 app store rating', '50% faster delivery tracking'],
    featured: true,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 3,
    name: 'Kavya Patel',
    role: 'Marketing Head',
    company: 'EduTech Solutions',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
    rating: 5,
    text: 'Uplab\'s digital marketing strategies revolutionized our online education platform. Their campaigns helped us reach millions of students across India. The ROI exceeded our expectations by 300%!',
    projectType: 'EdTech Digital Marketing',
    results: ['500% lead increase', '3M+ campaign reach', '25% conversion rate'],
    featured: false,
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    id: 4,
    name: 'Rohit Agarwal',
    role: 'Co-founder',
    company: 'FinSecure Banking',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
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
    avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
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
    <section ref={sectionRef} className="py-32 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Floating Particles */}
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

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-xl border border-purple-500/20 text-purple-300 text-sm font-semibold mb-6"
          >
            <Quote className="w-5 h-5" />
            Client Stories
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight"
          >
            <span className="block">Loved by</span>
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Businesses Worldwide
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Don't just take our word for it. Here's what our clients say about 
            working with Uplab and the results we've achieved together.
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              className="text-center group"
            >
              <div className="relative mb-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="absolute inset-0 w-16 h-16 mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Testimonial Display */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-20"
        >
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                {/* Image Section */}
                <div className="relative">
                  <motion.div
                    className={`aspect-square rounded-3xl overflow-hidden bg-gradient-to-br ${currentTestimonial.gradient} p-1 shadow-2xl`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-white to-gray-50 rounded-3xl relative overflow-hidden flex flex-col items-center justify-center p-8">
                      {/* Profile Image */}
                      <div className={`w-40 h-40 rounded-full bg-gradient-to-br ${currentTestimonial.gradient} flex items-center justify-center shadow-xl p-1 mb-6`}>
                        <img 
                          src={currentTestimonial.avatar} 
                          alt={currentTestimonial.name}
                          className="w-full h-full rounded-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80';
                          }}
                        />
                      </div>
                      
                      {/* Quote Icon */}
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${currentTestimonial.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                        <Quote className="w-8 h-8 text-white" />
                      </div>
                      
                      {/* Client Info */}
                      <div className="text-center space-y-2">
                        <h3 className="text-2xl font-bold text-gray-900">{currentTestimonial.name}</h3>
                        <p className="text-lg font-semibold text-gray-700">{currentTestimonial.role}</p>
                        <p className="text-base text-gray-600 font-medium">{currentTestimonial.company}</p>
                        
                        {/* Project Badge */}
                        <div className="pt-3">
                          <span className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${currentTestimonial.gradient} text-white text-sm font-semibold shadow-md`}>
                            {currentTestimonial.projectType}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Featured Badge */}
                  {currentTestimonial.featured && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                    >
                      ⭐ Featured
                    </motion.div>
                  )}
                </div>

                {/* Content Section */}
                <div className="space-y-8">
                  {/* Rating Stars */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex items-center gap-2"
                  >
                    <div className="flex items-center gap-1">
                      {[...Array(currentTestimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                        >
                          <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                        </motion.div>
                      ))}
                    </div>
                    <span className="text-yellow-400 font-semibold text-lg ml-2">5.0</span>
                    <span className="text-gray-400 text-sm">• Excellent Rating</span>
                  </motion.div>

                  {/* Main Testimonial Text */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="relative"
                  >
                    <div className="absolute -left-4 -top-2">
                      <Quote className="w-8 h-8 text-purple-400/30" />
                    </div>
                    <blockquote className="text-xl md:text-2xl text-white leading-relaxed font-medium pl-8">
                      {currentTestimonial.text}
                    </blockquote>
                  </motion.div>

                  {/* Client Information Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${currentTestimonial.gradient} p-0.5`}>
                        <div className="w-full h-full bg-gray-800 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                          {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white">{currentTestimonial.name}</h4>
                        <p className="text-gray-300 font-medium">{currentTestimonial.role}</p>
                        <p className="text-gray-400 text-sm">{currentTestimonial.company}</p>
                      </div>
                    </div>
                    
                    {/* Project Type Tag */}
                    <div className="flex items-center gap-2">
                      <span className="text-purple-400 text-sm font-medium">Project:</span>
                      <span className={`px-3 py-1 rounded-full bg-gradient-to-r ${currentTestimonial.gradient} text-white text-sm font-semibold`}>
                        {currentTestimonial.projectType}
                      </span>
                    </div>
                  </motion.div>

                  {/* Results Grid */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="space-y-3"
                  >
                    <h5 className="text-lg font-semibold text-white mb-4">Key Results:</h5>
                    <div className="grid grid-cols-1 gap-3">
                      {currentTestimonial.results.map((result, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                          className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors"
                        >
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${currentTestimonial.gradient} flex items-center justify-center text-white font-bold text-sm`}>
                            {index + 1}
                          </div>
                          <span className="text-white font-medium">{result}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Navigation Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex items-center justify-center gap-8 mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevTestimonial}
            className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          {/* Pagination Dots */}
          <div className="flex gap-3">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-gradient-to-r from-purple-400 to-pink-400 w-8' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextTestimonial}
            className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
