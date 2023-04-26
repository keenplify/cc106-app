import { makeApi, Zodios } from '@zodios/core'
import { ZodiosHooks } from '@zodios/react'
import { usersApi } from '../queries/users'
import { productsApi } from '../queries/products'

export const allAPIs = makeApi([
  ...usersApi,
  ...productsApi
])

export const zodios = new Zodios("https://62dcf1d757ac3c3f3c6120c2.mockapi.io/", allAPIs)

export const zodiosHooks = new ZodiosHooks('mockApi', zodios)
