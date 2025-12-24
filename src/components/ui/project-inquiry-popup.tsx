'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import {
  X,
  Send,
  Terminal,
  Cpu,
  ShieldCheck,
  Zap,
  Activity,
  ChevronRight,
  Monitor,
  Smartphone,
  Database,
  Code2
} from 'lucide-react'
import Image from 'next/image'

interface ProjectInquiryPopupProps {
  isOpen: boolean
  onClose: () => void
}

const protocolOptions = [
  { id: 'web', label: 'Web ecosystem', icon: Monitor, tag: 'PRTCOL_01' },
  { id: 'mobile', label: 'Mobile interface', icon: Smartphone, tag: 'PRTCOL_02' },
  { id: 'infra', label: 'Backend/Infra', icon: Database, tag: 'PRTCOL_03' },
  { id: 'ai', label: 'AI Integration', icon: Code2, tag: 'PRTCOL_04' },
]

export default function ProjectInquiryPopup({ isOpen, onClose }: ProjectInquiryPopupProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    protocol: '',
    description: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [sessionId, setSessionId] = useState('')

  useEffect(() => {
    setMounted(true)
    setSessionId(`UID_${Math.floor(Math.random() * 900000 + 100000)}`)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate system sync
    await new Promise(resolve => setTimeout(resolve, 2000))

    const emailBody = `
SYSTEM_SYNC_DATA:
- SESSION: ${sessionId}
- USR_NAME: ${formData.name}
- USR_EMAIL: ${formData.email}
- CORP_ID: ${formData.company}
- PRTCOL: ${formData.protocol}

ARCH_DOCS:
${formData.description}
    `.trim()

    const mailtoLink = `mailto:Himanshurai114@gmail.com?subject=[${sessionId}] Initialization Request from ${formData.name}&body=${encodeURIComponent(emailBody)}`
    window.location.href = mailtoLink

    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      onClose()
    }, 3000)
    setIsSubmitting(false)
  }

  if (!mounted) return null

  const popupContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
          />

          {/* Main Console */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            className="relative w-full max-w-4xl bg-[#0f0f0f] border border-white/10 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(247,150,31,0.1)] flex flex-col md:flex-row max-h-[90vh] md:max-h-none"
          >
            {/* Sidebar: System Specs */}
            <div className="md:w-72 bg-white/[0.02] border-r border-white/5 p-6 md:p-8 flex flex-col shrink-0">
              <div className="flex flex-col items-center mb-8 md:mb-12">
                <Image src="/images/logo-white.png" alt="Uplab" width={220} height={60} className="h-8 md:h-10 w-auto mb-2" />
                <span className="text-[10px] font-mono text-[#f7961f]/40 uppercase tracking-widest font-black">Architecture Lab</span>
              </div>

              <div className="space-y-6 md:space-y-8 flex-1 flex md:flex-col overflow-x-auto md:overflow-visible pb-4 md:pb-0 gap-4 md:gap-0">
                <div>
                  <span className="block text-[9px] font-mono text-white/20 uppercase tracking-widest mb-3">Sync Status</span>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-green-500/5 border border-green-500/10">
                    <Activity className="w-3 h-3 text-green-500" />
                    <span className="text-[11px] font-mono text-green-500 font-bold">READY_TO_SYNC</span>
                  </div>
                </div>

                <div>
                  <span className="block text-[9px] font-mono text-white/20 uppercase tracking-widest mb-3">System Identity</span>
                  <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/5 font-mono text-[11px] text-white/60">
                    {sessionId}
                  </div>
                </div>

                <div>
                  <span className="block text-[9px] font-mono text-white/20 uppercase tracking-widest mb-3">Security Protocol</span>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/5">
                    <ShieldCheck className="w-3 h-3 text-[#f7961f]" />
                    <span className="text-[11px] font-mono text-white/60">AES_256_ACTIVE</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 md:pt-8 border-t border-white/5 hidden md:block">
                <span className="block text-[9px] font-mono text-white/10 uppercase tracking-widest leading-relaxed">
                  By initializing, you agree to established data protocols.
                </span>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-[80vh] md:h-[auto] max-h-[90vh]">
              {/* Header */}
              <div className="px-8 py-6 bg-white/[0.03] border-b border-white/5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-white uppercase tracking-tight">Project_Initialization</h2>
                  <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mt-1">Terminal_v4.5-stable</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="sync-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-8"
                    >
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] pl-1 flex items-center gap-2">
                            <ChevronRight className="w-3 h-3 text-[#f7961f]" />
                            USR_IDENTIFIER
                          </label>
                          <input
                            required
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Full Name / Handle"
                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-white/10 focus:border-[#f7961f]/40 transition-all font-mono text-sm"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] pl-1 flex items-center gap-2">
                            <ChevronRight className="w-3 h-3 text-[#f7961f]" />
                            USR_TELEMETRY
                          </label>
                          <input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="Email Vector"
                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-white/10 focus:border-[#f7961f]/40 transition-all font-mono text-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] pl-1 flex items-center gap-2">
                          <ChevronRight className="w-3 h-3 text-[#f7961f]" />
                          ARCH_PROTOCOL
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {protocolOptions.map((opt) => (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, protocol: opt.id }))}
                              className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-3 group ${formData.protocol === opt.id
                                ? 'bg-[#f7961f] border-[#f7961f] text-black shadow-[0_0_20px_rgba(247,150,31,0.3)]'
                                : 'bg-white/[0.02] border-white/5 text-white/40 hover:border-white/20'
                                }`}
                            >
                              <opt.icon className={`w-5 h-5 ${formData.protocol === opt.id ? 'text-black' : 'text-white/20 group-hover:text-[#f7961f]'} transition-colors`} />
                              <span className="text-[9px] font-mono font-black uppercase text-center leading-tight">{opt.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] pl-1 flex items-center gap-2">
                          <ChevronRight className="w-3 h-3 text-[#f7961f]" />
                          ARCH_SPECIFICATIONS
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={formData.description}
                          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Describe your digital blueprint requirements..."
                          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-white/10 focus:border-[#f7961f]/40 transition-all font-mono text-sm resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative w-full bg-white text-black font-black py-5 rounded-[1.5rem] flex items-center justify-center gap-3 overflow-hidden transition-all active:scale-[0.98] disabled:opacity-50"
                      >
                        <div className="absolute inset-0 bg-[#f7961f] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        <span className="relative z-10 group-hover:text-white transition-colors flex items-center gap-3 uppercase tracking-widest text-xs">
                          {isSubmitting ? (
                            <>
                              <Zap className="w-4 h-4 animate-spin" />
                              SYNC_IN_PROGRESS
                            </>
                          ) : (
                            <>
                              INITIALIZE_SYNC
                              <ChevronRight className="w-4 h-4" />
                            </>
                          )}
                        </span>
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="h-full flex flex-col items-center justify-center py-12 text-center"
                    >
                      <div className="w-24 h-24 rounded-full bg-[#f7961f]/10 border border-[#f7961f]/20 flex items-center justify-center mb-8 relative">
                        <div className="absolute inset-0 rounded-full border border-[#f7961f] animate-ping opacity-20" />
                        <ShieldCheck className="w-10 h-10 text-[#f7961f]" />
                      </div>
                      <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-4">Transmission Successful</h3>
                      <p className="text-white/40 font-mono text-sm max-w-sm mb-8">
                        Your architectural request has been buffered into our priority queue. Response latency: {'<'} 24hr.
                      </p>
                      <div className="px-6 py-2 rounded-full bg-white/5 border border-white/5 font-mono text-[10px] text-white/20 uppercase tracking-[0.2em]">
                        Session Reference: {sessionId}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(247, 150, 31, 0.2);
        }
      `}</style>
    </AnimatePresence>
  )

  return createPortal(popupContent, document.body)
}
