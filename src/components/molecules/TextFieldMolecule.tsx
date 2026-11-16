import { Form } from 'react-bootstrap'
import { useController, type FieldValues } from 'react-hook-form'
import { FieldFrameMolecule } from '@/components/molecules/FieldFrameMolecule'
import type { FieldProps } from '@/utils'

type Props<T extends FieldValues> = FieldProps<T> & {
  autoComplete?: string
  placeholder?: string
  type?: 'text' | 'email' | 'password'
}

export function TextFieldMolecule<T extends FieldValues>({
  autoComplete,
  autoFocus,
  compact,
  control,
  disabled,
  hideLabel,
  label,
  name,
  placeholder,
  type = 'text',
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
        value={field.value ?? ''}
        id={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        disabled={disabled}
        isInvalid={!!fieldState.error}
      />
    </FieldFrameMolecule>
  )
}
