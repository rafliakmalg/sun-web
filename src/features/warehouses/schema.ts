import { z } from 'zod'
import { branchSchema } from '@/features/branches/schema'
import { rule } from '@/lib/validation'

export const warehouseInputSchema = z.object({
  active: z.boolean(),
  address: z.string().trim().max(255, rule.maxString(255, 'warehouse.address')),
  branch_id: z.string().min(1, rule.required('warehouse.branch_id')),
  code: z.string().trim().min(1, rule.required('warehouse.code')).max(50, rule.maxString(50, 'warehouse.code')),
  name: z.string().trim().min(1, rule.required('warehouse.name')).max(255, rule.maxString(255, 'warehouse.name')),
})

export const warehouseSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  branch_id: z.number(),
  created_by_id: z.number().nullable(),
  updated_by_id: z.number().nullable(),
  address: z.string().nullable(),
  code: z.string(),
  name: z.string(),
  active: z.boolean(),
  branch: branchSchema.optional(),
})

export type WarehouseInput = z.infer<typeof warehouseInputSchema>
export type Warehouse = z.infer<typeof warehouseSchema>
