'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Menu, X, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProjectInquiryPopup from '@/components/ui/project-inquiry-popup'

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Blog', href: '#blog' },
  { name: 'About', href: '#about' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  
  // Check if we're on a blog page
  const isBlogPage = pathname?.startsWith('/blog')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    const handleClickOutside = (event: Event) => {
      const target = event.target as HTMLElement
      const mobileMenu = document.querySelector('[data-mobile-menu]')
      const menuButton = document.querySelector('[data-menu-button]')
      
      if (isMenuOpen && mobileMenu && menuButton && 
          !mobileMenu.contains(target) && !menuButton.contains(target)) {
        setIsMenuOpen(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isMenuOpen])

  const handleNavigation = (href: string) => {
    console.log('Navigation clicked:', href, 'Current pathname:', pathname)
    
    if (href === '/blog') {
      // Direct navigation to blog page
      router.push('/blog')
    } else if (href.startsWith('#')) {
      // Section navigation
      if (pathname === '/') {
        // If on homepage, scroll to section
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
          console.log('Scrolled to element:', href)
        } else {
          console.warn('Element not found:', href)
        }
      } else {
        // If on other pages, navigate to homepage with hash
        router.push(`/${href}`)
        console.log('Navigating to home with hash:', href)
      }
    } else {
      // Direct page navigation
      router.push(href)
      console.log('Direct navigation to:', href)
    }
  }

  const handleMobileNavigation = (href: string) => {
    console.log('Mobile navigation clicked:', href)
    
    // Close menu first
    setIsMenuOpen(false)
    
    // Small delay to allow menu animation to complete
    setTimeout(() => {
      if (href.startsWith('#')) {
        if (pathname === '/') {
          // If on homepage, scroll to section
          const element = document.querySelector(href)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
            console.log('Mobile: Scrolled to element:', href)
          } else {
            console.warn('Mobile: Element not found:', href)
          }
        } else {
          // If on other pages, navigate to homepage with hash
          router.push(`/${href}`)
          console.log('Mobile: Navigating to home with hash:', href)
        }
      } else {
        handleNavigation(href)
      }
    }, 150)
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isBlogPage
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          {/* Logo - Mobile Optimized */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center"
            onClick={() => router.push('/')}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-9 h-9 lg:w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-base lg:text-lg">U</span>
              </div>
              <span className={`text-lg sm:text-xl lg:text-2xl font-bold transition-colors duration-300 ${
                isScrolled || isBlogPage ? 'text-gray-900' : 'text-white'
              }`}>
                Uplab
              </span>
            </div>
          </motion.button>

          {/* Desktop Navigation - Hidden on mobile */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:flex items-center space-x-8"
          >
            {navigation.map((item, index) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className={`text-sm font-medium transition-colors duration-300 hover:text-purple-600 relative group ${
                  isScrolled || isBlogPage ? 'text-gray-700' : 'text-white/90'
                }`}
                onClick={() => handleNavigation(item.href)}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full" />
              </motion.button>
            ))}
          </motion.nav>

          {/* CTA Button - Desktop only, mobile-friendly sizing */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hidden lg:flex items-center gap-4"
          >
            <Button
              className={`transition-all duration-300 group ${
                isScrolled || isBlogPage
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white' 
                  : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20'
              } rounded-full px-4 sm:px-6 py-2 text-sm`}
              onClick={() => setIsPopupOpen(true)}
            >
              Get Started
              <ArrowRight className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Mobile Menu Button - Optimized for touch */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-menu-button
            className={`lg:hidden p-2 sm:p-2.5 rounded-lg sm:rounded-xl transition-colors duration-300 touch-manipulation ${
              isScrolled || isBlogPage ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
          >
            {isMenuOpen ? <X className="w-5 h-5 sm:w-6 h-6" /> : <Menu className="w-5 h-5 sm:w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu - Mobile Optimized */}
      <motion.div
        animate={{ 
          opacity: isMenuOpen ? 1 : 0, 
          height: isMenuOpen ? 'auto' : 0 
        }}
        transition={{ duration: 0.3 }}
        data-mobile-menu
        className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200/20 overflow-hidden"
      >
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <nav className="space-y-2 sm:space-y-4">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isMenuOpen ? 1 : 0, 
                  x: isMenuOpen ? 0 : -20 
                }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {item.href === '/blog' ? (
                  <Link
                    href={item.href}
                    className="block w-full text-left text-gray-700 font-medium py-3 sm:py-2 px-3 sm:px-4 rounded-lg sm:rounded-xl hover:bg-gray-100 transition-colors duration-300 text-base sm:text-sm touch-manipulation"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : item.href.startsWith('#') ? (
                  <button
                    className="block w-full text-left text-gray-700 font-medium py-3 sm:py-2 px-3 sm:px-4 rounded-lg sm:rounded-xl hover:bg-gray-100 transition-colors duration-300 text-base sm:text-sm touch-manipulation"
                    onClick={() => handleMobileNavigation(item.href)}
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="block w-full text-left text-gray-700 font-medium py-3 sm:py-2 px-3 sm:px-4 rounded-lg sm:rounded-xl hover:bg-gray-100 transition-colors duration-300 text-base sm:text-sm touch-manipulation"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: isMenuOpen ? 1 : 0, 
                x: isMenuOpen ? 0 : -20 
              }}
              transition={{ duration: 0.3, delay: navigation.length * 0.1 }}
              className="pt-3 sm:pt-4"
            >
              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg sm:rounded-full py-3 sm:py-2 text-base sm:text-sm touch-manipulation"
                onClick={() => {
                  setIsMenuOpen(false)
                  setIsPopupOpen(true)
                }}
              >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </nav>
        </div>
      </motion.div>

      {/* Project Inquiry Popup */}
      <ProjectInquiryPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
      />
    </motion.header>
  )
}
