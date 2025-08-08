import { cookies } from 'next/headers'
import { 
  checkRateLimit, 
  isIPAllowed, 
  logSecurityEvent, 
  generateSecureToken,
  sanitizeInput,
  validatePassword
} from './security'
import {
  createSession,
  validateSession,
  updateSession
} from './cookie-session'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'
const ADMIN_SESSION_COOKIE = 'admin-session'

export async function checkAdminAuth(ip?: string): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const adminSession = cookieStore.get(ADMIN_SESSION_COOKIE)
    
    if (!adminSession?.value) {
      return false
    }
    
    // Validate session token
    const sessionData = await validateSession(adminSession.value)
    if (!sessionData) {
      return false
    }
    
    // Update session activity and get new token
    const newToken = await updateSession(adminSession.value)
    if (newToken) {
      cookieStore.set(ADMIN_SESSION_COOKIE, newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60, // 24 hours
        path: '/'
      })
    }
    
    // Log successful auth check
    if (ip) {
      logSecurityEvent('AUTH_CHECK_SUCCESS', { sessionAge: Date.now() - sessionData.created }, ip)
    }
    
    return true
  } catch (error) {
    logSecurityEvent('AUTH_CHECK_ERROR', { error: error instanceof Error ? error.message : 'Unknown error' })
    return false
  }
}

export async function setAdminAuth(ip: string): Promise<{ success: boolean; token?: string; error?: string }> {
  try {
    // Create session token with embedded data
    const sessionToken = await createSession()
    
    const cookieStore = await cookies()
    cookieStore.set(ADMIN_SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/'
    })
    
    logSecurityEvent('ADMIN_LOGIN_SUCCESS', { sessionToken: sessionToken.substring(0, 8) + '...' }, ip)
    
    return { success: true, token: sessionToken }
  } catch (error) {
    logSecurityEvent('AUTH_SET_ERROR', { error: error instanceof Error ? error.message : 'Unknown error' }, ip)
    return { success: false, error: 'Failed to create session' }
  }
}

export async function clearAdminAuth(ip?: string): Promise<void> {
  try {
    const cookieStore = await cookies()
    const adminSession = cookieStore.get(ADMIN_SESSION_COOKIE)
    
    if (adminSession?.value) {
      logSecurityEvent('ADMIN_LOGOUT', { sessionToken: adminSession.value.substring(0, 8) + '...' }, ip)
    }
    
    cookieStore.delete(ADMIN_SESSION_COOKIE)
  } catch (error) {
    logSecurityEvent('AUTH_CLEAR_ERROR', { error: error instanceof Error ? error.message : 'Unknown error' }, ip)
  }
}

export function verifyAdminPassword(password: string, ip: string): { 
  success: boolean; 
  error?: string; 
  rateLimited?: boolean;
  remainingAttempts?: number;
  resetTime?: number;
} {
  // Sanitize input
  const cleanPassword = sanitizeInput(password)
  
  // Check IP whitelist
  if (!isIPAllowed(ip)) {
    logSecurityEvent('LOGIN_ATTEMPT_BLOCKED_IP', { ip }, ip)
    return { 
      success: false, 
      error: 'Access denied from this IP address' 
    }
  }
  
  // Check rate limiting
  const rateLimit = checkRateLimit(`admin_login_${ip}`)
  if (!rateLimit.allowed) {
    logSecurityEvent('LOGIN_ATTEMPT_RATE_LIMITED', { 
      ip, 
      resetTime: rateLimit.resetTime 
    }, ip)
    
    return { 
      success: false, 
      error: 'Too many failed attempts. Try again later.',
      rateLimited: true,
      remainingAttempts: rateLimit.remainingAttempts,
      resetTime: rateLimit.resetTime
    }
  }
  
  // Validate password strength (for security awareness)
  const validation = validatePassword(cleanPassword)
  
  // Check password
  const isValid = cleanPassword === ADMIN_PASSWORD
  
  if (!isValid) {
    logSecurityEvent('LOGIN_ATTEMPT_FAILED', { 
      ip, 
      passwordLength: cleanPassword.length,
      remainingAttempts: rateLimit.remainingAttempts 
    }, ip)
    
    return { 
      success: false, 
      error: 'Invalid password',
      remainingAttempts: rateLimit.remainingAttempts,
      resetTime: rateLimit.resetTime
    }
  }
  
  // Log successful password verification
  logSecurityEvent('PASSWORD_VERIFIED', { ip }, ip)
  
  return { success: true }
}

// Session cleanup is automatic with cookie expiration
export async function performSessionCleanup(): Promise<void> {
  // No longer needed - cookies expire automatically
  logSecurityEvent('SESSION_CLEANUP_SKIPPED', { reason: 'Cookie-based sessions expire automatically' })
}

export async function getActiveSessionsCount(): Promise<number> {
  // Cannot count active sessions with cookie-based storage
  return 0
}

export async function getSessionInfo(token: string): Promise<{ created: number; lastActivity: number; userId: string } | null> {
  return await validateSession(token)
}
