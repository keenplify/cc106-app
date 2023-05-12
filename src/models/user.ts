import { z } from 'zod'

export const UserSchema = z.object({
    id: z.string(),
    createdAt: z.string(),
    name: z.string().min(1, 'Required'),
    email: z.string().min(1, 'Required').email(),
    password: z.string().min(1, 'Required')
})

export type User = z.infer<typeof UserSchema>
