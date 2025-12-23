'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Twitter, Instagram, Linkedin, Github, ArrowUp } from 'lucide-react'

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'GitHub', icon: Github, href: '#' },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#242423] text-white relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#242423] via-[#3d3d3c]/30 to-[#242423]" />
      <div className="absolute top-10 left-0 w-48 h-48 bg-[#f7961f]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-0 w-40 h-40 bg-[#f7961f]/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Top section */}
        <div className="py-8 border-b border-gray-800 flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Image
            src="/images/logo-white.png"
            alt="Uplab"
            width={180}
            height={50}
            className="h-24 w-auto"
          />

          {/* Social icons */}
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 bg-[#3d3d3c] rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#f7961f] transition"
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom section */}
        <div className="py-4 flex flex-col lg:flex-row items-center justify-between gap-4 text-gray-500 text-sm">
          <span>© 2025 Uplab. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 p-3 bg-[#f7961f] hover:bg-[#e07a00] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 group"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
      </motion.button>
    </footer>
  )
}
