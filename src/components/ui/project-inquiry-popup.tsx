'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, Send, User, Mail, Phone, Briefcase, MessageSquare, Layout, Monitor } from 'lucide-react'

interface ProjectInquiryPopupProps {
  isOpen: boolean
  onClose: () => void
}

const serviceOptions = [
  { id: 'web', label: 'Landing Page', icon: Layout },
  { id: 'mobile', label: 'Website', icon: Monitor },
]

export default function ProjectInquiryPopup({ isOpen, onClose }: ProjectInquiryPopupProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    services: [] as string[],
    timeline: '',
    description: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Ensure we're on the client side before rendering portal
  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent background scrolling when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = '0px' // Prevent layout shift from scrollbar
      
      // Create a style element to ensure our popup is always on top
      const style = document.createElement('style')
      style.innerHTML = `
        .popup-overlay {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          z-index: 999999 !important;
        }
      `
      document.head.appendChild(style)
      
      return () => {
        document.head.removeChild(style)
      }
    } else {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0px'
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0px'
    }
  }, [isOpen])

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(id => id !== serviceId)
        : [...prev.services, serviceId]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create email body
      const selectedServices = formData.services.map(id => 
        serviceOptions.find(service => service.id === id)?.label
      ).join(', ')

      const emailBody = `
New Project Inquiry from ${formData.name}

Contact Information:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Company: ${formData.company}

Project Details:
- Services Needed: ${selectedServices}
- Timeline: ${formData.timeline}

Project Description:
${formData.description}

---
Sent from Uplab Website Contact Form
      `.trim()

      // Send email using EmailJS or a similar service
      // For now, we'll use mailto as a fallback
      const mailtoLink = `mailto:Himanshurai114@gmail.com?subject=New Project Inquiry from ${formData.name}&body=${encodeURIComponent(emailBody)}`
      
      // Open default email client
      window.location.href = mailtoLink
      
      setIsSubmitted(true)
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          services: [],
          timeline: '',
          description: ''
        })
        onClose()
      }, 2000)
      
    } catch (error) {
      console.error('Error sending inquiry:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = formData.name && formData.email && formData.phone && formData.services.length > 0 && formData.description

  // Don't render on server side or if not mounted
  if (!mounted || typeof window === 'undefined') {
    return null
  }

  const popupContent = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div
          className="popup-overlay"
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2147483647, // Maximum possible z-index
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(8px)',
            overflow: 'hidden'
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            style={{ 
              position: 'relative',
              zIndex: 2147483647,
              width: '100%',
              maxWidth: '1024px',
              maxHeight: '90vh',
              overflow: 'hidden',
              backgroundColor: 'white',
              borderRadius: '16px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '1px solid rgb(229, 231, 235)'
            }}
          >
              {/* Enhanced Header with Gradient */}
              <div className="sticky top-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 px-8 py-6 rounded-t-2xl relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="dots-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="10" cy="10" r="1" fill="currentColor"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#dots-pattern)" />
                  </svg>
                </div>
                
                {/* Close Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onClose();
                  }}
                  style={{ 
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    zIndex: 2147483647,
                    padding: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(4px)',
                    borderRadius: '9999px',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <X style={{ width: '20px', height: '20px' }} />
                </button>

                <div className="relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h2 className="text-3xl font-bold text-white mb-2">Let's Start Your Project</h2>
                    <p className="text-white/90 text-base leading-relaxed">
                      Tell us about your vision and we'll turn it into reality.
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Enhanced Form Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-140px)] bg-white">
                {isSubmitted ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-12 px-6"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                    >
                      <Send className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Message Sent Successfully!</h3>
                    <p className="text-gray-600 text-base mb-4">
                      Thank you for reaching out. We'll review your requirements and get back to you within 24 hours.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-purple-600 font-medium">
                      <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" />
                      <span>Closing automatically...</span>
                    </div>
                  </motion.div>
                ) : (
                  <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Contact Information Section */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-7 h-7 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">
                              Full Name *
                            </label>
                            <div className="relative group">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                              <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white text-gray-900"
                                placeholder="Enter your full name"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">
                              Email Address *
                            </label>
                            <div className="relative group">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                              <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                className="w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white text-gray-900"
                                placeholder="Enter your email address"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">
                              Phone Number *
                            </label>
                            <div className="relative group">
                              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                              <input
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                className="w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white text-gray-900"
                                placeholder="Enter your phone number"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">
                              Company/Organization
                            </label>
                            <div className="relative group">
                              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                              <input
                                type="text"
                                value={formData.company}
                                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                                className="w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white text-gray-900"
                                placeholder="Enter your company name"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Services Section */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-7 h-7 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                            <Layout className="w-4 h-4 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">Services Needed *</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {serviceOptions.map((service) => (
                            <button
                              key={service.id}
                              type="button"
                              onClick={() => handleServiceToggle(service.id)}
                              className={`p-4 border-2 rounded-xl transition-all duration-200 text-left relative overflow-hidden group ${
                                formData.services.includes(service.id)
                                  ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 shadow-md'
                                  : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white hover:shadow-sm'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg transition-all duration-200 ${
                                  formData.services.includes(service.id)
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                    : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                                }`}>
                                  <service.icon className="w-5 h-5" />
                                </div>
                                <div>
                                  <span className="font-semibold text-base">{service.label}</span>
                                  {formData.services.includes(service.id) && (
                                    <div className="absolute top-2 right-2 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm">
                                      ✓
                                    </div>
                                  )}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Project Details Section */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-7 h-7 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                            <Briefcase className="w-4 h-4 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">Project Details</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">
                              Timeline
                            </label>
                            <select
                              value={formData.timeline}
                              onChange={(e) => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
                              className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white text-gray-900"
                            >
                              <option value="" className="text-gray-500">Select timeline</option>
                              <option value="ASAP" className="text-gray-900">ASAP</option>
                              <option value="1-2 weeks" className="text-gray-900">1-2 weeks</option>
                              <option value="1 month" className="text-gray-900">1 month</option>
                              <option value="2-3 months" className="text-gray-900">2-3 months</option>
                              <option value="3+ months" className="text-gray-900">3+ months</option>
                              <option value="Flexible" className="text-gray-900">Flexible</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="block text-sm font-medium text-gray-700">
                            Project Description *
                          </label>
                          <div className="relative group">
                            <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                            <textarea
                              required
                              rows={4}
                              value={formData.description}
                              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                              className="w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 resize-none bg-white text-gray-900"
                              placeholder="Tell us about your project requirements, goals, and any specific features you need..."
                            />
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Submit Buttons */}
                      <div className="flex gap-3 pt-6 border-t border-gray-200">
                        <button
                          type="button"
                          onClick={onClose}
                          className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={!isFormValid || isSubmitting}
                          className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white rounded-lg hover:from-purple-700 hover:via-pink-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-md hover:shadow-lg"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              Send Inquiry
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
      )}
    </AnimatePresence>
  )

  // Render the popup using a portal directly to document.body
  return createPortal(popupContent, document.body)
}
