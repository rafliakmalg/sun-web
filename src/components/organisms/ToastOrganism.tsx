import { CloseButton, Toast, ToastContainer } from 'react-bootstrap'
import { useToasts } from '@/stores/toast'

export function ToastOrganism() {
  const toasts = useToasts((state) => state.toasts)
  const remove = useToasts((state) => state.remove)

  return (
    <ToastContainer position="bottom-center" className="position-fixed p-3">
      {toasts.map((item) => {
        const dark = item.variant !== 'warning'

        return (
          <Toast
            key={item.id}
            bg={item.variant}
            autohide
            delay={4000}
            onClose={() => remove(item.id)}
          >
            <Toast.Body className={`d-flex justify-content-between align-items-center gap-3 ${dark ? 'text-white' : ''}`}>
              <span>{item.message}</span>
              <CloseButton variant={dark ? 'white' : undefined} onClick={() => remove(item.id)} />
            </Toast.Body>
          </Toast>
        )
      })}
    </ToastContainer>
  )
}
