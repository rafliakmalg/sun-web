import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { useAuth, type AuthUser } from '@/stores/auth'
import type { LoginInput } from './schema'

type LoginResponse = {
  data: {
    token: string
    user: AuthUser
  }
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
    onSuccess: ({ token, user }) => login(token, user),
  })
}
