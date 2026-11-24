import { z } from 'zod'
import { roleSchema } from '@/features/roles/schema'
import { rule } from '@/utils'

export function userInputSchema(editing: boolean) {
  return z.object({
    active: z.boolean(),
    email: z.union([
      z.literal(''),
      z.email(rule.email('user.email')).max(255, rule.maxString(255, 'user.email')),
    ]),
    name: z.string().trim().min(1, rule.required('user.name')).max(255, rule.maxString(255, 'user.name')),
    password: editing
      ? z.string().refine((value) => value === '' || value.length >= 8, rule.minString(8, 'user.password'))
      : z.string().min(1, rule.required('user.password')).min(8, rule.minString(8, 'user.password')),
    role_ids: z.array(z.string()).min(1, rule.minArray(1, 'user.role_ids')),
    username: z
      .string()
      .trim()
      .min(1, rule.required('user.username'))
      .max(50, rule.maxString(50, 'user.username'))
      .regex(/^[A-Za-z0-9_-]+$/, rule.alphaDash('user.username')),
  })
}

export const userSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  created_by_id: z.number().nullable(),
  updated_by_id: z.number().nullable(),
  email: z.string().nullable(),
  name: z.string(),
  username: z.string(),
  active: z.boolean(),
  roles: z.array(roleSchema).optional(),
})

export type UserInput = z.infer<ReturnType<typeof userInputSchema>>
export type UserPayload = Omit<UserInput, 'password'> & { password?: string }
export type User = z.infer<typeof userSchema>
