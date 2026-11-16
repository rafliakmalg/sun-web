import { z } from 'zod'
import { productSchema } from '@/features/products/schema'
import { rackSchema } from '@/features/racks/schema'
import { issue, rule } from '@/utils'

export const adjustmentReasons = ['correction', 'damaged', 'found', 'lost'] as const

export const adjustmentStatuses = ['active', 'cancelled'] as const

export const adjustmentItemInputSchema = z.object({
  product_id: z.string().min(1, rule.required('adjustment.items.product_id')),
  quantity: z
    .string()
    .refine((value) => Number(value) !== 0 && Number.isFinite(Number(value)), rule.required('adjustment.items.quantity'))
    .refine((value) => !value.includes('.') || value.split('.')[1].length <= 3, rule.decimal(3, 'adjustment.items.quantity')),
  rack_id: z.string().min(1, rule.required('adjustment.items.rack_id')),
  reason: z.enum(adjustmentReasons, rule.required('adjustment.items.reason')),
})

export const adjustmentInputSchema = z
  .object({
    items: z.array(adjustmentItemInputSchema).min(1, rule.minArray(1, 'adjustment.items')),
    note: z.string().trim(),
  })
  .superRefine((value, context) => {
    const seen = new Set<string>()

    value.items.forEach((item, index) => {
      const quantity = Number(item.quantity)
      const key = `${item.product_id}-${item.rack_id}`

      if (quantity > 0 && (item.reason === 'damaged' || item.reason === 'lost')) {
        context.addIssue({
          code: 'custom',
          message: issue('validation.negative', 'adjustment.items.quantity'),
          path: ['items', index, 'quantity'],
        })
      }

      if (quantity < 0 && item.reason === 'found') {
        context.addIssue({
          code: 'custom',
          message: issue('validation.positive', 'adjustment.items.quantity'),
          path: ['items', index, 'quantity'],
        })
      }

      if (item.product_id && item.rack_id && seen.has(key)) {
        context.addIssue({
          code: 'custom',
          message: issue('validation.distinct', 'adjustment.items.rack_id'),
          path: ['items', index, 'rack_id'],
        })
      }

      seen.add(key)
    })
  })

export const adjustmentItemSchema = z.object({
  id: z.number(),
  adjustment_id: z.number(),
  product_id: z.number(),
  rack_id: z.number(),
  quantity: z.string(),
  reason: z.string(),
  product: productSchema.optional(),
  rack: rackSchema.optional(),
})

export const adjustmentSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  created_by_id: z.number().nullable(),
  updated_by_id: z.number().nullable(),
  code: z.string(),
  note: z.string().nullable(),
  status: z.string(),
  items: z.array(adjustmentItemSchema).optional(),
})

export type AdjustmentInput = z.infer<typeof adjustmentInputSchema>
export type Adjustment = z.infer<typeof adjustmentSchema>
export type AdjustmentItem = z.infer<typeof adjustmentItemSchema>

export type AdjustmentPayload = {
  items: AdjustmentInput['items']
  note?: string
}
