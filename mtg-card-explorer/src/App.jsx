import { Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Landing from "./pages/Landing"
import Catalog from "./pages/Catalog"
import CardDetail from "./pages/CardDetail"
import Cart from "./pages/Cart"


function App(){

  return (

    <div>

      <Navbar />

      <Routes>

        <Route path="/" element={<Landing />} />

        <Route path="/search" element={<Catalog />} />

        <Route path="/card/:id" element={<CardDetail />} />

        <Route path="/cart" element={<Cart />} />

        {/* GitHub Pages / hash routing edge-cases: never render blank */}
        <Route path="*" element={<Landing />} />

      </Routes>

    </div>

  )
}

export default App