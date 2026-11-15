import { useLayoutEffect, useRef, type ChangeEvent } from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import { useController, type FieldValues } from 'react-hook-form'
import { FieldFrameMolecule } from '@/components/molecules/FieldFrameMolecule'
import type { FieldProps } from '@/lib/fields'

type Props<T extends FieldValues> = FieldProps<T> & {
  decimals?: number
  suffix?: string
  placeholder?: string
}

function formatNumber(raw: string) {
  const [integer, decimal] = raw.split('.')
  const grouped = integer.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  return decimal === undefined ? grouped : `${grouped},${decimal}`
}

export function NumberFieldMolecule<T extends FieldValues>({
  control,
  name,
  label,
  decimals = 0,
  suffix,
  placeholder,
  autoFocus,
  compact,
  disabled,
  hideLabel,
}: Props<T>) {
  const { field, fieldState } = useController({ control, name })
  const input = useRef<HTMLInputElement | null>(null)
  const caret = useRef<number | null>(null)
  const raw = String(field.value ?? '')
  const display = formatNumber(raw)

  useLayoutEffect(() => {
    if (caret.current === null || !input.current) {
      return
    }

    let counted = 0
    let position = 0

    while (position < display.length && counted < caret.current) {
      if (/[\d,]/.test(display[position])) {
        counted++
      }

      position++
    }

    input.current.setSelectionRange(position, position)
    caret.current = null
  }, [display])

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const target = event.target
    const before = target.value.slice(0, target.selectionStart ?? target.value.length)

    caret.current = before.replace(/[^\d,]/g, '').length
    field.onChange(parseNumber(target.value, decimals))
  }

  function handleBlur() {
    field.onChange(raw.replace(/\.$/, ''))
    field.onBlur()
  }

  return (
    <FieldFrameMolecule
      id={name}
      label={label}
      error={fieldState.error?.message}
      compact={compact}
      hideLabel={hideLabel}
    >
      <InputGroup hasValidation>
        <Form.Control
          ref={(element: HTMLInputElement | null) => {
            input.current = element
            field.ref(element)
          }}
          id={name}
          name={field.name}
          value={display}
          inputMode="decimal"
          autoComplete="off"
          className="text-end"
          placeholder={placeholder}
          autoFocus={autoFocus}
          disabled={disabled}
          isInvalid={!!fieldState.error}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {suffix && <InputGroup.Text>{suffix}</InputGroup.Text>}
      </InputGroup>
    </FieldFrameMolecule>
  )
}

function parseNumber(input: string, decimals: number) {
  const hasComma = decimals > 0 && input.includes(',')
  const [integerPart, ...rest] = input.split(',')
  const integer = integerPart.replace(/\D/g, '').replace(/^0+(?=\d)/, '')
  const decimal = rest.join('').replace(/\D/g, '').slice(0, decimals)

  if (integer === '' && !hasComma) {
    return ''
  }

  return `${integer || '0'}${hasComma ? `.${decimal}` : ''}`
}
