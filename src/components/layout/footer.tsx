'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Mail, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Github,
  ArrowUp,
  Heart
} from 'lucide-react'

const navigation = {
  services: [
    { name: 'Web Development', href: '#' },
    { name: 'Mobile Apps', href: '#' },
    { name: 'SEO Optimization', href: '#' },
    { name: 'Digital Marketing', href: '#' },
  ],
  company: [
    { name: 'About Us', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ],
}

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-400' },
  { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-400' },
  { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-600' },
  { name: 'GitHub', icon: Github, href: '#', color: 'hover:text-gray-300' },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Effects - Mobile Optimized */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900" />
      <div className="absolute top-0 left-0 w-48 sm:w-96 h-48 sm:h-96 bg-purple-500/3 sm:bg-purple-500/5 rounded-full blur-2xl sm:blur-3xl" />
      <div className="absolute bottom-0 right-0 w-36 sm:w-72 h-36 sm:h-72 bg-blue-500/3 sm:bg-blue-500/5 rounded-full blur-2xl sm:blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content - Mobile Only Optimizations */}
        <div className="pt-8 sm:pt-12 md:pt-16 pb-6 sm:pb-8 md:pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            {/* Company Info - Mobile Responsive */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-4 text-center lg:text-left"
            >
              {/* Logo Section */}
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-base sm:text-lg">U</span>
                </div>
                <span className="text-xl sm:text-2xl font-bold text-white">Uplab</span>
              </div>
              
              {/* Description */}
              <p className="text-gray-300 leading-relaxed mb-4 sm:mb-6 max-w-md mx-auto lg:mx-0 text-sm sm:text-base">
                We're a digital agency passionate about creating exceptional digital experiences 
                that help businesses thrive in the modern world. 
                <span className="block mt-2 text-purple-300 font-medium lg:inline lg:mt-0 lg:ml-1">Ready to transform your digital presence?</span>
              </p>

              {/* CTA Button */}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all duration-300 text-sm w-full sm:w-auto shadow-lg hover:shadow-xl"
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.querySelector('#contact')
                  element?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Get In Touch
              </motion.a>
            </motion.div>

            {/* Navigation Links - Preserve Desktop Layout */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Services */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center lg:text-left"
              >
                <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 pb-2 border-b border-gray-700 lg:border-0 lg:pb-0">Services</h3>
                <ul className="space-y-2 sm:space-y-3">
                  {navigation.services.map((item) => (
                    <li key={item.name}>
                      <motion.a
                        href={item.href}
                        whileHover={{ x: 5 }}
                        className="text-gray-400 hover:text-white transition-all duration-300 text-xs sm:text-sm block py-1 lg:py-0"
                      >
                        {item.name}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Company */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center lg:text-left"
              >
                <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 pb-2 border-b border-gray-700 lg:border-0 lg:pb-0">Company</h3>
                <ul className="space-y-2 sm:space-y-3">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <motion.a
                        href={item.href}
                        whileHover={{ x: 5 }}
                        className="text-gray-400 hover:text-white transition-all duration-300 text-xs sm:text-sm block py-1 lg:py-0"
                        onClick={(e) => {
                          e.preventDefault()
                          const element = document.querySelector(item.href)
                          element?.scrollIntoView({ behavior: 'smooth' })
                        }}
                      >
                        {item.name}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Connect */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="col-span-2 md:col-span-1 text-center lg:text-left"
              >
                <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 pb-2 border-b border-gray-700 lg:border-0 lg:pb-0">Connect</h3>
                <div className="space-y-3 sm:space-y-4">
                  {/* Social Links - Mobile Grid, Desktop Flex */}
                  <div className="grid grid-cols-4 gap-3 max-w-xs mx-auto lg:mx-0 lg:flex lg:flex-wrap lg:gap-2 lg:max-w-none">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 lg:w-8 lg:h-8 xl:w-10 xl:h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                      >
                        <social.icon className="w-4 h-4 lg:w-3.5 lg:h-3.5 xl:w-5 xl:h-5" />
                      </motion.a>
                    ))}
                  </div>
                  
                  {/* Back to Top */}
                  <motion.button
                    onClick={scrollToTop}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center lg:justify-start gap-2 text-gray-400 hover:text-white transition-all duration-300 text-xs sm:text-sm group w-full lg:w-auto py-2 lg:py-0"
                  >
                    <ArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-y-1 transition-transform duration-300" />
                    Back to Top
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Footer - Mobile/Desktop Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 py-4 sm:py-6 lg:py-8"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-4 lg:gap-6">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm text-center lg:text-left order-2 lg:order-1">
              <span>© 2025 Uplab. Made with</span>
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 fill-current animate-pulse lg:animate-none" />
              <span>for amazing businesses</span>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-4 sm:gap-6 text-gray-400 text-xs sm:text-sm order-1 lg:order-2">
              <Link href="/privacy" className="hover:text-white transition-colors duration-300 py-1">
                Privacy Policy
              </Link>
              <span className="text-gray-600 hidden lg:inline">•</span>
              <Link href="/terms" className="hover:text-white transition-colors duration-300 py-1">
                Terms of Service
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Floating Action Button - Mobile Priority */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
          onClick={scrollToTop}
          className="fixed bottom-4 sm:bottom-6 lg:bottom-8 right-4 sm:right-6 lg:right-8 p-2.5 sm:p-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 group"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-y-1 transition-transform duration-300" />
        </motion.button>
      </div>
    </footer>
  )
}
