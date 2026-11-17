import { Dropdown } from 'react-bootstrap'
import { ClockHistory } from 'react-bootstrap-icons'
import type { Conversation } from '@/features/assistant/types'

type Props = {
  activeId: string | null
  conversations: Conversation[]
  onSelect: (id: string) => void
}

export function ChatHistoryMolecule({ activeId, conversations, onSelect }: Props) {
  return (
    <Dropdown align="end">
      <Dropdown.Toggle
        aria-label="Riwayat percakapan"
        className="chat-icon-btn"
        size="sm"
        variant="outline-secondary"
      >
        <ClockHistory />
      </Dropdown.Toggle>
      <Dropdown.Menu style={{
        maxHeight: 360,
        maxWidth: 320,
        overflowY: 'auto',
      }}>
        {conversations.length === 0 && <Dropdown.ItemText className="text-muted">Belum ada percakapan.</Dropdown.ItemText>}
        {conversations.map((conversation) => (
          <Dropdown.Item
            active={conversation.id === activeId}
            className="text-truncate"
            key={conversation.id}
            onClick={() => onSelect(conversation.id)}
          >
            {conversation.title}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}
