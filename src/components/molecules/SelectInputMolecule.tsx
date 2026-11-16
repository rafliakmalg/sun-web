import type { Ref } from 'react'
import { Form } from 'react-bootstrap'
import type { FieldOption } from '@/utils'

type Props = {
  autoFocus?: boolean
  className?: string
  disabled?: boolean
  id?: string
  inputRef?: Ref<HTMLSelectElement>
  invalid?: boolean
  name?: string
  onBlur?: () => void
  onChange: (value: string) => void
  options: FieldOption[]
  placeholder?: string
  value: string
}

export function SelectInputMolecule({
  autoFocus,
  className,
  disabled,
  id,
  inputRef,
  invalid,
  name,
  onBlur,
  onChange,
  options,
  placeholder,
  value,
}: Props) {
  return (
    <Form.Select
      ref={inputRef}
      id={id}
      name={name}
      className={className}
      value={value}
      autoFocus={autoFocus}
      disabled={disabled}
      isInvalid={invalid}
      onBlur={onBlur}
      onChange={(event) => onChange(event.target.value)}
    >
      {placeholder !== undefined && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Form.Select>
  )
}
