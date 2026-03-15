import { useCart } from "../contexts/CartContext"

function PrintRow({ print, isBestPrice }) {

  const { addToCart } = useCart()   // ✅ dentro del componente

  const image =
    print.image_uris?.small ||
    print.card_faces?.[0]?.image_uris?.small ||
    ""

  const price = print.prices?.usd

  return (
    <div className="print-row">

      <img src={image} alt={print.name} />

      <div className="print-info">
        <strong>{print.set_name}</strong>
        <span>#{print.collector_number}</span>
        <span>{print.rarity}</span>
      </div>

      <div className="print-price">

        {price ? `$${price}` : "Unavailable"}

        {isBestPrice && (
          <span className="best-price"> ⭐ Best Price</span>
        )}

      </div>

      <button
        disabled={!price}
        onClick={() =>
          addToCart({
            id: print.id,
            name: print.name,
            price: price
          })
        }
      >
        Add to Cart
      </button>

    </div>
  )
}

export default PrintRow