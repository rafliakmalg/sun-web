export function canAccess(role: string | undefined, allowed?: string[]): boolean {
  return !allowed || (!!role && allowed.includes(role))
}
