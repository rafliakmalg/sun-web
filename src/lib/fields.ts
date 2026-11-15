import type { Control, FieldValues, Path } from 'react-hook-form'

export type FieldProps<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  label: string
  autoFocus?: boolean
  compact?: boolean
  disabled?: boolean
  hideLabel?: boolean
}

export type FieldOption = {
  value: string
  label: string
}

export type OptionResult = {
  options: FieldOption[]
  loading: boolean
}

export type OptionSearch = (term: string, enabled: boolean) => OptionResult
