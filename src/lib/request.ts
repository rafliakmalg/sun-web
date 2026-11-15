import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { errorMessage, isValidationError } from '@/lib/errors'
import { toast } from '@/stores/toast'

type SendMethod = 'post' | 'put' | 'patch' | 'delete'

type MessageResult = {
  message?: string
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

function withoutEmpty(params: object) {
  return Object.fromEntries(Object.entries(params).filter(([, value]) => value !== '' && value != null))
}
