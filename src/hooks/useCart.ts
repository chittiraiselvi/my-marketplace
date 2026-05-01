import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCart = create(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => set(state => ({
        items: [...state.items, product]
      })),
      
      removeItem: (id) => set(state => ({
        items: state.items.filter(i => i.id !== id)
      })),
      
      getTotal: () =>
        get().items.reduce((sum, i) => sum + i.price, 0)
    }),
    { name: 'cart-storage' } // localStorage save
  )
)