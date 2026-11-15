import { Form } from 'react-bootstrap'
import { useController, type FieldValues } from 'react-hook-form'
import { FieldFrameMolecule } from '@/components/molecules/FieldFrameMolecule'
import type { FieldProps } from '@/lib/fields'

export function ToggleFieldMolecule<T extends FieldValues>({ control, name, label, disabled }: FieldProps<T>) {
  const { field, fieldState } = useController({ control, name })

  return (
    <FieldFrameMolecule
      id={name}
      error={fieldState.error?.message}
      className="form-toggle"
    >
      <Form.Check
        type="switch"
        id={name}
        label={label}
        {...field}
        checked={!!field.value}
        disabled={disabled}
        value={undefined}
        onChange={(event) => field.onChange(event.target.checked)}
      />
    </FieldFrameMolecule>
  )
}
