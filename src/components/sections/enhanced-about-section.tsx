'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
    Terminal,
    Cpu,
    Activity,
    ShieldCheck,
    Network,
    Binary,
    GitBranch,
    Database
} from 'lucide-react'

const companySpecs = [
    {
        icon: Binary,
        title: 'Code Excellence',
        description: 'Our engineering protocols prioritize performance, security, and long-term maintainability.',
        tag: 'Protocol: ALPHA-01'
    },
    {
        icon: Network,
        title: 'Interconnected UX',
        description: 'We build digital ecosystems where front-end elegance meets robust back-end architecture.',
        tag: 'Protocol: NODE-SYNC'
    },
    {
        icon: GitBranch,
        title: 'Agile Velocity',
        description: 'Rapid deployment cycles with zero-downtime integration for your mission-critical products.',
        tag: 'Protocol: CI/CD'
    }
]

export default function EnhancedAboutSection() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

    return (
        <section ref={sectionRef} id="about" className="py-24 bg-[#fafafa] relative overflow-hidden">
            {/* Structural Decor - Blueprint style */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute top-1/2 left-0 right-0 h-px bg-black" />
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-12 gap-16 items-start">

                    {/* Left Column: Mission & Identity */}
                    <div className="lg:col-span-5">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 mb-8">
                                <Terminal className="w-3 h-3 text-[#f7961f]" />
                                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-black/50">Who_we_are.sys</span>
                            </div>

                            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 tracking-tight leading-tight">
                                Engineering <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f7961f] to-[#e07a00]">Digital Core</span>
                            </h2>

                            <p className="text-gray-600 text-lg md:text-xl font-light leading-relaxed mb-10">
                                Since 2022, we have been operating at the intersection of complex problem solving and sophisticated user interface design. We don't just build websites; we architect digital assets.
                            </p>

                            {/* Technical Stat Panel */}
                            <div className="p-8 rounded-3xl bg-white border border-black/[0.08] shadow-sm relative overflow-hidden group">
                                <div className="grid grid-cols-2 gap-8 relative z-10">
                                    <div>
                                        <div className="text-3xl font-black text-gray-900 font-mono">250+</div>
                                        <div className="text-[10px] uppercase tracking-widest text-black/40 font-bold">Successful Commits</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-black text-gray-900 font-mono">100%</div>
                                        <div className="text-[10px] uppercase tracking-widest text-black/40 font-bold">Uptime Delivery</div>
                                    </div>
                                </div>
                                {/* Decorative scanning line */}
                                <motion.div
                                    animate={{ left: ['-100%', '200%'] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                    className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-[#f7961f]/5 to-transparent skew-x-12"
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Protocols & Values */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-6"
                        >
                            {companySpecs.map((spec, index) => (
                                <div
                                    key={index}
                                    className="p-8 rounded-3xl border border-black/[0.08] bg-white shadow-sm hover:shadow-2xl hover:shadow-[#f7961f]/10 hover:border-[#f7961f]/30 transition-all duration-500 group"
                                >
                                    <div className="flex flex-col md:flex-row gap-6 items-start">
                                        <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center text-[#f7961f] group-hover:scale-110 transition-transform duration-500">
                                            <spec.icon className="w-7 h-7" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="text-[10px] font-mono text-black/20 font-bold uppercase tracking-wider">{spec.tag}</span>
                                                <div className="flex-1 h-px bg-black/[0.05]" />
                                            </div>
                                            <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-[#f7961f] transition-colors">{spec.title}</h3>
                                            <p className="text-gray-500 leading-relaxed font-medium">
                                                {spec.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Dynamic Infrastructure Footer */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-24 pt-12 border-t border-black/[0.05] flex flex-wrap justify-center gap-12"
                >
                    <div className="flex items-center gap-3 text-black/30 group">
                        <Cpu className="w-5 h-5 group-hover:text-[#f7961f] transition-colors" />
                        <span className="text-[11px] font-mono font-bold uppercase tracking-[0.3em]">State_of_the_art_stack</span>
                    </div>
                    <div className="flex items-center gap-3 text-black/30 group">
                        <ShieldCheck className="w-5 h-5 group-hover:text-[#f7961f] transition-colors" />
                        <span className="text-[11px] font-mono font-bold uppercase tracking-[0.3em]">Soc2_Compliant_Ops</span>
                    </div>
                    <div className="flex items-center gap-3 text-black/30 group">
                        <Activity className="w-5 h-5 group-hover:text-[#f7961f] transition-colors" />
                        <span className="text-[11px] font-mono font-bold uppercase tracking-[0.3em]">Real_time_Analytics</span>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
