'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ArrowRight, Terminal, Cpu, Globe, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProjectInquiryPopup from '@/components/ui/project-inquiry-popup'

const navigation = [
  { name: 'Services', href: '#services', id: 'NAV_01' },
  { name: 'Portfolio', href: '#portfolio', id: 'NAV_02' },
  { name: 'About', href: '#about', id: 'NAV_03' },
  { name: 'FAQ', href: '#faq', id: 'NAV_04' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavigation = (href: string) => {
    if (href.startsWith('#')) {
      if (pathname === '/') {
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        router.push(`/${href}`)
      }
    } else {
      router.push(href)
    }
    setIsMenuOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'py-3'
          : 'py-6'
          }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className={`relative flex items-center justify-between transition-all duration-500 rounded-2xl ${isScrolled
            ? 'bg-black/60 backdrop-blur-xl border border-white/10 px-6 py-2 shadow-2xl'
            : 'bg-transparent px-0 py-0'
            }`}>

            {/* Logo Group */}
            <div className="flex items-center gap-8">
              <motion.button
                onClick={() => router.push('/')}
                className="flex items-center group relative"
              >
                <div className="absolute -inset-2 bg-[#f7961f]/20 rounded-xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity" />
                <Image
                  src="/images/logo-white.png"
                  alt="Uplab"
                  width={220}
                  height={60}
                  className="h-8 lg:h-16 w-auto relative z-10 transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </motion.button>

              {/* System Cluster Label */}
              <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest font-black">Mainframe_Optimal</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className="group px-4 py-2 relative flex flex-col items-center"
                >
                  <span className="text-[10px] font-mono text-[#f7961f]/40 mb-0.5 opacity-0 group-hover:opacity-100 transition-all transform -translate-y-1 group-hover:translate-y-0">
                    {item.id}
                  </span>
                  <span className="text-xs font-bold text-white/70 group-hover:text-white transition-colors uppercase tracking-widest">
                    {item.name}
                  </span>
                  <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#f7961f] scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">


              <button
                onClick={() => setIsPopupOpen(true)}
                className="group relative px-6 py-2.5 bg-white text-black text-xs font-black uppercase tracking-widest rounded-xl overflow-hidden hover:scale-105 transition-all active:scale-95"
              >
                <div className="absolute inset-0 bg-[#f7961f] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 group-hover:text-white transition-colors flex items-center gap-2">
                  Initialize
                  <Zap className="w-3 h-3 fill-current" />
                </span>
              </button>

              {/* Mobile Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              className="fixed inset-0 z-[60] lg:hidden bg-[#0a0a0a] flex flex-col p-8"
            >
              <div className="flex items-center justify-between mb-16">
                <Image src="/images/logo-white.png" alt="Logo" width={180} height={40} className="h-10 w-auto" />
                <button onClick={() => setIsMenuOpen(false)} className="p-2 text-white">
                  <X className="w-8 h-8" />
                </button>
              </div>

              <div className="space-y-8">
                {navigation.map((item, i) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => handleNavigation(item.href)}
                    className="flex flex-col items-start gap-1 group w-full"
                  >
                    <span className="text-[10px] font-mono text-[#f7961f]">{item.id}</span>
                    <span className="text-4xl font-black text-white hover:text-[#f7961f] transition-colors uppercase italic tracking-tighter">
                      {item.name}
                    </span>
                  </motion.button>
                ))}
              </div>

              <div className="mt-auto space-y-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <span className="block text-[10px] font-mono text-white/20 mb-1 uppercase">Region</span>
                    <span className="text-white font-bold">GLOBAL (Nodes: 24)</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <span className="block text-[10px] font-mono text-white/20 mb-1 uppercase">Security</span>
                    <span className="text-green-500 font-bold">SOC2_TYPE_II</span>
                  </div>
                </div>

                <button
                  onClick={() => { setIsMenuOpen(false); setIsPopupOpen(true); }}
                  className="w-full py-5 bg-[#f7961f] text-black font-black text-lg rounded-2xl flex items-center justify-center gap-3"
                >
                  INITIALIZE_SYNC
                  <Zap className="w-5 h-5 fill-current" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <ProjectInquiryPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </>
  )
}
