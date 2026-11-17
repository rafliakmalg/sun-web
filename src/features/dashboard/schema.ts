import { z } from 'zod'
import { handoverSchema } from '@/features/handovers/schema'
import { movementSchema } from '@/features/movements/schema'

export const categoryStockSchema = z.object({
  id: z.number().nullable(),
  name: z.string(),
  total_quantity: z.string(),
})

export const dayActivitySchema = z.object({
  date: z.string(),
  total: z.number(),
})

export const lowStockSchema = z.object({
  id: z.number(),
  min_stock: z.string(),
  name: z.string(),
  sku: z.string(),
  total_quantity: z.string(),
})

export const warehouseStockSchema = z.object({
  id: z.number(),
  name: z.string(),
  total_quantity: z.string(),
})

export const dashboardSchema = z.object({
  low_stock: z.array(lowStockSchema),
  low_stock_total: z.number(),
  movements_per_day: z.array(dayActivitySchema),
  recent_adjustments: z.number(),
  recent_movements: z.array(movementSchema),
  stock_by_category: z.array(categoryStockSchema),
  stock_by_warehouse: z.array(warehouseStockSchema),
  taken_handovers: z.array(handoverSchema),
  taken_handovers_total: z.number(),
  total_products: z.number(),
  total_quantity: z.string(),
})

export type CategoryStock = z.infer<typeof categoryStockSchema>
export type Dashboard = z.infer<typeof dashboardSchema>
export type DayActivity = z.infer<typeof dayActivitySchema>
export type LowStock = z.infer<typeof lowStockSchema>
export type WarehouseStock = z.infer<typeof warehouseStockSchema>
