import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminPassword, setAdminAuth } from '@/lib/admin-auth'
import { logSecurityEvent } from '@/lib/security'

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const connectingIP = request.headers.get('cf-connecting-ip') // Cloudflare
  const ip = forwarded?.split(',')[0] || realIP || connectingIP || '127.0.0.1'
  return ip.trim()
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  const clientIP = getClientIP(request)
  
  try {
    // Security headers
    const headers = new Headers()
    headers.set('X-Content-Type-Options', 'nosniff')
    headers.set('X-Frame-Options', 'DENY')
    headers.set('X-XSS-Protection', '1; mode=block')
    headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
    
    const body = await request.json()
    const { password } = body

    if (!password || typeof password !== 'string') {
      logSecurityEvent('LOGIN_ATTEMPT_INVALID_INPUT', { ip: clientIP })
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400, headers }
      )
    }

    // Verify password with enhanced security
    const verification = verifyAdminPassword(password, clientIP)
    
    if (!verification.success) {
      const response = NextResponse.json(
        { 
          error: verification.error,
          rateLimited: verification.rateLimited,
          remainingAttempts: verification.remainingAttempts,
          resetTime: verification.resetTime
        },
        { 
          status: verification.rateLimited ? 429 : 401,
          headers 
        }
      )
      
      return response
    }

    // Set authentication
    const authResult = await setAdminAuth(clientIP)
    
    if (!authResult.success) {
      logSecurityEvent('LOGIN_SUCCESS_BUT_AUTH_FAILED', { ip: clientIP })
      return NextResponse.json(
        { error: authResult.error || 'Authentication failed' },
        { status: 500, headers }
      )
    }

    logSecurityEvent('LOGIN_SUCCESS', { 
      ip: clientIP,
      duration: Date.now() - startTime,
      sessionToken: authResult.token?.substring(0, 8) + '...'
    })

    return NextResponse.json(
      { success: true },
      { status: 200, headers }
    )
    
  } catch (error) {
    logSecurityEvent('LOGIN_ERROR', { 
      ip: clientIP,
      error: error instanceof Error ? error.message : 'Unknown error',
      duration: Date.now() - startTime
    })
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
