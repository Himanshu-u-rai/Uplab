import { NextRequest, NextResponse } from 'next/server'
import { clearAdminAuth } from '@/lib/admin-auth'
import { logSecurityEvent } from '@/lib/security'

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const connectingIP = request.headers.get('cf-connecting-ip')
  const ip = forwarded?.split(',')[0] || realIP || connectingIP || '127.0.0.1'
  return ip.trim()
}

export async function POST(request: NextRequest) {
  const clientIP = getClientIP(request)
  
  try {
    await clearAdminAuth(clientIP)
    
    logSecurityEvent('LOGOUT_SUCCESS', { ip: clientIP })
    
    // Security headers
    const headers = new Headers()
    headers.set('X-Content-Type-Options', 'nosniff')
    headers.set('X-Frame-Options', 'DENY')
    headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    
    return NextResponse.json(
      { success: true },
      { headers }
    )
  } catch (error) {
    logSecurityEvent('LOGOUT_ERROR', { 
      ip: clientIP,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    )
  }
}
