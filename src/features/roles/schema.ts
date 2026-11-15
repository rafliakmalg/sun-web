import { z } from 'zod'

export const roleInputSchema = z.object({
  label: z.string().trim().min(1, 'Label wajib diisi').max(255, 'Label maksimal 255 karakter'),
  name: z.string().trim().min(1, 'Nama wajib diisi').max(255, 'Nama maksimal 255 karakter'),
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
