import { createContext, useContext, useEffect, useState } from "react"

const CartContext = createContext()

export function CartProvider({ children }){

  const [cart,setCart] = useState(()=>{

    if (typeof window === "undefined") return []

    try{
      const stored = window.localStorage.getItem("mtg-cart")
      return stored ? JSON.parse(stored) : []
    }catch{
      return []
    }
  })

  function addToCart(card){

    // Cart is modeled as line items: { id, name, price, qty }
    // If the same id is added again, we increase qty instead of duplicating lines.
    setCart(prev => {
      const id = card?.id
      if (!id) return prev

      const price = Number(card.price)
      if (!Number.isFinite(price)) return prev

      const existingIdx = prev.findIndex(line => line.id === id)

      if (existingIdx === -1) {
        return [...prev, { id, name: card.name ?? "Unknown", price, qty: 1 }]
      }

      return prev.map((line, idx) =>
        idx === existingIdx ? { ...line, qty: line.qty + 1 } : line
      )
    })

  }

  function increment(id){

    setCart(prev =>
      prev.map(line =>
        line.id === id ? { ...line, qty: line.qty + 1 } : line
      )
    )

  }

  function decrement(id){

    setCart(prev =>
      prev
        .map(line =>
          line.id === id ? { ...line, qty: line.qty - 1 } : line
        )
        .filter(line => line.qty > 0)
    )

  }

  function removeFromCart(id){

    setCart(prev => prev.filter(line => line.id !== id))

  }

  function clearCart(){

    setCart([])

  }

  useEffect(()=>{

    try{
      window.localStorage.setItem("mtg-cart", JSON.stringify(cart))
    }catch{
      // ignore write errors (e.g. private mode)
    }

  },[cart])

  const totalItems = cart.reduce((sum, line) => sum + (line.qty ?? 0), 0)

  const subtotal = cart.reduce(
    (sum, line) => sum + Number(line.price) * Number(line.qty),
    0
  )

  return (

    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increment,
        decrement,
        removeFromCart,
        clearCart,
        totalItems,
        subtotal
      }}
    >

      {children}

    </CartContext.Provider>

  )
}

export function useCart(){
  return useContext(CartContext)
}