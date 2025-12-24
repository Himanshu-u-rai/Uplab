'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  Twitter,
  Instagram,
  Linkedin,
  Github,
  ArrowUp,
  Terminal,
  Cpu,
  ShieldCheck,
  Globe,
  Zap,
  Activity
} from 'lucide-react'

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'GitHub', icon: Github, href: '#' },
]

const footerLinks = [
  {
    title: 'Development',
    links: [
      { name: 'Architecture', href: '#services' },
      { name: 'Mobile Systems', href: '#services' },
      { name: 'Cloud Infra', href: '#services' },
      { name: 'Repository', href: '#portfolio' },
    ]
  },
  {
    title: 'Platform',
    links: [
      { name: 'Documentation', href: '#faq' },
      { name: 'Client Portal', href: '#testimonials' },
      { name: 'Security Protocol', href: '/privacy' },
      { name: 'System Terms', href: '/terms' },
    ]
  },
  {
    title: 'Company',
    links: [
      { name: 'Mission.sys', href: '#about' },
      { name: 'Network', href: '#contact' },
      { name: 'Status', href: '#' },
      { name: 'Careers', href: '#' },
    ]
  }
]

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#0a0a0a] text-white relative overflow-hidden pt-20 pb-10 border-t border-white/5">
      {/* Infrastructure Backdrop */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#f7961f]/20 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-20">

          {/* Brand Module */}
          <div className="col-span-full lg:col-span-2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo-white.png"
                alt="Uplab"
                width={300}
                height={80}
                className="h-16 lg:h-40 w-auto"
              />
            </Link>

            <p className="text-white/40 text-sm leading-relaxed max-w-sm mx-auto lg:mx-0">
              Industrial-grade digital assets for the next generation of founders. We architect high-performance ecosystems where engineering meets elegance.
            </p>

            <div className="flex gap-4 justify-center lg:justify-start">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-white/5 rounded-xl border border-white/5 flex items-center justify-center text-white/40 hover:text-[#f7961f] hover:border-[#f7961f]/30 hover:bg-[#f7961f]/5 transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>

            {/* System Status Indicator */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest font-bold">Systems operational</span>
              <div className="w-px h-3 bg-white/10 mx-2" />
              <span className="text-[10px] font-mono text-white/60">v4.0.2-prod</span>
            </div>
          </div>

          {/* Navigation Modules */}
          {footerLinks.map((column) => (
            <div key={column.title} className="space-y-6 text-center lg:text-left col-span-1">
              <h3 className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-[#f7961f] opacity-80">{column.title}</h3>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-white/40 hover:text-white transition-colors flex items-center justify-center lg:justify-start gap-2 group">
                      <div className="w-1 h-1 rounded-full bg-[#f7961f] scale-0 group-hover:scale-100 transition-transform hidden lg:block" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Global Infrastructure Grid Footer */}
        <div className="pt-10 border-t border-white/5">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 opacity-20 hover:opacity-100 transition-opacity duration-500">
              <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest">
                <Globe className="w-3 h-3" />
                <span>Nodes: 24 (Global)</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest">
                <ShieldCheck className="w-3 h-3" />
                <span>SOC2 Type II</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest">
                <Activity className="w-3 h-3" />
                <span>Uptime: 99.99%</span>
              </div>
            </div>

            <div className="text-center lg:text-right">
              <div className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">
                © 2025 Uplab Architecture Lab • Initialized in Delhi, IN
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll to Top - Technical Variant */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 w-12 h-12 bg-[#f7961f] text-black rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  )
}
