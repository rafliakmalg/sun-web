import { z } from 'zod'
import { productSchema } from '@/features/products/schema'
import { rackSchema } from '@/features/racks/schema'

export const inventorySchema = z.object({
  id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  created_by_id: z.number().nullable(),
  product_id: z.number(),
  rack_id: z.number(),
  updated_by_id: z.number().nullable(),
  quantity: z.string(),
  quantity_incoming: z.string(),
  product: productSchema.optional(),
  rack: rackSchema.optional(),
})

export type Inventory = z.infer<typeof inventorySchema>
