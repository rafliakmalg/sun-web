import { useAuth } from '@/stores/auth'
import type { StreamEvent } from './types'

type StreamBody = {
  conversation_id?: string
  decisions?: Record<string, boolean>
  message?: string
}

type StreamHandlers = {
  onConversation: (id: string) => void
  onEvent: (event: StreamEvent) => void
}

function parseEvents(chunk: string): StreamEvent[] {
  const events: StreamEvent[] = []

  for (const line of chunk.split('\n')) {
    if (!line.startsWith('data: ')) {
      continue
    }

    const data = line.slice(6)

    if (data !== '[DONE]') {
      events.push(JSON.parse(data))
    }
  }

  return events
}

export async function streamChat(body: StreamBody, handlers: StreamHandlers) {
  const response = await fetch(`${import.meta.env.VITE_ASSISTANT_URL}/chat`, {
    body: JSON.stringify(body),
    headers: {
      Accept: 'text/event-stream',
      Authorization: `Bearer ${useAuth.getState().token}`,
      'Content-Type': 'application/json',
      'X-Site': import.meta.env.VITE_ASSISTANT_SITE,
    },
    method: 'POST',
  })

  if (response.status === 401) {
    useAuth.getState().logout()
  }

  if (!response.ok || !response.body) {
    const error = await response.json().catch(() => null)

    throw new Error(error?.message ?? 'Terjadi kesalahan.')
  }

  const conversationId = response.headers.get('X-Conversation-Id')

  if (conversationId) {
    handlers.onConversation(conversationId)
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()

    if (done) {
      break
    }

    buffer += decoder.decode(value, { stream: true })
    const chunks = buffer.split('\n\n')
    buffer = chunks.pop() ?? ''

    for (const chunk of chunks) {
      parseEvents(chunk).forEach(handlers.onEvent)
    }
  }
}
