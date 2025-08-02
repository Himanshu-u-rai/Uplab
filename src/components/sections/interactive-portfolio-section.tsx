'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { ExternalLink, Github, Eye, Filter, Search, Play } from 'lucide-react'
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
    <section ref={sectionRef} className="py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-purple-100/20 to-transparent rounded-full" />
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
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm font-semibold mb-6"
          >
            <Eye className="w-5 h-5" />
            Our Portfolio
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight"
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
            className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            Explore our latest projects and see how we've helped businesses 
            achieve extraordinary digital transformation.
          </motion.p>
        </motion.div>

        {/* Enhanced Filter & Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search projects, technologies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <motion.button
                key={category.type}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                onClick={() => setActiveCategory(category.type)}
                className={`group relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  activeCategory === category.type
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white/80 backdrop-blur-xl border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {category.name}
                  <span className={`text-xs px-2 py-1 rounded-full ${
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

        {/* Enhanced Projects Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          <AnimatePresence mode="wait">
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

        {/* Load More Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center"
        >
          <Link href="/projects">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <span>View All Projects</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="ml-3"
              >
                <ExternalLink className="w-5 h-5" />
              </motion.div>
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
