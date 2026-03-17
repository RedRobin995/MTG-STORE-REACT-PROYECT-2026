import React from "react"
import ReactDOM from "react-dom/client"
import { HashRouter } from "react-router-dom"
import App from "./App"
import { CartProvider } from "./contexts/CartContext"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(

  <HashRouter>
    <CartProvider>
      <App />
    </CartProvider>
  </HashRouter>

)