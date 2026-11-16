import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { TextFieldMolecule } from '@/components/molecules/TextFieldMolecule'
import { FormOrganism } from '@/components/organisms/FormOrganism'
import { useFinishForm } from '@/hooks/useFinishForm'
import { applyApiErrors } from '@/utils'
import { useSaveCategory } from './api'
import { categoryInputSchema, type Category, type CategoryInput } from './schema'

type Props = {
  category: Category | null
}

export function CategoryForm({ category }: Props) {
  const save = useSaveCategory(category)
  const finish = useFinishForm('/categories')

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CategoryInput>({
    resolver: zodResolver(categoryInputSchema),
    defaultValues: {
      name: category?.name ?? '',
    },
  })

  function onSubmit(values: CategoryInput) {
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
        name="name"
        label="category.name"
        autoFocus
      />
    </FormOrganism>
  )
}
