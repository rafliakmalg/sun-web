import { useEffect } from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import { ArrowLeft, PlusLg } from 'react-bootstrap-icons'
import { Link, useParams } from 'react-router'
import { ChatInputMolecule } from '@/components/molecules/ChatInputMolecule'
import { ChatMessageListOrganism } from '@/components/organisms/ChatMessageListOrganism'
import { useAuth } from '@/stores/auth'
import { useReadConversations } from './api'
import { useChatStream } from './useChatStream'

export function AssistantPage() {
  const { id } = useParams()
  const user = useAuth((state) => state.user)
  const chat = useChatStream()
  const { data } = useReadConversations(true)
  const { load, reset } = chat

  useEffect(() => {
    if (id) {
      load(id)
    } else {
      reset()
    }
  }, [id, load, reset])

  return (
    <div className="d-flex vh-100">
      <aside
        className="d-flex flex-column border-end bg-white"
        style={{ width: 280 }}
      >
        <div className="p-3 border-bottom d-grid gap-2">
          <Link
            className="btn btn-sm btn-outline-secondary"
            to="/dashboard"
          >
            <ArrowLeft className="me-1" /> Kembali ke WMS
          </Link>
          <Button
            disabled={chat.busy}
            onClick={chat.reset}
          >
            <PlusLg className="me-1" /> Percakapan baru
          </Button>
        </div>
        <ListGroup
          className="flex-grow-1 overflow-auto rounded-0"
          variant="flush"
        >
          {(data ?? []).length === 0 && <div className="p-3 text-muted small">Belum ada percakapan.</div>}
          {(data ?? []).map((conversation) => (
            <ListGroup.Item
              action
              active={conversation.id === chat.conversationId}
              className="text-truncate"
              key={conversation.id}
              onClick={() => chat.load(conversation.id)}
            >
              {conversation.title}
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div className="p-3 border-top small text-truncate">
          <div className="fw-semibold">{user?.name}</div>
          <div className="text-muted">{user?.roles?.map((role) => role.label).join(', ')}</div>
        </div>
      </aside>
      <main className="flex-grow-1 d-flex flex-column bg-light" style={{ minWidth: 0 }}>
        <header className="bg-white border-bottom px-4 py-3 fw-semibold">Asisten WMS</header>
        <div className="flex-grow-1 overflow-auto p-4">
          <div className="mx-auto" style={{ maxWidth: 820 }}>
            <ChatMessageListOrganism
              busy={chat.busy}
              error={chat.error}
              messages={chat.messages}
              onApprove={() => chat.decide(true)}
              onReject={() => chat.decide(false)}
            />
          </div>
        </div>
        <div className="border-top bg-white p-3">
          <div className="mx-auto" style={{ maxWidth: 820 }}>
            <ChatInputMolecule
              disabled={chat.busy}
              onSend={chat.send}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
