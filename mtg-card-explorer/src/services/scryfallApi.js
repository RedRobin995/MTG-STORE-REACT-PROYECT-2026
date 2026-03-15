const BASE_URL = "https://api.scryfall.com"

export async function getCard(id) {

  const res = await fetch(`${BASE_URL}/cards/${id}`)
  return res.json()

}

export async function searchCards(query){

  const searchQuery = `(name:${query} OR type:${query} OR oracle:${query}) game:paper`

  const res = await fetch(
    `${BASE_URL}/cards/search?q=${encodeURIComponent(searchQuery)}`
  )

  return res.json()
}

export async function getPrints(url){

  let allPrints = []

  while(url){

    const res = await fetch(url)
    const data = await res.json()

    allPrints = [...allPrints, ...data.data]

    url = data.has_more ? data.next_page : null
  }

  return allPrints
}