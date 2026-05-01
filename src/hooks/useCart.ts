import { create } from 'zustand'

interface CartItem {
  _id: string
  name: string
  price: number
  image: string
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  total: () => number
  clear: () => void
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) => set((s) => ({ items: [...s.items, item] })),
  removeItem: (id) => set((s) => ({ items: s.items.filter((i) => i._id !== id) })),
  total: () => get().items.reduce((sum, i) => sum + i.price, 0),
  clear: () => set({ items: [] }),
}))
