'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Eye,
  Filter,
  Search,
  Play,
  Star,
  TrendingUp,
  Users,
  Clock,
  Award,
  Zap,
  Globe,
  Smartphone,
  Megaphone
} from 'lucide-react'
import SchemaComponent from '@/components/ui/schema-component'
import { createPortfolioSchema, createBreadcrumbSchema } from '@/lib/schema'

const allProjects = [
  {
    id: 1,
    title: 'FinTech Dashboard',
    category: 'Web Development',
    type: 'web',
    description: 'Advanced financial dashboard with real-time analytics and AI-powered insights for modern investment firms.',
    longDescription: 'A comprehensive financial dashboard built for investment firms that need real-time market data, portfolio analytics, and AI-driven investment insights. Features include interactive charts, risk assessment tools, automated reporting, and multi-currency support.',
    image: '/api/placeholder/800/600',
    technologies: ['Next.js', 'TypeScript', 'D3.js', 'TailwindCSS', 'Python', 'Redis'],
    color: 'from-blue-500 to-cyan-500',
    stats: { views: '2.5M', conversion: '18%', rating: 4.9, users: '15K+' },
    featured: true,
    year: '2024',
    duration: '6 months',
    client: 'Investment Corp',
    liveUrl: 'https://fintech-demo.uplab.agency',
    githubUrl: 'https://github.com/uplab/fintech-dashboard'
  },
  {
    id: 2,
    title: 'E-Commerce Mobile App',
    category: 'Mobile Development',
    type: 'mobile',
    description: 'Revolutionary shopping experience with AR try-on and social commerce features.',
    longDescription: 'Next-generation mobile shopping app featuring augmented reality try-on capabilities, social shopping features, personalized recommendations, and seamless checkout experience. Includes virtual styling assistant and social media integration.',
    image: '/api/placeholder/800/600',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'Stripe', 'ARKit', 'Firebase'],
    color: 'from-[#f7961f] to-[#e07a00]',
    stats: { downloads: '500K+', rating: 4.8, retention: '85%', revenue: '$2.1M' },
    featured: true,
    year: '2024',
    duration: '8 months',
    client: 'Fashion Forward',
    liveUrl: 'https://apps.apple.com/fashionforward',
    githubUrl: null
  },
  {
    id: 3,
    title: 'SaaS Analytics Platform',
    category: 'Web Development',
    type: 'web',
    description: 'Comprehensive analytics platform with machine learning predictions.',
    longDescription: 'Enterprise-grade analytics platform that provides deep insights into user behavior, predictive analytics using machine learning, and comprehensive reporting tools. Features real-time data processing and customizable dashboards.',
    image: '/api/placeholder/800/600',
    technologies: ['React', 'Python', 'TensorFlow', 'PostgreSQL', 'Docker', 'AWS'],
    color: 'from-green-500 to-emerald-500',
    stats: { users: '50K+', accuracy: '94%', uptime: '99.9%', data_points: '1B+' },
    featured: false,
    year: '2024',
    duration: '10 months',
    client: 'DataTech Solutions',
    liveUrl: 'https://analytics.datatech.com',
    githubUrl: 'https://github.com/uplab/analytics-platform'
  },
  {
    id: 4,
    title: 'Digital Marketing Campaign',
    category: 'Digital Marketing',
    type: 'marketing',
    description: 'Multi-platform campaign that achieved 400% ROI with viral social content.',
    longDescription: 'Comprehensive digital marketing campaign spanning multiple platforms including social media, search engines, and display advertising. Created viral content that significantly increased brand awareness and drove exceptional ROI.',
    image: '/api/placeholder/800/600',
    technologies: ['Facebook Ads', 'Google Analytics', 'Creative Suite', 'A/B Testing', 'Hootsuite', 'SEMrush'],
    color: 'from-orange-500 to-red-500',
    stats: { reach: '2M+', engagement: '15%', roi: '400%', conversions: '25K+' },
    featured: true,
    year: '2024',
    duration: '4 months',
    client: 'TechStart Inc',
    liveUrl: 'https://campaign.techstart.com',
    githubUrl: null
  },
  {
    id: 5,
    title: 'Health & Fitness App',
    category: 'Mobile Development',
    type: 'mobile',
    description: 'AI-powered fitness app with personalized workouts and nutrition tracking.',
    longDescription: 'Intelligent health and fitness application that uses AI to create personalized workout plans, track nutrition, monitor health metrics, and provide coaching recommendations. Integrates with wearable devices and health platforms.',
    image: '/api/placeholder/800/600',
    technologies: ['Flutter', 'Firebase', 'TensorFlow Lite', 'Health Kit', 'Google Fit', 'Node.js'],
    color: 'from-cyan-500 to-blue-500',
    stats: { users: '100K+', satisfaction: '96%', retention: '78%', workouts: '500K+' },
    featured: false,
    year: '2024',
    duration: '7 months',
    client: 'FitLife Pro',
    liveUrl: 'https://play.google.com/fitlife',
    githubUrl: 'https://github.com/uplab/fitness-app'
  },
  {
    id: 6,
    title: 'Restaurant Chain Website',
    category: 'Web Development',
    type: 'web',
    description: 'Modern restaurant website with online ordering and location finder.',
    longDescription: 'Complete digital solution for restaurant chain featuring online ordering system, location finder, menu management, customer reviews, and loyalty program integration. Includes management dashboard for multi-location operations.',
    image: '/api/placeholder/800/600',
    technologies: ['Next.js', 'Sanity CMS', 'Stripe', 'Google Maps API', 'Twilio', 'Vercel'],
    color: 'from-amber-500 to-orange-500',
    stats: { orders: '10K+/month', load_time: '1.2s', conversion: '12%', locations: '50+' },
    featured: false,
    year: '2024',
    duration: '5 months',
    client: 'Taste Buds Chain',
    liveUrl: 'https://tastebuds.com',
    githubUrl: null
  },
  {
    id: 7,
    title: 'EdTech Learning Platform',
    category: 'Web Development',
    type: 'web',
    description: 'Interactive online learning platform with live streaming and AI tutoring.',
    longDescription: 'Comprehensive educational technology platform featuring live streaming capabilities, AI-powered tutoring, interactive assignments, progress tracking, and collaborative learning tools. Supports multiple content formats and assessment types.',
    image: '/api/placeholder/800/600',
    technologies: ['React', 'WebRTC', 'Socket.io', 'MySQL', 'Redis', 'FFmpeg'],
    color: 'from-indigo-500 to-[#f7961f]',
    stats: { students: '25K+', courses: '500+', completion: '87%', satisfaction: '4.7/5' },
    featured: true,
    year: '2024',
    duration: '9 months',
    client: 'EduTech Academy',
    liveUrl: 'https://learn.edutech.com',
    githubUrl: 'https://github.com/uplab/edtech-platform'
  },
  {
    id: 8,
    title: 'Real Estate Mobile App',
    category: 'Mobile Development',
    type: 'mobile',
    description: 'Property discovery app with virtual tours and AR visualization.',
    longDescription: 'Advanced real estate application featuring virtual property tours, augmented reality room visualization, mortgage calculator, neighborhood insights, and direct agent communication. Includes advanced search filters and saved searches.',
    image: '/api/placeholder/800/600',
    technologies: ['React Native', 'ARCore', 'ARKit', 'Google Maps', 'Firebase', 'Stripe'],
    color: 'from-teal-500 to-green-500',
    stats: { properties: '50K+', users: '75K+', tours: '200K+', satisfaction: '4.6/5' },
    featured: false,
    year: '2024',
    duration: '6 months',
    client: 'PropertyPro',
    liveUrl: 'https://apps.apple.com/propertypro',
    githubUrl: null
  },
  {
    id: 9,
    title: 'Social Media Management Tool',
    category: 'Digital Marketing',
    type: 'marketing',
    description: 'Comprehensive social media management platform with analytics and automation.',
    longDescription: 'All-in-one social media management platform enabling content scheduling, multi-platform posting, engagement tracking, analytics reporting, and automated responses. Supports all major social media platforms.',
    image: '/api/placeholder/800/600',
    technologies: ['Vue.js', 'Laravel', 'Redis', 'MySQL', 'Social APIs', 'Cron Jobs'],
    color: 'from-[#e07a00] to-rose-500',
    stats: { accounts: '10K+', posts: '1M+', engagement: '23%', time_saved: '15hrs/week' },
    featured: false,
    year: '2024',
    duration: '8 months',
    client: 'SocialPro',
    liveUrl: 'https://socialpro.com',
    githubUrl: 'https://github.com/uplab/social-manager'
  }
]

const categories = [
  { name: 'All Projects', type: 'all', count: allProjects.length, icon: Globe },
  { name: 'Web Development', type: 'web', count: allProjects.filter(p => p.type === 'web').length, icon: Globe },
  { name: 'Mobile Development', type: 'mobile', count: allProjects.filter(p => p.type === 'mobile').length, icon: Smartphone },
  { name: 'Digital Marketing', type: 'marketing', count: allProjects.filter(p => p.type === 'marketing').length, icon: Megaphone },
  { name: 'Featured', type: 'featured', count: allProjects.filter(p => p.featured).length, icon: Star },
]

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  // Generate schema markup
  const portfolioSchema = createPortfolioSchema(
    allProjects.map(project => ({
      title: project.title,
      description: project.description,
      url: project.liveUrl,
      image: project.image,
      technologies: project.technologies,
      datePublished: `${project.year}-01-01`,
      client: project.client
    }))
  )

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: 'https://uplab.dev' },
    { name: 'Projects', url: 'https://uplab.dev/projects' }
  ])

  const filteredProjects = allProjects.filter(project => {
    const matchesCategory = activeCategory === 'all' ||
      project.type === activeCategory ||
      (activeCategory === 'featured' && project.featured)
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <>
      {/* Schema Markup */}
      <SchemaComponent schema={[portfolioSchema, breadcrumbSchema]} id="projects-schema" />

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#242423] to-gray-900">
        {/* Background Effects - Mobile Optimized */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-48 sm:w-96 h-48 sm:h-96 bg-[#f7961f]/5 sm:bg-[#f7961f]/10 rounded-full blur-2xl sm:blur-3xl animate-pulse" />
          <div className="absolute top-1/2 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-[#e07a00]/5 sm:bg-[#e07a00]/10 rounded-full blur-2xl sm:blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-0 left-1/3 w-48 sm:w-96 h-48 sm:h-96 bg-cyan-500/5 sm:bg-cyan-500/10 rounded-full blur-2xl sm:blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-3 sm:opacity-5" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 relative z-10">
          {/* Header - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto mb-6 sm:mb-8 md:mb-12 lg:mb-16"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#f7961f] hover:text-[#ffb347] transition-colors mb-4 sm:mb-6 md:mb-8 text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden xs:inline">Back to Home</span>
              <span className="xs:hidden">Back</span>
            </Link>

            <div className="text-center mb-6 sm:mb-8 md:mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-[#f7961f] to-[#e07a00] rounded-lg xs:rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6"
              >
                <Award className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 text-white" />
              </motion.div>
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 bg-gradient-to-r from-white via-[#ffb347] to-[#ffb347] bg-clip-text text-transparent leading-tight">
                Our Complete
                <br />
                <span className="bg-gradient-to-r from-[#f7961f] to-[#ffb347] bg-clip-text text-transparent">
                  Project Portfolio
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed px-2 sm:px-4">
                Explore our comprehensive collection of successful projects across web development,
                mobile apps, and digital marketing campaigns that have transformed businesses.
              </p>
            </div>

            {/* Stats - Mobile Optimized */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-12">
              {[
                { label: 'Total Projects', value: allProjects.length.toString(), icon: Award },
                { label: 'Happy Clients', value: '50+', icon: Users },
                { label: 'Success Rate', value: '98%', icon: TrendingUp },
                { label: 'Avg. Rating', value: '4.8/5', icon: Star }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="bg-white/5 backdrop-blur-xl rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-white/10 text-center"
                >
                  <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#f7961f] mx-auto mb-1 sm:mb-2" />
                  <div className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Filters and Search - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-6xl mx-auto mb-6 sm:mb-8 md:mb-12"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 border border-white/10">
              {/* Search - Mobile Optimized */}
              <div className="relative mb-3 sm:mb-4 md:mb-6">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:border-[#f7961f] focus:ring-2 focus:ring-[#f7961f]/20 transition-all text-sm sm:text-base"
                />
              </div>

              {/* Categories - Mobile Optimized */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {categories.map((category) => (
                  <button
                    key={category.type}
                    onClick={() => setActiveCategory(category.type)}
                    className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 text-xs sm:text-sm ${activeCategory === category.type
                        ? 'bg-gradient-to-r from-[#f7961f] to-[#e07a00] text-white shadow-lg'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                  >
                    <category.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">{category.name}</span>
                    <span className="xs:hidden">{category.name.split(' ')[0]}</span>
                    <span className="bg-white/20 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Projects Grid - Mobile Optimized */}
          <motion.div
            ref={sectionRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden hover:border-[#f7961f]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#f7961f]/10">
                    {/* Project Image - Mobile Optimized */}
                    <div className="relative h-40 sm:h-48 overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-80`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      {project.featured && (
                        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                          <Star className="w-2.5 h-2.5 sm:w-3 h-3" />
                          Featured
                        </div>
                      )}
                      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 text-white text-xs sm:text-sm bg-black/30 backdrop-blur-sm px-2 py-1 rounded-lg">
                        {project.year}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex gap-2 sm:gap-3">
                          {project.liveUrl && (
                            <button className="p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                              <ExternalLink className="w-4 h-4 sm:w-5 h-5" />
                            </button>
                          )}
                          {project.githubUrl && (
                            <button className="p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                              <Github className="w-4 h-4 sm:w-5 h-5" />
                            </button>
                          )}
                          <button
                            onClick={() => setSelectedProject(project.id)}
                            className="p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                          >
                            <Eye className="w-4 h-4 sm:w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Project Content - Mobile Optimized */}
                    <div className="p-4 sm:p-6">
                      <div className="flex items-center gap-2 mb-2 sm:mb-3">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium bg-gradient-to-r ${project.color} text-white`}>
                          {project.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <Clock className="w-3 h-3" />
                          {project.duration}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-[#ffb347] transition-colors leading-tight">
                        {project.title}
                      </h3>

                      <p className="text-gray-300 text-sm mb-3 sm:mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Technologies - Mobile Optimized */}
                      <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-white/10 text-gray-300 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-white/10 text-gray-300 rounded text-xs">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Stats - Mobile Optimized */}
                      <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs">
                        {Object.entries(project.stats).slice(0, 2).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="text-white font-semibold text-sm">{value}</div>
                            <div className="text-gray-400 capitalize">{key.replace('_', ' ')}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-8 sm:py-12">
                <div className="text-gray-400 text-base sm:text-lg mb-4">No projects found matching your criteria</div>
                <button
                  onClick={() => {
                    setActiveCategory('all')
                    setSearchTerm('')
                  }}
                  className="text-[#f7961f] hover:text-[#ffb347] transition-colors text-sm sm:text-base"
                >
                  Clear filters
                </button>
              </div>
            )}
          </motion.div>

          {/* Call to Action - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-center mt-12 sm:mt-16 md:mt-20"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-white/10 max-w-4xl mx-auto">
              <Zap className="w-8 h-8 sm:w-10 h-10 md:w-12 h-12 text-[#f7961f] mx-auto mb-4 sm:mb-6" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
                Ready to Start Your Project?
              </h2>
              <p className="text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg">
                Let's create something amazing together. Get in touch to discuss your next digital project.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#f7961f] to-[#e07a00] hover:from-[#f7961f] hover:to-[#e07a00] text-white font-semibold rounded-lg sm:rounded-xl transition-all duration-300 hover:shadow-lg text-sm sm:text-base"
              >
                Start Your Project
                <ExternalLink className="w-4 h-4 sm:w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

