'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Eye,
  Search,
  Zap,
  Globe,
  Smartphone,
  Megaphone,
  Terminal,
  Cpu,
  Activity,
  Layers,
  Box,
  ChevronRight,
  ShieldCheck,
  Grid3X3
} from 'lucide-react'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import SchemaComponent from '@/components/ui/schema-component'
import { createPortfolioSchema, createBreadcrumbSchema } from '@/lib/schema'

const allProjects = [
  {
    id: 1,
    tag: 'PRJ_FIN_101',
    title: 'FinTech Dashboard',
    category: 'Web Architecture',
    type: 'web',
    description: 'Advanced financial ecosystem with real-time market synchronization and AI-driven predictive insights.',
    longDescription: 'A custom-engineered financial dashboard built for high-frequency investment data analysis. Features a specialized D3.js engine, real-time WebSocket updates, and an AI risk assessment module.',
    image: '/images/portfolio/fintech-dashboard.jpg',
    technologies: ['Next.js', 'TS', 'D3.js', 'Redis', 'Python'],
    color: 'from-blue-500 to-cyan-500',
    stats: { throughput: '1.2TB/s', latency: '4ms', uptime: '99.9%' },
    featured: true,
    year: '2024',
    client: 'Investment Corp'
  },
  {
    id: 2,
    tag: 'PRJ_APP_202',
    title: 'Commerce Engine',
    category: 'Mobile Interface',
    type: 'mobile',
    description: 'Next-gen mobile shopping layer with AR integration and high-velocity checkout protocols.',
    longDescription: 'A high-performance React Native application featuring an AR try-on module and a custom-built social commerce engine with Stripe integration.',
    image: '/images/portfolio/ecommerce-app.jpg',
    technologies: ['React Native', 'Node.js', 'ARKit', 'Stripe'],
    color: 'from-[#f7961f] to-[#e07a00]',
    stats: { sync: '99.8%', reach: '500K+', rating: '4.9/5' },
    featured: true,
    year: '2024',
    client: 'Fashion Forward'
  },
  {
    id: 3,
    tag: 'PRJ_SAAS_303',
    title: 'SaaS Analytics',
    category: 'Cloud Systems',
    type: 'web',
    description: 'Enterprise analytics core with massive data processing and ML-based anomaly detection.',
    longDescription: 'Machine learning enabled analytics platform designed for large-scale data ingestion and automated reporting. Built on a containerized AWS infrastructure.',
    image: '/images/portfolio/saas-dashboard.jpg',
    technologies: ['React', 'TensorFlow', 'PostgreSQL', 'Docker'],
    color: 'from-green-500 to-emerald-500',
    stats: { scale: '1B+', nodes: '12', accuracy: '94%' },
    featured: false,
    year: '2024',
    client: 'DataTech Solutions'
  },
  {
    id: 4,
    tag: 'PRJ_MKT_404',
    title: 'Viral Protocol',
    category: 'Digital Strategy',
    type: 'marketing',
    description: 'Data-driven marketing algorithm that achieved a 400% ROI across multi-channel deployments.',
    longDescription: 'A complex marketing strategy utilizing custom tracking algorithms and viral content loops to maximize user acquisition and brand depth.',
    image: '/images/portfolio/marketing-viral.jpg',
    technologies: ['FB Ads', 'GA4', 'A/B Test', 'SEMrush'],
    color: 'from-orange-500 to-red-500',
    stats: { roi: '400%', conversion: '25K+', reach: '2M+' },
    featured: true,
    year: '2024',
    client: 'TechStart Inc'
  },
  {
    id: 5,
    tag: 'PRJ_HLT_505',
    title: 'Health Core',
    category: 'Mobile Interface',
    type: 'mobile',
    description: 'AI-driven fitness ecosystem with biometric synchronization and local ML processing.',
    longDescription: 'Intelligent fitness platform that integrates with wearable telemetry to provide real-time coaching via local-first machine learning models.',
    image: '/images/portfolio/fitness-app.jpg',
    technologies: ['Flutter', 'Firebase', 'TF Lite', 'HealthKit'],
    color: 'from-cyan-500 to-blue-500',
    stats: { sync: '100%', users: '100K+', rating: '4.8/5' },
    featured: false,
    year: '2024',
    client: 'FitLife Pro'
  },
  {
    id: 6,
    tag: 'PRJ_ENT_606',
    title: 'Network Portal',
    category: 'Web Architecture',
    type: 'web',
    description: 'Comprehensive digital portal for restaurant chains with high-frequency ordering.',
    longDescription: 'A headless CMS driven web portal with custom-built ordering logic and real-time multi-location inventory sync.',
    image: '/images/portfolio/restaurant-web.jpg',
    technologies: ['Next.js', 'Sanity', 'Stripe', 'Vercel'],
    color: 'from-amber-500 to-orange-500',
    stats: { orders: '10K+', speed: '1.2s', sync: 'Live' },
    featured: false,
    year: '2024',
    client: 'Taste Buds Chain'
  }
]

const categories = [
  { name: 'All_Units', type: 'all', icon: Grid3X3 },
  { name: 'Web_Arch', type: 'web', icon: Globe },
  { name: 'Mobile_iOS', type: 'mobile', icon: Smartphone },
  { name: 'Growth_Labs', type: 'marketing', icon: Megaphone },
]

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  const filteredProjects = allProjects.filter(project => {
    const matchesCategory = activeCategory === 'all' || project.type === activeCategory
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />

      {/* Background Infrastructure */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-[#f7961f]/5 to-transparent" />
      </div>

      <main className="relative z-10 pt-32 pb-24">
        <div className="container mx-auto px-4">

          {/* Section Header */}
          <div className="max-w-6xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <Terminal className="w-3 h-3 text-[#f7961f]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/50">Registry_Archive_v2.0</span>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-end">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight italic uppercase">
                  Deployment <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f7961f] to-[#ffb347]">Artifacts</span>
                </h1>
                <p className="mt-6 text-white/40 text-lg font-light max-w-lg leading-relaxed">
                  A comprehensive registry of high-performance digital systems architected and deployed by our engineering team.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-2 md:grid-cols-3 gap-4"
              >
                {[
                  { label: 'Uptime', value: '100%', icon: Activity },
                  { label: 'Deployed', value: '42', icon: Box },
                  { label: 'Integrity', value: 'Verified', icon: ShieldCheck },
                ].map((stat, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center text-center">
                    <stat.icon className="w-5 h-5 text-[#f7961f] mb-3 opacity-50" />
                    <div className="text-xl font-mono font-bold">{stat.value}</div>
                    <div className="text-[10px] uppercase tracking-widest text-white/20 font-bold">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Filters & Command Bar */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="p-2 rounded-[2.5rem] bg-white/[0.03] border border-white/10 flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input
                  type="text"
                  placeholder="Filter_System_Name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent border-none focus:ring-0 pl-14 pr-8 py-4 text-sm font-mono placeholder:text-white/10"
                />
              </div>
              <div className="flex gap-2 p-1">
                {categories.map((cat) => (
                  <button
                    key={cat.type}
                    onClick={() => setActiveCategory(cat.type)}
                    className={`px-6 py-3 rounded-[1.5rem] flex items-center gap-2 transition-all text-[11px] font-black uppercase tracking-widest ${activeCategory === cat.type
                        ? 'bg-[#f7961f] text-black shadow-[0_0_20px_rgba(247,150,31,0.2)]'
                        : 'hover:bg-white/5 text-white/40'
                      }`}
                  >
                    <cat.icon className="w-3.5 h-3.5" />
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Artifacts Grid */}
          <div ref={sectionRef} className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((prj, i) => (
                  <motion.div
                    layout
                    key={prj.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.05 }}
                    className="group"
                  >
                    <div className="relative bg-[#0f0f0f] border border-white/10 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-[#f7961f]/40 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
                      {/* Window Header Decor */}
                      <div className="px-6 py-4 bg-white/5 border-b border-white/5 flex items-center justify-between">
                        <div className="flex gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-white/10" />
                          <div className="w-2 h-2 rounded-full bg-white/10" />
                        </div>
                        <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.2em] font-bold">{prj.tag}</span>
                      </div>

                      {/* Visual Layer */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${prj.color} opacity-40 group-hover:opacity-10 transition-opacity duration-1000`} />
                        <div className="absolute inset-0 bg-black grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 opacity-60 group-hover:opacity-100" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] to-transparent opacity-80" />

                        <div className="absolute inset-0 flex items-center justify-center translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                          <div className="flex gap-3 scale-90 opacity-0 group-hover:opacity-100 transition-all duration-500">
                            <button className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center hover:scale-110 transition-transform">
                              <Eye className="w-5 h-5" />
                            </button>
                            <button className="w-12 h-12 rounded-2xl bg-[#f7961f] text-black flex items-center justify-center hover:scale-110 transition-transform">
                              <ExternalLink className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Metadata Area */}
                      <div className="p-8">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 rounded-xl bg-white/5">
                            <Layers className="w-4 h-4 text-[#f7961f]" />
                          </div>
                          <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{prj.category}</span>
                        </div>

                        <h3 className="text-2xl font-black text-white mb-4 italic tracking-tight uppercase underline decoration-[#f7961f]/20 group-hover:decoration-[#f7961f] decoration-2 underline-offset-8 transition-all">
                          {prj.title}
                        </h3>

                        <p className="text-white/40 text-sm font-light leading-relaxed mb-8 line-clamp-2">
                          {prj.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-8">
                          {prj.technologies.map(tech => (
                            <span key={tech} className="px-2 py-1 rounded-md bg-white/5 border border-white/5 text-[9px] font-mono text-white/30 uppercase">
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Telemetry Footer */}
                        <div className="pt-6 border-t border-white/5 grid grid-cols-3 gap-4">
                          {Object.entries(prj.stats).map(([key, val]) => (
                            <div key={key}>
                              <div className="text-[11px] font-mono font-bold text-white/60 mb-1">{val}</div>
                              <div className="text-[8px] uppercase tracking-tighter text-white/20 font-black">{key}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Activation Section */}
          <div className="max-w-4xl mx-auto mt-32 text-center relative">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-[#f7961f]/50 to-transparent" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-8 leading-tight">
                Initialize New <br />
                <span className="text-[#f7961f]">System_Protocol</span>
              </h2>
              <p className="text-white/40 text-lg font-light leading-relaxed mb-12 max-w-lg mx-auto">
                Architect your digital core with industrial-grade engineering. Establishment process begins within 24 hours of synchronization.
              </p>

              <Link
                href="/#contact"
                className="group relative inline-flex items-center gap-4 bg-gradient-to-r from-[#f7961f] to-[#e07a00] text-black font-black px-12 py-5 rounded-3xl overflow-hidden active:scale-95 transition-all"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                <span className="relative z-10 text-sm uppercase tracking-widest">INITIALIZE_SYNC</span>
                <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
