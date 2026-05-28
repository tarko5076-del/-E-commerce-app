import { BadgeCheck, Star } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addItem } from '../../features/cart/cartSlice'
import { showToast } from '../../features/ui/uiSlice'
import { formatETB } from '../../utils/formatters'

function ProductCard({ product }) {
  const dispatch = useDispatch()
  const language = useSelector((state) => state.ui.language)
  const image = product.images?.[0] || product.image
  const stock = product.totalStock ?? product.stock ?? 0

  function addToCart() {
    dispatch(addItem(product))
    dispatch(showToast(`${product.name} added to cart`))
  }

  return (
    <article className="group flex min-h-full flex-col rounded-lg bg-white p-3 shadow-sm ring-1 ring-zinc-200 transition hover:-translate-y-0.5 hover:shadow-xl">
      <Link to={`/products/${product.id}`} className="relative overflow-hidden rounded-md bg-zinc-100">
        <img
          className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"
          src={image}
          alt={product.name}
          loading="lazy"
        />
        {product.isOriginal && (
          <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded bg-[#0a0a0b] px-2 py-1 text-xs font-black text-[#FFD700]">
            <BadgeCheck size={13} />
            Original
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col pt-3">
        <p className="text-xs font-black uppercase text-zinc-500">
          {product.brand}
        </p>
        <Link
          className="mt-1 line-clamp-2 min-h-11 font-black leading-snug hover:text-[#9b7600]"
          to={`/products/${product.id}`}
        >
          {language === 'am' && product.nameAmharic
            ? product.nameAmharic
            : product.name}
        </Link>
        <div className="mt-2 flex items-center gap-2 text-sm text-zinc-600">
          <Star className="text-[#FFC200]" size={16} fill="currentColor" />
          <span>{product.rating}</span>
          <span>({product.reviewCount || product.reviews || 0})</span>
        </div>
        <p className="mt-3 text-xl font-black">{formatETB(product.price, language)}</p>
        <p className="mt-1 text-xs font-bold text-red-600">
          {stock <= 3 ? 'Only 3 left! — ጥቂት ቀሪ!' : `${stock} in stock`}
        </p>
        <p className="mt-1 text-xs text-zinc-600">
          Warranty: {product.warranty?.period || '1 year'}
        </p>
        <button
          className="mt-4 rounded-full bg-[#FFD700] px-4 py-2 text-sm font-black text-[#0a0a0b] transition hover:bg-[#FFC200] disabled:opacity-50"
          disabled={stock < 1}
          onClick={addToCart}
        >
          Add to cart
        </button>
      </div>
    </article>
  )
}

export default ProductCard
