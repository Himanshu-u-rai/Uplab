'use client'

import { motion } from 'framer-motion'
import { 
  Code, 
  Smartphone, 
  Search, 
  Megaphone,
  ArrowRight,
  Zap,
  Target,
  Palette
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Custom websites and web applications built with modern technologies for optimal performance and user experience.',
    features: ['Responsive Design', 'Modern Frameworks', 'Performance Optimized', 'SEO Ready'],
    color: 'from-blue-500 to-cyan-500',
    delay: 0.1
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications that engage users and drive business growth.',
    features: ['iOS & Android', 'Cross-Platform', 'Native Performance', 'App Store Ready'],
    color: 'from-purple-500 to-pink-500',
    delay: 0.2
  },
  {
    icon: Search,
    title: 'SEO Optimization',
    description: 'Comprehensive SEO strategies to improve your search rankings and drive organic traffic.',
    features: ['Keyword Research', 'On-Page SEO', 'Technical SEO', 'Analytics & Reporting'],
    color: 'from-green-500 to-emerald-500',
    delay: 0.3
  },
  {
    icon: Megaphone,
    title: 'Social Media Advertising',
    description: 'Targeted social media campaigns that convert followers into customers and boost brand awareness.',
    features: ['Facebook Ads', 'Instagram Marketing', 'Google Ads', 'Campaign Analytics'],
    color: 'from-orange-500 to-red-500',
    delay: 0.4
  }
]

const stats = [
  { icon: Zap, value: '99%', label: 'Performance Score' },
  { icon: Target, value: '300%', label: 'ROI Increase' },
  { icon: Palette, value: '50+', label: 'Design Awards' }
]

export default function ServicesSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white" />
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/dots.svg')] opacity-20" />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            Our Services
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            What We Do Best
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive digital solutions to help your business thrive in the modern digital landscape.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: service.delay }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                {/* Card Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`} />
                
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-500">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color} mr-3`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button 
                  variant="ghost" 
                  className="group-hover:bg-gray-50 p-0 h-auto font-semibold text-gray-700 hover:text-gray-900"
                >
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 p-8 rounded-3xl bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex p-4 rounded-2xl bg-white/10 backdrop-blur-sm mb-4">
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-white/80">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
