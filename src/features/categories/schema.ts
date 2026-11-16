import { z } from 'zod'
import { rule } from '@/utils'

export const categoryInputSchema = z.object({
  name: z.string().trim().min(1, rule.required('category.name')).max(255, rule.maxString(255, 'category.name')),
})

export const categorySchema = z.object({
  id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  created_by_id: z.number().nullable(),
  updated_by_id: z.number().nullable(),
  name: z.string(),
})

export type CategoryInput = z.infer<typeof categoryInputSchema>
export type Category = z.infer<typeof categorySchema>
