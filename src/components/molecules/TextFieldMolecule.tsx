import { Form } from 'react-bootstrap'
import { useController, type FieldValues } from 'react-hook-form'
import { FieldFrameMolecule } from '@/components/molecules/FieldFrameMolecule'
import type { FieldProps } from '@/lib/fields'

type Props<T extends FieldValues> = FieldProps<T> & {
  type?: 'text' | 'email' | 'password'
  placeholder?: string
  autoComplete?: string
}

export function TextFieldMolecule<T extends FieldValues>({
  control,
  name,
  label,
  type = 'text',
  placeholder,
  autoComplete,
  autoFocus,
  disabled,
}: Props<T>) {
  const { field, fieldState } = useController({ control, name })

  return (
    <FieldFrameMolecule
      id={name}
      label={label}
      error={fieldState.error?.message}
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
