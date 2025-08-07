'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  AlertTriangle, 
  Clock, 
  Eye, 
  Server,
  Lock,
  CheckCircle,
  XCircle
} from 'lucide-react'

interface SecurityStats {
  activeSessions: number
  failedAttempts: number
  lastLoginTime: string
  securityLevel: 'high' | 'medium' | 'low'
  threatCount: number
}

export default function SecurityDashboard() {
  const [securityStats, setSecurityStats] = useState<SecurityStats>({
    activeSessions: 1,
    failedAttempts: 0,
    lastLoginTime: new Date().toISOString(),
    securityLevel: 'high',
    threatCount: 0
  })

  const securityChecks = [
    {
      name: 'Strong Password',
      status: true,
      description: 'Admin password meets security requirements'
    },
    {
      name: 'Rate Limiting',
      status: true,
      description: 'Login attempt rate limiting is active'
    },
    {
      name: 'Session Security',
      status: true,
      description: 'Secure HTTP-only cookies enabled'
    },
    {
      name: 'IP Monitoring',
      status: true,
      description: 'IP-based access control is active'
    },
    {
      name: 'Audit Logging',
      status: true,
      description: 'Security events are being logged'
    }
  ]

  const getSecurityLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'from-green-500 to-emerald-500'
      case 'medium': return 'from-yellow-500 to-orange-500'
      case 'low': return 'from-red-500 to-pink-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Security Status Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-xl p-6 border border-gray-700"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Shield className="w-6 h-6 text-green-400" />
            Security Status
          </h3>
          <div className={`px-4 py-2 rounded-lg bg-gradient-to-r ${getSecurityLevelColor(securityStats.securityLevel)} text-white font-semibold text-sm`}>
            {securityStats.securityLevel.toUpperCase()} SECURITY
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Eye className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Active Sessions</p>
                <p className="text-white font-bold text-lg">{securityStats.activeSessions}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Failed Attempts</p>
                <p className="text-white font-bold text-lg">{securityStats.failedAttempts}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Server className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Threats Blocked</p>
                <p className="text-white font-bold text-lg">{securityStats.threatCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Clock className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Last Login</p>
                <p className="text-white font-bold text-sm">
                  {new Date(securityStats.lastLoginTime).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Security Checks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gray-800 rounded-xl p-6 border border-gray-700"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Lock className="w-6 h-6 text-purple-400" />
          Security Checks
        </h3>

        <div className="space-y-4">
          {securityChecks.map((check, index) => (
            <motion.div
              key={check.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-700 rounded-lg"
            >
              <div className="flex items-center gap-3">
                {check.status ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400" />
                )}
                <div>
                  <h4 className="font-semibold text-white">{check.name}</h4>
                  <p className="text-sm text-gray-400">{check.description}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                check.status ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}>
                {check.status ? 'ACTIVE' : 'INACTIVE'}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Security Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-800 rounded-xl p-6 border border-gray-700"
      >
        <h3 className="text-xl font-bold text-white mb-4">Security Recommendations</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <AlertTriangle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
            <div>
              <p className="text-blue-400 font-semibold text-sm">Change Default Secrets</p>
              <p className="text-gray-300 text-sm">Update SESSION_SECRET and JWT_SECRET in production</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
            <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
            <div>
              <p className="text-green-400 font-semibold text-sm">Security Measures Active</p>
              <p className="text-gray-300 text-sm">All recommended security features are enabled</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
