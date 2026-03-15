import { useEffect, useState } from "react"
import Card from "../components/Card"
import { useSearchParams } from "react-router-dom"
import { searchCards } from "../services/scryfallApi"

function Catalog(){

  const [searchParams] = useSearchParams()
  const initialQuery = searchParams.get("q") || "dragon"

  const [search,setSearch] = useState(initialQuery)
  const [cards,setCards] = useState([])

  useEffect(()=>{
    loadCards(search)
  },[search])

  async function loadCards(query){

    const data = await searchCards(query)

    if(data.object === "error"){
      setCards([])
      return
    }

    setCards(data.data)
  }

  return(
    <div>

      <h1>Search Cards</h1>

      <input
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        placeholder="Search cards..."
      />

      <div className="card-grid">

        {cards.map(card=>(
          <Card key={card.id} card={card}/>
        ))}

      </div>

    </div>
  )
}

export default Catalog