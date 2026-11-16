import { useState, type KeyboardEvent, type Ref } from 'react'
import { Form } from 'react-bootstrap'
import { useDebounced } from '@/hooks/useDebounced'
import type { FieldOption, OptionSearch } from '@/utils'

type Props = {
  autoFocus?: boolean
  disabled?: boolean
  id?: string
  initialLabel?: string
  inputRef?: Ref<HTMLInputElement>
  invalid?: boolean
  name?: string
  onBlur?: () => void
  onChange: (value: string) => void
  placeholder?: string
  useSearch: OptionSearch
  value: string
}

export function AutocompleteInputMolecule({
  autoFocus,
  disabled,
  id,
  initialLabel = '',
  inputRef,
  invalid,
  name,
  onBlur,
  onChange,
  placeholder = 'Ketik untuk mencari...',
  useSearch,
  value,
}: Props) {
  const [text, setText] = useState('')
  const [typed, setTyped] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const [chosen, setChosen] = useState<FieldOption | null>(null)
  const needsLabel = !!value && !chosen && !initialLabel
  const { options, loading } = useSearch(useDebounced(typed ? text : ''), open || needsLabel)
  const selectedLabel =
    chosen?.value === value ? chosen.label : (options.find((option) => option.value === value)?.label ?? initialLabel)
  const shown = typed ? text : value ? selectedLabel : ''

  function choose(option: FieldOption) {
    onChange(option.value)
    setChosen(option)
    setTyped(false)
    setOpen(false)
  }

  function onInputBlur() {
    setOpen(false)
    setTyped(false)
    onBlur?.()
  }

  function onInputChange(next: string) {
    onChange('')
    setText(next)
    setTyped(true)
    setOpen(true)
    setActive(0)
  }

  function onInputKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setOpen(true)
      setActive((current) => Math.min(current + 1, options.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActive((current) => Math.max(current - 1, 0))
    } else if (event.key === 'Enter' && open && options[active]) {
      event.preventDefault()
      choose(options[active])
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div className="position-relative">
      <Form.Control
        ref={inputRef}
        id={id}
        name={name}
        value={shown}
        autoComplete="off"
        placeholder={placeholder}
        autoFocus={autoFocus}
        disabled={disabled}
        isInvalid={invalid}
        role="combobox"
        aria-expanded={open}
        onBlur={onInputBlur}
        onChange={(event) => onInputChange(event.target.value)}
        onFocus={() => setOpen(true)}
        onKeyDown={onInputKeyDown}
      />
      {open && (
        <div
          className="list-group position-absolute w-100 shadow"
          role="listbox"
          style={{
            zIndex: 1050,
            maxHeight: 240,
            overflowY: 'auto',
          }}
        >
          {loading && options.length === 0 && <div className="list-group-item text-muted">Memuat...</div>}
          {!loading && options.length === 0 && <div className="list-group-item text-muted">Tidak ditemukan</div>}
          {options.map((option, index) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={option.value === value}
              className={`list-group-item list-group-item-action ${index === active ? 'active' : ''}`}
              onMouseDown={(event) => event.preventDefault()}
              onMouseEnter={() => setActive(index)}
              onClick={() => choose(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
