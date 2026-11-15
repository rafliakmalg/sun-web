import { z } from 'zod'

export const unitInputSchema = z.object({
  code: z.string().trim().min(1, 'Kode wajib diisi').max(50, 'Kode maksimal 50 karakter'),
  name: z.string().trim().min(1, 'Nama wajib diisi').max(255, 'Nama maksimal 255 karakter'),
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
