import { z } from 'zod'

export const branchInputSchema = z.object({
  active: z.boolean(),
  address: z.string().trim().max(255, 'Alamat maksimal 255 karakter'),
  code: z.string().trim().min(1, 'Kode wajib diisi').max(50, 'Kode maksimal 50 karakter'),
  name: z.string().trim().min(1, 'Nama wajib diisi').max(255, 'Nama maksimal 255 karakter'),
  phone: z.string().trim().max(50, 'Telepon maksimal 50 karakter'),
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
