import { useController, type FieldValues } from 'react-hook-form'
import { FieldFrameMolecule } from '@/components/molecules/FieldFrameMolecule'
import { SelectInputMolecule } from '@/components/molecules/SelectInputMolecule'
import type { FieldOption, FieldProps } from '@/utils'

type Props<T extends FieldValues> = FieldProps<T> & {
  options: FieldOption[]
  placeholder?: string
}

export function SelectFieldMolecule<T extends FieldValues>({
  autoFocus,
  compact,
  control,
  disabled,
  hideLabel,
  label,
  name,
  options,
  placeholder = 'Pilih...',
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
      <SelectInputMolecule
        id={name}
        name={field.name}
        inputRef={field.ref}
        value={field.value ?? ''}
        onChange={field.onChange}
        onBlur={field.onBlur}
        options={options}
        placeholder={placeholder}
        invalid={!!fieldState.error}
        autoFocus={autoFocus}
        disabled={disabled}
      />
    </FieldFrameMolecule>
  )
}
