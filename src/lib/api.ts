import axios, { isAxiosError } from 'axios'
import qs from 'qs'
import { useAuth } from '@/stores/auth'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { Accept: 'application/json' },
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'indices', encodeValuesOnly: true }),
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
