'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Star, Quote, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { getImagePath } from '@/lib/image-utils'
import SchemaComponent from '@/components/ui/schema-component'
import { createReviewSchema } from '@/lib/schema'

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'CEO & Founder',
    company: 'StyleVogue Fashion',
    avatar: getImagePath('testimonials', 'female.png'),
    rating: 5,
    text: 'Uplab completely transformed our fashion e-commerce platform. Their understanding of Indian market dynamics and modern UI/UX design helped us achieve 400% growth in online sales within 6 months.',
    highlight: '400% Sales Growth',
    color: 'from-[#f7961f] to-[#e07a00]',
  },
  {
    id: 2,
    name: 'Arjun Mehta',
    role: 'Founder & CTO',
    company: 'FoodieExpress',
    avatar: getImagePath('testimonials', 'male.png'),
    rating: 5,
    text: 'Working with Uplab was an incredible experience. They developed our food delivery app with amazing attention to detail. The app now serves over 200,000+ users across 15+ cities.',
    highlight: '200K+ Users',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    id: 3,
    name: 'Rohit Agarwal',
    role: 'Co-founder',
    company: 'FinSecure Banking',
    avatar: getImagePath('testimonials', 'male.png'),
    rating: 5,
    text: 'Uplab built our secure banking platform with exceptional attention to security and compliance. Their expertise in fintech development helped us launch successfully with 99.9% uptime.',
    highlight: '99.9% Uptime',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    id: 4,
    name: 'Sneha Reddy',
    role: 'Brand Director',
    company: 'Heritage Crafts Studio',
    avatar: getImagePath('testimonials', 'female.png'),
    rating: 5,
    text: 'The website Uplab created for our traditional crafts business perfectly blends our cultural heritage with modern design. It beautifully showcases our artisan work.',
    highlight: '250% More Orders',
    color: 'from-amber-500 to-orange-500',
  },
]

export default function EnhancedTestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const reviewsSchema = createReviewSchema(
    testimonials.map(testimonial => ({
      author: testimonial.name,
      rating: testimonial.rating,
      reviewBody: testimonial.text,
      datePublished: '2024-01-01'
    }))
  )

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <>
      <SchemaComponent schema={reviewsSchema} id="testimonials-schema" />

      <section ref={sectionRef} className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-[#242423] via-[#2d2d2c] to-[#242423] relative overflow-hidden">
        {/* Subtle Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(247,150,31,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(247,150,31,0.05),transparent_50%)]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f7961f]/10 text-[#f7961f] text-sm font-semibold mb-4"
            >
              <Star className="w-4 h-4 fill-current" />
              Testimonials
            </motion.span>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Trusted by{' '}
              <span className="bg-gradient-to-r from-[#f7961f] to-[#ffb347] bg-clip-text text-transparent">
                Businesses
              </span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              See what our clients say about working with Uplab.
            </p>
          </motion.div>

          {/* Desktop Grid Layout */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-6 mb-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#f7961f]/40 transition-all duration-300"
              >
                {/* Highlight Badge */}
                <div className={`absolute -top-3 right-6 px-4 py-1.5 rounded-full bg-gradient-to-r ${testimonial.color} text-white text-xs font-bold shadow-lg`}>
                  {testimonial.highlight}
                </div>

                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-12 h-12 text-[#f7961f]" />
                </div>

                {/* Content */}
                <div className="relative">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 line-clamp-4">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.color} p-0.5 shadow-md`}>
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="w-full h-full rounded-full object-cover bg-white"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                      <p className="text-xs text-[#f7961f] font-medium">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="lg:hidden">
            <div className="relative">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 relative overflow-hidden"
              >
                {/* Highlight Badge */}
                <div className={`absolute -top-0.5 right-4 px-3 py-1 rounded-b-lg bg-gradient-to-r ${testimonials[activeIndex].color} text-white text-xs font-bold`}>
                  {testimonials[activeIndex].highlight}
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4 mt-2">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  "{testimonials[activeIndex].text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${testimonials[activeIndex].color} p-0.5`}>
                    <Image
                      src={testimonials[activeIndex].avatar}
                      alt={testimonials[activeIndex].name}
                      width={44}
                      height={44}
                      className="w-full h-full rounded-full object-cover bg-white"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">{testimonials[activeIndex].name}</h4>
                    <p className="text-xs text-gray-400">{testimonials[activeIndex].role}</p>
                    <p className="text-xs text-[#f7961f] font-medium">{testimonials[activeIndex].company}</p>
                  </div>
                </div>
              </motion.div>

              {/* Mobile Navigation */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={prevTestimonial}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#f7961f]/20 flex items-center justify-center text-white hover:text-[#f7961f] transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex
                        ? 'w-6 bg-[#f7961f]'
                        : 'w-2 bg-white/30 hover:bg-white/50'
                        }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextTestimonial}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#f7961f]/20 flex items-center justify-center text-white hover:text-[#f7961f] transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#f7961f] to-[#e07a00] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#f7961f]/25 transition-all duration-300 group"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Start Your Success Story
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
}
