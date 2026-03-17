import React from "react"
import ReactDOM from "react-dom/client"
import { HashRouter } from "react-router-dom"
import App from "./App"
import { CartProvider } from "./contexts/CartContext"
import "./index.css"

// GitHub Pages sometimes opens the site as:
// - https://<user>.github.io/<repo>
// - https://<user>.github.io/<repo>#
// HashRouter expects "#/" for the app root. Normalize to avoid a no-match route
// on the first load (which can render only shared layout like the Navbar).
if (typeof window !== "undefined") {
  const h = window.location.hash
  if (h === "" || h === "#") {
    window.location.replace(`${window.location.pathname}${window.location.search}#/`)
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(

  <HashRouter>
    <CartProvider>
      <App />
    </CartProvider>
  </HashRouter>

)