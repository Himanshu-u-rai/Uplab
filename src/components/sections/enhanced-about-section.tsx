'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Sparkles, Zap, Shield, TrendingUp } from 'lucide-react'

const features = [
    {
        icon: Zap,
        title: 'Fast Delivery',
        description: 'Quick turnaround without compromising quality',
    },
    {
        icon: Shield,
        title: 'Reliable Support',
        description: '24/7 assistance for all your needs',
    },
    {
        icon: TrendingUp,
        title: 'Growth Focused',
        description: 'Solutions that scale with your business',
    },
]

export default function EnhancedAboutSection() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

    return (
        <section ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#f7961f 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Main Content */}
                <div className="max-w-6xl mx-auto">
                    {/* Top Section - Big Statement */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f7961f]/10 text-[#e07a00] text-sm font-semibold mb-4"
                        >
                            <Sparkles className="w-4 h-4" />
                            About Us
                        </motion.div>

                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            We Build{' '}
                            <span className="bg-gradient-to-r from-[#f7961f] to-[#e07a00] bg-clip-text text-transparent">
                                Digital Experiences
                            </span>
                        </h2>

                        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
                            Since 2022, we've helped businesses create digital products that convert visitors into customers.
                        </p>
                    </motion.div>

                    {/* Features Row */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="grid md:grid-cols-3 gap-6 mb-16"
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                                className="group text-center p-6 rounded-2xl bg-gray-50 hover:bg-gradient-to-br hover:from-[#f7961f]/5 hover:to-[#e07a00]/5 border border-transparent hover:border-[#f7961f]/20 transition-all duration-300"
                            >
                                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#f7961f] to-[#e07a00] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#f7961f]/20">
                                    <feature.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-600 text-sm">{feature.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Stats Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="bg-gradient-to-r from-[#242423] to-[#3d3d3c] rounded-2xl p-8 shadow-xl"
                    >
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { number: '15+', label: 'Projects Delivered' },
                                { number: '100%', label: 'Client Satisfaction' },
                                { number: '3+', label: 'Years Experience' },
                                { number: '24/7', label: 'Support Available' },
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#f7961f] to-[#ffb347] bg-clip-text text-transparent mb-1">
                                        {stat.number}
                                    </div>
                                    <div className="text-gray-400 text-sm">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
