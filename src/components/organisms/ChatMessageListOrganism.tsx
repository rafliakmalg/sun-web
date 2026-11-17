import { useEffect, useRef } from 'react'
import { Alert } from 'react-bootstrap'
import type { ChatMessage } from '@/features/assistant/types'
import { ChatMessageMolecule } from '@/components/molecules/ChatMessageMolecule'

type Props = {
  busy: boolean
  error: string | null
  messages: ChatMessage[]
  onApprove: () => void
  onReject: () => void
}

export function ChatMessageListOrganism({ busy, error, messages, onApprove, onReject }: Props) {
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' })
  }, [messages, error])

  if (messages.length === 0 && !error) {
    return (
      <div className="h-100 d-flex align-items-center justify-content-center text-muted text-center px-3">
        Tanyakan sesuatu tentang stok barang, pemindahan, penyesuaian, atau pergerakan stok.
      </div>
    )
  }

  return (
    <div>
      {messages.map((message, index) => (
        <ChatMessageMolecule
          busy={busy}
          key={message.id}
          message={message}
          onApprove={onApprove}
          onReject={onReject}
          pending={busy && index === messages.length - 1}
        />
      ))}
      {error && <Alert variant="danger">{error}</Alert>}
      <div ref={endRef} />
    </div>
  )
}
