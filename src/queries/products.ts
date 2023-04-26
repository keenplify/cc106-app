import { makeApi } from '@zodios/core'
import z from 'zod'
import { ProductSchema } from '../models/product'

export const productsApi = makeApi([
  {
    method: 'get',
    path: 'products',
    alias: 'listProducts',
    response: z.array(ProductSchema)
  },
  {
    method: 'get',
    path: 'products/:id',
    alias: 'getProduct',
    response: ProductSchema
  }
])
