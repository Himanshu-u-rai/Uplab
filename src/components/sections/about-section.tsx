'use client'

import { motion } from 'framer-motion'
import { 
  Users, 
  Award, 
  Target, 
  Zap,
  CheckCircle,
  TrendingUp,
  Heart,
  Lightbulb
} from 'lucide-react'

const timeline = [
  {
    year: '2019',
    title: 'Company Founded',
    description: 'Started with a vision to transform digital experiences for businesses worldwide.',
    icon: Lightbulb,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    year: '2020',
    title: 'First Major Milestone',
    description: 'Reached 50+ successful projects and expanded our team to include mobile development specialists.',
    icon: TrendingUp,
    color: 'from-green-500 to-emerald-500'
  },
  {
    year: '2021',
    title: 'Award Recognition',
    description: 'Won "Best Digital Agency" award and launched our SEO and social media services.',
    icon: Award,
    color: 'from-purple-500 to-pink-500'
  },
  {
    year: '2022',
    title: 'Global Expansion',
    description: 'Opened international offices and served clients across 15+ countries.',
    icon: Target,
    color: 'from-orange-500 to-red-500'
  },
  {
    year: '2023',
    title: 'Innovation Leader',
    description: 'Became a certified partner with major tech platforms and launched AI-powered solutions.',
    icon: Zap,
    color: 'from-indigo-500 to-purple-500'
  }
]

const values = [
  {
    icon: Heart,
    title: 'Client-Centric',
    description: 'Your success is our success. We put clients at the heart of everything we do.',
    color: 'from-red-500 to-pink-500'
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'We stay ahead of trends and use cutting-edge technologies to deliver exceptional results.',
    color: 'from-blue-500 to-purple-500'
  },
  {
    icon: CheckCircle,
    title: 'Quality',
    description: 'We maintain the highest standards in every project, ensuring excellence in execution.',
    color: 'from-green-500 to-blue-500'
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We work as an extension of your team, fostering open communication and partnership.',
    color: 'from-orange-500 to-yellow-500'
  }
]

const stats = [
  { number: '500+', label: 'Projects Completed', icon: Target },
  { number: '150+', label: 'Happy Clients', icon: Heart },
  { number: '5+', label: 'Years Experience', icon: Award },
  { number: '24/7', label: 'Support Available', icon: Zap }
]

export default function AboutSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
      
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
            <Users className="w-4 h-4" />
            About Uplab
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Our Story & Mission
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're a passionate team of digital innovators dedicated to helping businesses 
            thrive in the digital age through exceptional web development, mobile apps, and marketing.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-gray-900 to-gray-700 text-white mb-4">
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-16">Our Journey</h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-gradient-to-b from-purple-500 to-pink-500" />
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                      <div className="text-sm font-semibold text-primary mb-2">{item.year}</div>
                      <h4 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                  
                  {/* Icon */}
                  <div className="w-2/12 flex justify-center">
                    <div className={`p-4 rounded-full bg-gradient-to-r ${item.color} shadow-lg`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  {/* Spacer */}
                  <div className="w-5/12" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-16">Our Values</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className={`inline-flex p-6 rounded-3xl bg-gradient-to-r ${value.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
          className="text-center mt-20 p-12 rounded-3xl bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white"
        >
          <h3 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h3>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join the growing list of successful businesses that trust Uplab with their digital transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
              Start Your Project
            </button>
            <button className="px-8 py-4 border border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-colors duration-300">
              Learn More
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
