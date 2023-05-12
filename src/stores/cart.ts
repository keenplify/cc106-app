import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { LS_CART } from '../configs/localstorage'
import { Product } from '../models/product'

export interface CartItem {
  product: Product
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (product: Product) => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product, quantity=1) => set(({items}) => {
        let item = items.find(v => v.product.id === product.id)

        if (item) {
          item.quantity += quantity
        }

        if (!item) {
          items.push({
            product,
            quantity
          })
        }

        return {
          items
        }
      }),
      removeItem: (product) => set((values) => {
        return {
          items: values.items.filter((item) => item.product.id !== product.id)
        }
      })
    }),
    {
      name: LS_CART,
    }
  )
)