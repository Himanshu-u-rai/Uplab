'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Terminal, Cpu, Zap, Activity } from 'lucide-react'
import Image from 'next/image'

export default function AdvancedHeroSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] pt-24 pb-20">
      {/* High-Tech Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(247,150,31,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#f7961f]/30 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">

          {/* Top Pill */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <span className="flex h-2 w-2 rounded-full bg-[#f7961f] animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/50">System Status: Optimal</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tight mb-8"
          >
            Engineering <br />
            <span className="text-white">Digital </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f7961f] via-[#ffb347] to-[#f7961f] bg-[length:200%_auto] animate-gradient-x">
              Velocity
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white/40 max-w-2xl font-light leading-relaxed mb-12"
          >
            We deploy high-performance engineering teams that transform complex infrastructure into seamless digital experiences.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mb-20"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-[#f7961f] text-black font-bold rounded-full flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(247,150,31,0.4)]"
            >
              Initialize Project
              <ArrowRight className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="#portfolio"
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              className="px-10 py-4 border border-white/10 text-white font-semibold rounded-full backdrop-blur-sm transition-all"
            >
              View Repository
            </motion.a>
          </motion.div>

          {/* Main Visual Component */}
          <motion.div
            style={{ y, opacity, scale }}
            className="relative w-full max-w-6xl mx-auto rounded-2xl border border-white/5 overflow-hidden shadow-2xl bg-[#0f0f0f]"
          >
            {/* Window Header */}
            <div className="bg-white/5 border-b border-white/5 px-4 py-3 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest">uplab_infrastructure_v2.0</div>
              <div className="w-10" />
            </div>

            {/* Dashboard Content */}
            <div className="relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9]">
              <Image
                src="/it-hero-premium.png"
                alt="Infrastructure Dashboard"
                fill
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

              {/* Overlay Stats - Glassmorphism */}
              <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 px-2 sm:px-4">
                {[
                  { label: 'Latency', value: '4ms', icon: Activity },
                  { label: 'Throughput', value: '1.2TB/s', icon: Zap },
                  { label: 'Uptime', value: '99.99%', icon: Cpu },
                  { label: 'Nodes', value: '412', icon: Terminal },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + (i * 0.1) }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-xl flex items-center gap-4"
                  >
                    <div className="p-1.5 sm:p-2 rounded-lg bg-[#f7961f]/10 text-[#f7961f]">
                      <stat.icon className="w-4 h-4 sm:w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[8px] sm:text-[10px] uppercase text-white/30 font-bold">{stat.label}</div>
                      <div className="text-base sm:text-xl font-mono text-white">{stat.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div >

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 15s ease infinite;
        }
      `}</style>
    </section >
  )
}
