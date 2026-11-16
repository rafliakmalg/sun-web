import { useController, type FieldValues } from 'react-hook-form'
import { AutocompleteInputMolecule } from '@/components/molecules/AutocompleteInputMolecule'
import { FieldFrameMolecule } from '@/components/molecules/FieldFrameMolecule'
import type { FieldProps, OptionSearch } from '@/utils'

type Props<T extends FieldValues> = FieldProps<T> & {
  initialLabel?: string
  placeholder?: string
  useSearch: OptionSearch
}

export function AutocompleteFieldMolecule<T extends FieldValues>({
  autoFocus,
  compact,
  control,
  disabled,
  hideLabel,
  initialLabel,
  label,
  name,
  placeholder,
  useSearch,
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
      <AutocompleteInputMolecule
        id={name}
        name={field.name}
        inputRef={field.ref}
        value={field.value ?? ''}
        onChange={field.onChange}
        onBlur={field.onBlur}
        useSearch={useSearch}
        initialLabel={initialLabel}
        placeholder={placeholder}
        invalid={!!fieldState.error}
        autoFocus={autoFocus}
        disabled={disabled}
      />
    </FieldFrameMolecule>
  )
}
