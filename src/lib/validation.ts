import { translate, type Params } from '@/lib/lang'

export function issue(key: string, attribute: string) {
  return translate(key, { attribute: translate(attribute) })
}

export const rule = {
  alphaDash: (attribute: string) => message('validation.alpha_dash', attribute),
  decimal: (decimals: number, attribute: string) => message('validation.decimal', attribute, { decimal: `0-${decimals}` }),
  email: (attribute: string) => message('validation.email', attribute),
  greaterThan: (value: number, attribute: string) => message('validation.gt.numeric', attribute, { value }),
  maxString: (max: number, attribute: string) => message('validation.max.string', attribute, { max }),
  minNumber: (min: number, attribute: string) => message('validation.min.numeric', attribute, { min }),
  minString: (min: number, attribute: string) => message('validation.min.string', attribute, { min }),
  required: (attribute: string) => message('validation.required', attribute),
}

function message(key: string, attribute: string, params: Params = {}) {
  return { error: () => translate(key, { attribute: translate(attribute), ...params }) }
}
