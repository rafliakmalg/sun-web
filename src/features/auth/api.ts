import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useAuth, type AuthUser } from '@/stores/auth'
import { useLang, type Messages } from '@/stores/lang'
import { api, useGet } from '@/utils'
import type { LoginInput } from './schema'

type LoginResponse = {
  data: {
    lang: Messages
    permissions: string[]
    token: string
    user: AuthUser
  }
}

type SessionResponse = {
  data: AuthUser
  lang: Messages
  permissions: string[]
}

type WmsSessionResponse = {
  lang: Messages
}

export async function logout() {
  try {
    await api.post('/auth/logout')
  } finally {
    useAuth.getState().logout()
  }
}

export function useLogin() {
  const login = useAuth((state) => state.login)

  return useMutation({
    mutationFn: async (values: LoginInput) => {
      const response = await api.post<LoginResponse>('/auth/login', values)
      const session = response.data.data

      const wms = await api.get<WmsSessionResponse>('/wms/auth/me', {
        headers: { Authorization: `Bearer ${session.token}` },
      })

      return {
        ...session,
        lang: {
          ...session.lang,
          ...wms.data.lang,
        },
      }
    },
    onSuccess: ({ lang, permissions, token, user }) => {
      useLang.getState().setMessages(lang)
      login(token, user, permissions)
    },
  })
}

export function useSession() {
  const auth = useGet<SessionResponse>('/auth/me')
  const wms = useGet<WmsSessionResponse>('/wms/auth/me')

  useEffect(() => {
    if (auth.data && wms.data) {
      useLang.getState().setMessages({
        ...auth.data.lang,
        ...wms.data.lang,
      })
      useAuth.getState().setSession(auth.data.data, auth.data.permissions)
    }
  }, [auth.data, wms.data])
}
