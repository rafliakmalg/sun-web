import { z } from 'zod'
import { warehouseSchema } from '@/features/warehouses/schema'
import { rule } from '@/lib/validation'

export const rackInputSchema = z.object({
  active: z.boolean(),
  code: z.string().trim().min(1, rule.required('rack.code')).max(50, rule.maxString(50, 'rack.code')),
  name: z.string().trim().max(255, rule.maxString(255, 'rack.name')),
  warehouse_id: z.string().min(1, rule.required('rack.warehouse_id')),
})

export const rackSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  created_by_id: z.number().nullable(),
  updated_by_id: z.number().nullable(),
  warehouse_id: z.number(),
  code: z.string(),
  name: z.string().nullable(),
  active: z.boolean(),
  warehouse: warehouseSchema.optional(),
})

export type RackInput = z.infer<typeof rackInputSchema>
export type Rack = z.infer<typeof rackSchema>
