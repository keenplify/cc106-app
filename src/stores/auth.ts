import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '../models/user'
import { LS_AUTH } from '../configs/localstorage'

interface AuthStore {
  authUser?: User
  setAuthUser: (user?: User) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      setAuthUser: (authUser) => set({authUser})
    }),
    {
      name: LS_AUTH,
    }
  )
)