'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { 
  Send, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Rocket
} from 'lucide-react'

const projectTypes = [
  'Website Development & Design',
  'E-commerce Platform',
  'Mobile App Development',
  'Digital Marketing & SEO',
  'Branding & Logo Design',
  'Custom Software Development',
  'UI/UX Design Services',
  'Complete Digital Transformation',
  'Other (Please specify)'
]

const budgetRanges = [
  '₹50K - ₹1L (Startup)',
  '₹1L - ₹3L (Small Business)',
  '₹3L - ₹8L (Medium Business)',
  '₹8L - ₹20L (Enterprise)',
  '₹20L+ (Large Scale)',
  'Let\'s discuss budget'
]

export default function SimpleContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: '',
    budget: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Create email body
    const emailBody = `
New Project Inquiry from Uplab Website

Contact Information:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Company: ${formData.company}

Project Details:
- Service Type: ${formData.projectType}
- Budget Range: ${formData.budget}

Message:
${formData.message}

---
Sent from Uplab Contact Form
    `.trim()

    // Send email using mailto
    const mailtoLink = `mailto:Himanshurai114@gmail.com?subject=New Project Inquiry from ${formData.name}&body=${encodeURIComponent(emailBody)}`
    window.location.href = mailtoLink

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after showing success message
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        projectType: '',
        budget: '',
        message: '',
      })
    }, 3000)
  }

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="py-16 sm:py-24 md:py-32 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden"
    >
      {/* Enhanced Background Effects - Mobile Optimized */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-48 sm:w-96 h-48 sm:h-96 bg-purple-500/5 sm:bg-purple-500/10 rounded-full blur-2xl sm:blur-3xl animate-pulse" />
        <div className="absolute top-1/2 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-pink-500/5 sm:bg-pink-500/10 rounded-full blur-2xl sm:blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-0 left-1/3 w-48 sm:w-96 h-48 sm:h-96 bg-cyan-500/5 sm:bg-cyan-500/10 rounded-full blur-2xl sm:blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-3 sm:opacity-5" />
        
        {/* Floating Particles - Reduced for mobile */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full opacity-50 sm:opacity-100"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 sm:mb-8 md:mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30 rounded-full px-3 sm:px-4 md:px-6 py-2 sm:py-3 mb-3 sm:mb-4 md:mb-6"
          >
            <Mail className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-purple-400" />
            <span className="text-purple-300 font-medium text-xs xs:text-sm sm:text-base">Get In Touch</span>
          </motion.div>
          
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
            Let's Build Something
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Amazing Together
            </span>
          </h2>
          
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed px-2 sm:px-4">
            Ready to transform your digital presence? Share your project details with us and let's create something extraordinary that drives real results for your business.
          </p>
        </motion.div>

        {/* Contact Form - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 border border-white/10 shadow-2xl">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="text-center mb-4 sm:mb-6 md:mb-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ duration: 0.6, delay: 0.9 }}
                      className="w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg xs:rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4"
                    >
                      <Mail className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 text-white" />
                    </motion.div>
                    <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-4">Send Us a Message</h3>
                    <p className="text-gray-400 text-xs xs:text-sm sm:text-base md:text-lg">
                      Tell us about your project and we'll get back to you within 24 hours
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all text-sm sm:text-base"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all text-sm sm:text-base"
                          placeholder="your@email.com"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                          Company Name
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all text-sm sm:text-base"
                          placeholder="Your company name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all text-sm sm:text-base"
                          placeholder="+91 98765 43210"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Project Type *
                        </label>
                        <select
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleInputChange}
                          className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all text-sm sm:text-base"
                          required
                        >
                          <option value="" className="bg-gray-800">Select a service</option>
                          {projectTypes.map((type) => (
                            <option key={type} value={type} className="bg-gray-800">
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Budget Range
                        </label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all text-sm sm:text-base"
                        >
                          <option value="" className="bg-gray-800">Select budget range</option>
                          {budgetRanges.map((range) => (
                            <option key={range} value={range} className="bg-gray-800">
                              {range}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Project Details *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all resize-none text-sm sm:text-base"
                        placeholder="Tell us about your project, goals, and any specific requirements..."
                        required
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3 sm:py-4 px-6 sm:px-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg sm:rounded-xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 ${
                        isSubmitting ? 'opacity-80 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-purple-500/25'
                      } text-sm sm:text-base`}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 sm:w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4 sm:w-5 h-5" />
                        </>
                      )}
                    </motion.button>

                    <div className="text-center">
                      <p className="text-xs sm:text-sm text-gray-400">
                        By submitting this form, you agree to our privacy policy and terms of service.
                      </p>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-center py-8 sm:py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                    className="w-16 h-16 sm:w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6"
                  >
                    <CheckCircle className="w-8 h-8 sm:w-10 h-10 text-white" />
                  </motion.div>
                  
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4"
                  >
                    Message Sent Successfully!
                  </motion.h3>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-gray-300 text-sm sm:text-base md:text-lg mb-6 sm:mb-8"
                  >
                    Thank you for reaching out! We'll get back to you within 24 hours.
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex items-center justify-center gap-2 text-purple-400 text-sm sm:text-base"
                  >
                    <Rocket className="w-4 h-4 sm:w-5 h-5" />
                    <span>We're excited to work with you!</span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
