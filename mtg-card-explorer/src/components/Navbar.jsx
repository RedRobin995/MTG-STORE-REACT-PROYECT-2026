import { Link } from "react-router-dom"
import { useCart } from "../contexts/CartContext"

function Navbar(){

    const { totalItems } = useCart()

  return (

    <nav className="navbar">

      <div className="nav-logo">
        <Link to="/">MTG Store</Link>
      </div>

      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/search">Cards</Link>

        <Link to="/deck-builder">Deck Builder</Link>

        <Link to="/cart">
        Cart ({totalItems})
        </Link>

        <Link to="/account">Account</Link>

      </div>

    </nav>

  )
}

export default Navbar