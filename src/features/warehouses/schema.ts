import { z } from 'zod'
import { branchSchema } from '@/features/branches/schema'

export const warehouseInputSchema = z.object({
  active: z.boolean(),
  address: z.string().trim().max(255, 'Alamat maksimal 255 karakter'),
  branch_id: z.string().min(1, 'Cabang wajib dipilih'),
  code: z.string().trim().min(1, 'Kode wajib diisi').max(50, 'Kode maksimal 50 karakter'),
  name: z.string().trim().min(1, 'Nama wajib diisi').max(255, 'Nama maksimal 255 karakter'),
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
