import { z } from 'zod'
import { roleSchema } from '@/features/roles/schema'

export function userInputSchema(editing: boolean) {
  return z.object({
    active: z.boolean(),
    email: z.union([z.literal(''), z.email('Email tidak valid').max(255, 'Email maksimal 255 karakter')]),
    name: z.string().trim().min(1, 'Nama wajib diisi').max(255, 'Nama maksimal 255 karakter'),
    password: editing
      ? z.string().refine((value) => value === '' || value.length >= 8, 'Kata sandi minimal 8 karakter')
      : z.string().min(8, 'Kata sandi wajib diisi, minimal 8 karakter'),
    role_id: z.string().min(1, 'Role wajib dipilih'),
    username: z
      .string()
      .trim()
      .min(1, 'Username wajib diisi')
      .max(50, 'Username maksimal 50 karakter')
      .regex(/^[A-Za-z0-9_-]+$/, 'Username hanya boleh huruf, angka, strip, dan garis bawah'),
  })
}

export const userSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  created_by_id: z.number().nullable(),
  role_id: z.number(),
  updated_by_id: z.number().nullable(),
  email: z.string().nullable(),
  name: z.string(),
  username: z.string(),
  active: z.boolean(),
  role: roleSchema.optional(),
})

export type UserInput = z.infer<ReturnType<typeof userInputSchema>>
export type UserPayload = Omit<UserInput, 'password'> & { password?: string }
export type User = z.infer<typeof userSchema>
