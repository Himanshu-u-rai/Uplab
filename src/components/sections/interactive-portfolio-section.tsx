'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Sparkles } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'FinTech Dashboard',
    category: 'Analysis',
    image: '/project_fintech.png',
    size: 'large', // col-span-2
    color: 'bg-orange-50'
  },
  {
    id: 2,
    title: 'E-Commerce App',
    category: 'Retail',
    image: '/project_ecommerce.png',
    size: 'small', // col-span-1
    color: 'bg-blue-50'
  },
  {
    id: 3,
    title: 'Health Tracker',
    category: 'Medical',
    image: '/project_health_app.png',
    size: 'small', // col-span-1
    color: 'bg-green-50'
  },
  {
    id: 4,
    title: 'SaaS Platform',
    category: 'Enterprise',
    image: '/project_saas.png',
    size: 'large', // col-span-2
    color: 'bg-purple-50'
  }
]

export default function InteractivePortfolioSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section ref={sectionRef} id="portfolio" className="py-16 bg-white relative">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Standardized Header - Compact Version */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f7961f]/10 text-[#e07a00] text-xs font-bold mb-4">
            <Sparkles className="w-3 h-3" />
            PORTFOLIO
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Featured <span className="bg-gradient-to-r from-[#f7961f] to-[#e07a00] bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            A compact look at how we transform ideas into digital reality.
          </p>
        </motion.div>

        {/* Compact Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-2xl border border-gray-100 bg-white hover:border-[#f7961f]/30 transition-all duration-300 ${project.size === 'large' ? 'md:col-span-2 h-[220px]' : 'md:col-span-1 h-[220px]'
                }`}
            >
              {/* Background Image - Fully Visible */}
              <div className="absolute inset-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              {/* Card Content - Light Text for visibility */}
              <div className="relative h-full p-5 flex flex-col justify-end">
                <div className="flex justify-between items-end">
                  <div className="max-w-[80%]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#f7961f]">
                      {project.category}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1 line-clamp-1">
                      {project.title}
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-[#f7961f] group-hover:scale-110 transition-all">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Premium Footer Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/projects"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#242423] text-white font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(247,150,31,0.3)] hover:-translate-y-1"
          >
            {/* Hover Background Shine */}
            <div className="absolute inset-0 w-0 bg-gradient-to-r from-[#f7961f] to-[#e07a00] transition-all duration-500 ease-out group-hover:w-full" />

            <span className="relative z-10 flex items-center gap-2">
              Explore All Work
              <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
