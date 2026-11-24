import type { ReactElement } from 'react'
import { createBrowserRouter, Navigate } from 'react-router'
import { AppLayoutTemplate } from '@/components/templates/AppLayoutTemplate'
import { FormLayoutTemplate } from '@/components/templates/FormLayoutTemplate'
import { AdjustmentDetailPage } from '@/features/adjustments/AdjustmentDetailPage'
import { AdjustmentFormPage } from '@/features/adjustments/AdjustmentFormPage'
import { AdjustmentPage } from '@/features/adjustments/AdjustmentPage'
import { AssistantPage } from '@/features/assistant/AssistantPage'
import { LoginPage } from '@/features/auth/LoginPage'
import { RequireAuth } from '@/features/auth/RequireAuth'
import { RequirePermission } from '@/features/auth/RequirePermission'
import { BranchFormPage } from '@/features/branches/BranchFormPage'
import { BranchPage } from '@/features/branches/BranchPage'
import { CategoryFormPage } from '@/features/categories/CategoryFormPage'
import { CategoryPage } from '@/features/categories/CategoryPage'
import { DashboardPage } from '@/features/dashboard/DashboardPage'
import { HandoverDetailPage } from '@/features/handovers/HandoverDetailPage'
import { HandoverFormPage } from '@/features/handovers/HandoverFormPage'
import { HandoverPage } from '@/features/handovers/HandoverPage'
import { InventoryPage } from '@/features/inventories/InventoryPage'
import { MovementFormPage } from '@/features/movements/MovementFormPage'
import { MovementPage } from '@/features/movements/MovementPage'
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

function guard(permission: string, element: ReactElement) {
  return <RequirePermission permission={permission}>{element}</RequirePermission>
}

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    element: <RequireAuth />,
    children: [
      { path: 'assistant', element: <AssistantPage /> },
      { path: 'assistant/:id', element: <AssistantPage /> },
      {
        element: <AppLayoutTemplate />,
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: 'adjustments', element: guard('adjustment.read', <AdjustmentPage />) },
          { path: 'adjustments/:id', element: guard('adjustment.read', <AdjustmentDetailPage />) },
          { path: 'branches', element: guard('branch.read', <BranchPage />) },
          { path: 'categories', element: guard('category.read', <CategoryPage />) },
          { path: 'dashboard', element: guard('dashboard.read', <DashboardPage />) },
          { path: 'handovers', element: guard('handover.read', <HandoverPage />) },
          { path: 'handovers/:id', element: guard('handover.read', <HandoverDetailPage />) },
          { path: 'inventories', element: guard('inventory.read', <InventoryPage />) },
          { path: 'movements', element: guard('movement.read', <MovementPage />) },
          { path: 'products', element: guard('product.read', <ProductPage />) },
          { path: 'racks', element: guard('rack.read', <RackPage />) },
          { path: 'roles', element: guard('role.read', <RolePage />) },
          { path: 'units', element: guard('unit.read', <UnitPage />) },
          { path: 'users', element: guard('user.read', <UserPage />) },
          { path: 'warehouses', element: guard('warehouse.read', <WarehousePage />) },
        ],
      },
      {
        element: <FormLayoutTemplate />,
        children: [
          { path: 'adjustments/create', element: guard('adjustment.create', <AdjustmentFormPage />) },
          { path: 'branches/create', element: guard('branch.create', <BranchFormPage />) },
          { path: 'branches/:id/edit', element: guard('branch.update', <BranchFormPage />) },
          { path: 'categories/create', element: guard('category.create', <CategoryFormPage />) },
          { path: 'categories/:id/edit', element: guard('category.update', <CategoryFormPage />) },
          { path: 'handovers/create', element: guard('handover.create', <HandoverFormPage />) },
          { path: 'movements/create', element: guard('movement.create', <MovementFormPage />) },
          { path: 'products/create', element: guard('product.create', <ProductFormPage />) },
          { path: 'products/:id/edit', element: guard('product.update', <ProductFormPage />) },
          { path: 'racks/create', element: guard('rack.create', <RackFormPage />) },
          { path: 'racks/:id/edit', element: guard('rack.update', <RackFormPage />) },
          { path: 'roles/create', element: guard('role.create', <RoleFormPage />) },
          { path: 'roles/:id/edit', element: guard('role.update', <RoleFormPage />) },
          { path: 'units/create', element: guard('unit.create', <UnitFormPage />) },
          { path: 'units/:id/edit', element: guard('unit.update', <UnitFormPage />) },
          { path: 'users/create', element: guard('user.create', <UserFormPage />) },
          { path: 'users/:id/edit', element: guard('user.update', <UserFormPage />) },
          { path: 'warehouses/create', element: guard('warehouse.create', <WarehouseFormPage />) },
          { path: 'warehouses/:id/edit', element: guard('warehouse.update', <WarehouseFormPage />) },
        ],
      },
    ],
  },
])
