'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Shield, Eye, Lock, UserCheck } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
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
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6"
            >
              <Shield className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-xl text-gray-300">
              Your privacy is important to us. Learn how we protect and handle your information.
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
                  <Eye className="w-6 h-6 text-purple-400" />
                  <h2 className="text-2xl font-bold text-white m-0">Introduction</h2>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  At Uplab, we are committed to protecting your privacy and ensuring the security of your personal information. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit 
                  our website or use our services.
                </p>
              </div>

              {/* Information We Collect */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <UserCheck className="w-6 h-6 text-purple-400" />
                  <h2 className="text-2xl font-bold text-white m-0">Information We Collect</h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Personal Information</h3>
                    <p>When you contact us through our website, we may collect:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Name and contact information (email, phone number)</li>
                      <li>Company or organization details</li>
                      <li>Project requirements and preferences</li>
                      <li>Any other information you voluntarily provide</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Automatically Collected Information</h3>
                    <p>We may automatically collect certain technical information, including:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>IP address and browser information</li>
                      <li>Device and operating system details</li>
                      <li>Website usage patterns and analytics</li>
                      <li>Cookies and similar tracking technologies</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* How We Use Information */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-6 h-6 text-purple-400" />
                  <h2 className="text-2xl font-bold text-white m-0">How We Use Your Information</h2>
                </div>
                <div className="text-gray-300 space-y-3">
                  <p>We use the collected information for the following purposes:</p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>To respond to your inquiries and provide requested services</li>
                    <li>To communicate with you about projects and services</li>
                    <li>To improve our website functionality and user experience</li>
                    <li>To analyze website traffic and usage patterns</li>
                    <li>To comply with legal obligations and protect our rights</li>
                  </ul>
                </div>
              </div>

              {/* Information Sharing */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Information Sharing and Disclosure</h2>
                <div className="text-gray-300 space-y-3">
                  <p>We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:</p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>With your explicit consent</li>
                    <li>To trusted service providers who assist us in operating our website and business</li>
                    <li>When required by law or to protect our legal rights</li>
                    <li>In connection with a business transfer or merger</li>
                  </ul>
                </div>
              </div>

              {/* Data Security */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
                <p className="text-gray-300 leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your personal information 
                  against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over 
                  the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </div>

              {/* Your Rights */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Your Rights and Choices</h2>
                <div className="text-gray-300 space-y-3">
                  <p>You have the right to:</p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Access and review the personal information we have about you</li>
                    <li>Request correction of inaccurate or incomplete information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Opt-out of certain communications</li>
                    <li>Object to the processing of your personal information</li>
                  </ul>
                </div>
              </div>

              {/* Cookies */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Cookies and Tracking</h2>
                <p className="text-gray-300 leading-relaxed">
                  Our website uses cookies and similar tracking technologies to enhance your browsing experience, 
                  analyze website traffic, and understand where our visitors are coming from. You can control 
                  cookies through your browser settings, but disabling them may affect website functionality.
                </p>
              </div>

              {/* Contact Information */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
                <p className="text-gray-300 leading-relaxed">
                  If you have any questions about this Privacy Policy or our data practices, please contact us 
                  through our website contact form. We will respond to your inquiry within a reasonable timeframe.
                </p>
              </div>

              {/* Updates */}
              <div className="bg-purple-500/10 border border-purple-400/20 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Policy Updates</h2>
                <p className="text-gray-300 leading-relaxed m-0">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or 
                  applicable laws. We will notify you of any material changes by posting the updated policy on 
                  our website with a new effective date.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
