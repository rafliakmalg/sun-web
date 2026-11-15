import { z } from 'zod'

const operators = ['eq', 'ne', 'like', 'gt', 'gte', 'lt', 'lte', 'in', 'between', 'null'] as const

export const filterConditionSchema = z.object({
  field: z.string(),
  operator: z.enum(operators),
  value: z.string(),
})

export const filtersSchema = z.array(filterConditionSchema)

export type FilterCondition = z.infer<typeof filterConditionSchema>

export type FilterOperator = FilterCondition['operator']

export type FilterKind = 'text' | 'number' | 'date' | 'boolean' | 'option'

export const operatorLabels: Record<FilterOperator, string> = {
  eq: 'Sama dengan',
  ne: 'Tidak sama dengan',
  like: 'Mengandung',
  gt: 'Lebih dari',
  gte: 'Minimal',
  lt: 'Kurang dari',
  lte: 'Maksimal',
  in: 'Salah satu dari',
  between: 'Antara',
  null: 'Kosong atau terisi',
}

export const operatorsByKind: Record<FilterKind, FilterOperator[]> = {
  text: ['like', 'eq', 'ne', 'in', 'null'],
  number: ['eq', 'ne', 'gt', 'gte', 'lt', 'lte', 'between', 'in', 'null'],
  date: ['eq', 'gt', 'gte', 'lt', 'lte', 'between', 'null'],
  boolean: ['eq'],
  option: ['eq', 'ne'],
}
