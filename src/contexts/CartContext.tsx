import { createContext, useContext, useMemo, useState, useEffect } from 'react'
import { storage } from '@/lib/storage'
import { Listing } from '@/types'
import { db } from '@/data/mock'

export type CartItem = { listingId: string; qty: number; pricePerTCO2: number }

type CartContextValue = {
  items: CartItem[]
  add: (listingId: string, qty: number, pricePerTCO2: number) => void
  remove: (listingId: string) => void
  updateQty: (listingId: string, qty: number) => void
  clear: () => void
  subtotal: number
}

const CART_KEY = 'vm_cart'

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    setItems(storage.get<CartItem[]>(CART_KEY, []))
  }, [])

  useEffect(() => {
    storage.set(CART_KEY, items)
  }, [items])

  const value = useMemo(() => {
    const subtotal = items.reduce((acc, it) => acc + it.qty * it.pricePerTCO2, 0)
    return {
      items,
      add(listingId, qty, pricePerTCO2) {
        setItems(prev => {
          const existing = prev.find(p => p.listingId === listingId)
          if (existing) return prev.map(p => p.listingId === listingId ? { ...p, qty: p.qty + qty } : p)
          return [...prev, { listingId, qty, pricePerTCO2 }]
        })
      },
      remove(listingId) {
        setItems(prev => prev.filter(p => p.listingId !== listingId))
      },
      updateQty(listingId, qty) {
        setItems(prev => prev.map(p => p.listingId === listingId ? { ...p, qty } : p))
      },
      clear() { setItems([]) },
      subtotal,
    }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
