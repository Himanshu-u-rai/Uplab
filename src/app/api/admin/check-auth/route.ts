import { NextRequest, NextResponse } from 'next/server'
import { checkAdminAuth } from '@/lib/admin-auth'
import { logSecurityEvent } from '@/lib/security'

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const connectingIP = request.headers.get('cf-connecting-ip')
  const ip = forwarded?.split(',')[0] || realIP || connectingIP || '127.0.0.1'
  return ip.trim()
}

export async function GET(request: NextRequest) {
  const clientIP = getClientIP(request)
  
  try {
    const isAuthenticated = await checkAdminAuth(clientIP)
    
    // Security headers
    const headers = new Headers()
    headers.set('X-Content-Type-Options', 'nosniff')
    headers.set('X-Frame-Options', 'DENY')
    headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    
    if (isAuthenticated) {
      return NextResponse.json(
        { authenticated: true },
        { headers }
      )
    } else {
      logSecurityEvent('AUTH_CHECK_FAILED', { ip: clientIP })
      return NextResponse.json(
        { authenticated: false },
        { status: 401, headers }
      )
    }
  } catch (error) {
    logSecurityEvent('AUTH_CHECK_ERROR', { 
      ip: clientIP,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    
    return NextResponse.json(
      { authenticated: false },
      { status: 500 }
    )
  }
}
