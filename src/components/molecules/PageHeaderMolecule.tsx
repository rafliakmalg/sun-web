import type { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  title: string
}

export function PageHeaderMolecule({ children, title }: Props) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h1 className="h3 mb-0">{title}</h1>
      <div>{children}</div>
    </div>
  )
}
