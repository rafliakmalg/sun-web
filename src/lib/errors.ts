import { isAxiosError } from 'axios'
import type { FieldValues, Path, UseFormSetError } from 'react-hook-form'
import type { ApiError } from '@/lib/types'

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

export function isValidationError(error: unknown): boolean {
  return isAxiosError(error) && error.response?.status === 422
}
