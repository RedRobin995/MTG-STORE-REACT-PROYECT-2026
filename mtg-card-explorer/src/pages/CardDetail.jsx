import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCard, getPrints } from "../services/scryfallApi"
import PrintRow from "../components/PrintRow"

function CardDetail() {

  const { id } = useParams()

  const [card, setCard] = useState(null)
  const [prints, setPrints] = useState([])

  useEffect(() => {

    async function loadCard(){

      const data = await getCard(id)
      setCard(data)

      const allPrints = await getPrints(data.prints_search_uri)
      setPrints(allPrints)

    }

    loadCard()

  }, [id])

  if(!card) return <p>Loading card...</p>

  const mainImage =
    card.image_uris?.normal ||
    card.card_faces?.[0]?.image_uris?.normal

  const sortedPrints = [...prints].sort((a, b) => {

    const priceA = parseFloat(a.prices?.usd)
    const priceB = parseFloat(b.prices?.usd)

    if (isNaN(priceA) && isNaN(priceB)) return 0
    if (isNaN(priceA)) return 1
    if (isNaN(priceB)) return -1

    return priceA - priceB
  })

  const cheapestPrint = sortedPrints.find(p => p.prices?.usd)

  return (
    <div className="card-detail">

      <div className="card-detail-header">

        <img src={mainImage} className="card-detail-image"/>

        <div>

          <h1>{card.name}</h1>

          <p>{card.type_line}</p>

          <p>{card.oracle_text || card.card_faces?.[0]?.oracle_text}</p>

        </div>

      </div>

      <h2>Available Printings</h2>

      <div className="prints-list">

  {sortedPrints.map(print => (

    <PrintRow
      key={print.id}
      print={print}
      isBestPrice={print.id === cheapestPrint?.id}
    />

  ))}

</div>

    </div>
  )
}

export default CardDetail