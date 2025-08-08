import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { User, UserType } from '@/types'
import { storage } from '@/lib/storage'
import { db, seedIfEmpty } from '@/data/mock'

const SESSION_KEY = 'vm_session'

type AuthContextValue = {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (payload: Omit<User, 'id'|'createdAt'|'verified'> & { password: string }) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    seedIfEmpty()
    const session = storage.get<User | null>(SESSION_KEY, null)
    setUser(session)
  }, [])

  const value = useMemo(() => ({
    user,
    async login(email: string, password: string) {
      const users = db.listUsers()
      const found = users.find(u => u.email === email && (u as any).password === password)
      if (found) {
        storage.set(SESSION_KEY, found)
        setUser(found)
        return true
      }
      return false
    },
    async register(payload) {
      const users = db.listUsers()
      if (users.some(u => u.email === payload.email)) return false
      const newUser: User = { id: `u_${Date.now()}`, createdAt: new Date().toISOString(), verified: false, ...payload }
      ;(newUser as any).password = payload.password
      users.push(newUser)
      db.saveUsers(users)
      storage.set(SESSION_KEY, newUser)
      setUser(newUser)
      return true
    },
    logout() {
      storage.remove(SESSION_KEY)
      setUser(null)
    }
  }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export function useRequireRole(roles?: UserType[]) {
  const { user } = useAuth()
  if (!roles) return !!user
  return !!user && roles.includes(user.type)
}
