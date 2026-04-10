import { Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Landing from "./pages/Landing"
import Catalog from "./pages/Catalog"
import CardDetail from "./pages/CardDetail"
import Cart from "./pages/Cart"
import Account from "./pages/Account"
import DeckBuilder from "./pages/DeckBuilder"


function App(){

  return (

    <div className="app-shell">

      <Navbar />

      <Routes>

        <Route path="/" element={<Landing />} />

        <Route path="/search" element={<Catalog />} />

        <Route path="/card/:id" element={<CardDetail />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/account" element={<Account />} />

        <Route path="/deck-builder" element={<DeckBuilder />} />

        <Route
          path="*"
          element={
            <div className="page not-found">
              <h1>Page not found</h1>
              <p>The page you are looking for does not exist.</p>
            </div>
          }
        />

      </Routes>

    </div>

  )
}

export default App