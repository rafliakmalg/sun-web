import { z } from 'zod'
import { issue, rule } from '@/lib/validation'
import { categorySchema } from '@/features/categories/schema'
import { unitSchema } from '@/features/units/schema'

function isNumber(value: string) {
  return value.trim() !== '' && Number.isFinite(Number(value))
}

export const productUnitInputSchema = z.object({
  factor: z
    .string()
    .refine((value) => isNumber(value) && Number(value) > 0, rule.greaterThan(0, 'product.units.factor'))
    .refine((value) => !value.includes('.') || value.split('.')[1].length <= 6, rule.decimal(6, 'product.units.factor')),
  unit_id: z.string().min(1, rule.required('product.units.unit_id')),
})

export const productInputSchema = z
  .object({
    active: z.boolean(),
    base_unit_id: z.string().min(1, rule.required('product.base_unit_id')),
    category_id: z.string().min(1, rule.required('product.category_id')),
    description: z.string().trim(),
    min_stock: z
      .string()
      .refine((value) => isNumber(value) && Number(value) >= 0, rule.minNumber(0, 'product.min_stock'))
      .refine((value) => !value.includes('.') || value.split('.')[1].length <= 3, rule.decimal(3, 'product.min_stock')),
    name: z.string().trim().min(1, rule.required('product.name')).max(255, rule.maxString(255, 'product.name')),
    sku: z.string().trim().min(1, rule.required('product.sku')).max(100, rule.maxString(100, 'product.sku')),
    units: z.array(productUnitInputSchema),
  })
  .superRefine((value, context) => {
    const seen = new Set<string>()

    value.units.forEach((unit, index) => {
      if (unit.unit_id && unit.unit_id === value.base_unit_id) {
        context.addIssue({
          code: 'custom',
          message: issue('validation.not_in', 'product.units.unit_id'),
          path: ['units', index, 'unit_id'],
        })
      } else if (unit.unit_id && seen.has(unit.unit_id)) {
        context.addIssue({
          code: 'custom',
          message: issue('validation.distinct', 'product.units.unit_id'),
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
export type Product = z.infer<typeof productSchema>
