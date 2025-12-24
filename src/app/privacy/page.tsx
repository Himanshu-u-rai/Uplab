'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowLeft,
  Shield,
  Eye,
  Lock,
  UserCheck,
  Binary,
  Terminal,
  Cpu,
  FileCode2,
  Activity,
  ShieldCheck,
  ChevronRight
} from 'lucide-react'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

export default function PrivacyPolicy() {
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
              <ShieldCheck className="w-3 h-3 text-[#f7961f]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/50">Security_Protocol_v3.0</span>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 items-end">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight italic uppercase">
                  Privacy <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f7961f] to-[#ffb347]">Architecture</span>
                </h1>
                <p className="mt-6 text-white/40 text-lg font-light max-w-lg leading-relaxed">
                  Encryption-first data handling protocols and transparency metrics for our global infrastructure operations.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-end gap-2"
              >
                <div className="px-4 py-2 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-[10px] text-white/40 uppercase tracking-widest">
                  Status: <span className="text-green-400">Mainframe_Secure</span>
                </div>
                <div className="px-4 py-2 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-[10px] text-white/40 uppercase tracking-widest">
                  Revision: <span className="text-[#f7961f]">DEC_2025_01</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Legal Grid System */}
          <div className="grid lg:grid-cols-12 gap-12">

            {/* Table of Contents / Telemetry */}
            <aside className="lg:col-span-4 space-y-8 h-fit lg:sticky lg:top-32">
              <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/20 mb-6 flex items-center gap-2">
                  <Terminal className="w-3 h-3" />
                  Archive_Index
                </h3>
                <nav className="space-y-4">
                  {[
                    { id: '01', name: 'Initialization', href: '#intro' },
                    { id: '02', name: 'Data_Ingestion', href: '#collection' },
                    { id: '03', name: 'Processing_Logic', href: '#usage' },
                    { id: '04', name: 'Node_Security', href: '#security' },
                    { id: '05', name: 'Sync_Protocol', href: '#updates' }
                  ].map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="group flex items-center justify-between py-2 border-b border-white/5 hover:border-[#f7961f]/30 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono text-[#f7961f]/40 font-black">{item.id}</span>
                        <span className="text-sm font-bold text-white/60 group-hover:text-white transition-colors uppercase tracking-tight italic">{item.name}</span>
                      </div>
                      <ChevronRight className="w-3 h-3 text-white/10 group-hover:text-[#f7961f] transition-all transform group-hover:translate-x-1" />
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="p-8 rounded-[2rem] bg-gradient-to-br from-[#f7961f]/10 to-transparent border border-[#f7961f]/10 translate-y-4">
                <Activity className="w-6 h-6 text-[#f7961f] mb-4" />
                <h4 className="text-sm font-black text-white uppercase italic mb-2 tracking-tight">Handshake Protocol</h4>
                <p className="text-xs text-white/40 leading-relaxed font-light">
                  Our servers utilize end-to-end encryption for all data packets transmitted through the registry interface.
                </p>
              </div>
            </aside>

            {/* Content Core */}
            <div className="lg:col-span-8 space-y-12">

              {/* Introduction */}
              <section id="intro" className="relative p-6 md:p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                  <Binary className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-2xl bg-[#f7961f]/10 border border-[#f7961f]/20">
                      <Eye className="w-5 h-5 text-[#f7961f]" />
                    </div>
                    <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">Initialization</h2>
                  </div>
                  <div className="prose prose-invert prose-p:text-white/40 prose-p:font-light prose-p:leading-relaxed max-w-none">
                    <p>
                      At Uplab, we architect our digital systems with a "privacy-by-design" philosophy. This registry document outlines the exact telemetry captured and the logic applied to user-generated data within our global infrastructure.
                    </p>
                  </div>
                </div>
              </section>

              {/* Tracking */}
              <section id="collection" className="relative p-6 md:p-10 rounded-[2.5rem] bg-white/[0.01] border border-white/5 group">
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <Cpu className="w-5 h-5 text-white/30" />
                  </div>
                  <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">Data Ingestion</h2>
                </div>

                <div className="space-y-8">
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                    <h3 className="text-sm font-black text-[#f7961f] uppercase tracking-widest mb-4">Manual Input Sync</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        'USR_IDENTIFIER (Full Name)',
                        'USR_COMM_CHANNEL (Email)',
                        'CORP_IDENTITY (Company)',
                        'PRTCOL_SPEC (Project Details)'
                      ].map(item => (
                        <li key={item} className="flex items-center gap-3 text-xs font-mono text-white/40">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#f7961f]/40" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                    <h3 className="text-sm font-black text-[#f7961f] uppercase tracking-widest mb-4">Auto-Telemetry</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        'IP_ADDRESS_VECTOR',
                        'HW_OPERATING_SYS',
                        'BRWS_SIGNATURE',
                        'ACCESS_TIMESTAMP'
                      ].map(item => (
                        <li key={item} className="flex items-center gap-3 text-xs font-mono text-white/40">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Security */}
              <section id="security" className="relative p-6 md:p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/[0.02] to-transparent pointer-events-none" />
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-2xl bg-green-500/10 border border-green-500/20">
                    <Shield className="w-5 h-5 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">Node Security</h2>
                </div>
                <p className="text-white/40 font-light leading-relaxed mb-8">
                  Multi-layer protection protocols including AES-256 bit encryption at rest and TLS 1.3 encryption in transit are deployed across all production clusters to eliminate unauthorized buffer access.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                    <Activity className="w-4 h-4 text-green-500" />
                    <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest">SOC2_Integrity_v4</span>
                  </div>
                  <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                    <Lock className="w-4 h-4 text-[#f7961f]" />
                    <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest">AES-256-GCM</span>
                  </div>
                </div>
              </section>

              {/* Updates */}
              <section id="updates" className="p-6 md:p-10 rounded-[2.5rem] bg-gradient-to-r from-[#f7961f]/10 to-transparent border border-[#f7961f]/20">
                <div className="flex items-center gap-4 mb-6">
                  <FileCode2 className="w-6 h-6 text-[#f7961f]" />
                  <h2 className="text-xl font-black text-white uppercase italic tracking-tight">Sync Refinement</h2>
                </div>
                <p className="text-white/60 text-sm font-light leading-relaxed m-0">
                  Infrastructure protocols are regularly updated to mitigate evolving threat vectors. Major sync refinements will be logged in the public ledger and transmitted to all active user nodes.
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
