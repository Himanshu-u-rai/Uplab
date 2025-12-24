'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowLeft,
  FileText,
  Scale,
  AlertTriangle,
  CheckCircle,
  Terminal,
  Cpu,
  Layers,
  Box,
  Gavel,
  ShieldAlert,
  ChevronRight,
  ClipboardList
} from 'lucide-react'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />

      {/* Background Infrastructure */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-[#f7961f]/5 to-transparent" />
      </div>

      <main className="relative z-10 pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-6xl">

          {/* Header Module */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <Gavel className="w-3 h-3 text-[#f7961f]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/50">Legal_Framework_v4.5</span>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 items-end">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight italic uppercase">
                  Service <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f7961f] to-[#ffb347]">Protocols</span>
                </h1>
                <p className="mt-6 text-white/40 text-lg font-light max-w-lg leading-relaxed">
                  Established engineering compliance and resource utilization boundaries for the Uplab global network.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-end gap-2"
              >
                <div className="px-4 py-2 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-[10px] text-white/40 uppercase tracking-widest">
                  Compliance: <span className="text-blue-400">ACTIVE_SYNC</span>
                </div>
                <div className="px-4 py-2 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-[10px] text-white/40 uppercase tracking-widest">
                  Last_Sync: <span className="text-[#f7961f]">DEC_24_2025</span>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-12">

            {/* Sidebar Indicies */}
            <aside className="lg:col-span-4 space-y-8 h-fit lg:sticky lg:top-32">
              <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/20 mb-6 flex items-center gap-2">
                  <Terminal className="w-3 h-3" />
                  Protocol_Registry
                </h3>
                <nav className="space-y-4">
                  {[
                    { id: 'T_01', name: 'Agreement_Handshake', href: '#handshake' },
                    { id: 'T_02', name: 'System_Resource_Access', href: '#access' },
                    { id: 'T_03', name: 'Identity_Validation', href: '#identity' },
                    { id: 'T_04', name: 'Liability_Mitigation', href: '#mitigation' },
                    { id: 'T_05', name: 'Node_Termination', href: '#termination' }
                  ].map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="group flex items-center justify-between py-2 border-b border-white/5 hover:border-[#f7961f]/30 transition-all font-mono"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-[#f7961f]/40 font-black">{item.id}</span>
                        <span className="text-sm font-bold text-white/60 group-hover:text-white transition-colors uppercase tracking-tight italic font-sans">{item.name}</span>
                      </div>
                      <ChevronRight className="w-3 h-3 text-white/10 group-hover:text-[#f7961f] transition-all" />
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="p-8 rounded-[2rem] bg-gradient-to-br from-[#f7961f]/10 to-transparent border border-[#f7961f]/10">
                <ShieldAlert className="w-6 h-6 text-[#f7961f] mb-4" />
                <h4 className="text-sm font-black text-white uppercase italic mb-2 tracking-tight">Legal Safeguard</h4>
                <p className="text-xs text-white/40 leading-relaxed font-light">
                  Continuous monitoring for protocol adherence ensures system stability for all Uplab network nodes.
                </p>
              </div>
            </aside>

            {/* Core Documentation */}
            <div className="lg:col-span-8 space-y-12">

              {/* Agreement */}
              <section id="handshake" className="relative p-6 md:p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                  <Box className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-2xl bg-[#f7961f]/10 border border-[#f7961f]/20">
                      <CheckCircle className="w-5 h-5 text-[#f7961f]" />
                    </div>
                    <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">Agreement Handshake</h2>
                  </div>
                  <p className="text-white/40 text-lg font-light leading-relaxed">
                    By initializing a session with Uplab infrastructure, USR_NODES acknowledge and finalize full compliance with this legal framework. Non-adherence leads to immediate buffer ejection.
                  </p>
                </div>
              </section>

              {/* Resource Access */}
              <section id="access" className="relative p-6 md:p-10 rounded-[2.5rem] bg-white/[0.01] border border-white/5">
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <Layers className="w-5 h-5 text-white/30" />
                  </div>
                  <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">System Access</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-10">
                  {[
                    { title: 'Core_Dev', label: 'Arch_Deployment' },
                    { title: 'Cloud_Infra', label: 'Scaling_Protocols' },
                    { title: 'SEO_ALGO', label: 'Indexed_Growth' },
                    { title: 'MBL_IFACE', label: 'Native_Integration' }
                  ].map(item => (
                    <div key={item.title} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="text-[10px] font-mono text-[#f7961f] uppercase tracking-widest mb-1">{item.title}</div>
                      <div className="text-sm font-bold text-white/80 italic">{item.label}</div>
                    </div>
                  ))}
                </div>

                <p className="text-white/40 text-sm font-light leading-relaxed">
                  Access to specialized engineering nodes (Web, Mobile, Cloud) is governed by specific project initialization documents, serving as supplemental protocols to this framework.
                </p>
              </section>

              {/* Requirements */}
              <section id="identity" className="relative p-6 md:p-10 rounded-[2.5rem] bg-white/[0.01] border border-white/5">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <ClipboardList className="w-5 h-5 text-white/30" />
                  </div>
                  <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">Identity Validation</h2>
                </div>
                <ul className="space-y-4">
                  {[
                    'Encryption-compliant telemetry provided during initialization',
                    'Maintenance of USR_NODE credential integrity',
                    'Strict utilization of resources for established lawful objectives',
                    'Non-interference with global system stability matrices'
                  ].map((point, i) => (
                    <li key={i} className="flex gap-4 p-4 rounded-xl bg-white/[0.01] border border-white/5">
                      <div className="text-[10px] font-mono text-[#f7961f] font-black">{i + 1}.0</div>
                      <span className="text-sm text-white/50">{point}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Mitigation */}
              <section id="mitigation" className="relative p-6 md:p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.02] to-transparent pointer-events-none" />
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-2xl bg-orange-500/10 border border-orange-500/20">
                    <AlertTriangle className="w-5 h-5 text-orange-400" />
                  </div>
                  <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">Liability Mitigation</h2>
                </div>
                <div className="space-y-4 font-mono text-[11px] text-white/30 uppercase tracking-widest leading-relaxed">
                  <p>[SYSTEM_DISCLAIMER]: ALL SERVICES DEPLOYED "AS_IS" WITHOUT WARRANTIES.</p>
                  <p>[LIMITATION_V1]: AGGREGATE LIABILITY NOT TO EXCEED TOTAL PAID USR_FUNDS.</p>
                  <p>[LIMITATION_V2]: NO RESPONSIBILITY FOR EXTERNAL API LATENCY OR DOWNTIME.</p>
                </div>
              </section>

              {/* Changes */}
              <section className="p-6 md:p-10 rounded-[2.5rem] bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/20">
                <div className="flex items-center gap-4 mb-6">
                  <Scale className="w-6 h-6 text-blue-400" />
                  <h2 className="text-xl font-black text-white uppercase italic tracking-tight">Sync Revisions</h2>
                </div>
                <p className="text-white/40 text-sm font-light leading-relaxed m-0">
                  We reserve the right to hot-fix or re-architect these protocols at our discretion. Deployment of new legal versions is effective immediately upon committing to the public portal.
                </p>
              </section>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
