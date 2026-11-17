import { useQuery } from '@tanstack/react-query'
import axios, { isAxiosError } from 'axios'
import { useAuth } from '@/stores/auth'
import { toMessages } from './history'
import type { ChatMessage, Conversation, StoredMessage } from './types'

const assistantApi = axios.create({
  baseURL: import.meta.env.VITE_ASSISTANT_URL,
  headers: {
    Accept: 'application/json',
    'X-Site': import.meta.env.VITE_ASSISTANT_SITE,
  },
})

assistantApi.interceptors.request.use((config) => {
  const token = useAuth.getState().token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

assistantApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError(error) && error.response?.status === 401) {
      useAuth.getState().logout()
    }

    return Promise.reject(error)
  },
)

export function errorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    return error.response?.data?.message ?? error.message
  }

  return error instanceof Error ? error.message : 'Terjadi kesalahan.'
}

export async function loadConversation(id: string): Promise<ChatMessage[]> {
  const response = await assistantApi.get<{ messages: { data: StoredMessage[] } }>(`/conversations/${id}`)

  return toMessages([...response.data.messages.data].reverse())
}

export function useReadConversations(enabled: boolean) {
  return useQuery({
    enabled,
    queryFn: async () => {
      const response = await assistantApi.get<{ data: Conversation[] }>('/conversations')

      return response.data.data
    },
    queryKey: ['assistant', 'conversations'],
  })
}
