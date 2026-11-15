import { z } from 'zod'

export const categoryInputSchema = z.object({
  name: z.string().trim().min(1, 'Nama wajib diisi').max(255, 'Nama maksimal 255 karakter'),
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
