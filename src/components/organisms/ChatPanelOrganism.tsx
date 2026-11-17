import { useState } from 'react'
import { Button, Offcanvas } from 'react-bootstrap'
import { ChatDotsFill, PlusLg } from 'react-bootstrap-icons'
import { ChatHistoryMolecule } from '@/components/molecules/ChatHistoryMolecule'
import { ChatInputMolecule } from '@/components/molecules/ChatInputMolecule'
import { useReadConversations } from '@/features/assistant/api'
import { useChatStream } from '@/features/assistant/useChatStream'
import { ChatMessageListOrganism } from './ChatMessageListOrganism'

export function ChatPanelOrganism() {
  const [open, setOpen] = useState(false)
  const chat = useChatStream()
  const { data } = useReadConversations(open)

  return (
    <>
      {!open && (
        <Button
          aria-label="Buka asisten"
          className="chat-launcher rounded-circle p-3 shadow"
          onClick={() => setOpen(true)}
        >
          <ChatDotsFill size={22} />
        </Button>
      )}
      <Offcanvas
        backdrop={false}
        onHide={() => setOpen(false)}
        placement="end"
        scroll
        show={open}
        style={{ width: 440, maxWidth: '100vw' }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="me-auto">Asisten WMS</Offcanvas.Title>
          <div className="d-flex gap-2 me-2">
            <Button
              aria-label="Percakapan baru"
              disabled={chat.busy}
              onClick={chat.reset}
              size="sm"
              variant="outline-secondary"
            >
              <PlusLg />
            </Button>
            <ChatHistoryMolecule
              activeId={chat.conversationId}
              conversations={data ?? []}
              onSelect={chat.load}
            />
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column p-0">
          <div className="flex-grow-1 overflow-auto p-3">
            <ChatMessageListOrganism
              busy={chat.busy}
              error={chat.error}
              messages={chat.messages}
              onApprove={() => chat.decide(true)}
              onReject={() => chat.decide(false)}
            />
          </div>
          <div className="border-top p-3">
            <ChatInputMolecule
              disabled={chat.busy}
              onSend={chat.send}
            />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}
