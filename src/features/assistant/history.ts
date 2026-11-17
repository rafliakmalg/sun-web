import type { ChatMessage, StoredMessage, StoredToolCall, ToolPart, ToolState } from './types'

function toolState(call: StoredToolCall): ToolState {
  if (call.denied) {
    return 'denied'
  }

  if (call.failed) {
    return 'error'
  }

  if ('result' in call) {
    return 'done'
  }

  return 'approval_reason' in call ? 'approval' : 'running'
}

function toTool(call: StoredToolCall): ToolPart {
  return {
    arguments: call.arguments,
    id: call.id,
    name: call.name,
    reason: call.approval_reason,
    state: toolState(call),
  }
}

export function toMessages(stored: StoredMessage[]): ChatMessage[] {
  return stored
    .filter((message) => message.role === 'assistant' || message.role === 'user')
    .map((message) => ({
      id: message.id,
      role: message.role as ChatMessage['role'],
      text: message.content,
      tools: message.steps.flatMap((step) => step.tool_calls).map(toTool),
    }))
}
