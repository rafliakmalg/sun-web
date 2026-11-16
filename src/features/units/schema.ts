import { z } from 'zod'
import { rule } from '@/utils'

export const unitInputSchema = z.object({
  code: z.string().trim().min(1, rule.required('unit.code')).max(50, rule.maxString(50, 'unit.code')),
  name: z.string().trim().min(1, rule.required('unit.name')).max(255, rule.maxString(255, 'unit.name')),
})

export const unitSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  created_by_id: z.number().nullable(),
  updated_by_id: z.number().nullable(),
  code: z.string(),
  name: z.string(),
})

export type UnitInput = z.infer<typeof unitInputSchema>
export type Unit = z.infer<typeof unitSchema>
