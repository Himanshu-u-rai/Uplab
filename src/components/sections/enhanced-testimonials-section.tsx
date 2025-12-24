'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Star, Quote, ArrowRight, Terminal, UserCheck, ShieldCheck, Zap, Activity } from 'lucide-react'
import Image from 'next/image'
import { getImagePath } from '@/lib/image-utils'
import SchemaComponent from '@/components/ui/schema-component'
import { createReviewSchema } from '@/lib/schema'

const testimonials = [
  {
    id: 'USR_8422',
    name: 'Priya Sharma',
    role: 'CEO & Founder',
    company: 'StyleVogue Fashion',
    avatar: getImagePath('testimonials', 'female.png'),
    rating: 5,
    text: 'Uplab completely transformed our fashion e-commerce platform. Their understanding of Indian market dynamics and modern UI/UX design helped us achieve 400% growth in online sales within 6 months.',
    highlight: 'Performance: 4.2x',
    metric: 'Conversion Rate',
    token: 'SH-992-AZ',
    delay: 0.1
  },
  {
    id: 'USR_2911',
    name: 'Arjun Mehta',
    role: 'Founder & CTO',
    company: 'FoodieExpress',
    avatar: getImagePath('testimonials', 'male.png'),
    rating: 5,
    text: 'Working with Uplab was an incredible experience. They developed our food delivery app with amazing attention to detail. The app now serves over 200,000+ users across 15+ cities.',
    highlight: 'Scalability: Solid',
    metric: '200K+ Concurrent Users',
    token: 'AM-441-FE',
    delay: 0.2
  },
  {
    id: 'USR_4550',
    name: 'Rohit Agarwal',
    role: 'Co-founder',
    company: 'FinSecure Banking',
    avatar: getImagePath('testimonials', 'male.png'),
    rating: 5,
    text: 'Uplab built our secure banking platform with exceptional attention to security and compliance. Their expertise in fintech development helped us launch successfully with 99.9% uptime.',
    highlight: 'Uptime: 99.99%',
    metric: 'Zero-Security Breach',
    token: 'RA-005-FS',
    delay: 0.3
  },
  {
    id: 'USR_1209',
    name: 'Sneha Reddy',
    role: 'Brand Director',
    company: 'Heritage Crafts Studio',
    avatar: getImagePath('testimonials', 'female.png'),
    rating: 5,
    text: 'The website Uplab created for our traditional crafts business perfectly blends our cultural heritage with modern design. It beautifully showcases our artisan work.',
    highlight: 'CTR: +250%',
    metric: 'Engagement Growth',
    token: 'SR-882-HC',
    delay: 0.4
  },
]

export default function EnhancedTestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  // Auto-scroll logic for mobile
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPaused])

  const reviewsSchema = createReviewSchema(
    testimonials.map(testimonial => ({
      author: testimonial.name,
      rating: testimonial.rating,
      reviewBody: testimonial.text,
      datePublished: '2024-01-01'
    }))
  )

  return (
    <>
      <SchemaComponent schema={reviewsSchema} id="testimonials-schema" />

      <section ref={sectionRef} id="testimonials" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
        {/* Technical Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(247,150,31,0.05),transparent_60%)]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="max-w-4xl mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
            >
              <Activity className="w-3 h-3 text-[#f7961f]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/50">Client Validation Logs</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight"
            >
              Engineered for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f7961f] to-[#ffb347]">
                Maximum Impact
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-white/40 text-lg md:text-xl max-w-2xl font-light"
            >
              Real-world feedback from the engineering leads and founders we've partnered with to build the future.
            </motion.p>
          </div>

          {/* Testimonials Display: Carousel on mobile, Grid on desktop */}
          <div
            className="mb-20 relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            {/* Mobile Carousel */}
            <div className="md:hidden overflow-hidden touch-pan-y">
              <motion.div
                className="flex"
                animate={{ x: `-${currentIndex * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                drag="x"
                dragConstraints={{ right: 0, left: -(testimonials.length - 1) * 300 }}
                onDragEnd={(_, info) => {
                  const swipeThreshold = 50
                  if (info.offset.x < -swipeThreshold && currentIndex < testimonials.length - 1) {
                    setCurrentIndex(currentIndex + 1)
                  } else if (info.offset.x > swipeThreshold && currentIndex > 0) {
                    setCurrentIndex(currentIndex - 1)
                  }
                }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-2">
                    <TestimonialCard testimonial={testimonial} isInView={isInView} />
                  </div>
                ))}
              </motion.div>

              {/* Carousel Indicators */}
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${currentIndex === i ? 'bg-[#f7961f] w-6' : 'bg-white/10'
                      }`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} isInView={isInView} />
              ))}
            </div>
          </div>

          {/* Success Story CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="flex items-center gap-4 py-3 px-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0a0a0a] bg-gray-800" />
                ))}
              </div>
              <span className="text-sm text-white/60 font-medium">Join 250+ successful founders</span>
            </div>

            <a
              href="#contact"
              className="px-10 py-4 bg-white text-black font-black rounded-full hover:bg-[#f7961f] hover:text-white transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)] group"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <div className="flex items-center gap-2">
                <span>Engage Engineering Team</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          </motion.div>
        </div>

        {/* Animated Scanline Effect */}
        <motion.div
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute left-0 right-0 h-[100px] bg-gradient-to-b from-transparent via-[#f7961f]/5 to-transparent pointer-events-none"
        />
      </section>
    </>
  )
}

function TestimonialCard({ testimonial, isInView }: { testimonial: any, isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: testimonial.delay }}
      className="group relative h-full"
    >
      <div className="relative h-full bg-[#0f0f0f] border border-white/5 rounded-2xl overflow-hidden transition-all duration-500 hover:border-[#f7961f]/20">
        {/* Window Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/5" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/5" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/5" />
            </div>
            <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">{testimonial.id}</span>
          </div>
          <div className="flex items-center gap-2">
            <UserCheck className="w-3 h-3 text-[#f7961f]" />
            <span className="text-[9px] font-bold text-white/40 uppercase tracking-tighter">Verified Client</span>
          </div>
        </div>

        <div className="p-8 pb-6">
          {/* Ranking Metadata */}
          <div className="flex items-center gap-6 mb-8 text-[10px] font-mono">
            <div className="flex items-center gap-2">
              <span className="text-white/20">TOKEN:</span>
              <span className="text-[#f7961f] font-bold">{testimonial.token}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white/20">STATUS:</span>
              <span className="text-green-500 font-bold uppercase">Success</span>
            </div>
          </div>

          {/* Testimonial Quote */}
          <div className="relative mb-8">
            <Quote className="absolute -top-4 -left-4 w-8 h-8 text-white/5 group-hover:text-[#f7961f]/10 transition-colors" />
            <p className="relative text-white/70 text-base leading-relaxed italic">
              "{testimonial.text}"
            </p>
          </div>

          {/* Performance Widget */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 mb-8 flex items-center justify-between group-hover:bg-[#f7961f]/5 transition-colors">
            <div className="flex items-center gap-3">
              <Zap className="w-4 h-4 text-[#f7961f]" />
              <div>
                <div className="text-[10px] uppercase text-white/20 font-bold tracking-widest">{testimonial.metric}</div>
                <div className="text-sm font-mono text-white font-bold">{testimonial.highlight}</div>
              </div>
            </div>
            <ShieldCheck className="w-5 h-5 text-white/10" />
          </div>

          {/* Author Section */}
          <div className="pt-6 border-t border-white/5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-[#f7961f]/20 bg-black p-0.5">
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                width={48}
                height={48}
                className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div>
              <h4 className="font-bold text-white leading-tight">{testimonial.name}</h4>
              <div className="flex items-center gap-2 text-xs text-white/40">
                <span>{testimonial.role}</span>
                <span className="w-1 h-1 rounded-full bg-[#f7961f]" />
                <span className="text-[#f7961f]">{testimonial.company}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Marker */}
        <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#f7961f] to-transparent w-full opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.div>
  )
}
