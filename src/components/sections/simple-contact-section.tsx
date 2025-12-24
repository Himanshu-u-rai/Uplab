'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import {
  Send,
  Mail,
  CheckCircle,
  Terminal,
  Cpu,
  ShieldCheck,
  Zap,
  Clock,
  ChevronRight,
  Globe
} from 'lucide-react'

const projectTypes = [
  'Web Architecture (Next.js/TS)',
  'Mobile Ecosystems (Native/Flutter)',
  'Cloud Infrastructure (AWS/GCP)',
  'AI/ML Integration',
  'UI/UX Engineering',
  'Legacy Refactoring'
]

export default function SimpleContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [sessionId, setSessionId] = useState('')

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  useEffect(() => {
    setSessionId(`SES_${Math.floor(Math.random() * 900000 + 100000)}`)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate system processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    const emailBody = `
SYSTEM_INQUIRY_DATA:
- SESSION: ${sessionId}
- NAME: ${formData.name}
- EMAIL: ${formData.email}
- COMPANY: ${formData.company}
- TYPE: ${formData.projectType}

MESS_CONTENT:
${formData.message}
    `.trim()

    const mailtoLink = `mailto:Himanshurai114@gmail.com?subject=[${sessionId}] Project Inquiry from ${formData.name}&body=${encodeURIComponent(emailBody)}`
    window.location.href = mailtoLink

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <section ref={sectionRef} id="contact" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Infrastructure */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(247,150,31,0.08),transparent_70%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left Column: Technical Context */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8">
                  <Terminal className="w-3 h-3 text-[#f7961f]" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/50">Inquiry_Terminal_v1.0</span>
                </div>

                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight leading-tight">
                  Initialize <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f7961f] to-[#ffb347]">Project Sync</span>
                </h2>

                <p className="text-white/40 text-lg font-light leading-relaxed mb-12 max-w-md">
                  Establish a secure connection with our engineering team. We'll analyze your requirements and return a technical roadmap within 24 hours.
                </p>

                {/* Service Status Tiles */}
                <div className="space-y-4">
                  {[
                    { icon: Globe, label: 'Response Latency', val: '< 24hr', color: 'text-green-500' },
                    { icon: ShieldCheck, label: 'Encryption', val: 'AES-256', color: 'text-[#f7961f]' },
                    { icon: Cpu, label: 'Availability', val: '99.9%', color: 'text-blue-500' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-white/40" />
                      </div>
                      <div className="flex-1">
                        <div className="text-[10px] uppercase tracking-widest text-white/20 font-bold">{item.label}</div>
                        <div className={`text-sm font-mono font-bold ${item.color}`}>{item.val}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column: Terminal Interface */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              {/* Terminal Window Decoration */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#f7961f]/20 to-transparent rounded-[2.5rem] blur opacity-20" />

              <div className="relative bg-[#0f0f0f] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl">
                {/* Window Header */}
                <div className="px-8 py-4 bg-white/5 border-bottom border-white/5 flex items-center justify-between">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/20" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20" />
                  </div>
                  <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest">{sessionId}</div>
                </div>

                <div className="p-8 md:p-10">
                  <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                      <motion.form
                        key="contact-form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                      >
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-mono text-white/30 uppercase tracking-widest pl-1">USR_NAME</label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="Full Name"
                              required
                              className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-white/10 focus:border-[#f7961f]/40 transition-all focus:outline-none font-mono text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-mono text-white/30 uppercase tracking-widest pl-1">USR_EMAIL</label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="email@system.com"
                              required
                              className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-white/10 focus:border-[#f7961f]/40 transition-all focus:outline-none font-mono text-sm"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-mono text-white/30 uppercase tracking-widest pl-1">CORP_ID</label>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            placeholder="Company (Optional)"
                            className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-white/10 focus:border-[#f7961f]/40 transition-all focus:outline-none font-mono text-sm"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-mono text-white/30 uppercase tracking-widest pl-1">DEPLOY_TYPE</label>
                          <select
                            name="projectType"
                            value={formData.projectType}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-[#f7961f]/40 transition-all focus:outline-none font-mono text-sm appearance-none"
                          >
                            <option value="">Select Protocol</option>
                            {projectTypes.map(type => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-mono text-white/30 uppercase tracking-widest pl-1">MESS_CONTENT</label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Describe your architectural requirements..."
                            required
                            rows={4}
                            className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-white/10 focus:border-[#f7961f]/40 transition-all focus:outline-none font-mono text-sm resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="group relative w-full bg-gradient-to-r from-[#f7961f] to-[#e07a00] text-black font-black py-4 rounded-xl flex items-center justify-center gap-3 overflow-hidden transition-transform active:scale-[0.98] disabled:opacity-50"
                        >
                          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                          {isSubmitting ? (
                            <Zap className="w-5 h-5 animate-spin" />
                          ) : (
                            <>
                              <span className="relative z-10">INITIALIZE_CONNECTION</span>
                              <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </button>
                      </motion.form>
                    ) : (
                      <motion.div
                        key="success-message"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-12 text-center space-y-6"
                      >
                        <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto">
                          <CheckCircle className="w-10 h-10 text-green-500" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">Transmission Logic: Success</h3>
                          <p className="text-white/40 text-sm font-mono">Archive reference: {sessionId}</p>
                        </div>
                        <p className="text-white/60 leading-relaxed max-w-xs mx-auto">
                          Your technical request has been encrypted and buffered. Expect an engineering response within the local time window.
                        </p>
                        <button
                          onClick={() => setIsSubmitted(false)}
                          className="text-[#f7961f] text-xs font-mono font-bold uppercase tracking-widest hover:underline"
                        >
                          Send Another Transmission
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Terminal Metadata Footer */}
              <div className="mt-8 flex items-center justify-center gap-8 text-[9px] font-mono text-white/10 uppercase tracking-[0.3em]">
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  <span>Uptime: 24/7/365</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500/20 animate-pulse" />
                  <span>Signal: Strong</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
