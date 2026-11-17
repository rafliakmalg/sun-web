import { Button, Spinner } from 'react-bootstrap'
import type { ChatMessage, ToolPart } from '@/features/assistant/types'

type Props = {
  busy: boolean
  message: ChatMessage
  onApprove: () => void
  onReject: () => void
  pending: boolean
}

function statusText(tool: ToolPart): string {
  if (tool.state === 'denied') {
    return 'Dibatalkan'
  }

  return tool.state === 'error' ? 'Gagal dijalankan' : 'Disetujui'
}

export function ChatMessageMolecule({ busy, message, onApprove, onReject, pending }: Props) {
  const isUser = message.role === 'user'
  const confirmations = message.tools.filter((tool) => tool.reason || tool.state === 'approval')
  const empty = message.text === '' && confirmations.length === 0

  if (empty && !pending) {
    return null
  }

  return (
    <div className={`d-flex mb-3 ${isUser ? 'justify-content-end' : 'justify-content-start'}`}>
      <div className={`chat-bubble rounded px-3 py-2 ${isUser ? 'bg-primary text-white' : 'bg-white border'}`}>
        {confirmations.map((tool) => (
          <div
            className={`border border-warning rounded bg-warning-subtle p-2 ${message.text ? 'mb-2' : ''}`}
            key={tool.id}
          >
            <div className="small fw-semibold">Mohon konfirmasi</div>
            <div>{tool.reason ?? 'Aksi ini perlu konfirmasi Anda.'}</div>
            {tool.state === 'approval' ? (
              <div className="mt-2">
                <div className="mb-2 fw-semibold">Lanjutkan?</div>
                <div className="d-flex gap-2">
                  <Button
                    disabled={busy}
                    onClick={onApprove}
                    size="sm"
                    variant="success"
                  >
                    Ya, lanjutkan
                  </Button>
                  <Button
                    disabled={busy}
                    onClick={onReject}
                    size="sm"
                    variant="outline-secondary"
                  >
                    Batal
                  </Button>
                </div>
              </div>
            ) : (
              <div className="small text-muted mt-1">{statusText(tool)}</div>
            )}
          </div>
        ))}
        {message.text}
        {empty && <Spinner animation="border" size="sm" />}
      </div>
    </div>
  )
}
