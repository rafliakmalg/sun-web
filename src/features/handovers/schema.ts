import { z } from 'zod'
import { productSchema } from '@/features/products/schema'
import { rackSchema } from '@/features/racks/schema'
import { userSchema } from '@/features/users/schema'
import { issue, rule, translate } from '@/utils'

export const handoverStatuses = ['taken', 'completed', 'cancelled'] as const

export const handoverItemInputSchema = z.object({
  product_id: z.string().min(1, rule.required('handover.items.product_id')),
  quantity: z
    .string()
    .refine((value) => Number(value) > 0, rule.greaterThan(0, 'handover.items.quantity'))
    .refine((value) => !value.includes('.') || value.split('.')[1].length <= 3, rule.decimal(3, 'handover.items.quantity')),
  rack_from_id: z.string().min(1, rule.required('handover.items.rack_from_id')),
  rack_to_id: z.string().min(1, rule.required('handover.items.rack_to_id')),
})

export const handoverInputSchema = z
  .object({
    items: z.array(handoverItemInputSchema).min(1, rule.minArray(1, 'handover.items')),
    note: z.string().trim(),
  })
  .superRefine((value, context) => {
    const seen = new Set<string>()

    value.items.forEach((item, index) => {
      const key = `${item.product_id}-${item.rack_from_id}-${item.rack_to_id}`

      if (item.rack_from_id && item.rack_from_id === item.rack_to_id) {
        context.addIssue({
          code: 'custom',
          message: translate('validation.different', {
            attribute: translate('handover.items.rack_to_id'),
            other: translate('handover.items.rack_from_id'),
          }),
          path: ['items', index, 'rack_to_id'],
        })
      }

      if (item.product_id && item.rack_from_id && item.rack_to_id && seen.has(key)) {
        context.addIssue({
          code: 'custom',
          message: issue('validation.distinct', 'handover.items.rack_to_id'),
          path: ['items', index, 'rack_to_id'],
        })
      }

      seen.add(key)
    })
  })

export const handoverNoteSchema = z.object({
  custody_to_id: z.string(),
  note: z.string().trim(),
})

export const handoverTransferSchema = handoverNoteSchema.extend({
  custody_to_id: z.string().min(1, rule.required('handover.custody_to_id')),
})

export const handoverItemSchema = z.object({
  id: z.number(),
  handover_id: z.number(),
  product_id: z.number(),
  rack_from_id: z.number(),
  rack_to_id: z.number(),
  quantity: z.string(),
  product: productSchema.optional(),
  rack_from: rackSchema.optional(),
  rack_to: rackSchema.optional(),
})

export const handoverLogSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  action: z.string(),
  note: z.string().nullable(),
  created_by: userSchema.optional(),
  custody_from: userSchema.nullable().optional(),
  custody_to: userSchema.nullable().optional(),
})

export const handoverSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  created_by_id: z.number().nullable(),
  custody_id: z.number(),
  updated_by_id: z.number().nullable(),
  code: z.string(),
  note: z.string().nullable(),
  status: z.string(),
  custody: userSchema.optional(),
  items: z.array(handoverItemSchema).optional(),
  logs: z.array(handoverLogSchema).optional(),
})

export type HandoverInput = z.infer<typeof handoverInputSchema>
export type HandoverActionInput = z.infer<typeof handoverNoteSchema>
export type Handover = z.infer<typeof handoverSchema>
export type HandoverItem = z.infer<typeof handoverItemSchema>
export type HandoverLog = z.infer<typeof handoverLogSchema>

export type HandoverPayload = {
  items: HandoverInput['items']
  note?: string
}

export type HandoverActionPayload = {
  custody_to_id?: string
  note?: string
}
