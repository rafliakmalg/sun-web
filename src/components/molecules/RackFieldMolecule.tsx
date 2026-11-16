import { useEffect, useRef } from 'react'
import { useController, type FieldValues } from 'react-hook-form'
import { AutocompleteFieldMolecule } from '@/components/molecules/AutocompleteFieldMolecule'
import { useRackOptions } from '@/features/racks/api'
import type { FieldProps, FilterCondition, OptionSearch } from '@/utils'

type Props<T extends FieldValues> = FieldProps<T> & {
  activeOnly?: boolean
  warehouseId: string
}

export function RackFieldMolecule<T extends FieldValues>({ activeOnly, warehouseId, ...props }: Props<T>) {
  const { field } = useController({
    control: props.control,
    name: props.name,
  })
  const previousWarehouseId = useRef(warehouseId)

  const filters: FilterCondition[] = [
    {
      field: 'warehouse_id',
      operator: 'eq',
      value: warehouseId,
    },
  ]

  if (activeOnly) {
    filters.push({
      field: 'active',
      operator: 'eq',
      value: '1',
    })
  }

  const useSearch: OptionSearch = (term, enabled) => useRackOptions(term, enabled && !!warehouseId, filters)

  useEffect(() => {
    if (previousWarehouseId.current !== warehouseId) {
      previousWarehouseId.current = warehouseId
      field.onChange('')
    }
  }, [warehouseId, field])

  return (
    <AutocompleteFieldMolecule
      key={warehouseId}
      {...props}
      disabled={!warehouseId || props.disabled}
      placeholder={warehouseId ? undefined : 'Pilih gudang dulu'}
      useSearch={useSearch}
    />
  )
}
