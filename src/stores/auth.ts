import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type AuthUser = {
  id: number
  name: string
  username: string
  email: string | null
  role?: {
    id: number
    name: string
    label: string
  }
}

type AuthState = {
  token: string | null
  user: AuthUser | null
  login: (token: string, user: AuthUser) => void
  logout: () => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      login: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
    }),
    { name: 'auth' },
  ),
)
