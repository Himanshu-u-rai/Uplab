'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { 
  Send, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Calendar, 
  CheckCircle, 
  ArrowRight,
  Zap,
  Globe,
  Headphones,
  Star,
  Video,
  Smartphone,
  Users,
  Award,
  Shield,
  Rocket
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const contactMethods = [
  {
    icon: Phone,
    title: 'Call or WhatsApp',
    description: 'Direct line to our experts',
    value: '+91 98765 43210',
    action: 'Contact Now',
    gradient: 'from-green-500 to-emerald-500',
    available: '24/7 Support Available',
    benefits: ['Instant response', 'WhatsApp & call support', 'Technical guidance', 'Project consultation']
  },
  {
    icon: Mail,
    title: 'Email Discussion',
    description: 'Detailed project planning',
    value: 'hello@uplab.digital',
    action: 'Send Email',
    gradient: 'from-blue-500 to-cyan-500',
    available: 'Response within 2 hours',
    benefits: ['Detailed proposals', 'File attachments', 'Project documentation', 'Cost estimates']
  },
  {
    icon: Video,
    title: 'Video Consultation',
    description: 'Free strategy session',
    value: '30-min Free Meeting',
    action: 'Book Video Call',
    gradient: 'from-purple-500 to-pink-500',
    available: 'Mon-Fri 9 AM - 6 PM',
    benefits: ['Face-to-face meeting', 'Screen sharing', 'Live demo', 'Strategy planning']
  }
]

const formFields = [
  { name: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'Enter your full name', icon: Users },
  { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'your@email.com', icon: Mail },
  { name: 'company', label: 'Company/Organization', type: 'text', required: false, placeholder: 'Company name (optional)', icon: Globe },
  { name: 'phone', label: 'Phone Number', type: 'tel', required: false, placeholder: '+91 98765 43210', icon: Phone },
]

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

const companyStats = [
  { number: '150+', label: 'Projects Completed', icon: Rocket },
  { number: '98%', label: 'Client Satisfaction', icon: Star },
  { number: '50+', label: 'Team Members', icon: Users },
  { number: '24/7', label: 'Support Available', icon: Shield },
]

export default function EnhancedContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState(0)
  const [currentStep, setCurrentStep] = useState(1)
  const [focusedField, setFocusedField] = useState<string | null>(null)
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
    
    // Create email body
    const emailBody = `
New Project Inquiry

Contact Information:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Company: ${formData.company}

Project Details:
- Service Type: ${formData.projectType}
- Budget Range: ${formData.budget}
- Timeline: ${formData.timeline}

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
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        projectType: '',
        budget: '',
        timeline: '',
        message: '',
      })
    }, 3000)
  }

  // Auto-cycle through contact methods
  useEffect(() => {
    const timer = setInterval(() => {
      setSelectedMethod(prev => (prev + 1) % contactMethods.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  if (isSubmitted) {
    return (
      <section className="py-32 bg-gradient-to-br from-green-50 to-emerald-50 relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-2xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <CheckCircle className="w-12 h-12 text-white" />
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-black text-gray-900 mb-6"
            >
              Thank You!
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 mb-8"
            >
              Your message has been sent successfully. We'll get back to you within 24 hours.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                onClick={() => setIsSubmitted(false)}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 rounded-2xl"
              >
                Send Another Message
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="py-32 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-purple-500/5 to-transparent rounded-full" />
        
        {/* Floating Elements */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -80, -20],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600/20 to-cyan-600/20 backdrop-blur-xl border border-purple-500/20 text-purple-300 text-sm font-semibold mb-6"
          >
            <Zap className="w-5 h-5" />
            Let's Work Together
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight"
          >
            <span className="block">Ready to Start</span>
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Something Amazing?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Let's turn your vision into reality. Drop us a message and we'll get back to you 
            faster than you can say "digital transformation."
          </motion.p>
        </motion.div>

        {/* Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              onHoverStart={() => setSelectedMethod(index)}
              className={`relative p-6 rounded-2xl backdrop-blur-xl border transition-all duration-300 cursor-pointer group ${
                selectedMethod === index
                  ? 'bg-white/10 border-purple-400/50 shadow-lg'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-400/30'
              }`}
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${method.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <method.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2">{method.title}</h3>
              <p className="text-gray-400 text-sm mb-3">{method.description}</p>
              <p className="text-purple-300 font-semibold text-sm mb-3">{method.value}</p>
              <p className="text-gray-500 text-xs mb-4">{method.available}</p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-2 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  selectedMethod === index
                    ? `bg-gradient-to-r ${method.gradient} text-white`
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {method.action}
              </motion.button>

              {/* Active Indicator */}
              {selectedMethod === index && (
                <motion.div
                  layoutId="selectedMethod"
                  className={`absolute inset-0 bg-gradient-to-br ${method.gradient} opacity-10 rounded-2xl`}
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Main Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 md:p-12">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                Tell Us About Your Project
              </h3>
              <p className="text-gray-300">
                The more details you share, the better we can help you succeed.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="grid md:grid-cols-2 gap-6">
                {formFields.map((field, index) => (
                  <motion.div
                    key={field.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                    className="space-y-2"
                  >
                    <label className="block text-sm font-semibold text-gray-300">
                      {field.label} {field.required && <span className="text-pink-400">*</span>}
                    </label>
                    <div className="relative">
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField(field.name)}
                        onBlur={() => setFocusedField(null)}
                        placeholder={field.placeholder}
                        required={field.required}
                        className={`w-full px-4 py-4 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                          focusedField === field.name
                            ? 'border-purple-400 bg-white/10 shadow-lg'
                            : 'border-white/20 hover:border-white/30'
                        }`}
                      />
                      {focusedField === field.name && (
                        <motion.div
                          layoutId="focusIndicator"
                          className="absolute inset-0 border-2 border-purple-400 rounded-xl pointer-events-none"
                          initial={false}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Project Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.3 }}
                  className="space-y-2"
                >
                  <label className="block text-sm font-semibold text-gray-300">
                    Project Type
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
                  >
                    <option value="" className="bg-gray-800">Select a project type</option>
                    {projectTypes.map(type => (
                      <option key={type} value={type} className="bg-gray-800">{type}</option>
                    ))}
                  </select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  className="space-y-2"
                >
                  <label className="block text-sm font-semibold text-gray-300">
                    Budget Range
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
                  >
                    <option value="" className="bg-gray-800">Select budget range</option>
                    {budgetRanges.map(range => (
                      <option key={range} value={range} className="bg-gray-800">{range}</option>
                    ))}
                  </select>
                </motion.div>
              </div>

              {/* Timeline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.5 }}
                className="space-y-2"
              >
                <label className="block text-sm font-semibold text-gray-300">
                  Desired Timeline
                </label>
                <input
                  type="text"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  placeholder="e.g., ASAP, 2-3 months, Q2 2024"
                  className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
                />
              </motion.div>

              {/* Message */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.6 }}
                className="space-y-2"
              >
                <label className="block text-sm font-semibold text-gray-300">
                  Project Details <span className="text-pink-400">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder="Tell us about your project goals, requirements, and any specific features you need..."
                  required
                  className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300 resize-none"
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.7 }}
                className="text-center"
              >
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                  className="group relative px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.div
                        key="submitting"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-3"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Sending Message...
                      </motion.div>
                    ) : (
                      <motion.div
                        key="submit"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-3"
                      >
                        Send Message
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <Send className="w-5 h-5" />
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

                <p className="text-gray-400 text-sm mt-4">
                  We'll respond within 24 hours. Usually much sooner! ⚡
                </p>
              </motion.div>
            </form>
          </div>
        </motion.div>

        {/* Additional Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mt-20 text-center"
        >
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 text-gray-300">
              <MapPin className="w-5 h-5 text-purple-400" />
              <span>Mumbai, India</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-gray-300">
              <Clock className="w-5 h-5 text-purple-400" />
              <span>Mon-Fri, 9 AM - 6 PM EST</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-gray-300">
              <Headphones className="w-5 h-5 text-purple-400" />
              <span>24/7 Emergency Support</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
