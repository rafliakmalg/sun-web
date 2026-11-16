import { z } from 'zod'
import { rule } from '@/utils'

export const branchInputSchema = z.object({
  active: z.boolean(),
  address: z.string().trim().max(255, rule.maxString(255, 'branch.address')),
  code: z.string().trim().min(1, rule.required('branch.code')).max(50, rule.maxString(50, 'branch.code')),
  name: z.string().trim().min(1, rule.required('branch.name')).max(255, rule.maxString(255, 'branch.name')),
  phone: z.string().trim().max(50, rule.maxString(50, 'branch.phone')),
})

export const branchSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  created_by_id: z.number().nullable(),
  updated_by_id: z.number().nullable(),
  address: z.string().nullable(),
  code: z.string(),
  name: z.string(),
  phone: z.string().nullable(),
  active: z.boolean(),
})

export type BranchInput = z.infer<typeof branchInputSchema>
export type Branch = z.infer<typeof branchSchema>
