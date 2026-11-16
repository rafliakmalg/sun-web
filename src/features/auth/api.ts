import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useAuth, type AuthUser } from '@/stores/auth'
import { useLang, type Messages } from '@/stores/lang'
import { api, useGet } from '@/utils'
import type { LoginInput } from './schema'

type LoginResponse = {
  data: {
    lang: Messages
    token: string
    user: AuthUser
  }
}

type SessionResponse = {
  data: AuthUser
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

      return response.data.data
    },
    onSuccess: ({ lang, token, user }) => {
      useLang.getState().setMessages(lang)
      login(token, user)
    },
  })
}

export function useSession() {
  const { data } = useGet<SessionResponse>('/auth/me')

  useEffect(() => {
    if (data) {
      useLang.getState().setMessages(data.lang)
      useAuth.getState().setUser(data.data)
    }
  }, [data])
}
