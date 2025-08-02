'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description: 'A modern e-commerce platform with advanced features and seamless user experience.',
    image: '/api/placeholder/600/400',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind'],
    color: 'from-blue-500 to-purple-500',
  },
  {
    id: 2,
    title: 'Mobile Banking App',
    category: 'Mobile Development',
    description: 'Secure and intuitive mobile banking application with real-time transactions.',
    image: '/api/placeholder/600/400',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'Stripe'],
    color: 'from-green-500 to-blue-500',
  },
  {
    id: 3,
    title: 'SaaS Dashboard',
    category: 'Web Development',
    description: 'Comprehensive dashboard for SaaS platform with analytics and user management.',
    image: '/api/placeholder/600/400',
    technologies: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 4,
    title: 'Social Media Campaign',
    category: 'Digital Marketing',
    description: 'Multi-platform social media campaign that increased engagement by 400%.',
    image: '/api/placeholder/600/400',
    technologies: ['Facebook Ads', 'Instagram', 'Analytics', 'Creative Design'],
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 5,
    title: 'Fitness Tracking App',
    category: 'Mobile Development',
    description: 'Cross-platform fitness app with real-time tracking and social features.',
    image: '/api/placeholder/600/400',
    technologies: ['Flutter', 'Firebase', 'Machine Learning', 'Apple Health'],
    color: 'from-cyan-500 to-blue-500',
  },
  {
    id: 6,
    title: 'Restaurant Website',
    category: 'Web Development',
    description: 'Modern restaurant website with online ordering and reservation system.',
    image: '/api/placeholder/600/400',
    technologies: ['Next.js', 'Sanity CMS', 'Stripe', 'Google Maps'],
    color: 'from-amber-500 to-orange-500',
  }
]

const categories = ['All', 'Web Development', 'Mobile Development', 'Digital Marketing']

export default function PortfolioSection() {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Eye className="w-4 h-4" />
            Our Portfolio
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our latest work and see how we've helped businesses achieve their digital goals.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={index === 0 ? "default" : "outline"}
              className={`rounded-full px-6 py-2 font-medium transition-all duration-300 ${
                index === 0 
                  ? "bg-gray-900 text-white hover:bg-gray-800" 
                  : "border-gray-300 text-gray-600 hover:bg-gray-900 hover:text-white hover:border-gray-900"
              }`}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-90`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center p-6">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-sm opacity-90">{project.category}</p>
                    </div>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-3">
                      <Button size="sm" className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-primary">{project.category}</span>
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${project.color}`} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button 
            size="lg"
            className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            View All Projects
            <ExternalLink className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
