import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Landing(){

  const [cards,setCards] = useState([])
  const [search,setSearch] = useState("")
  const [loading,setLoading] = useState(false)

  const navigate = useNavigate()

  async function loadRandomCards(){

    setLoading(true)

    const requests = []

    for(let i=0;i<5;i++){
      requests.push(
        fetch("https://api.scryfall.com/cards/random?q=game:paper")
          .then(res=>res.json())
      )
    }

    const data = await Promise.all(requests)

    setCards(data)
    setLoading(false)
  }

  useEffect(()=>{
    loadRandomCards()
  },[])

  function handleSearch(e){

    e.preventDefault()

    if(search.trim() === "") return

    navigate(`/search?q=${encodeURIComponent(search)}`)
  }

  return (

    <div style={{textAlign:"center", padding:"40px"}}>

      <h1>MTG Card Store</h1>

      <p>Search thousands of Magic cards and explore different printings.</p>

      {/* BUSCADOR */}
      <form onSubmit={handleSearch} style={{marginBottom:"30px"}}>

        <input
          type="text"
          placeholder="Search cards..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          style={{
            padding:"10px",
            width:"250px",
            marginRight:"10px"
          }}
        />

        <button type="submit">
          Search
        </button>

      </form>

      {loading && <p>Loading cards...</p>}

      <div className="landing-random-cards">

        {cards.map(card=>{

          const image =
            card.image_uris?.normal ||
            card.card_faces?.[0]?.image_uris?.normal

          return (

            <Link key={card.id} to={`/card/${card.id}`}>

              <img
                src={image}
                alt={card.name}
                style={{width:"200px"}}
              />

            </Link>

          )

        })}

      </div>
      <button style={{padding:"5px 10px", fontSize:"10px"}} onClick={loadRandomCards}>
        Refresh Cards
      </button>

      <br/>

      <br/><br/>

      <Link to="/search">
        <button style={{padding:"15px 30px", fontSize:"18px"}}>
          Browse Cards
        </button>
      </Link>

    </div>
  )
}

export default Landing