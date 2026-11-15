import { QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router/dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { ToastOrganism } from '@/components/organisms/ToastOrganism'
import { queryClient } from '@/lib/queryClient'
import { router } from './router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastOrganism />
    </QueryClientProvider>
  </StrictMode>,
)
