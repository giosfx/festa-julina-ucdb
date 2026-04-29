import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from '@/types'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (token: string) => Promise<void>
  logout: () => void
  hasRole: (role: 'admin' | 'moderator' | 'viewer') => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        setUser({
          id: payload.sub,
          name: payload.name || payload.preferred_username,
          email: payload.email,
          roles: payload.realm_access?.roles || [],
        })
      } catch {
        localStorage.removeItem('token')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (token: string) => {
    localStorage.setItem('token', token)
    const payload = JSON.parse(atob(token.split('.')[1]))
    setUser({
      id: payload.sub,
      name: payload.name || payload.preferred_username,
      email: payload.email,
      roles: payload.realm_access?.roles || [],
    })
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const hasRole = (role: 'admin' | 'moderator' | 'viewer') => {
    return user?.roles.includes(role) ?? false
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
