'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  ChevronDown,
  HelpCircle,
  Clock,
  Zap,
  Shield,
  Rocket,
  Search,
  Terminal,
  Cpu,
  Codesandbox
} from 'lucide-react'
import SchemaComponent from '@/components/ui/schema-component'
import { createFAQSchema } from '@/lib/schema'

const faqCategories = [
  {
    id: 'general',
    name: 'General',
    icon: HelpCircle,
  },
  {
    id: 'services',
    name: 'Stack & Capabilities',
    icon: Cpu,
  },
  {
    id: 'pricing',
    name: 'Economics',
    icon: Codesandbox,
  },
  {
    id: 'process',
    name: 'Pipeline',
    icon: Rocket,
  },
  {
    id: 'support',
    name: 'Maintenance',
    icon: Shield,
  }
]

const faqs = [
  // General FAQs
  {
    id: 'Q-1001',
    category: 'general',
    question: 'What core engineering services does Uplab provide?',
    answer: 'We specialize in high-performance digital infrastructure, including custom web engineering (Next.js/React), distributed mobile ecosystems (Native/Flutter), and industrial-grade cloud architecture.'
  },
  {
    id: 'Q-1002',
    category: 'general',
    question: 'How does Uplab ensure project scalability?',
    answer: 'Every deployment is built on a micro-service or modular foundation. We utilize edge computing and global CDNs to ensure 99.9% availability regardless of user load.'
  },
  {
    id: 'Q-1003',
    category: 'general',
    question: 'Do you manage legacy system migration?',
    answer: 'Yes. Our senior engineering teams are experts in refactoring legacy monoliths into modern, scalable cloud architectures with zero data loss during transition.'
  },

  // Services FAQs
  {
    id: 'Q-2001',
    category: 'services',
    question: 'Which technologies power your web deployments?',
    answer: 'Our primary stack includes Next.js 15, TypeScript, Node.js, and PostgreSQL. We leverage Turbopack for rapid builds and Vercel/AWS for global distribution.'
  },
  {
    id: 'Q-2002',
    category: 'services',
    question: 'How do you handle mobile app security?',
    answer: 'We implement AES-256 encryption, biometric authentication, and strict SOC2-compliant data handling protocols for all mobile deployments.'
  },

  // Pricing FAQs
  {
    id: 'Q-3001',
    category: 'pricing',
    question: 'How is the deployment cost calculated?',
    answer: 'Pricing is based on engineering velocity, architectural complexity, and scaling requirements. We provide a transparent technical breakdown before initialization.'
  },
  {
    id: 'Q-3002',
    category: 'pricing',
    question: 'Are there recurring infrastructure costs?',
    answer: 'Infrastructure costs are typically billed at-cost through your chosen provider (AWS/GCP), while we offer managed DevOps support for continuous optimization.'
  },

  // Process FAQs
  {
    id: 'Q-4001',
    category: 'process',
    question: 'What is the standard development velocity?',
    answer: 'Initial MVP deployment typically occurs within 4-6 weeks. Successive feature sprints are managed in 2-week agile cycles with continuous CI/CD integration.'
  },
  {
    id: 'Q-4002',
    category: 'process',
    question: 'How is CI/CD integrated into our project?',
    answer: 'Every project includes a robust automated pipeline. Every commit undergoes unit testing and security scanning before being staged or deployed to production.'
  },

  // Support FAQs
  {
    id: 'Q-5001',
    category: 'support',
    question: 'What is your response protocol for critical alerts?',
    answer: 'For Tier-1 infra support, we maintain a <2 hour response time with dedicated engineers monitored by automated system health checks.'
  },
  {
    id: 'Q-5002',
    category: 'support',
    question: 'Do you provide platform monitoring?',
    answer: 'Yes, we integrate real-time monitoring tools like Sentry and Datadog to track system health, error rates, and user engagement metrics 24/7.'
  }
]

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState('general')
  const [openFAQ, setOpenFAQ] = useState<string | null>('Q-1001')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const filteredFAQs = faqs.filter(faq => faq.category === activeCategory)

  const faqSchema = createFAQSchema(
    faqs.map(faq => ({
      question: faq.question,
      answer: faq.answer
    }))
  )

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  return (
    <>
      <SchemaComponent schema={faqSchema} id="faq-schema" />

      <section ref={sectionRef} id="faq" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
        {/* Tech Grid Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(247,150,31,0.05),transparent_70%)]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="max-w-4xl mb-20 text-center mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
            >
              <Search className="w-3 h-3 text-[#f7961f]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/50">Knowledge Base v2.4</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight"
            >
              System <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f7961f] to-[#ffb347]">Documentation</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto font-light"
            >
              Technical specifications and operational protocols for our digital deployments.
            </motion.p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-16 max-w-5xl mx-auto">
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-mono transition-all border ${activeCategory === category.id
                    ? 'bg-[#f7961f] border-[#f7961f] text-black font-bold'
                    : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10 hover:text-white'
                  }`}
              >
                <category.icon className="w-4 h-4" />
                {category.name}
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {filteredFAQs.map((faq) => (
                  <div
                    key={faq.id}
                    className={`border transition-all duration-300 rounded-2xl overflow-hidden ${openFAQ === faq.id
                        ? 'border-[#f7961f]/40 bg-[#0f0f0f]'
                        : 'border-white/5 bg-transparent hover:border-white/10'
                      }`}
                  >
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full flex items-center justify-between p-6 text-left group"
                    >
                      <div className="flex items-center gap-4">
                        <span className="hidden md:block text-[10px] font-mono text-[#f7961f]/40 group-hover:text-[#f7961f] transition-colors">
                          {faq.id}
                        </span>
                        <h3 className={`text-lg font-bold transition-colors ${openFAQ === faq.id ? 'text-[#f7961f]' : 'text-white/80'
                          }`}>
                          {faq.question}
                        </h3>
                      </div>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFAQ === faq.id ? 'rotate-180 text-[#f7961f]' : 'text-white/20'
                        }`} />
                    </button>

                    <AnimatePresence>
                      {openFAQ === faq.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-6 pb-6 pl-6 md:pl-20">
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-sm leading-relaxed text-white/50">
                              <div className="flex items-center gap-2 mb-2 text-[#f7961f]/30">
                                <Terminal className="w-3 h-3" />
                                <span className="text-[9px] uppercase tracking-widest">Extended Data</span>
                              </div>
                              {faq.answer}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Support Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-20 max-w-3xl mx-auto p-8 rounded-3xl bg-[#f7961f] text-black flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Cpu className="w-24 h-24" />
            </div>

            <div className="relative z-10 text-center md:text-left">
              <h4 className="text-2xl font-black mb-2">Need a Technical Deep-Dive?</h4>
              <p className="font-medium opacity-70">Schedule a 1-on-1 session with our architectural leads.</p>
            </div>

            <button className="relative z-10 px-8 py-3 bg-black text-white font-bold rounded-full hover:scale-105 transition-transform whitespace-nowrap">
              Connect Now
            </button>
          </motion.div>
        </div>
      </section>
    </>
  )
}
