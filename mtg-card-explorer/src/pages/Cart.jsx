import { useCart } from "../contexts/CartContext"

function Cart(){

  const {
    cart,
    subtotal,
    increment,
    decrement,
    removeFromCart,
    clearCart
  } = useCart()

  return (

    <div className="page cart-page">

      <h1>Your cart</h1>

      {cart.length === 0 && (
        <p className="cart-empty">Your cart is empty.</p>
      )}

      {cart.map(item => (

        <div key={item.id} className="cart-line">

          <span className="cart-line__name">{item.name}</span>
          <span className="cart-line__detail">
            ${item.price.toFixed(2)} × {item.qty} = ${(item.price * item.qty).toFixed(2)}
          </span>

          <div className="cart-line__actions">
            <button type="button" onClick={() => decrement(item.id)} aria-label="Decrease quantity">
              -
            </button>
            <button type="button" onClick={() => increment(item.id)} aria-label="Increase quantity">
              +
            </button>
            <button type="button" onClick={() => removeFromCart(item.id)}>
              Remove
            </button>
          </div>

        </div>

      ))}

      {cart.length > 0 && (
        <div className="cart-actions">
          <button type="button" onClick={clearCart}>
            Clear cart
          </button>
        </div>
      )}

      {cart.length > 0 && (
        <div className="cart-subtotal">
          <h2>Subtotal: ${subtotal.toFixed(2)}</h2>
        </div>
      )}

    </div>

  )
}

export default Cart