import { Form } from 'react-bootstrap'
import { useController, type FieldValues } from 'react-hook-form'
import { FieldFrameMolecule } from '@/components/molecules/FieldFrameMolecule'
import type { FieldOption, FieldProps } from '@/lib/fields'

type Props<T extends FieldValues> = FieldProps<T> & {
  options: FieldOption[]
  placeholder?: string
}

export function SelectFieldMolecule<T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder = 'Pilih...',
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
      <Form.Select
        {...field}
        value={field.value ?? ''}
        id={name}
        autoFocus={autoFocus}
        disabled={disabled}
        isInvalid={!!fieldState.error}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
    </FieldFrameMolecule>
  )
}
