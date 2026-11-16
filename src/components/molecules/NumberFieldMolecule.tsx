import { useLayoutEffect, useRef, type ChangeEvent } from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import { useController, type FieldValues } from 'react-hook-form'
import { FieldFrameMolecule } from '@/components/molecules/FieldFrameMolecule'
import type { FieldProps } from '@/utils'

type Props<T extends FieldValues> = FieldProps<T> & {
  allowNegative?: boolean
  decimals?: number
  placeholder?: string
  suffix?: string
}

function formatNumber(raw: string) {
  const sign = raw.startsWith('-') ? '-' : ''
  const [integer, decimal] = raw.slice(sign.length).split('.')
  const grouped = integer.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  return `${sign}${decimal === undefined ? grouped : `${grouped},${decimal}`}`
}

export function NumberFieldMolecule<T extends FieldValues>({
  allowNegative,
  autoFocus,
  compact,
  control,
  decimals = 0,
  disabled,
  hideLabel,
  label,
  name,
  placeholder,
  suffix,
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

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    const target = event.target
    const before = target.value.slice(0, target.selectionStart ?? target.value.length)

    caret.current = before.replace(/[^\d,]/g, '').length
    field.onChange(parseNumber(target.value, decimals, allowNegative))
  }

  function onInputBlur() {
    field.onChange(raw === '-' ? '' : raw.replace(/\.$/, ''))
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
          onBlur={onInputBlur}
          onChange={onInputChange}
        />
        {suffix && <InputGroup.Text>{suffix}</InputGroup.Text>}
      </InputGroup>
    </FieldFrameMolecule>
  )
}

function parseNumber(input: string, decimals: number, allowNegative?: boolean) {
  const negative = allowNegative && input.trim().startsWith('-')
  const hasComma = decimals > 0 && input.includes(',')
  const [integerPart, ...rest] = input.split(',')
  const integer = integerPart.replace(/\D/g, '').replace(/^0+(?=\d)/, '')
  const decimal = rest.join('').replace(/\D/g, '').slice(0, decimals)
  const sign = negative ? '-' : ''

  if (integer === '' && !hasComma) {
    return sign
  }

  return `${sign}${integer || '0'}${hasComma ? `.${decimal}` : ''}`
}
