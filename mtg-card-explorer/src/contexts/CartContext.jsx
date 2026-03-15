import { createContext, useContext, useState } from "react"

const CartContext = createContext()

export function CartProvider({ children }){

  const [cart,setCart] = useState([])

  function addToCart(card){

    setCart(prev => [...prev, card])

  }

  const totalItems = cart.length

  const subtotal = cart.reduce((sum,item)=> sum + Number(item.price),0)

  return (

    <CartContext.Provider
      value={{
        cart,
        addToCart,
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