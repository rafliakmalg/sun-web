import { Form } from 'react-bootstrap'
import { useController, type FieldValues } from 'react-hook-form'
import { FieldFrameMolecule } from '@/components/molecules/FieldFrameMolecule'
import type { FieldProps } from '@/lib/fields'

type Props<T extends FieldValues> = FieldProps<T> & {
  rows?: number
  placeholder?: string
}

export function TextareaFieldMolecule<T extends FieldValues>({
  control,
  name,
  label,
  rows = 3,
  placeholder,
  autoFocus,
  disabled,
}: Props<T>) {
  const { field, fieldState } = useController({ control, name })

  return (
    <FieldFrameMolecule
      id={name}
      label={label}
      error={fieldState.error?.message}
      className="form-wide"
    >
      <Form.Control
        {...field}
        as="textarea"
        value={field.value ?? ''}
        id={name}
        rows={rows}
        placeholder={placeholder}
        autoFocus={autoFocus}
        disabled={disabled}
        isInvalid={!!fieldState.error}
      />
    </FieldFrameMolecule>
  )
}
