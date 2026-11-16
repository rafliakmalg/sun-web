import { Form } from 'react-bootstrap'
import { useController, type FieldValues } from 'react-hook-form'
import { FieldFrameMolecule } from '@/components/molecules/FieldFrameMolecule'
import type { FieldProps } from '@/utils'

type Props<T extends FieldValues> = FieldProps<T> & {
  placeholder?: string
  rows?: number
}

export function TextareaFieldMolecule<T extends FieldValues>({
  autoFocus,
  compact,
  control,
  disabled,
  hideLabel,
  label,
  name,
  placeholder,
  rows = 3,
}: Props<T>) {
  const { field, fieldState } = useController({ control, name })

  return (
    <FieldFrameMolecule
      id={name}
      label={label}
      error={fieldState.error?.message}
      compact={compact}
      hideLabel={hideLabel}
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
