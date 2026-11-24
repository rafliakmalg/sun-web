import { useEffect, useRef } from 'react'
import { Form } from 'react-bootstrap'
import { useController, type FieldValues } from 'react-hook-form'
import { FieldFrameMolecule } from '@/components/molecules/FieldFrameMolecule'
import { useTranslate, type FieldOption, type FieldProps } from '@/utils'

type Props<T extends FieldValues> = FieldProps<T> & {
  loading?: boolean
  options: FieldOption[]
  wide?: boolean
}

type GroupToggleProps = {
  checked: boolean
  disabled?: boolean
  id: string
  indeterminate: boolean
  label: string
  onChange: (checked: boolean) => void
}

function GroupToggle({ checked, disabled, id, indeterminate, label, onChange }: GroupToggleProps) {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate
    }
  }, [indeterminate])

  return (
    <Form.Check
      ref={ref}
      type="checkbox"
      id={id}
      label={label}
      className="fw-semibold"
      checked={checked}
      disabled={disabled}
      onChange={(event) => onChange(event.target.checked)}
    />
  )
}

function groupOptions(options: FieldOption[]): [string, FieldOption[]][] {
  const groups = new Map<string, FieldOption[]>()

  for (const option of options) {
    const key = option.group ?? ''

    groups.set(key, [...(groups.get(key) ?? []), option])
  }

  return [...groups.entries()]
}

export function CheckboxGroupFieldMolecule<T extends FieldValues>({
  compact,
  control,
  disabled,
  hideLabel,
  label,
  loading,
  name,
  options,
  wide,
}: Props<T>) {
  const t = useTranslate()
  const { field, fieldState } = useController({ control, name })
  const selected: string[] = field.value ?? []

  function onToggle(values: string[], checked: boolean) {
    const rest = selected.filter((value) => !values.includes(value))

    field.onChange(checked ? [...rest, ...values] : rest)
  }

  return (
    <FieldFrameMolecule
      id={`${name}-0`}
      label={label}
      error={fieldState.error?.message}
      compact={compact}
      hideLabel={hideLabel}
      className={wide ? 'form-wide' : ''}
    >
      {loading && <div className="text-muted small">...</div>}
      <div className="d-flex flex-wrap gap-4">
        {groupOptions(options).map(([group, items]) => {
          const values = items.map((item) => item.value)
          const count = values.filter((value) => selected.includes(value)).length

          return (
            <div key={group}>
              {group && (
                <GroupToggle
                  id={`${name}-group-${group}`}
                  label={t(group)}
                  checked={count === values.length}
                  indeterminate={count > 0 && count < values.length}
                  disabled={disabled}
                  onChange={(checked) => onToggle(values, checked)}
                />
              )}
              {items.map((item) => (
                <Form.Check
                  key={item.value}
                  type="checkbox"
                  id={`${name}-${item.value}`}
                  label={t(item.label)}
                  className={group ? 'ms-3' : ''}
                  checked={selected.includes(item.value)}
                  disabled={disabled}
                  isInvalid={!!fieldState.error}
                  onBlur={field.onBlur}
                  onChange={(event) => onToggle([item.value], event.target.checked)}
                />
              ))}
            </div>
          )
        })}
      </div>
    </FieldFrameMolecule>
  )
}
