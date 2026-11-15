import { createBrowserRouter, Navigate } from 'react-router'
import { AppLayoutTemplate } from '@/components/templates/AppLayoutTemplate'
import { FormLayoutTemplate } from '@/components/templates/FormLayoutTemplate'
import { LoginPage } from '@/features/auth/LoginPage'
import { RequireAuth } from '@/features/auth/RequireAuth'
import { RequireRole } from '@/features/auth/RequireRole'
import { BranchFormPage } from '@/features/branches/BranchFormPage'
import { BranchPage } from '@/features/branches/BranchPage'
import { CategoryFormPage } from '@/features/categories/CategoryFormPage'
import { CategoryPage } from '@/features/categories/CategoryPage'
import { ProductFormPage } from '@/features/products/ProductFormPage'
import { ProductPage } from '@/features/products/ProductPage'
import { RackFormPage } from '@/features/racks/RackFormPage'
import { RackPage } from '@/features/racks/RackPage'
import { RoleFormPage } from '@/features/roles/RoleFormPage'
import { RolePage } from '@/features/roles/RolePage'
import { UnitFormPage } from '@/features/units/UnitFormPage'
import { UnitPage } from '@/features/units/UnitPage'
import { UserFormPage } from '@/features/users/UserFormPage'
import { UserPage } from '@/features/users/UserPage'
import { WarehouseFormPage } from '@/features/warehouses/WarehouseFormPage'
import { WarehousePage } from '@/features/warehouses/WarehousePage'

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    element: <RequireAuth />,
    children: [
      {
        element: <AppLayoutTemplate />,
        children: [
          { index: true, element: <Navigate to="/categories" replace /> },
          { path: 'branches', element: <BranchPage /> },
          { path: 'categories', element: <CategoryPage /> },
          { path: 'products', element: <ProductPage /> },
          { path: 'racks', element: <RackPage /> },
          { path: 'units', element: <UnitPage /> },
          { path: 'warehouses', element: <WarehousePage /> },
          {
            element: <RequireRole allow={['admin']} />,
            children: [
              { path: 'roles', element: <RolePage /> },
              { path: 'users', element: <UserPage /> },
            ],
          },
        ],
      },
      {
        element: <FormLayoutTemplate />,
        children: [
          { path: 'branches/create', element: <BranchFormPage /> },
          { path: 'branches/:id/edit', element: <BranchFormPage /> },
          { path: 'categories/create', element: <CategoryFormPage /> },
          { path: 'categories/:id/edit', element: <CategoryFormPage /> },
          { path: 'products/create', element: <ProductFormPage /> },
          { path: 'products/:id/edit', element: <ProductFormPage /> },
          { path: 'racks/create', element: <RackFormPage /> },
          { path: 'racks/:id/edit', element: <RackFormPage /> },
          { path: 'units/create', element: <UnitFormPage /> },
          { path: 'units/:id/edit', element: <UnitFormPage /> },
          { path: 'warehouses/create', element: <WarehouseFormPage /> },
          { path: 'warehouses/:id/edit', element: <WarehouseFormPage /> },
          {
            element: <RequireRole allow={['admin']} />,
            children: [
              { path: 'roles/create', element: <RoleFormPage /> },
              { path: 'roles/:id/edit', element: <RoleFormPage /> },
              { path: 'users/create', element: <UserFormPage /> },
              { path: 'users/:id/edit', element: <UserFormPage /> },
            ],
          },
        ],
      },
    ],
  },
])
