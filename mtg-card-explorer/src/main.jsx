import React from "react"
import ReactDOM from "react-dom/client"
import { HashRouter } from "react-router-dom"
import App from "./App"
import { CartProvider } from "./contexts/CartContext"
import "./index.css"

// GitHub Pages + portfolio links can open the site with an empty hash or a hash
// that doesn't start with "#/". HashRouter expects routes in the "#/..." format.
// If we don't normalize, the initial route can fail to match and you'll only see
// shared layout (like the Navbar) until you click a Link.
if (typeof window !== "undefined") {
  const normalizeHash = () => {
    const h = window.location.hash

    if (h === "" || h === "#") {
      // Use assignment (not replace) to reliably trigger routing.
      window.location.hash = "#/"
      return
    }

    if (!h.startsWith("#/")) {
      // Convert "#foo" → "#/foo"
      window.location.hash = `#/${h.slice(1)}`
    }
  }

  normalizeHash()
}

ReactDOM.createRoot(document.getElementById("root")).render(

  <HashRouter>
    <CartProvider>
      <App />
    </CartProvider>
  </HashRouter>

)