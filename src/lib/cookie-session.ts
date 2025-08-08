import { cookies } from 'next/headers'
import crypto from 'crypto'

const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'default-secret'

// Simple session data structure
interface SessionData {
  created: number
  lastActivity: number
  ip: string
}

// Encrypt session data
function encryptSession(data: SessionData): string {
  const cipher = crypto.createCipher('aes-256-cbc', SESSION_SECRET)
  let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return encrypted
}

// Decrypt session data
function decryptSession(encryptedData: string): SessionData | null {
  try {
    const decipher = crypto.createDecipher('aes-256-cbc', SESSION_SECRET)
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return JSON.parse(decrypted)
  } catch {
    return null
  }
}

// Create a session token with embedded data
export async function createSession(ip: string): Promise<string> {
  const sessionData: SessionData = {
    created: Date.now(),
    lastActivity: Date.now(),
    ip: ip
  }
  
  // Create encrypted token
  const encryptedData = encryptSession(sessionData)
  const randomSuffix = crypto.randomBytes(8).toString('hex')
  return `${encryptedData}.${randomSuffix}`
}

// Validate and get session data from token
export async function validateSession(token: string): Promise<SessionData | null> {
  try {
    const [encryptedData] = token.split('.')
    if (!encryptedData) return null
    
    const sessionData = decryptSession(encryptedData)
    if (!sessionData) return null
    
    // Check if session is expired (24 hours)
    if (Date.now() - sessionData.created > 24 * 60 * 60 * 1000) {
      return null
    }
    
    return sessionData
  } catch {
    return null
  }
}

// Update session activity
export async function updateSession(token: string): Promise<string | null> {
  const sessionData = await validateSession(token)
  if (!sessionData) return null
  
  // Update last activity
  sessionData.lastActivity = Date.now()
  
  // Create new token with updated data
  const encryptedData = encryptSession(sessionData)
  const randomSuffix = crypto.randomBytes(8).toString('hex')
  return `${encryptedData}.${randomSuffix}`
}
