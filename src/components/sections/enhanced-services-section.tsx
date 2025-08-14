'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { 
  Code2, 
  Smartphone, 
  Search, 
  Megaphone,
  Zap,
  Target,
  Palette,
  CheckCircle,
  Star,
  TrendingUp,
  Users
} from 'lucide-react'

const services = [
  {
    icon: Code2,
    title: 'Web Development',
    description: 'Custom websites and web applications built with cutting-edge technologies for exceptional performance.',
    features: ['React & Next.js', 'TypeScript', 'Responsive Design', 'PWA Development'],
    stats: { projects: 250, satisfaction: 98, delivery: '2-4 weeks' },
    color: 'from-blue-500 to-cyan-500',
    bgPattern: 'bg-gradient-to-br from-blue-50 to-cyan-50',
    delay: 0.1
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications that engage users and drive business growth.',
    features: ['iOS & Android', 'React Native', 'Flutter', 'Native Performance'],
    stats: { projects: 150, satisfaction: 96, delivery: '3-6 weeks' },
    color: 'from-purple-500 to-pink-500',
    bgPattern: 'bg-gradient-to-br from-purple-50 to-pink-50',
    delay: 0.2
  },

]

const achievements = [
  { icon: Zap, value: '99%', label: 'Client Satisfaction', color: 'text-green-500' },
  { icon: Target, value: '100%', label: 'On-Time Delivery', color: 'text-blue-500' },
  { icon: Users, value: '24/7', label: 'Support Available', color: 'text-purple-500' },
  { icon: Star, value: '5.0', label: 'Average Rating', color: 'text-yellow-500' }
]

export default function EnhancedServicesSection() {
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const sectionRef = useRef(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  // Auto-scrolling effect for mobile only
  useEffect(() => {
    const carousel = carouselRef.current
    
    // Check if we're on mobile (screen width < 768px)
    const isMobile = window.innerWidth < 768
    
    if (!carousel || isPaused || !isMobile) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    intervalRef.current = setInterval(() => {
      const cardWidth = carousel.children[0]?.clientWidth || 0
      const gap = 24 // 6 * 4 = 24px gap
      const scrollAmount = cardWidth + gap
      
      // Check if we're at the end
      if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
        // Reset to beginning
        carousel.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        // Scroll to next card
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      }
    }, 3000) // Auto-scroll every 3 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isInView, isPaused])

  return (
    <section id="services" ref={sectionRef} className="pt-20 sm:pt-32 md:pt-48 pb-16 sm:pb-24 md:pb-32 bg-white relative overflow-hidden z-0">
      {/* Background Elements - Mobile Optimized */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-purple-50/30" />
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 sm:top-20 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-purple-500/5 rounded-full blur-2xl sm:blur-3xl" />
        <div className="absolute bottom-10 sm:bottom-20 left-0 w-36 sm:w-72 h-36 sm:h-72 bg-blue-500/5 rounded-full blur-2xl sm:blur-3xl" />
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-5 sm:opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#8b5cf6" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Section Header - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs sm:text-sm font-semibold mb-3 sm:mb-4 md:mb-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
            </motion.div>
            <span className="hidden xs:inline">Our Expertise</span>
            <span className="xs:hidden">Expertise</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-3 sm:mb-4 md:mb-6 leading-tight"
          >
            <span className="block">Services That</span>
            <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent">
              Drive Results
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2 sm:px-4"
          >
            We deliver comprehensive digital solutions that transform businesses 
            and create exceptional user experiences.
          </motion.p>
        </motion.div>

        {/* Enhanced Services - Mobile Carousel + Desktop Grid */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          {/* Mobile Horizontal Carousel */}
          <div className="block md:hidden">
            <div 
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide px-4"
            >
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative flex-shrink-0 w-[calc(100vw-4rem)] max-w-sm snap-center"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  <div className="relative p-4 rounded-xl bg-white border border-gray-100 shadow-md transition-shadow duration-300 overflow-hidden h-[320px] flex flex-col">
                    
                    {/* Simple Icon */}
                    <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${service.color} text-white mb-4 self-start`}>
                      <service.icon className="w-5 h-5" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between space-y-2">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-3">
                          {service.description}
                        </p>

                        {/* Features */}
                        <div className="grid grid-cols-1 gap-1">
                          {service.features.slice(0, 3).map((feature, featureIndex) => (
                            <div
                              key={featureIndex}
                              className="flex items-center text-xs text-gray-600"
                            >
                              <div
                                className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color} mr-2 flex-shrink-0`}
                              />
                              <span className="line-clamp-1">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="pt-3 border-t border-gray-100 mt-auto">
                        <div className="grid grid-cols-2 gap-3 text-center">
                          <div>
                            <div className="text-sm font-bold text-gray-900">{service.stats.satisfaction}%</div>
                            <div className="text-xs text-gray-500">Satisfaction</div>
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-900">{service.stats.delivery}</div>
                            <div className="text-xs text-gray-500">Delivery</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Mobile Scroll Indicator */}
            <div className="flex justify-center items-center mt-6 px-4 space-x-4">
              <div className="flex gap-2">
                {services.map((_, index) => (
                  <div key={index} className="w-2 h-2 rounded-full bg-gray-300"></div>
                ))}
              </div>
              <div className="text-xs text-gray-500 flex items-center gap-2">
                <motion.div
                  animate={{ 
                    opacity: isPaused ? 0.8 : [0.5, 1, 0.5],
                    scale: isPaused ? 1.2 : [1, 1.1, 1],
                    backgroundColor: isPaused ? "#ef4444" : "#8b5cf6"
                  }}
                  transition={{ 
                    duration: isPaused ? 0.3 : 2,
                    repeat: isPaused ? 0 : Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-2 h-2 rounded-full"
                />
                <span className={isPaused ? "font-semibold text-red-600" : "text-gray-500"}>
                  {isPaused ? 'Paused' : 'Auto-scroll'}
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:flex justify-center gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: service.delay }}
                onHoverStart={() => setHoveredService(index)}
                onHoverEnd={() => setHoveredService(null)}
                className="group relative"
              >
                <div className={`relative p-6 md:p-8 rounded-xl sm:rounded-2xl bg-white border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-auto flex flex-col ${
                  hoveredService === index ? 'scale-102 -translate-y-1' : ''
                }`}>
                  {/* Animated Background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-3 transition-opacity duration-300`}
                    animate={{
                      scale: hoveredService === index ? [1, 1.1, 1] : 1,
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  
                  {/* Floating Elements */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-1.5 h-1.5 bg-gradient-to-r ${service.color} rounded-full`}
                        style={{
                          top: `${i * 10}px`,
                          right: `${i * 8}px`,
                        }}
                        animate={{
                          y: [-3, -10, -3],
                          opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      />
                    ))}
                  </div>

                  {/* Icon with Advanced Animation */}
                  <motion.div
                    className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${service.color} text-white mb-6 relative overflow-hidden self-start`}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <service.icon className="w-6 h-6 relative z-10" />
                    
                    {/* Icon Glow Effect */}
                    <motion.div
                      className="absolute inset-0 bg-white/20 rounded-lg"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={hoveredService === index ? { scale: 1, opacity: 1 } : {}}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col space-y-4">
                    <div className="flex-1 space-y-4">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                        {service.description}
                      </p>

                      {/* Features */}
                      <div className="space-y-2">
                        {service.features.slice(0, 4).map((feature, featureIndex) => (
                          <motion.div
                            key={featureIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5, delay: service.delay + featureIndex * 0.1 }}
                            className="flex items-center text-sm text-gray-600 group-hover:text-gray-700"
                          >
                            <div
                              className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color} mr-3 flex-shrink-0`}
                            />
                            <span className="truncate">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="pt-4 border-t border-gray-100 mt-auto">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-lg font-bold text-gray-900">{service.stats.satisfaction}%</div>
                          <div className="text-xs text-gray-500">Satisfaction</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-gray-900">{service.stats.delivery}</div>
                          <div className="text-xs text-gray-500">Delivery</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced Achievement Stats - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative"
        >
          <div className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 sm:opacity-10">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="1" fill="currentColor"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dots)" />
              </svg>
            </div>

            <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 text-center">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="group"
                >
                  <motion.div
                    className={`inline-flex p-2 xs:p-3 sm:p-4 rounded-lg xs:rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-sm mb-2 xs:mb-3 sm:mb-4 ${achievement.color}`}
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <achievement.icon className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                  </motion.div>
                  
                  <motion.div
                    className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1 + index * 0.1 }}
                  >
                    {achievement.value}
                  </motion.div>
                  
                  <div className="text-white/80 font-medium text-xs sm:text-sm">{achievement.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
