import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type AuthRole = {
  id: number
  label: string
  name: string
}

export type AuthUser = {
  email: string | null
  id: number
  name: string
  roles?: AuthRole[]
  username: string
}

type AuthState = {
  login: (token: string, user: AuthUser, permissions: string[]) => void
  logout: () => void
  permissions: string[]
  setSession: (user: AuthUser, permissions: string[]) => void
  token: string | null
  user: AuthUser | null
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      permissions: [],
      token: null,
      user: null,
      login: (token, user, permissions) => set({
        permissions,
        token,
        user,
      }),
      logout: () => set({
        permissions: [],
        token: null,
        user: null,
      }),
      setSession: (user, permissions) => set({
        permissions,
        user,
      }),
    }),
    {
      name: 'auth',
      version: 2,
      migrate: () => ({
        permissions: [],
        token: null,
        user: null,
      }),
    },
  ),
)
