export type ChatMessage = {
  id: string
  role: 'assistant' | 'user'
  text: string
  tools: ToolPart[]
}

export type Conversation = {
  id: string
  title: string
  updated_at: string
}

export type StoredMessage = {
  content: string
  id: string
  role: string
  steps: {
    tool_calls: StoredToolCall[]
  }[]
}

export type StoredToolCall = {
  approval_reason?: string | null
  arguments: unknown
  denied?: boolean
  failed?: boolean
  id: string
  name: string
  result?: unknown
}

export type StreamEvent = {
  delta?: string
  errorText?: string
  input?: unknown
  reason?: string | null
  toolCallId?: string
  toolName?: string
  type: string
}

export type ToolPart = {
  arguments: unknown
  id: string
  name: string
  reason?: string | null
  state: ToolState
}

export type ToolState = 'approval' | 'denied' | 'done' | 'error' | 'running'
