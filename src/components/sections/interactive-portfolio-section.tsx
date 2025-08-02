'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { ExternalLink, Github, Eye, Filter, Search, Play, Clock, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

const projects = [
  {
    id: 1,
    title: 'FinTech Dashboard',
    category: 'Web Development',
    type: 'web',
    description: 'Advanced financial dashboard with real-time analytics and AI-powered insights.',
    image: '/api/placeholder/600/400',
    technologies: ['Next.js', 'TypeScript', 'D3.js', 'TailwindCSS'],
    color: 'from-blue-500 to-cyan-500',
    stats: { views: '2.5M', conversion: '18%', rating: 4.9 },
    featured: true,
  },
  {
    id: 2,
    title: 'E-Commerce Mobile App',
    category: 'Mobile Development',
    type: 'mobile',
    description: 'Revolutionary shopping experience with AR try-on and social commerce features.',
    image: '/api/placeholder/600/400',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'Stripe'],
    color: 'from-purple-500 to-pink-500',
    stats: { downloads: '500K+', rating: 4.8, retention: '85%' },
    featured: true,
  },
  {
    id: 3,
    title: 'SaaS Analytics Platform',
    category: 'Web Development',
    type: 'web',
    description: 'Comprehensive analytics platform with machine learning predictions.',
    image: '/api/placeholder/600/400',
    technologies: ['React', 'Python', 'TensorFlow', 'PostgreSQL'],
    color: 'from-green-500 to-emerald-500',
    stats: { users: '50K+', accuracy: '94%', uptime: '99.9%' },
    featured: false,
  },
  {
    id: 4,
    title: 'Digital Marketing Campaign',
    category: 'Digital Marketing',
    type: 'marketing',
    description: 'Multi-platform campaign that achieved 400% ROI with viral social content.',
    image: '/api/placeholder/600/400',
    technologies: ['Facebook Ads', 'Google Analytics', 'Creative Suite', 'A/B Testing'],
    color: 'from-orange-500 to-red-500',
    stats: { reach: '2M+', engagement: '15%', roi: '400%' },
    featured: true,
  },
  {
    id: 5,
    title: 'Health & Fitness App',
    category: 'Mobile Development',
    type: 'mobile',
    description: 'AI-powered fitness app with personalized workouts and nutrition tracking.',
    image: '/api/placeholder/600/400',
    technologies: ['Flutter', 'Firebase', 'TensorFlow Lite', 'Health Kit'],
    color: 'from-cyan-500 to-blue-500',
    stats: { users: '100K+', satisfaction: '96%', retention: '78%' },
    featured: false,
  },
  {
    id: 6,
    title: 'Restaurant Chain Website',
    category: 'Web Development',
    type: 'web',
    description: 'Modern restaurant website with online ordering and location finder.',
    image: '/api/placeholder/600/400',
    technologies: ['Next.js', 'Sanity CMS', 'Stripe', 'Google Maps API'],
    color: 'from-amber-500 to-orange-500',
    stats: { orders: '10K+/month', load_time: '1.2s', conversion: '12%' },
    featured: false,
  }
]

const categories = [
  { name: 'All', type: 'all', count: projects.length },
  { name: 'Web Development', type: 'web', count: projects.filter(p => p.type === 'web').length },
  { name: 'Mobile Development', type: 'mobile', count: projects.filter(p => p.type === 'mobile').length },
  { name: 'Digital Marketing', type: 'marketing', count: projects.filter(p => p.type === 'marketing').length },
  { name: 'Featured', type: 'featured', count: projects.filter(p => p.featured).length },
]

export default function InteractivePortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const filteredProjects = projects.filter(project => {
    const matchesCategory = activeCategory === 'all' || 
                           project.type === activeCategory || 
                           (activeCategory === 'featured' && project.featured)
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <section ref={sectionRef} id="portfolio" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements - Mobile Optimized */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-purple-500/5 rounded-full blur-2xl sm:blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-blue-500/5 rounded-full blur-2xl sm:blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] bg-gradient-radial from-purple-100/20 to-transparent rounded-full" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Section Header - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs sm:text-sm font-semibold mb-4 sm:mb-6"
          >
            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="block">Our Portfolio</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 mb-6 sm:mb-8 leading-tight"
          >
            <span className="block">Work That</span>
            <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent">
              Speaks Volumes
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed px-2 sm:px-4"
          >
            Explore our latest projects and see how we've helped businesses 
            achieve extraordinary digital transformation.
          </motion.p>
        </motion.div>

        {/* Enhanced Filter & Search Section - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8 sm:mb-12 md:mb-16 px-2 sm:px-4"
        >
          {/* Search Bar - Mobile Optimized */}
          <div className="relative max-w-sm sm:max-w-md mx-auto mb-4 sm:mb-6 md:mb-8">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 z-10" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base shadow-sm"
            />
          </div>

          {/* Category Filter - Mobile Optimized */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((category, index) => (
              <motion.button
                key={category.type}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                onClick={() => setActiveCategory(category.type)}
                className={`group relative px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl md:rounded-2xl font-medium sm:font-semibold transition-all duration-300 text-xs sm:text-sm md:text-base ${
                  activeCategory === category.type
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white/80 backdrop-blur-xl border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                  <span className="hidden xs:inline">{category.name}</span>
                  <span className="xs:hidden">{category.name.split(' ')[0]}</span>
                  <span className={`text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ${
                    activeCategory === category.type
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {category.count}
                  </span>
                </span>
                
                {activeCategory === category.type && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Projects - Mobile Carousel + Desktop Grid */}
        <div className="mb-16 sm:mb-20">
          {/* Mobile Horizontal Carousel */}
          <div className="block lg:hidden">
            <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide px-4">
              <AnimatePresence>
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onHoverStart={() => setHoveredProject(project.id)}
                    onHoverEnd={() => setHoveredProject(null)}
                    className="group cursor-pointer flex-shrink-0 w-[calc(100vw-4rem)] max-w-sm snap-center"
                  >
                    <div className="relative rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 h-[320px]">
                      {/* Featured Badge */}
                      {project.featured && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute top-3 left-3 z-20 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full"
                        >
                          ⭐ Featured
                        </motion.div>
                      )}

                      {/* Project Image/Preview */}
                      <div className="relative h-40 overflow-hidden">
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-90`}
                          animate={{
                            scale: hoveredProject === project.id ? 1.1 : 1,
                          }}
                          transition={{ duration: 0.5 }}
                        />
                        
                        {/* Animated Background Pattern */}
                        <div className="absolute inset-0 opacity-20">
                          {[...Array(6)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-1.5 h-1.5 bg-white rounded-full"
                              style={{
                                left: `${(i % 3) * 30 + 15}%`,
                                top: `${Math.floor(i / 3) * 40 + 20}%`,
                              }}
                              animate={{
                                y: [-3, -8, -3],
                                opacity: [0.3, 1, 0.3],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.2,
                              }}
                            />
                          ))}
                        </div>

                        {/* Project Info Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center text-white text-center p-4">
                          <div>
                            <motion.h3
                              className="text-lg font-bold mb-1"
                              animate={{
                                y: hoveredProject === project.id ? -5 : 0,
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              {project.title}
                            </motion.h3>
                            <motion.p
                              className="text-xs opacity-90"
                              animate={{
                                y: hoveredProject === project.id ? -5 : 0,
                              }}
                              transition={{ duration: 0.3, delay: 0.1 }}
                            >
                              {project.category}
                            </motion.p>
                          </div>
                        </div>

                        {/* Hover Overlay */}
                        <motion.div
                          className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={false}
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1 }}
                            className="bg-white/20 backdrop-blur-sm rounded-full p-3"
                          >
                            <Eye className="w-5 h-5 text-white" />
                          </motion.div>
                        </motion.div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <div className="mb-3">
                          <h4 className="font-semibold text-gray-900 mb-1 text-sm line-clamp-1">{project.title}</h4>
                          <p className="text-gray-600 text-xs line-clamp-2">{project.description}</p>
                        </div>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {project.technologies.slice(0, 3).map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-full text-xs">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>

                        {/* Stats */}
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            6 months
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current text-yellow-400" />
                            {project.stats.rating || '4.9'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {/* Mobile Scroll Indicator */}
            <div className="flex justify-center mt-6 px-4">
              <div className="flex gap-2">
                {filteredProjects.slice(0, 5).map((_, index) => (
                  <div key={index} className="w-2 h-2 rounded-full bg-gray-300"></div>
                ))}
                {filteredProjects.length > 5 && (
                  <div className="text-xs text-gray-500 ml-2">+{filteredProjects.length - 5}</div>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onHoverStart={() => setHoveredProject(project.id)}
                  onHoverEnd={() => setHoveredProject(null)}
                  className="group cursor-pointer"
                >
                  <div className="relative rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500">
                  {/* Featured Badge */}
                  {project.featured && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute top-4 left-4 z-20 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full"
                    >
                      ⭐ Featured
                    </motion.div>
                  )}

                  {/* Project Image/Preview */}
                  <div className="relative h-64 overflow-hidden">
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-90`}
                      animate={{
                        scale: hoveredProject === project.id ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.5 }}
                    />
                    
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-20">
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-white rounded-full"
                          style={{
                            left: `${(i % 4) * 25 + 10}%`,
                            top: `${Math.floor(i / 4) * 25 + 10}%`,
                          }}
                          animate={{
                            y: [-5, -15, -5],
                            opacity: [0.3, 1, 0.3],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>

                    {/* Project Info Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center text-white text-center p-6">
                      <div>
                        <motion.h3
                          className="text-2xl font-bold mb-2"
                          animate={{
                            y: hoveredProject === project.id ? -10 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {project.title}
                        </motion.h3>
                        <motion.p
                          className="text-sm opacity-90"
                          animate={{
                            y: hoveredProject === project.id ? -10 : 0,
                          }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          {project.category}
                        </motion.p>
                      </div>
                    </div>
                    
                    {/* Hover Action Buttons */}
                    <motion.div
                      className="absolute inset-0 bg-black/50 flex items-center justify-center gap-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                      >
                        <Play className="w-5 h-5" />
                      </motion.button>
                    </motion.div>
                  </div>

                  {/* Project Details */}
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold text-purple-600">{project.category}</span>
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${project.color}`} />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={techIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: techIndex * 0.1 }}
                          className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    {/* Project Stats */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                      {Object.entries(project.stats).map(([key, value], statIndex) => (
                        <div key={key} className="text-center">
                          <div className="text-lg font-bold text-gray-900">{value}</div>
                          <div className="text-xs text-gray-500 capitalize">{key.replace('_', ' ')}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          </div>
        </div>

        {/* Load More Section - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center px-4"
        >
          <Link href="/projects">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group w-full sm:w-auto max-w-sm sm:max-w-none mx-auto"
            >
              <span>View All Projects</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="ml-2 sm:ml-3"
              >
                <ExternalLink className="w-4 h-4 sm:w-5 h-5" />
              </motion.div>
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
