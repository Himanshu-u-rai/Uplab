'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
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
  {
    icon: Search,
    title: 'SEO Optimization',
    description: 'Comprehensive SEO strategies to improve your search rankings and drive organic traffic.',
    features: ['Keyword Research', 'Technical SEO', 'Content Strategy', 'Performance Analytics'],
    stats: { projects: 300, satisfaction: 94, delivery: '1-3 months' },
    color: 'from-green-500 to-emerald-500',
    bgPattern: 'bg-gradient-to-br from-green-50 to-emerald-50',
    delay: 0.3
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description: 'Strategic digital marketing campaigns that convert prospects into loyal customers.',
    features: ['Social Media Ads', 'Google Ads', 'Email Marketing', 'Analytics & ROI'],
    stats: { projects: 200, satisfaction: 97, delivery: '2-4 weeks' },
    color: 'from-orange-500 to-red-500',
    bgPattern: 'bg-gradient-to-br from-orange-50 to-red-50',
    delay: 0.4
  }
]

const achievements = [
  { icon: Zap, value: '99%', label: 'Client Satisfaction', color: 'text-green-500' },
  { icon: Target, value: '100%', label: 'On-Time Delivery', color: 'text-blue-500' },
  { icon: Users, value: '24/7', label: 'Support Available', color: 'text-purple-500' },
  { icon: Star, value: '5.0', label: 'Average Rating', color: 'text-yellow-500' }
]

export default function EnhancedServicesSection() {
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

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
          className="text-center mb-12 sm:mb-16 md:mb-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs sm:text-sm font-semibold mb-4 sm:mb-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-4 h-4 sm:w-5 h-5" />
            </motion.div>
            Our Expertise
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-4 sm:mb-6 md:mb-8 leading-tight"
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
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-2"
          >
            We deliver comprehensive digital solutions that transform businesses 
            and create exceptional user experiences.
          </motion.p>
        </motion.div>

        {/* Enhanced Services Grid - Mobile First */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 mb-12 sm:mb-16 md:mb-20">
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
              <div className={`relative p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-white border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-auto sm:h-[420px] flex flex-col ${
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
                
                {/* Floating Elements - Hidden on mobile */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
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

                {/* Icon with Advanced Animation - Mobile Optimized */}
                <motion.div
                  className={`inline-flex p-2 sm:p-3 rounded-lg bg-gradient-to-br ${service.color} text-white mb-4 sm:mb-6 relative overflow-hidden self-start`}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <service.icon className="w-5 h-5 sm:w-6 h-6 relative z-10" />
                  
                  {/* Icon Glow Effect */}
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-lg"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={hoveredService === index ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                {/* Content - Mobile Optimized */}
                <div className="flex-1 flex flex-col justify-between space-y-3 sm:space-y-4">
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-gray-800 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                      {service.description}
                    </p>

                    {/* Features with Enhanced Animation - Mobile Layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                      {service.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.5, delay: service.delay + featureIndex * 0.1 }}
                          className="flex items-center text-xs sm:text-sm text-gray-600 group-hover:text-gray-700"
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color} mr-2 flex-shrink-0`}
                          />
                          <span className="truncate">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Stats Section - Mobile Optimized */}
                  <div className="pt-3 sm:pt-4 border-t border-gray-100 mt-auto">
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
                      <div>
                        <div className="text-base sm:text-lg font-bold text-gray-900">{service.stats.satisfaction}%</div>
                        <div className="text-xs text-gray-500">Satisfaction</div>
                      </div>
                      <div>
                        <div className="text-base sm:text-lg font-bold text-gray-900">{service.stats.delivery}</div>
                        <div className="text-xs text-gray-500">Delivery</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Achievement Stats - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative"
        >
          <div className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-white relative overflow-hidden">
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

            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="group"
                >
                  <motion.div
                    className={`inline-flex p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-sm mb-3 sm:mb-4 md:mb-6 ${achievement.color}`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <achievement.icon className="w-5 h-5 sm:w-6 h-6 md:w-8 h-8" />
                  </motion.div>
                  
                  <motion.div
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-1 sm:mb-2 md:mb-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1 + index * 0.1 }}
                  >
                    {achievement.value}
                  </motion.div>
                  
                  <div className="text-white/80 font-medium text-xs sm:text-sm md:text-base">{achievement.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
