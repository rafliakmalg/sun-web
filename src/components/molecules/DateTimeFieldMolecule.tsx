import { Form } from 'react-bootstrap'
import { useController, type FieldValues } from 'react-hook-form'
import { FieldFrameMolecule } from '@/components/molecules/FieldFrameMolecule'
import type { FieldProps } from '@/utils'

type Mode = 'date' | 'time' | 'datetime'

type Props<T extends FieldValues> = FieldProps<T> & {
  mode?: Mode
}

const inputTypes = {
  date: 'date',
  time: 'time',
  datetime: 'datetime-local',
} as const

export function DateTimeFieldMolecule<T extends FieldValues>({
  autoFocus,
  compact,
  control,
  disabled,
  hideLabel,
  label,
  mode = 'datetime',
  name,
}: Props<T>) {
  const { field, fieldState } = useController({ control, name })

  return (
    <FieldFrameMolecule
      id={name}
      label={label}
      error={fieldState.error?.message}
      compact={compact}
      hideLabel={hideLabel}
    >
      <Form.Control
        {...field}
        id={name}
        type={inputTypes[mode]}
        step={mode === 'date' ? undefined : 1}
        value={toInput(field.value ?? '', mode)}
        autoFocus={autoFocus}
        disabled={disabled}
        isInvalid={!!fieldState.error}
        onChange={(event) => field.onChange(toValue(event.target.value, mode))}
      />
    </FieldFrameMolecule>
  )
}

function toInput(value: string, mode: Mode) {
  if (mode === 'date') {
    return value.slice(0, 10)
  }

  if (mode === 'time') {
    return value.slice(0, 8)
  }

  return value.replace(' ', 'T').slice(0, 19)
}

function toValue(input: string, mode: Mode) {
  if (mode === 'date' || input === '') {
    return input
  }

  const full = input.length === 5 || input.length === 16 ? `${input}:00` : input

  return mode === 'time' ? full : full.replace('T', ' ')
}
