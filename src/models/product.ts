import { z } from 'zod'

export const ProductSchema = z.object({
    id: z.string(),
    createdAt: z.string(),
    name: z.string().min(1, 'Full Name is required'),
    image: z.string().min(1, 'Image is required').url(),
    description: z.string().min(1, 'Description is required'),
    price: z.string().min(1, 'Price is required'),
})

export type Product = z.infer<typeof ProductSchema>
