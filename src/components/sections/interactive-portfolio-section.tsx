'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Cpu, Layers, Terminal } from 'lucide-react'
import Image from 'next/image'

const projects = [
  {
    id: 'PRJ_101',
    title: 'Nexus AI',
    category: 'AL Arch',
    image: '/project-ai.png',
    tech: ['Py', 'TFlow'],
  },
  {
    id: 'PRJ_102',
    title: 'Aether',
    category: 'Cloud',
    image: '/project-cloud.png',
    tech: ['AWS', 'Go'],
  },
  {
    id: 'PRJ_103',
    title: 'SecurePay',
    category: 'Fintech',
    image: '/project_fintech.png',
    tech: ['Node', 'TS'],
  },
  {
    id: 'PRJ_104',
    title: 'SaaS Core',
    category: 'Enterprise',
    image: '/project_saas.png',
    tech: ['React', 'GQL'],
  },
  {
    id: 'PRJ_105',
    title: 'HealthOS',
    category: 'IoT',
    image: '/project_health_app.png',
    tech: ['C++', 'Rust'],
  },
  {
    id: 'PRJ_106',
    title: 'Vogue Ecom',
    category: 'Retail',
    image: '/project_ecommerce.png',
    tech: ['Next', 'Tailwind'],
  }
]

// Duplicate projects for infinite loop
const infiniteProjects = [...projects, ...projects]

export default function InteractivePortfolioSection() {
  const [isPaused, setIsPaused] = useState(false)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="py-24 bg-[#0a0a0a] relative overflow-hidden"
    >
      {/* Infrastructure Grid */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10 mb-16">
        {/* Compact Header */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4"
          >
            <Layers className="w-3 h-3 text-[#f7961f]" />
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/50">Infinite Deployment Stream</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-3xl md:text-5xl font-black text-white tracking-tight"
          >
            Project <span className="text-[#f7961f]">Lifecycle</span>
          </motion.h2>
        </div>
      </div>

      {/* Infinite Scrolling Marquee */}
      <div
        className="relative flex overflow-hidden group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="flex gap-6 whitespace-nowrap"
          animate={{ x: isPaused ? undefined : ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30, // Adjust speed here
              ease: "linear",
            },
          }}
        >
          {infiniteProjects.map((project, idx) => (
            <div
              key={`${project.id}-${idx}`}
              className="flex-shrink-0 w-[280px] sm:w-[340px] md:w-[380px]"
            >
              <div className="group/card relative h-[320px] rounded-2xl overflow-hidden border border-white/5 bg-[#0f0f0f] hover:border-[#f7961f]/40 transition-all duration-500">
                {/* Card Meta - Top */}
                <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-start pointer-events-none">
                  <div className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10">
                    <span className="text-[10px] font-mono text-[#f7961f]">{project.id}</span>
                  </div>
                  <div className="p-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md opacity-0 group-hover/card:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Background Visual */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover opacity-40 grayscale group-hover/card:grayscale-0 group-hover/card:scale-110 group-hover/card:opacity-60 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/50 to-transparent" />
                </div>

                {/* Card Content - Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-[#f7961f]" />
                      <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold whitespace-normal">{project.category}</span>
                    </div>

                    <h3 className="text-xl font-black text-white group-hover/card:text-[#f7961f] transition-colors whitespace-normal">
                      {project.title}
                    </h3>

                    {/* Tech Array */}
                    <div className="flex flex-wrap gap-2 pt-2 opacity-0 group-hover/card:opacity-100 transform translate-y-2 group-hover/card:translate-y-0 transition-all duration-500">
                      {project.tech.map((t) => (
                        <span key={t} className="text-[9px] font-mono py-0.5 px-2 rounded bg-white/5 text-white/50 border border-white/10">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Terminal Line Decor */}
                <div className="absolute bottom-0 left-0 h-1 bg-[#f7961f] w-0 group-hover/card:w-full transition-all duration-500" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10 mt-20">
        {/* Global Registry CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-6"
        >
          <Link
            href="/projects"
            className="flex items-center gap-3 px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-mono text-xs hover:bg-[#f7961f] hover:text-black hover:border-[#f7961f] transition-all group/btn"
          >
            <Terminal className="w-4 h-4" />
            <span>ACCESS_PROJECT_REPOSITORY</span>
            <ArrowUpRight className="w-4 h-4 group-hover/btn:rotate-45 transition-transform" />
          </Link>

          <div className="flex items-center gap-8 text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">
            <div className="flex items-center gap-2">
              <Cpu className="w-3 h-3" />
              <span>Encrypted Assets</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500/40 animate-pulse" />
              <span>Live Clusters</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
