'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import ProjectInquiryPopup from '@/components/ui/project-inquiry-popup'
import { useRef, useState } from 'react'
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  MessageSquare,
  Clock,
  DollarSign,
  Zap,
  Shield,
  Users,
  Rocket
} from 'lucide-react'
import SchemaComponent from '@/components/ui/schema-component'
import { createFAQSchema } from '@/lib/schema'

const faqCategories = [
  {
    id: 'general',
    name: 'General',
    icon: HelpCircle,
    color: 'from-[#f7961f] to-[#e07a00]'
  },
  {
    id: 'services',
    name: 'Services',
    icon: Zap,
    color: 'from-[#e07a00] to-[#f7961f]'
  },
  {
    id: 'pricing',
    name: 'Pricing',
    icon: DollarSign,
    color: 'from-[#f7961f] to-[#ffb347]'
  },
  {
    id: 'process',
    name: 'Process',
    icon: Rocket,
    color: 'from-[#242423] to-[#3d3d3c]'
  },
  {
    id: 'support',
    name: 'Support',
    icon: Shield,
    color: 'from-[#f7961f] to-[#e07a00]'
  }
]

const faqs = [
  // General FAQs
  {
    id: 1,
    category: 'general',
    question: 'What services does Uplab Digital Agency offer?',
    answer: 'We offer comprehensive digital services including custom website development, mobile app development, SEO optimization, and digital marketing campaigns. Our team specializes in modern technologies like Next.js, React, and mobile frameworks to deliver cutting-edge solutions for businesses of all sizes.'
  },
  {
    id: 2,
    category: 'general',
    question: 'How long has Uplab been in business?',
    answer: 'Uplab has been delivering exceptional digital solutions since 2020. Over the years, we\'ve completed 200+ projects, served clients across various industries, and built a reputation for quality, innovation, and client satisfaction.'
  },
  {
    id: 3,
    category: 'general',
    question: 'Do you work with businesses of all sizes?',
    answer: 'Absolutely! We work with everyone from startups and small businesses to large enterprises. Our flexible approach and scalable solutions ensure we can meet the unique needs and budgets of organizations at any stage of growth.'
  },

  // Services FAQs
  {
    id: 4,
    category: 'services',
    question: 'What technologies do you use for web development?',
    answer: 'We use cutting-edge technologies including Next.js, React, TypeScript, Node.js, and modern CSS frameworks like Tailwind. Our tech stack ensures your website is fast, secure, scalable, and future-proof. We also integrate with popular CMS platforms and e-commerce solutions.'
  },
  {
    id: 5,
    category: 'services',
    question: 'Can you develop both iOS and Android apps?',
    answer: 'Yes! We develop native iOS and Android apps as well as cross-platform solutions using React Native and Flutter. Our mobile development team ensures your app provides an excellent user experience across all devices and platforms.'
  },
  {
    id: 7,
    category: 'services',
    question: 'Do you provide ongoing maintenance and support?',
    answer: 'Yes, we offer comprehensive maintenance packages including security updates, performance monitoring, content updates, backup management, and technical support. Our goal is to ensure your digital assets continue performing optimally long after launch.'
  },

  // Pricing FAQs
  {
    id: 8,
    category: 'pricing',
    question: 'How much does a typical website cost?',
    answer: 'Website costs vary based on complexity, features, and requirements. Our projects typically range from ₹50K for simple websites to ₹20L+ for complex enterprise solutions. We provide detailed quotes after understanding your specific needs and objectives.'
  },
  {
    id: 9,
    category: 'pricing',
    question: 'Do you offer payment plans or financing options?',
    answer: 'Yes, we offer flexible payment structures including milestone-based payments, monthly installments, and custom payment plans. We understand cash flow is important for businesses, so we work with you to find a payment structure that works for your budget.'
  },
  {
    id: 10,
    category: 'pricing',
    question: 'Are there any hidden costs or ongoing fees?',
    answer: 'We believe in transparent pricing with no hidden costs. All expenses are clearly outlined in our proposals. The only ongoing costs would be optional maintenance packages, hosting (if we manage it), or additional features you request after project completion.'
  },
  {
    id: 11,
    category: 'pricing',
    question: 'What factors affect the project cost?',
    answer: 'Project costs depend on complexity, number of pages/features, custom functionality, integrations, design requirements, timeline, and ongoing support needs. We provide detailed breakdowns so you understand exactly what you\'re paying for.'
  },

  // Process FAQs
  {
    id: 12,
    category: 'process',
    question: 'What is your typical project timeline?',
    answer: 'Timelines vary by project scope. Simple websites take 2-4 weeks, complex web applications take 2-4 months, and mobile apps typically take 3-6 months. We provide detailed project timelines during our initial consultation and keep you updated throughout the process.'
  },
  {
    id: 13,
    category: 'process',
    question: 'How involved will I be in the development process?',
    answer: 'We believe in collaborative development! You\'ll be involved in initial planning, design reviews, milestone demonstrations, and feedback sessions. We provide regular updates and ensure you\'re comfortable with progress every step of the way.'
  },
  {
    id: 14,
    category: 'process',
    question: 'Do you provide project management and communication?',
    answer: 'Yes, each project includes dedicated project management with regular check-ins, progress reports, and clear communication channels. We use modern project management tools and provide client portals for real-time project visibility.'
  },
  {
    id: 15,
    category: 'process',
    question: 'What happens after my project is completed?',
    answer: 'After completion, we provide training, documentation, and a transition period to ensure you\'re comfortable managing your new digital asset. We also offer ongoing support packages and are always available for future enhancements or questions.'
  },

  // Support FAQs
  {
    id: 16,
    category: 'support',
    question: 'What kind of support do you provide post-launch?',
    answer: 'We provide comprehensive post-launch support including bug fixes, security updates, performance monitoring, content updates, technical assistance, and feature enhancements. Our support packages are tailored to your specific needs and budget.'
  },
  {
    id: 17,
    category: 'support',
    question: 'How quickly do you respond to support requests?',
    answer: 'We pride ourselves on responsive support! Critical issues are addressed within 2-4 hours, general support requests within 24 hours, and non-urgent inquiries within 48 hours. Emergency support is available for mission-critical applications.'
  },
  {
    id: 18,
    category: 'support',
    question: 'Can you help with hosting and domain management?',
    answer: 'Absolutely! We can help you choose the right hosting solution, manage domain registration and DNS settings, handle SSL certificates, and provide ongoing server management. We work with top hosting providers to ensure optimal performance.'
  },
  {
    id: 19,
    category: 'support',
    question: 'Do you provide training for our team?',
    answer: 'Yes, we provide comprehensive training sessions to help your team manage and update your digital assets. This includes content management training, basic troubleshooting, and best practices for maintaining your website or application.'
  }
]

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState('general')
  const [openFAQ, setOpenFAQ] = useState<number | null>(1) // Start with first FAQ open
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const filteredFAQs = faqs.filter(faq => faq.category === activeCategory)

  // Generate FAQ schema
  const faqSchema = createFAQSchema(
    faqs.map(faq => ({
      question: faq.question,
      answer: faq.answer
    }))
  )

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  return (
    <>
      {/* Schema Markup */}
      <SchemaComponent schema={faqSchema} id="faq-schema" />

      <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-[#f7961f]/5 rounded-full blur-2xl sm:blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-[#242423]/5 rounded-full blur-2xl sm:blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] bg-gradient-radial from-orange-100/20 to-transparent rounded-full" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f7961f]/10 text-[#e07a00] text-sm font-semibold mb-4"
            >
              <HelpCircle className="w-4 h-4" />
              FAQ
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
            >
              Frequently Asked{' '}
              <span className="bg-gradient-to-r from-[#f7961f] to-[#e07a00] bg-clip-text text-transparent">
                Questions
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto"
            >
              Find answers to common questions about our services and process.
            </motion.p>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 sm:mb-16"
          >
            {faqCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  onClick={() => setActiveCategory(category.id)}
                  className={`group relative px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 text-sm sm:text-base ${activeCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-md'
                    }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon className="w-4 h-4 sm:w-5 h-5" />
                    <span className="hidden xs:inline">{category.name}</span>
                  </span>

                  {activeCategory === category.id && (
                    <motion.div
                      layoutId="activeCategory"
                      className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-xl sm:rounded-2xl`}
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              )
            })}
          </motion.div>

          {/* FAQ Items */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 sm:space-y-6"
              >
                {filteredFAQs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full px-6 sm:px-8 py-6 sm:py-8 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                    >
                      <span className="text-base sm:text-lg font-semibold text-gray-900 pr-4">
                        {faq.question}
                      </span>
                      <motion.div
                        animate={{ rotate: openFAQ === faq.id ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0"
                      >
                        <ChevronDown className="w-5 h-5 sm:w-6 h-6 text-gray-500" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {openFAQ === faq.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0">
                            <div className="w-full h-px bg-gray-200 mb-6" />
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
      <ProjectInquiryPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </>
  )
}
