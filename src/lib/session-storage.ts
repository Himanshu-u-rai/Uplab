import { promises as fs } from 'fs'
import path from 'path'

const SESSION_FILE = path.join(process.cwd(), 'data', 'sessions.json')

interface SessionData {
  created: number
  lastActivity: number
  ip: string
}

interface SessionsStorage {
  [token: string]: SessionData
}

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.dirname(SESSION_FILE)
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// Read sessions from file
export async function readSessions(): Promise<SessionsStorage> {
  try {
    await ensureDataDir()
    const data = await fs.readFile(SESSION_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return {}
  }
}

// Write sessions to file
export async function writeSessions(sessions: SessionsStorage): Promise<void> {
  try {
    await ensureDataDir()
    await fs.writeFile(SESSION_FILE, JSON.stringify(sessions, null, 2))
  } catch (error) {
    console.error('Error writing sessions:', error)
  }
}

// Add a session
export async function addSession(token: string, data: SessionData): Promise<void> {
  const sessions = await readSessions()
  sessions[token] = data
  await writeSessions(sessions)
}

// Get a session
export async function getSession(token: string): Promise<SessionData | null> {
  const sessions = await readSessions()
  return sessions[token] || null
}

// Remove a session
export async function removeSession(token: string): Promise<void> {
  const sessions = await readSessions()
  delete sessions[token]
  await writeSessions(sessions)
}

// Clean up expired sessions
export async function cleanupExpiredSessions(): Promise<void> {
  const sessions = await readSessions()
  const now = Date.now()
  const expiredTokens: string[] = []
  
  for (const [token, session] of Object.entries(sessions)) {
    if (now - session.created > 24 * 60 * 60 * 1000) { // 24 hours
      expiredTokens.push(token)
    }
  }
  
  if (expiredTokens.length > 0) {
    for (const token of expiredTokens) {
      delete sessions[token]
    }
    await writeSessions(sessions)
  }
}

// Update session last activity
export async function updateSessionActivity(token: string): Promise<void> {
  const sessions = await readSessions()
  if (sessions[token]) {
    sessions[token].lastActivity = Date.now()
    await writeSessions(sessions)
  }
}

// Get all sessions count
export async function getSessionsCount(): Promise<number> {
  const sessions = await readSessions()
  return Object.keys(sessions).length
}
