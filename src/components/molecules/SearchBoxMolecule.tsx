import { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'

type Props = {
  onChange: (value: string) => void
  placeholder?: string
  value: string
}

export function SearchBoxMolecule({ onChange, placeholder = 'Cari...', value }: Props) {
  const [text, setText] = useState(value)
  const [syncedValue, setSyncedValue] = useState(value)

  if (value !== syncedValue) {
    setSyncedValue(value)
    setText(value)
  }

  useEffect(() => {
    if (text === value) {
      return
    }

    const timer = setTimeout(() => onChange(text), 400)

    return () => clearTimeout(timer)
  }, [text, value, onChange])

  return (
    <Form.Control
      type="search"
      value={text}
      placeholder={placeholder}
      onChange={(event) => setText(event.target.value)}
    />
  )
}
