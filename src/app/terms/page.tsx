'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, FileText, Scale, AlertTriangle, CheckCircle } from 'lucide-react'

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#242423] to-gray-900">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#f7961f]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#e07a00]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#f7961f] hover:text-[#ffb347] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-16 h-16 bg-gradient-to-r from-[#f7961f] to-[#e07a00] rounded-2xl flex items-center justify-center mx-auto mb-6"
            >
              <Scale className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms of Service</h1>
            <p className="text-xl text-gray-300">
              Please read these terms carefully before using our services.
            </p>
            <p className="text-sm text-gray-400 mt-4">Last updated: August 2, 2025</p>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
            <div className="prose prose-lg prose-invert max-w-none">
              
              {/* Introduction */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6 text-[#f7961f]" />
                  <h2 className="text-2xl font-bold text-white m-0">Agreement to Terms</h2>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  By accessing and using Uplab's website and services, you accept and agree to be bound by the terms 
                  and provision of this agreement. These Terms of Service govern your use of our website, services, 
                  and any related content or materials.
                </p>
              </div>

              {/* Services Description */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-[#f7961f]" />
                  <h2 className="text-2xl font-bold text-white m-0">Our Services</h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>Uplab provides digital agency services including but not limited to:</p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Website development and design</li>
                    <li>Mobile application development</li>
                    <li>Search engine optimization (SEO)</li>
                    <li>Digital marketing and advertising</li>
                    <li>Branding and creative services</li>
                    <li>Custom software development</li>
                    <li>UI/UX design services</li>
                  </ul>
                </div>
              </div>

              {/* User Responsibilities */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">User Responsibilities</h2>
                <div className="text-gray-300 space-y-3">
                  <p>When using our services, you agree to:</p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Provide accurate and complete information</li>
                    <li>Maintain the confidentiality of any account credentials</li>
                    <li>Use our services only for lawful purposes</li>
                    <li>Respect intellectual property rights</li>
                    <li>Not interfere with or disrupt our services</li>
                    <li>Comply with all applicable laws and regulations</li>
                  </ul>
                </div>
              </div>

              {/* Project Terms */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Project Terms and Deliverables</h2>
                <div className="text-gray-300 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Project Scope</h3>
                    <p>All projects will be clearly defined with scope, deliverables, timelines, and costs outlined in a separate project agreement or statement of work.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Client Responsibilities</h3>
                    <p>Clients are responsible for providing necessary content, feedback, and approvals in a timely manner to ensure project completion within agreed timelines.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Revisions and Changes</h3>
                    <p>Minor revisions are included as specified in project agreements. Major changes or additional work may require separate agreements and additional costs.</p>
                  </div>
                </div>
              </div>

              {/* Payment Terms */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Payment Terms</h2>
                <div className="text-gray-300 space-y-3">
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Payment terms will be specified in individual project agreements</li>
                    <li>Invoices are typically due within 30 days of receipt</li>
                    <li>Late payments may incur additional fees as specified in project agreements</li>
                    <li>Work may be suspended for accounts with overdue payments</li>
                    <li>All fees are non-refundable unless otherwise specified</li>
                  </ul>
                </div>
              </div>

              {/* Intellectual Property */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property</h2>
                <div className="text-gray-300 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Client Content</h3>
                    <p>Clients retain ownership of their original content, trademarks, and proprietary materials provided to us.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Developed Work</h3>
                    <p>Upon full payment, clients receive ownership rights to custom-developed work as specified in project agreements.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Third-Party Resources</h3>
                    <p>Some projects may include third-party resources, fonts, or plugins that retain their original licensing terms.</p>
                  </div>
                </div>
              </div>

              {/* Limitations and Disclaimers */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-orange-400" />
                  <h2 className="text-2xl font-bold text-white m-0">Limitations of Liability</h2>
                </div>
                <div className="text-gray-300 space-y-3">
                  <p>Our services are provided "as is" without warranties of any kind. We limit our liability as follows:</p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>We are not liable for indirect, incidental, or consequential damages</li>
                    <li>Our total liability is limited to the amount paid for specific services</li>
                    <li>We do not guarantee specific business results or outcomes</li>
                    <li>We are not responsible for third-party service failures or interruptions</li>
                  </ul>
                </div>
              </div>

              {/* Termination */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Termination</h2>
                <p className="text-gray-300 leading-relaxed">
                  Either party may terminate our service relationship with appropriate notice as specified in project agreements. 
                  Upon termination, payment for completed work is due, and we will provide deliverables for work completed 
                  to that point.
                </p>
              </div>

              {/* Governing Law */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Governing Law</h2>
                <p className="text-gray-300 leading-relaxed">
                  These terms are governed by and construed in accordance with applicable laws. Any disputes will be 
                  resolved through appropriate legal channels or alternative dispute resolution methods.
                </p>
              </div>

              {/* Contact Information */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
                <p className="text-gray-300 leading-relaxed">
                  If you have questions about these Terms of Service, please contact us through our website contact form. 
                  We will respond to your inquiry promptly.
                </p>
              </div>

              {/* Changes to Terms */}
              <div className="bg-orange-500/10 border border-orange-400/20 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Changes to Terms</h2>
                <p className="text-gray-300 leading-relaxed m-0">
                  We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately 
                  upon posting on our website. Your continued use of our services after changes are posted constitutes 
                  acceptance of the new terms.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

