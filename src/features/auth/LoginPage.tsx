import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router'
import { ErrorAlertMolecule } from '@/components/molecules/ErrorAlertMolecule'
import { TextFieldMolecule } from '@/components/molecules/TextFieldMolecule'
import { useAuth } from '@/stores/auth'
import { applyApiErrors } from '@/utils'
import { useLogin } from './api'
import { loginSchema, type LoginInput } from './schema'

export function LoginPage() {
  const token = useAuth((state) => state.token)
  const login = useLogin()

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  })

  if (token) {
    return <Navigate to="/" replace />
  }

  function onSubmit(values: LoginInput) {
    login.mutate(values, { onError: (error) => applyApiErrors(error, setError) })
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: 380 }}>
        <Card.Body className="p-4">
          <h1 className="h4 mb-4 text-center">Masuk ke WMS</h1>
          {errors.root && <ErrorAlertMolecule error={errors.root.message} />}
          <Form noValidate onSubmit={handleSubmit(onSubmit)}>
            <TextFieldMolecule
              control={control}
              name="username"
              label="Username"
              autoComplete="username"
              autoFocus
            />
            <TextFieldMolecule
              control={control}
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              className="w-100"
              disabled={login.isPending}
            >
              {login.isPending ? 'Memproses...' : 'Masuk'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}
