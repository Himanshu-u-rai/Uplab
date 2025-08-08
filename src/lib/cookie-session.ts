import crypto from 'crypto'

// Enforce a strong secret in production; use a dev fallback locally
const __SECRET = process.env.ADMIN_SESSION_SECRET
const __IS_PROD = process.env.NODE_ENV === 'production'
if (__IS_PROD && (!__SECRET || __SECRET.length < 16)) {
  throw new Error('ADMIN_SESSION_SECRET must be set to a strong value (>=16 chars) in production')
}
const SESSION_SECRET = __SECRET || 'dev-secret-change-me'

// Simple session data structure
interface SessionData {
  created: number
  lastActivity: number
  userId: string
}

// Base64URL helpers for cookie-safe encoding
function toBase64Url(input: Buffer | string): string {
  const b = Buffer.isBuffer(input) ? input : Buffer.from(input)
  return b.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function fromBase64Url(input: string): Buffer {
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (input.length % 4)) % 4)
  return Buffer.from(base64, 'base64')
}

// Create a base64url encoded payload
function encodeSession(data: SessionData): string {
  try {
    const jsonString = JSON.stringify(data)
    return toBase64Url(jsonString)
  } catch (error) {
    console.error('Encoding error:', error)
    throw new Error('Failed to encode session data')
  }
}

// Decode session data
function decodeSession(token: string): SessionData | null {
  try {
    const jsonString = fromBase64Url(token).toString('utf8')
    return JSON.parse(jsonString)
  } catch (error) {
    console.error('Decoding error:', error)
    return null
  }
}

// Sign the payload using HMAC-SHA256 with SESSION_SECRET
function sign(encodedPayload: string): string {
  const hmac = crypto.createHmac('sha256', SESSION_SECRET)
  hmac.update(encodedPayload)
  return toBase64Url(hmac.digest())
}

function verifySignature(encodedPayload: string, signature: string): boolean {
  try {
    const expected = sign(encodedPayload)
    // constant-time compare
    const a = fromBase64Url(expected)
    const b = fromBase64Url(signature)
    if (a.length !== b.length) return false
    return crypto.timingSafeEqual(a, b)
  } catch {
    return false
  }
}

// Create a session token with embedded data
export async function createSession(): Promise<string> {
  try {
    const sessionData: SessionData = {
      created: Date.now(),
      lastActivity: Date.now(),
      userId: 'admin'
    }
    
    // Create signed token: base64url(payload).base64url(signature).v1
    const encoded = encodeSession(sessionData)
    const sig = sign(encoded)
    const nonce = (crypto.randomUUID?.() || Math.random().toString(36).slice(2, 10))
    // include a nonce suffix to make tokens unique without affecting validation
    return `${encoded}.${sig}.${toBase64Url(nonce)}`
  } catch (error) {
    console.error('Session creation error:', error)
    throw new Error('Failed to create session')
  }
}

// Validate and get session data from token
export async function validateSession(token: string): Promise<SessionData | null> {
  try {
    if (!token || typeof token !== 'string') return null
    
    const parts = token.split('.')
    const encodedData = parts[0]
    const signature = parts[1]
    if (!encodedData || !signature) return null
    if (!verifySignature(encodedData, signature)) return null
    
    const sessionData = decodeSession(encodedData)
    if (!sessionData) return null
    
    // Check if session is expired (24 hours)
    const twentyFourHours = 24 * 60 * 60 * 1000
    if (Date.now() - sessionData.created > twentyFourHours) {
      return null
    }
    
    return sessionData
  } catch (error) {
    console.error('Session validation error:', error)
    return null
  }
}

// Update session activity
export async function updateSession(token: string): Promise<string | null> {
  try {
    const sessionData = await validateSession(token)
    if (!sessionData) return null
    
    // Update last activity
    sessionData.lastActivity = Date.now()
    
  // Create new signed token with updated payload
  const encoded = encodeSession(sessionData)
  const sig = sign(encoded)
  const nonce = (crypto.randomUUID?.() || Math.random().toString(36).slice(2, 10))
  return `${encoded}.${sig}.${toBase64Url(nonce)}`
  } catch (error) {
    console.error('Session update error:', error)
    return null
  }
}
