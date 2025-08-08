import crypto from 'crypto'

const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'default-secret'

// Simple session data structure
interface SessionData {
  created: number
  lastActivity: number
  userId: string
}

// Create a simple base64 encoded token
function encodeSession(data: SessionData): string {
  try {
    const jsonString = JSON.stringify(data)
    return Buffer.from(jsonString).toString('base64')
  } catch (error) {
    console.error('Encoding error:', error)
    throw new Error('Failed to encode session data')
  }
}

// Decode session data
function decodeSession(token: string): SessionData | null {
  try {
    const jsonString = Buffer.from(token, 'base64').toString('utf8')
    return JSON.parse(jsonString)
  } catch (error) {
    console.error('Decoding error:', error)
    return null
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
    
    // Create base64 token with simple random suffix
    const encodedData = encodeSession(sessionData)
    const randomSuffix = Math.random().toString(36).substring(2, 10)
    return `${encodedData}.${randomSuffix}`
  } catch (error) {
    console.error('Session creation error:', error)
    throw new Error('Failed to create session')
  }
}

// Validate and get session data from token
export async function validateSession(token: string): Promise<SessionData | null> {
  try {
    if (!token || typeof token !== 'string') return null
    
    const [encodedData] = token.split('.')
    if (!encodedData) return null
    
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
    
    // Create new token with updated data
    const encodedData = encodeSession(sessionData)
    const randomSuffix = Math.random().toString(36).substring(2, 10)
    return `${encodedData}.${randomSuffix}`
  } catch (error) {
    console.error('Session update error:', error)
    return null
  }
}
