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

    <div className="page page--center">

      <header className="hero">
        <h1 className="hero__title">MTG Card Store</h1>
        <p className="page__lead">
          Search thousands of Magic cards and explore different printings.
        </p>
      </header>

      <form className="search-form" onSubmit={handleSearch}>

        <input
          type="text"
          placeholder="Search cards..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />

        <button type="submit">
          Search
        </button>

      </form>

      {loading && <p className="loading-text">Loading cards...</p>}

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
              />

            </Link>

          )

        })}

      </div>

      <div className="btn-row landing-actions">
        <button type="button" className="btn btn--ghost btn--sm" onClick={loadRandomCards}>
          Refresh cards
        </button>
        <Link to="/search" className="btn btn--primary btn--lg">
          Browse cards
        </Link>
      </div>

    </div>
  )
}

export default Landing