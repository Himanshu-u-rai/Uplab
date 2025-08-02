'use client'

import { motion } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'CEO & Founder',
    company: 'StyleVogue Fashion',
    content: 'Uplab completely transformed our fashion e-commerce platform. Their understanding of Indian market dynamics and modern design helped us achieve 400% growth in online sales.',
    rating: 5,
    avatar: '👩‍💼',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 2,
    name: 'Arjun Mehta',
    role: 'Founder & CTO',
    company: 'FoodieExpress',
    content: 'The mobile app they developed for our food delivery service exceeded all expectations. Now serving 200,000+ users across 15+ cities with 4.8 star rating.',
    rating: 5,
    avatar: '👨‍💻',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 3,
    name: 'Kavya Patel',
    role: 'Marketing Head',
    company: 'EduTech Solutions',
    content: 'Their digital marketing campaigns have been game-changing for our EdTech platform. We\'ve seen a 500% increase in qualified leads and amazing ROI across all campaigns.',
    rating: 5,
    avatar: '👩‍🎨',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 4,
    name: 'Rohit Agarwal',
    role: 'Co-founder',
    company: 'FinSecure Banking',
    content: 'Professional, secure, and results-driven. Uplab helped us build a robust banking platform that handles 100K+ secure transactions with 99.9% uptime.',
    rating: 5,
    avatar: '👨‍💼',
    color: 'from-orange-500 to-red-500'
  }
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      
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
            <Star className="w-4 h-4" />
            Testimonials
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients have to say about working with Uplab.
          </p>
        </motion.div>

        {/* Main Testimonial Display */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="relative">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8 z-10">
              <div className={`p-4 rounded-2xl bg-gradient-to-r ${testimonials[currentIndex].color} shadow-lg`}>
                <Quote className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Testimonial Card */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 pt-16">
              <div className="text-center">
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 font-medium">
                  "{testimonials[currentIndex].content}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-center gap-4">
                  <div className={`w-16 h-16 rounded-full  bg-gradient-to-r ${testimonials[currentIndex].color} flex items-center justify-center text-2xl`}>
                    {testimonials[currentIndex].avatar}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-gray-900 text-lg">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-gray-600">
                      {testimonials[currentIndex].role}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonials[currentIndex].company}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full border-gray-300 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full border-gray-300 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Testimonial Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`cursor-pointer transition-all duration-300 ${
                index === currentIndex ? 'opacity-100 scale-105' : 'opacity-60 hover:opacity-80'
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <div className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                index === currentIndex 
                  ? `border-transparent bg-gradient-to-r ${testimonial.color} text-white` 
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                    index === currentIndex ? 'bg-white/20' : `bg-gradient-to-r ${testimonial.color}`
                  }`}>
                    <span className={index === currentIndex ? 'text-white' : 'text-white'}>
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <div className={`font-semibold text-sm ${
                      index === currentIndex ? 'text-white' : 'text-gray-900'
                    }`}>
                      {testimonial.name}
                    </div>
                    <div className={`text-xs ${
                      index === currentIndex ? 'text-white/80' : 'text-gray-600'
                    }`}>
                      {testimonial.company}
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${
                      index === currentIndex ? 'fill-white text-white' : 'fill-yellow-400 text-yellow-400'
                    }`} />
                  ))}
                </div>
                <p className={`text-sm leading-relaxed ${
                  index === currentIndex ? 'text-white/90' : 'text-gray-600'
                }`}>
                  {testimonial.content.substring(0, 100)}...
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
