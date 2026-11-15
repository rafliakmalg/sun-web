import { useLang } from '@/stores/lang'

export type Params = Record<string, string | number>

export function translate(key: string, params: Params = {}): string {
  const text = useLang.getState().messages[key] ?? key

  return Object.entries(params).reduce((result, [name, value]) => result.replaceAll(`:${name}`, String(value)), text)
}

export function useTranslate() {
  useLang((state) => state.messages)

  return translate
}
