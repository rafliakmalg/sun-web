import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type AuthUser = {
  email: string | null
  id: number
  name: string
  role?: {
    id: number
    name: string
    label: string
  }
  username: string
}

type AuthState = {
  login: (token: string, user: AuthUser) => void
  logout: () => void
  setUser: (user: AuthUser) => void
  token: string | null
  user: AuthUser | null
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      login: (token, user) => set({ token, user }),
      logout: () => set({
        token: null,
        user: null,
      }),
      setUser: (user) => set({ user }),
    }),
    { name: 'auth' },
  ),
)
