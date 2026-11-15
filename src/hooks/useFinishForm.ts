import { useNavigate } from 'react-router'
import { announceSaved } from '@/lib/tabs'

export function useFinishForm(listPath: string) {
  const navigate = useNavigate()

  return (message?: string) => {
    if (message) {
      announceSaved(message)
    }

    window.close()
    window.setTimeout(() => navigate(listPath), 150)
  }
}
