import { z } from 'zod'
import { rule } from '@/utils'

export const roleInputSchema = z.object({
  label: z.string().trim().min(1, rule.required('role.label')).max(255, rule.maxString(255, 'role.label')),
  name: z.string().trim().min(1, rule.required('role.name')).max(255, rule.maxString(255, 'role.name')),
})

export const roleSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  created_by_id: z.number().nullable(),
  updated_by_id: z.number().nullable(),
  label: z.string(),
  name: z.string(),
})

export type RoleInput = z.infer<typeof roleInputSchema>
export type Role = z.infer<typeof roleSchema>
