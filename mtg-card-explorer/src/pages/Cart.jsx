import { useCart } from "../contexts/CartContext"

function Cart(){

  const { cart, subtotal } = useCart()

  return (

    <div style={{padding:"40px"}}>

      <h1>Your Cart</h1>

      {cart.length === 0 && (
        <p>Your cart is empty.</p>
      )}

      {cart.map(item => (

        <div key={item.id} style={{marginBottom:"10px"}}>

          {item.name} — ${item.price}

        </div>

      ))}

      <hr />

      <h2>Subtotal: ${subtotal.toFixed(2)}</h2>

    </div>

  )
}

export default Cart