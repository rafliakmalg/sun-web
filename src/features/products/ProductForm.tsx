import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { AutocompleteFieldMolecule } from '@/components/molecules/AutocompleteFieldMolecule'
import { NumberFieldMolecule } from '@/components/molecules/NumberFieldMolecule'
import { TextFieldMolecule } from '@/components/molecules/TextFieldMolecule'
import { TextareaFieldMolecule } from '@/components/molecules/TextareaFieldMolecule'
import { ToggleFieldMolecule } from '@/components/molecules/ToggleFieldMolecule'
import { FormOrganism } from '@/components/organisms/FormOrganism'
import { useCategoryOptions } from '@/features/categories/api'
import { useUnitOptions } from '@/features/units/api'
import { useFinishForm } from '@/hooks/useFinishForm'
import { applyApiErrors } from '@/lib/errors'
import { useSaveProduct } from './api'
import { productInputSchema, type Product, type ProductInput } from './schema'
import { ProductUnitsOrganism } from './ProductUnitsOrganism'

type Props = {
  product: Product | null
}

export function ProductForm({ product }: Props) {
  const save = useSaveProduct(product)
  const finish = useFinishForm('/products')

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ProductInput>({
    resolver: zodResolver(productInputSchema),
    defaultValues: {
      active: product?.active ?? true,
      base_unit_id: product ? String(product.base_unit_id) : '',
      category_id: product ? String(product.category_id) : '',
      description: product?.description ?? '',
      min_stock: product ? String(Number(product.min_stock)) : '0',
      name: product?.name ?? '',
      sku: product?.sku ?? '',
      units: (product?.units ?? []).map((unit) => ({
        factor: String(Number(unit.factor)),
        unit_id: String(unit.unit_id),
      })),
    },
  })

  function onSubmit(values: ProductInput) {
    save.mutate(values, {
      onSuccess: (data) => finish(data.message),
      onError: (error) => applyApiErrors(error, setError),
    })
  }

  return (
    <FormOrganism
      onSubmit={handleSubmit(onSubmit)}
      onCancel={() => finish()}
      submitting={save.isPending}
      error={errors.root?.message}
    >
      <TextFieldMolecule
        control={control}
        name="sku"
        label="SKU"
        autoFocus
      />
      <TextFieldMolecule
        control={control}
        name="name"
        label="Nama"
      />
      <AutocompleteFieldMolecule
        control={control}
        name="category_id"
        label="Kategori"
        useSearch={useCategoryOptions}
        initialLabel={product?.category?.name}
      />
      <AutocompleteFieldMolecule
        control={control}
        name="base_unit_id"
        label="Satuan terkecil"
        useSearch={useUnitOptions}
        initialLabel={product?.base_unit?.name}
      />
      <NumberFieldMolecule
        control={control}
        name="min_stock"
        label="Stok minimum"
        decimals={3}
      />
      <ToggleFieldMolecule
        control={control}
        name="active"
        label="Aktif"
      />
      <TextareaFieldMolecule
        control={control}
        name="description"
        label="Deskripsi"
      />
      <ProductUnitsOrganism
        control={control}
        product={product}
      />
    </FormOrganism>
  )
}
