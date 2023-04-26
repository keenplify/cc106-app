import { z } from 'zod'

export const UserSchema = z.object({
    id: z.string(),
    createdAt: z.string(),
    name: z.string().min(1, 'Full Name is required'),
    email: z.string().min(1, 'Email is required').email(),
    password: z.string().min(1, 'Password is required')
})

export type User = z.infer<typeof UserSchema>
