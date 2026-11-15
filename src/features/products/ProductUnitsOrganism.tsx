import { Button, Col, Form, Row } from 'react-bootstrap'
import { Trash } from 'react-bootstrap-icons'
import { useFieldArray, useWatch, type Control } from 'react-hook-form'
import { IconButtonAtom } from '@/components/atoms/IconButtonAtom'
import { AutocompleteFieldMolecule } from '@/components/molecules/AutocompleteFieldMolecule'
import { NumberFieldMolecule } from '@/components/molecules/NumberFieldMolecule'
import { useUnitOptions } from '@/features/units/api'
import type { Product, ProductInput } from './schema'
import { useTranslate } from '@/lib/lang'

type Props = {
  control: Control<ProductInput>
  product: Product | null
}

export function ProductUnitsOrganism({ control, product }: Props) {
  const { fields, append, remove } = useFieldArray({ control, name: 'units' })
  const t = useTranslate()
  const baseUnitId = useWatch({ control, name: 'base_unit_id' })
  const baseUnitName = useUnitOptions('', !!baseUnitId).options.find((unit) => unit.value === baseUnitId)?.label

  return (
    <div className="form-wide mb-3">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <Form.Label className="mb-0">{t('product.units')}</Form.Label>
        <Button
          size="sm"
          variant="outline-primary"
          onClick={() => append({ unit_id: '', factor: '' })}
        >
          + {t('create')} {t('unit')}
        </Button>
      </div>
      <Form.Text className="d-block mb-2">
        Jumlah adalah isi satuan terkecil dalam 1 satuan tambahan, misalnya 1 Carton = 12 Pieces.
      </Form.Text>
      {fields.length === 0 && <p className="text-muted small mb-0">Belum ada satuan tambahan.</p>}
      {fields.length > 0 && (
        <div className="border rounded">
          <Row className="g-2 mx-0 px-2 py-2 bg-body-tertiary text-muted small d-none d-md-flex">
            <Col md={6}>{t('product.units.unit_id')}</Col>
            <Col md={5}>{t('product.units.factor')}</Col>
            <Col md={1} />
          </Row>
          {fields.map((field, index) => (
            <Row
              key={field.id}
              className="g-2 mx-0 p-2 border-top align-items-start"
            >
              <Col md={6}>
                <AutocompleteFieldMolecule
                  control={control}
                  name={`units.${index}.unit_id`}
                  label="product.units.unit_id"
                  useSearch={useUnitOptions}
                  initialLabel={product?.units?.find((unit) => String(unit.unit_id) === field.unit_id)?.unit?.name}
                  compact
                  hideLabel
                />
              </Col>
              <Col md={5}>
                <NumberFieldMolecule
                  control={control}
                  name={`units.${index}.factor`}
                  label="product.units.factor"
                  decimals={6}
                  suffix={baseUnitName ?? t('product.base_unit_id').toLowerCase()}
                  compact
                  hideLabel
                />
              </Col>
              <Col
                md={1}
                className="d-flex justify-content-end"
              >
                <IconButtonAtom
                  icon={Trash}
                  label="Hapus satuan"
                  variant="outline-danger"
                  onClick={() => remove(index)}
                />
              </Col>
            </Row>
          ))}
        </div>
      )}
    </div>
  )
}
