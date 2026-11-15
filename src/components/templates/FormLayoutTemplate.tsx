import { Outlet } from 'react-router'

export function FormLayoutTemplate() {
  return (
    <main className="d-flex flex-column min-vh-100 bg-white">
      <Outlet />
    </main>
  )
}
