import { useState, type KeyboardEvent } from 'react'
import { Button, Form } from 'react-bootstrap'
import { SendFill } from 'react-bootstrap-icons'

type Props = {
  disabled: boolean
  onSend: (text: string) => void
}

export function ChatInputMolecule({ disabled, onSend }: Props) {
  const [text, setText] = useState('')

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      submit()
    }
  }

  function submit() {
    const value = text.trim()

    if (value === '' || disabled) {
      return
    }

    setText('')
    onSend(value)
  }

  return (
    <div className="d-flex gap-2 align-items-end">
      <Form.Control
        as="textarea"
        disabled={disabled}
        maxLength={2000}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Tanyakan stok, pemindahan, atau penyesuaian..."
        rows={2}
        value={text}
      />
      <Button
        aria-label="Kirim"
        disabled={disabled || text.trim() === ''}
        onClick={submit}
      >
        <SendFill />
      </Button>
    </div>
  )
}
