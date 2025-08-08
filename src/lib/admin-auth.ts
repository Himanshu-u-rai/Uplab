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
  addSession,
  getSession,
  removeSession,
  updateSessionActivity,
  cleanupExpiredSessions,
  getSessionsCount
} from './session-storage'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'
const ADMIN_SESSION_COOKIE = 'admin-session'
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'default-secret'

export async function checkAdminAuth(ip?: string): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const adminSession = cookieStore.get(ADMIN_SESSION_COOKIE)
    
    if (!adminSession?.value) {
      return false
    }
    
    // Verify session token exists and is valid
    const sessionData = await getSession(adminSession.value)
    if (!sessionData) {
      return false
    }
    
    // Check session expiry (24 hours)
    const now = Date.now()
    if (now - sessionData.created > 24 * 60 * 60 * 1000) {
      await removeSession(adminSession.value)
      return false
    }
    
    // Update last activity
    await updateSessionActivity(adminSession.value)
    
    // Log successful auth check
    if (ip) {
      logSecurityEvent('AUTH_CHECK_SUCCESS', { sessionAge: now - sessionData.created }, ip)
    }
    
    return true
  } catch (error) {
    logSecurityEvent('AUTH_CHECK_ERROR', { error: error instanceof Error ? error.message : 'Unknown error' })
    return false
  }
}

export async function setAdminAuth(ip: string): Promise<{ success: boolean; token?: string; error?: string }> {
  try {
    // Generate secure session token
    const sessionToken = generateSecureToken()
    const now = Date.now()
    
    // Store session data
    await addSession(sessionToken, {
      created: now,
      lastActivity: now,
      ip: ip
    })
    
    const cookieStore = await cookies()
    cookieStore.set(ADMIN_SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
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
      await removeSession(adminSession.value)
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

// Clean up expired sessions periodically
export async function performSessionCleanup(): Promise<void> {
  try {
    await cleanupExpiredSessions()
  } catch (error) {
    logSecurityEvent('SESSION_CLEANUP_ERROR', { error: error instanceof Error ? error.message : 'Unknown error' })
  }
}

export async function getActiveSessionsCount(): Promise<number> {
  return await getSessionsCount()
}

export async function getSessionInfo(token: string): Promise<{ created: number; lastActivity: number; ip: string } | null> {
  return await getSession(token)
}
