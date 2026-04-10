import { useMemo, useState } from "react"
import { searchCards } from "../services/scryfallApi"
import { useCart } from "../contexts/CartContext"

function DeckBuilder(){
  const { addToCart } = useCart()

  /**
   * Deck state model:
   * - One array with all lines
   * - Each line tracks card identity + section + quantity
   *
   * section is either:
   * - "mainboard"
   * - "sideboard"
   */
  const [deck, setDeck] = useState([])
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [hoverPreview, setHoverPreview] = useState(null)
  const PREVIEW_WIDTH = 220
  const PREVIEW_HEIGHT = 307
  const PREVIEW_GAP = 16
  const VIEWPORT_PADDING = 12

  function addCardToSection(card, section = "mainboard"){

    const lineKey = `${card.id}-${section}`

    setDeck(prev => {
      const exists = prev.find(line => line.lineKey === lineKey)

      if (exists) {
        return prev.map(line =>
          line.lineKey === lineKey ? { ...line, qty: line.qty + 1 } : line
        )
      }

      return [
        ...prev,
        {
          lineKey,
          cardId: card.id,
          oracleId: card.oracle_id ?? null,
          name: card.name,
          image:
            card.image_uris?.small ||
            card.card_faces?.[0]?.image_uris?.small ||
            "",
          price: Number(card.prices?.usd ?? 0),
          section,
          qty: 1
        }
      ]
    })
  }

  function updateQty(lineKey, nextQty){
    setDeck(prev =>
      prev
        .map(line => (line.lineKey === lineKey ? { ...line, qty: nextQty } : line))
        .filter(line => line.qty > 0)
    )
  }

  function removeLine(lineKey){
    setDeck(prev => prev.filter(line => line.lineKey !== lineKey))
  }

  function addDeckToCart(){
    deck.forEach(line => {
      for (let i = 0; i < line.qty; i++) {
        addToCart({
          id: line.cardId,
          name: line.name,
          price: line.price
        })
      }
    })
  }

  function getPreviewPosition(clientX, clientY){
    const maxX = window.innerWidth - PREVIEW_WIDTH - VIEWPORT_PADDING
    const maxY = window.innerHeight - PREVIEW_HEIGHT - VIEWPORT_PADDING

    let x = clientX + PREVIEW_GAP
    let y = clientY - PREVIEW_HEIGHT / 2

    if (x > maxX) x = clientX - PREVIEW_WIDTH - PREVIEW_GAP
    if (x < VIEWPORT_PADDING) x = VIEWPORT_PADDING

    if (y > maxY) y = maxY
    if (y < VIEWPORT_PADDING) y = VIEWPORT_PADDING

    return { x, y }
  }

  function showPreview(e, src, name){
    if (!src) return
    const pos = getPreviewPosition(e.clientX, e.clientY)
    setHoverPreview({
      src,
      name,
      x: pos.x,
      y: pos.y
    })
  }

  function movePreview(e){
    setHoverPreview(prev => {
      if (!prev) return prev
      const pos = getPreviewPosition(e.clientX, e.clientY)
      return { ...prev, x: pos.x, y: pos.y }
    })
  }

  function hidePreview(){
    setHoverPreview(null)
  }

  async function handleSearchSubmit(e){
    e.preventDefault()

    const q = query.trim()
    if (!q) return

    setLoading(true)
    setError("")

    try {
      const data = await searchCards(q)

      if (data.object === "error") {
        setResults([])
        setError(data.details || "Search failed.")
      } else {
        // Keep the first page small while building the feature.
        setResults((data.data || []).slice(0, 12))
      }
    } catch {
      setError("Network error while searching cards.")
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const mainboardCount = useMemo(
    () =>
      deck
        .filter(line => line.section === "mainboard")
        .reduce((sum, line) => sum + line.qty, 0),
    [deck]
  )

  const sideboardCount = useMemo(
    () =>
      deck
        .filter(line => line.section === "sideboard")
        .reduce((sum, line) => sum + line.qty, 0),
    [deck]
  )

  const deckTotalPrice = useMemo(
    () => deck.reduce((sum, line) => sum + Number(line.price || 0) * line.qty, 0),
    [deck]
  )

  return (

    <div className="page deck-builder">

      <h1>Deck builder</h1>

      <p>Search cards and add them to mainboard or sideboard.</p>

      <form className="deck-search-form" onSubmit={handleSearchSubmit}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search cards (e.g. lightning bolt)"
          aria-label="Search cards for deck"
        />
        <button type="submit">
          Search
        </button>
      </form>

      {loading && <p className="loading-text">Searching cards...</p>}
      {error && <p className="loading-text" role="alert">{error}</p>}

      {!loading && results.length > 0 && (
        <div className="deck-results">
          <h3>Results</h3>
          {results.map(card => (
            <div key={card.id} className="deck-result-row">
              <img
                src={card.image_uris?.small || card.card_faces?.[0]?.image_uris?.small || ""}
                alt={card.name}
                onMouseEnter={(e) =>
                  showPreview(
                    e,
                    card.image_uris?.normal || card.card_faces?.[0]?.image_uris?.normal || "",
                    card.name
                  )
                }
                onMouseMove={movePreview}
                onMouseLeave={hidePreview}
              />
              <strong>{card.name}</strong>
              <span>
                ${Number(card.prices?.usd ?? 0).toFixed(2)}
              </span>
              <div className="deck-result-actions">
                <button type="button" onClick={() => addCardToSection(card, "mainboard")}>
                  Add to main
                </button>
                <button type="button" onClick={() => addCardToSection(card, "sideboard")}>
                  Add to side
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="deck-stats">
        <p>Mainboard cards: <strong>{mainboardCount}</strong></p>
        <p>Sideboard cards: <strong>{sideboardCount}</strong></p>
      </div>

      <div className="deck-toolbar">
        <button type="button" disabled={deck.length === 0} onClick={addDeckToCart}>
          Add deck to cart
        </button>
        <strong className="deck-total">Total deck price: ${deckTotalPrice.toFixed(2)}</strong>
      </div>

      {deck.map(line => (
        <div key={line.lineKey} className="deck-line">
          <img
            src={line.image}
            alt={line.name}
            onMouseEnter={(e) => showPreview(e, line.image, line.name)}
            onMouseMove={movePreview}
            onMouseLeave={hidePreview}
          />
          <strong>{line.name}</strong>
          <span>({line.section})</span>
          <span>× {line.qty}</span>
          <span>@ ${Number(line.price || 0).toFixed(2)}</span>
          <span>= ${(Number(line.price || 0) * line.qty).toFixed(2)}</span>
          <div className="deck-line-actions">
            <button type="button" onClick={() => updateQty(line.lineKey, line.qty - 1)}>
              -
            </button>
            <button type="button" onClick={() => updateQty(line.lineKey, line.qty + 1)}>
              +
            </button>
            <button type="button" onClick={() => removeLine(line.lineKey)}>
              Remove
            </button>
          </div>
        </div>
      ))}

      {hoverPreview && (
        <div
          className="deck-hover-preview"
          style={{ left: `${hoverPreview.x}px`, top: `${hoverPreview.y}px` }}
        >
          <img src={hoverPreview.src} alt={hoverPreview.name} />
        </div>
      )}

    </div>

  )
}

export default DeckBuilder

