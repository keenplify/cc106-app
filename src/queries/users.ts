import { makeApi } from '@zodios/core'
import z from 'zod'
import { UserSchema } from '../models/user'

export const usersApi = makeApi([
  {
    method: 'post',
    path: 'users',
    alias: 'createUser',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: UserSchema.pick({
            email: true,
            name: true,
            password: true
        })
      }
    ],
    response: UserSchema
  },
  {
    method: 'get',
    path: 'users',
    alias: 'listUsers',
    response: z.array(UserSchema)
  },
])
