import { keepPreviousData, QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios, { isAxiosError } from 'axios'
import dayjs from 'dayjs'
import qs from 'qs'
import type { ReactNode } from 'react'
import { Badge } from 'react-bootstrap'
import type { Control, FieldValues, Path, UseFormSetError } from 'react-hook-form'
import { z } from 'zod'
import { useAuth } from '@/stores/auth'
import { useLang } from '@/stores/lang'
import { toast } from '@/stores/toast'

export function alignClass<T>(column: ColumnDef<T>): string {
  return `text-${column.align ?? (column.type === 'number' ? 'end' : 'start')}`
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { Accept: 'application/json' },
  paramsSerializer: (params) => qs.stringify(params, {
    arrayFormat: 'indices',
    encodeValuesOnly: true,
  }),
})

api.interceptors.request.use((config) => {
  const token = useAuth.getState().token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError(error) && error.response?.status === 401) {
      useAuth.getState().logout()
    }

    return Promise.reject(error)
  },
)

export type ColumnType = 'text' | 'number' | 'date' | 'time' | 'datetime' | 'boolean'

export type ColumnDef<T> = {
  align?: 'start' | 'center' | 'end'
  decimals?: number
  filterable?: boolean
  header: string
  hidden?: boolean
  key: string
  labels?: [string, string]
  render?: (row: T) => ReactNode
  sortable?: boolean
  type?: ColumnType
  useOptions?: OptionSearch
}

const timeOnly = /^\d{2}:\d{2}(:\d{2})?$/

export function announceSaved(message?: string) {
  channel.postMessage({
    type: 'saved',
    message,
  })
}

export function applyApiErrors<T extends FieldValues>(error: unknown, setError: UseFormSetError<T>): void {
  if (isAxiosError<ApiError>(error) && error.response?.status === 422 && error.response.data.errors) {
    for (const [field, messages] of Object.entries(error.response.data.errors)) {
      setError(field as Path<T>, { message: messages[0] })
    }

    return
  }

  setError('root', { message: errorMessage(error) })
}

export function errorMessage(error: unknown): string {
  if (isAxiosError<ApiError>(error)) {
    return error.response?.data?.message ?? 'Tidak dapat terhubung ke server.'
  }

  return 'Terjadi kesalahan.'
}

export function filterKind<T>(column: ColumnDef<T>): FilterKind {
  if (column.useOptions) {
    return 'option'
  }

  switch (column.type) {
    case 'number':
      return 'number'
    case 'date':
    case 'datetime':
      return 'date'
    case 'boolean':
      return 'boolean'
    default:
      return 'text'
  }
}

export function formatDate(value: unknown): string {
  return dayjs(String(value)).format('DD/MM/YYYY')
}

export function formatDateTime(value: unknown): string {
  return dayjs(String(value)).format('DD/MM/YYYY HH:mm')
}

export function formatNumber(value: unknown, decimals = 0): string {
  return new Intl.NumberFormat('id-ID', { maximumFractionDigits: decimals }).format(Number(value))
}

export function formatTime(value: unknown): string {
  if (timeOnly.test(String(value))) {
    return String(value).slice(0, 5)
  }

  return dayjs(String(value)).format('HH:mm')
}

function formatValue(value: unknown, type: ColumnType, column: { decimals?: number; labels?: [string, string] }) {
  switch (type) {
    case 'number':
      return formatNumber(value, column.decimals)
    case 'date':
      return formatDate(value)
    case 'time':
      return formatTime(value)
    case 'datetime':
      return formatDateTime(value)
    case 'boolean': {
      const [yes, no] = column.labels ?? ['Ya', 'Tidak']

      return <Badge bg={value ? 'success' : 'secondary'}>{value ? yes : no}</Badge>
    }
    default:
      return String(value)
  }
}

export function issue(key: string, attribute: string) {
  return translate(key, { attribute: translate(attribute) })
}

export function isValidationError(error: unknown): boolean {
  return isAxiosError(error) && error.response?.status === 422
}

export type FieldProps<T extends FieldValues> = {
  autoFocus?: boolean
  compact?: boolean
  control: Control<T>
  disabled?: boolean
  hideLabel?: boolean
  label: string
  name: Path<T>
}

export type FieldOption = {
  group?: string
  label: string
  value: string
}

export type OptionResult = {
  loading: boolean
  options: FieldOption[]
}

export type OptionSearch = (term: string, enabled: boolean) => OptionResult

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

function message(key: string, attribute: string, params: Params = {}) {
  return {
    error: () =>
      translate(key, {
        attribute: translate(attribute),
        ...params,
      }),
  }
}

export type Params = Record<string, string | number>

export function onSavedElsewhere(handler: (message?: string) => void) {
  const listener = (event: MessageEvent) => {
    if (event.data?.type === 'saved') {
      handler(event.data.message)
    }
  }

  channel.addEventListener('message', listener)

  return () => channel.removeEventListener('message', listener)
}

export function renderCell<T>(column: ColumnDef<T>, row: T): ReactNode {
  const value = column.render ? column.render(row) : valueAt(row, column.key)

  if (value === null || value === undefined || value === '') {
    return <span className="text-muted">-</span>
  }

  return column.render ? (value as ReactNode) : formatValue(value, column.type ?? 'text', column)
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

type SendMethod = 'post' | 'put' | 'patch' | 'delete'

type MessageResult = {
  message?: string
}

export function translate(key: string, params: Params = {}): string {
  const text = useLang.getState().messages[key] ?? key

  return Object.entries(params).reduce((result, [name, value]) => result.replaceAll(`:${name}`, String(value)), text)
}

export function useGet<T>(url: string, params: object = {}, options: { enabled?: boolean; keepPrevious?: boolean } = {}) {
  return useQuery({
    queryKey: [url, params],
    queryFn: async () => {
      const response = await api.get<T>(url, { params: withoutEmpty(params) })

      return response.data
    },
    placeholderData: options.keepPrevious ? keepPreviousData : undefined,
    enabled: options.enabled ?? true,
  })
}

export function useOptions(
  path: string,
  labelKey: string,
  search: string,
  enabled: boolean,
  filters: FilterCondition[] = [],
): OptionResult {
  const { data, isFetching } = useGet<Paginated<{ id: number } & Record<string, unknown>>>(
    path,
    {
      filters,
      per_page: 100,
      search,
      sort_by: labelKey,
    },
    { enabled, keepPrevious: true },
  )

  return {
    options: (data?.data ?? []).map((item) => ({
      value: String(item.id),
      label: String(item[labelKey]),
    })),
    loading: enabled && isFetching,
  }
}

const channel = new BroadcastChannel('wms')

export function useSend<TInput = void, TResult extends MessageResult = MessageResult>(
  method: SendMethod,
  url: string | ((input: TInput) => string),
  refresh: string[] = [],
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: TInput) => {
      const response = await api.request<TResult>({
        method,
        url: typeof url === 'function' ? url(input) : url,
        data: method === 'delete' ? undefined : input,
      })

      return response.data
    },
    onSuccess: async (data) => {
      if (data?.message) {
        toast.success(data.message)
      }

      await Promise.all(refresh.map((key) => queryClient.invalidateQueries({ queryKey: [key] })))
    },
    onError: (error) => {
      if (!isValidationError(error)) {
        toast.error(errorMessage(error))
      }
    },
  })
}

export function useTranslate() {
  useLang((state) => state.messages)

  return translate
}

export type Paginated<T> = {
  data: T[]
  meta: {
    current_page: number
    from: number | null
    last_page: number
    per_page: number
    to: number | null
    total: number
  }
}

export type ApiError = {
  errors?: Record<string, string[]>
  message?: string
}

export type SortDir = 'asc' | 'desc'

export type ListParams = {
  filters: FilterCondition[]
  page: number
  per_page: number
  search: string
  sort_by: string
  sort_dir: SortDir
}

function valueAt(row: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((value, name) => (value as Record<string, unknown> | null | undefined)?.[name], row)
}

export const rule = {
  alphaDash: (attribute: string) => message('validation.alpha_dash', attribute),
  decimal: (decimals: number, attribute: string) => message('validation.decimal', attribute, { decimal: `0-${decimals}` }),
  email: (attribute: string) => message('validation.email', attribute),
  greaterThan: (value: number, attribute: string) => message('validation.gt.numeric', attribute, { value }),
  maxString: (max: number, attribute: string) => message('validation.max.string', attribute, { max }),
  minArray: (min: number, attribute: string) => message('validation.min.array', attribute, { min }),
  minNumber: (min: number, attribute: string) => message('validation.min.numeric', attribute, { min }),
  minString: (min: number, attribute: string) => message('validation.min.string', attribute, { min }),
  required: (attribute: string) => message('validation.required', attribute),
}

function withoutEmpty(params: object) {
  return Object.fromEntries(Object.entries(params).filter(([, value]) => value !== '' && value != null))
}

