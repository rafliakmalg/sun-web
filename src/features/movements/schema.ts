import { z } from 'zod'
import { productSchema } from '@/features/products/schema'
import { rackSchema } from '@/features/racks/schema'
import { issue, rule, translate } from '@/utils'

export const movementFormTypes = ['receive', 'issue', 'transfer'] as const

export const movementInputSchema = z
  .object({
    note: z.string().trim(),
    product_id: z.string().min(1, rule.required('movement.product_id')),
    quantity: z
      .string()
      .refine((value) => Number(value) > 0, rule.greaterThan(0, 'movement.quantity'))
      .refine((value) => !value.includes('.') || value.split('.')[1].length <= 3, rule.decimal(3, 'movement.quantity')),
    rack_from_id: z.string(),
    rack_to_id: z.string(),
    type: z.enum(movementFormTypes),
  })
  .superRefine((value, context) => {
    if (value.type !== 'receive' && value.rack_from_id === '') {
      context.addIssue({
        code: 'custom',
        message: issue('validation.required', 'movement.rack_from_id'),
        path: ['rack_from_id'],
      })
    }

    if (value.type !== 'issue' && value.rack_to_id === '') {
      context.addIssue({
        code: 'custom',
        message: issue('validation.required', 'movement.rack_to_id'),
        path: ['rack_to_id'],
      })
    }

    if (value.type === 'transfer' && value.rack_from_id !== '' && value.rack_from_id === value.rack_to_id) {
      context.addIssue({
        code: 'custom',
        message: translate('validation.different', {
          attribute: translate('movement.rack_to_id'),
          other: translate('movement.rack_from_id'),
        }),
        path: ['rack_to_id'],
      })
    }
  })

export const movementSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  adjustment_id: z.number().nullable(),
  created_by_id: z.number().nullable(),
  handover_id: z.number().nullable(),
  product_id: z.number(),
  rack_from_id: z.number().nullable(),
  rack_to_id: z.number().nullable(),
  updated_by_id: z.number().nullable(),
  note: z.string().nullable(),
  quantity: z.string(),
  type: z.string(),
  adjustment: z.object({
    code: z.string(),
  }).nullable().optional(),
  handover: z.object({
    code: z.string(),
  }).nullable().optional(),
  product: productSchema.optional(),
  rack_from: rackSchema.nullable().optional(),
  rack_to: rackSchema.nullable().optional(),
})

export type MovementInput = z.infer<typeof movementInputSchema>

export type MovementPayload = {
  note?: string
  product_id: string
  quantity: string
  rack_from_id?: string
  rack_to_id?: string
}

export type Movement = z.infer<typeof movementSchema>
