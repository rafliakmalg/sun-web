import { Form } from 'react-bootstrap'
import { useController, type FieldValues } from 'react-hook-form'
import { FieldFrameMolecule } from '@/components/molecules/FieldFrameMolecule'
import type { FieldOption, FieldProps } from '@/utils'

type Props<T extends FieldValues> = FieldProps<T> & {
  inline?: boolean
  options: FieldOption[]
}

export function RadioFieldMolecule<T extends FieldValues>({
  compact,
  control,
  disabled,
  hideLabel,
  inline = true,
  label,
  name,
  options,
}: Props<T>) {
  const { field, fieldState } = useController({ control, name })

  return (
    <FieldFrameMolecule
      id={`${name}-0`}
      label={label}
      error={fieldState.error?.message}
      compact={compact}
      hideLabel={hideLabel}
    >
      <div>
        {options.map((option, index) => (
          <Form.Check
            key={option.value}
            type="radio"
            inline={inline}
            id={`${name}-${index}`}
            name={field.name}
            label={option.label}
            value={option.value}
            checked={field.value === option.value}
            disabled={disabled}
            isInvalid={!!fieldState.error}
            onBlur={field.onBlur}
            onChange={() => field.onChange(option.value)}
          />
        ))}
      </div>
    </FieldFrameMolecule>
  )
}
