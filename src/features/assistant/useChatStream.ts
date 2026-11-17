import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useRef, useState } from 'react'
import { errorMessage, loadConversation } from './api'
import { streamChat } from './stream'
import type { ChatMessage, StreamEvent, ToolPart, ToolState } from './types'

function interpret(text: string): boolean | null {
  const value = text.trim()

  if (/^(ya|iya|y|ok|oke|setuju|lanjut|lanjutkan|boleh|gas|siap|betul|benar)\b/i.test(value)) {
    return true
  }

  if (/^(tidak|nggak|enggak|gak|ga|batal|jangan|tolak|cancel)\b/i.test(value)) {
    return false
  }

  return null
}

function newId(): string {
  return crypto.randomUUID()
}

function withTool(message: ChatMessage, id: string, change: Partial<ToolPart>): ChatMessage {
  return {
    ...message,
    tools: message.tools.map((tool) => (tool.id === id ? { ...tool, ...change } : tool)),
  }
}

export function useChatStream() {
  const queryClient = useQueryClient()
  const conversationRef = useRef<string | null>(null)
  const messagesRef = useRef<ChatMessage[]>([])
  const [busy, setBusy] = useState(false)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])

  useEffect(() => {
    messagesRef.current = messages
  }, [messages])

  function apply(event: StreamEvent) {
    switch (event.type) {
      case 'error':
        setError('Asisten sedang bermasalah. Silakan coba lagi.')
        break
      case 'text-delta':
        updateLast((message) => ({
          ...message,
          text: message.text + (event.delta ?? ''),
        }))
        break
      case 'tool-approval-request':
        setTool(event.toolCallId, {
          reason: event.reason,
          state: 'approval',
        })
        break
      case 'tool-input-available':
        updateLast((message) => ({
          ...message,
          tools: [
            ...message.tools.filter((tool) => tool.id !== event.toolCallId),
            {
              arguments: event.input,
              id: event.toolCallId ?? newId(),
              name: event.toolName ?? '',
              state: 'running',
            },
          ],
        }))
        break
      case 'tool-output-available':
        setTool(event.toolCallId, { state: 'done' })
        break
      case 'tool-output-denied':
        setTool(event.toolCallId, { state: 'denied' })
        break
      case 'tool-output-error':
        setTool(event.toolCallId, { state: 'error' })
        break
    }
  }

  function append(text: string) {
    setMessages((previous) => [
      ...previous,
      {
        id: newId(),
        role: 'user',
        text,
        tools: [],
      },
      {
        id: newId(),
        role: 'assistant',
        text: '',
        tools: [],
      },
    ])
  }

  async function decide(approved: boolean, label?: string) {
    const last = messagesRef.current.at(-1)
    const pending = last?.tools.filter((tool) => tool.state === 'approval') ?? []

    if (pending.length === 0 || conversationRef.current === null) {
      return
    }

    const state: ToolState = approved ? 'running' : 'denied'

    pending.forEach((tool) => setTool(tool.id, { state }))
    append(label ?? (approved ? 'Ya' : 'Batal'))

    await run({
      conversation_id: conversationRef.current,
      decisions: Object.fromEntries(pending.map((tool) => [tool.id, approved])),
    })
  }

  const load = useCallback(async (id: string) => {
    conversationRef.current = id
    setConversationId(id)
    setError(null)

    try {
      setMessages(await loadConversation(id))
    } catch (failure) {
      setError(errorMessage(failure))
    }
  }, [])

  const reset = useCallback(() => {
    conversationRef.current = null
    setConversationId(null)
    setError(null)
    setMessages([])
  }, [])

  async function run(body: Parameters<typeof streamChat>[0]) {
    setBusy(true)
    setError(null)

    try {
      await streamChat(body, {
        onConversation: (id) => {
          conversationRef.current = id
          setConversationId(id)
        },
        onEvent: apply,
      })
    } catch (failure) {
      setError(errorMessage(failure))
    } finally {
      setBusy(false)
      queryClient.invalidateQueries()
    }
  }

  async function send(text: string) {
    const waiting = messagesRef.current.at(-1)?.tools.some((tool) => tool.state === 'approval') ?? false

    if (waiting) {
      const answer = interpret(text)

      if (answer === null) {
        setError('Jawab "ya" untuk melanjutkan atau "batal" untuk membatalkan aksi tadi.')
      } else {
        await decide(answer, text)
      }

      return
    }

    append(text)

    await run({
      conversation_id: conversationRef.current ?? undefined,
      message: text,
    })
  }

  function setTool(id: string | undefined, change: Partial<ToolPart>) {
    if (id) {
      setMessages((previous) => previous.map((message) => withTool(message, id, change)))
    }
  }

  function updateLast(change: (message: ChatMessage) => ChatMessage) {
    setMessages((previous) => previous.map((message, index) => (index === previous.length - 1 ? change(message) : message)))
  }

  return {
    busy,
    conversationId,
    decide,
    error,
    load,
    messages,
    reset,
    send,
  }
}
