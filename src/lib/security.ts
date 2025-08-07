import crypto from 'crypto'

// Rate limiting storage (in production, use Redis or database)
const rateLimitStore = new Map<string, { attempts: number; resetTime: number }>()

export interface SecurityConfig {
  maxAttempts: number
  windowMs: number
  allowedIPs: string[]
}

export function getSecurityConfig(): SecurityConfig {
  return {
    maxAttempts: parseInt(process.env.RATE_LIMIT_MAX_ATTEMPTS || '5'),
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
    allowedIPs: (process.env.ADMIN_IP_WHITELIST || '127.0.0.1,::1').split(',')
  }
}

export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (password.length < 12) {
    errors.push('Password must be at least 12 characters long')
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character')
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}

export function checkRateLimit(identifier: string): { allowed: boolean; remainingAttempts: number; resetTime: number } {
  const config = getSecurityConfig()
  const now = Date.now()
  const key = `rate_limit_${identifier}`
  
  const record = rateLimitStore.get(key)
  
  if (!record || now > record.resetTime) {
    // First attempt or window has reset
    const resetTime = now + config.windowMs
    rateLimitStore.set(key, { attempts: 1, resetTime })
    return {
      allowed: true,
      remainingAttempts: config.maxAttempts - 1,
      resetTime
    }
  }
  
  if (record.attempts >= config.maxAttempts) {
    return {
      allowed: false,
      remainingAttempts: 0,
      resetTime: record.resetTime
    }
  }
  
  record.attempts += 1
  rateLimitStore.set(key, record)
  
  return {
    allowed: true,
    remainingAttempts: config.maxAttempts - record.attempts,
    resetTime: record.resetTime
  }
}

export function isIPAllowed(ip: string): boolean {
  const config = getSecurityConfig()
  
  // Allow localhost and development IPs
  if (process.env.NODE_ENV === 'development') {
    return true
  }
  
  return config.allowedIPs.includes(ip) || 
         config.allowedIPs.includes('*') ||
         ip === '127.0.0.1' || 
         ip === '::1'
}

export function generateSecureToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

export function hashPassword(password: string, salt?: string): { hash: string; salt: string } {
  const actualSalt = salt || crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(password, actualSalt, 100000, 64, 'sha512').toString('hex')
  return { hash, salt: actualSalt }
}

export function verifyPasswordHash(password: string, hash: string, salt: string): boolean {
  const verifyHash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex')
  return hash === verifyHash
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim()
    .substring(0, 1000) // Limit length
}

export function logSecurityEvent(event: string, details: any, ip?: string): void {
  const timestamp = new Date().toISOString()
  const logEntry = {
    timestamp,
    event,
    details,
    ip: ip || 'unknown'
  }
  
  // In production, send to secure logging service
  console.log('[SECURITY]', JSON.stringify(logEntry))
}

// Clean up old rate limit records
setInterval(() => {
  const now = Date.now()
  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}, 300000) // Clean up every 5 minutes
