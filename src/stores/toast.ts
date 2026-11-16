import { create } from 'zustand'

export type ToastVariant = 'success' | 'danger' | 'warning'

type ToastItem = {
  id: number
  message: string
  variant: ToastVariant
}

type ToastState = {
  add: (variant: ToastVariant, message: string) => void
  remove: (id: number) => void
  toasts: ToastItem[]
}

let nextId = 1

export const useToasts = create<ToastState>()((set) => ({
  toasts: [],
  add: (variant, message) =>
    set((state) => ({
      toasts: [
        ...state.toasts,
        {
          id: nextId++,
          variant,
          message,
        },
      ],
    })),
  remove: (id) => set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) })),
}))

export const toast = {
  success: (message: string) => useToasts.getState().add('success', message),
  warning: (message: string) => useToasts.getState().add('warning', message),
  error: (message: string) => useToasts.getState().add('danger', message),
}
