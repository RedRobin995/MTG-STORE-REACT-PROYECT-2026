import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const priceCache = new Map()

function Card({ card }) {

  const [price, setPrice] = useState(null)

  useEffect(() => {

    async function fetchPrice(){

      if(priceCache.has(card.oracle_id)){
        setPrice(priceCache.get(card.oracle_id))
        return
      }

      if(card.prices?.usd){
        priceCache.set(card.oracle_id, card.prices.usd)
        setPrice(card.prices.usd)
        return
      }

      let url = card.prints_search_uri
      let allPrices = []

      while(url){

        const res = await fetch(url)
        const data = await res.json()

        const prices = data.data
          .map(c => parseFloat(c.prices?.usd))
          .filter(p => !isNaN(p))

        allPrices = [...allPrices, ...prices]

        url = data.has_more ? data.next_page : null
      }

      if(allPrices.length > 0){
        const lowest = Math.min(...allPrices).toFixed(2)

        priceCache.set(card.oracle_id, lowest)
        setPrice(lowest)
      }

    }

    fetchPrice()

  }, [card])

  const image =
    card.image_uris?.normal ||
    card.card_faces?.[0]?.image_uris?.normal

  return (
    <Link to={`/card/${card.id}`} style={{textDecoration:"none"}}>
      <div className="card">

        <img src={image} />

        <h3>{card.name}</h3>

        <p>{price ? `From $${price}` : "Not available"}</p>

      </div>
    </Link>
  )
}

export default Card
