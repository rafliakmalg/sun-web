import type { ReactNode } from 'react'

type Props = {
  title: string
  children?: ReactNode
}

export function PageHeaderMolecule({ title, children }: Props) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h1 className="h3 mb-0">{title}</h1>
      <div>{children}</div>
    </div>
  )
}
