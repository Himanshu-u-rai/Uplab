'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import {
  Code2,
  Smartphone,
  Palette,
  Zap,
  Target,
  Star,
  Activity,
  Box,
  Layers,
  Shield,
  Cpu,
  Globe
} from 'lucide-react'

const services = [
  {
    id: 'Srv_001',
    icon: Code2,
    title: 'Modern Web Engineering',
    description: 'High-performance applications built on distributed architecture for global scale.',
    features: ['Micro-frontend Architecture', 'Edge Computing', 'Typescript-First', 'Headless CMS'],
    stats: { performance: '99+', availability: '99.9%', latency: '<100ms' },
    color: 'from-[#f7961f] to-[#e07a00]',
    image: '/service_web_dev.png',
    delay: 0.1
  },
  {
    id: 'Srv_002',
    icon: Smartphone,
    title: 'Cross-Platform Mobile',
    description: 'Unified codebases delivering native performance across iOS and Android ecosystems.',
    features: ['React Native Expert', 'Biometric Auth', 'Offline-First Sync', 'Device-Specific API'],
    stats: { performance: '120fps', availability: '99.5%', latency: '<150ms' },
    color: 'from-[#f7961f] to-[#e07a00]',
    image: '/service_mobile_dev.png',
    delay: 0.2
  },
  {
    id: 'Srv_003',
    icon: Palette,
    title: 'Systemized Product Design',
    description: 'Scalable design systems that bridge the gap between aesthetics and engineering.',
    features: ['Atomic Design Systems', 'User Data Research', 'Interactive Prototypes', 'WCAG Accessibility'],
    stats: { performance: 'A+', availability: 'N/A', latency: 'N/A' },
    color: 'from-[#f7961f] to-[#e07a00]',
    image: '/service_uiux_design.png',
    delay: 0.3
  }
]

const achievements = [
  { icon: Zap, value: '99%', label: 'Efficiency Index', color: 'text-[#f7961f]' },
  { icon: Target, value: '100%', label: 'Deployment Success', color: 'text-[#f7961f]' },
  { icon: Activity, value: '250+', label: 'Active Deployments', color: 'text-[#f7961f]' },
  { icon: Shield, value: 'SOC2', label: 'Security Grade', color: 'text-[#f7961f]' }
]

export default function EnhancedServicesSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  // Auto-scroll logic for mobile
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isPaused])

  return (
    <section id="services" ref={sectionRef} className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Grid - Matching Hero */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(247,150,31,0.05),transparent_70%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mb-20 text-center mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#f7961f] animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/50">Core Capabilities</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight"
          >
            Digital <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f7961f] via-[#ffb347] to-[#f7961f]">
              Infrastructure
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto font-light"
          >
            We build the technical foundation that powers modern enterprise solutions and consumer experiences.
          </motion.p>
        </div>

        {/* Services Display: Carousel on mobile, Grid on desktop */}
        <div
          className="relative mb-24"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Mobile Carousel Container */}
          <div className="md:hidden overflow-hidden touch-pan-y">
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              drag="x"
              dragConstraints={{ right: 0, left: -(services.length - 1) * 300 }} // Dynamic constraint would be better but services is static 3
              onDragEnd={(_, info) => {
                const swipeThreshold = 50
                if (info.offset.x < -swipeThreshold && currentIndex < services.length - 1) {
                  setCurrentIndex(currentIndex + 1)
                } else if (info.offset.x > swipeThreshold && currentIndex > 0) {
                  setCurrentIndex(currentIndex - 1)
                }
              }}
            >
              {services.map((service, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <ServiceCard service={service} isInView={isInView} index={index} />
                </div>
              ))}
            </motion.div>

            {/* Carousel Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {services.map((_, i) => (
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
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} isInView={isInView} index={index} />
            ))}
          </div>
        </div>

        {/* System Performance Panel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative max-w-6xl mx-auto"
        >
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden backdrop-blur-sm">
            {/* Corner Markers */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/20" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/20" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/20" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/20" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
              {achievements.map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#f7961f]">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-3xl font-black text-white mb-1 font-mono">{item.value}</div>
                    <div className="text-[10px] uppercase tracking-[0.1em] text-white/30 font-bold">{item.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Scanned Line Animation */}
            <motion.div
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#f7961f]/20 to-transparent pointer-events-none"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ServiceCard({ service, isInView, index }: { service: any, isInView: boolean, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: service.delay }}
      className="group relative h-full"
    >
      <div className="relative h-full bg-[#0f0f0f] border border-white/5 rounded-2xl overflow-hidden transition-all duration-500 hover:border-[#f7961f]/30 hover:shadow-[0_0_40px_rgba(247,150,31,0.05)]">
        {/* Visual Header */}
        <div className="relative h-48 overflow-hidden bg-black">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] to-transparent" />

          {/* Service ID - Monospace badge */}
          <div className="absolute top-4 left-4 px-2 py-1 rounded bg-black/50 border border-white/10 backdrop-blur-md">
            <span className="text-[10px] font-mono text-[#f7961f]">{service.id}</span>
          </div>
        </div>

        <div className="p-8 -mt-12 relative">
          {/* Floating Icon */}
          <div className="w-14 h-14 rounded-xl bg-[#f7961f] flex items-center justify-center text-black shadow-lg mb-6 group-hover:scale-110 transition-transform duration-500">
            <service.icon className="w-7 h-7" />
          </div>

          <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#f7961f] transition-colors">
            {service.title}
          </h3>

          <p className="text-white/40 text-sm leading-relaxed mb-8">
            {service.description}
          </p>

          {/* Features / Modules */}
          <div className="space-y-3 mb-8">
            {service.features.map((feature: string, fIdx: number) => (
              <div key={fIdx} className="flex items-center gap-3">
                <div className="w-1 h-1 rounded-full bg-[#f7961f]" />
                <span className="text-[13px] text-white/60 font-mono italic">{feature}</span>
              </div>
            ))}
          </div>

          {/* Metrics Footer */}
          <div className="pt-6 border-t border-white/5 grid grid-cols-3 gap-2">
            {Object.entries(service.stats).map(([k, v], sIdx) => (
              <div key={sIdx}>
                <div className="text-[9px] uppercase tracking-tighter text-white/20 font-bold">{k}</div>
                <div className="text-xs font-mono text-white/80">{String(v)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

