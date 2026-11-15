import { z } from 'zod'
import { categorySchema } from '@/features/categories/schema'
import { unitSchema } from '@/features/units/schema'

function isNumber(value: string) {
  return value.trim() !== '' && Number.isFinite(Number(value))
}

export const productUnitInputSchema = z.object({
  factor: z
    .string()
    .refine((value) => isNumber(value) && Number(value) > 0, 'Jumlah harus lebih dari 0')
    .refine((value) => !value.includes('.') || value.split('.')[1].length <= 6, 'Jumlah maksimal 6 desimal'),
  unit_id: z.string().min(1, 'Satuan wajib dipilih'),
})

export const productInputSchema = z
  .object({
    active: z.boolean(),
    base_unit_id: z.string().min(1, 'Satuan terkecil wajib dipilih'),
    category_id: z.string().min(1, 'Kategori wajib dipilih'),
    description: z.string().trim(),
    min_stock: z
      .string()
      .refine((value) => isNumber(value) && Number(value) >= 0, 'Stok minimum harus 0 atau lebih')
      .refine((value) => !value.includes('.') || value.split('.')[1].length <= 3, 'Stok minimum maksimal 3 desimal'),
    name: z.string().trim().min(1, 'Nama wajib diisi').max(255, 'Nama maksimal 255 karakter'),
    sku: z.string().trim().min(1, 'SKU wajib diisi').max(100, 'SKU maksimal 100 karakter'),
    units: z.array(productUnitInputSchema),
  })
  .superRefine((value, context) => {
    const seen = new Set<string>()

    value.units.forEach((unit, index) => {
      if (unit.unit_id && unit.unit_id === value.base_unit_id) {
        context.addIssue({
          code: 'custom',
          message: 'Satuan tambahan tidak boleh sama dengan satuan terkecil',
          path: ['units', index, 'unit_id'],
        })
      } else if (unit.unit_id && seen.has(unit.unit_id)) {
        context.addIssue({
          code: 'custom',
          message: 'Satuan tidak boleh dipilih dua kali',
          path: ['units', index, 'unit_id'],
        })
      }

      seen.add(unit.unit_id)
    })
  })

export const productUnitSchema = z.object({
  unit_id: z.number(),
  factor: z.string(),
  unit: unitSchema.optional(),
})

export const productSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  base_unit_id: z.number(),
  category_id: z.number(),
  created_by_id: z.number().nullable(),
  updated_by_id: z.number().nullable(),
  description: z.string().nullable(),
  min_stock: z.string(),
  name: z.string(),
  sku: z.string(),
  active: z.boolean(),
  base_unit: unitSchema.optional(),
  category: categorySchema.optional(),
  units: z.array(productUnitSchema).optional(),
})

export type ProductInput = z.infer<typeof productInputSchema>
export type ProductUnitInput = z.infer<typeof productUnitInputSchema>
export type Product = z.infer<typeof productSchema>
