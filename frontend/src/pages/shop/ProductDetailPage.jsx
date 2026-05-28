import { BadgeCheck, ChevronRight, Star } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import ProductCard from '../../components/product/ProductCard'
import { addItem } from '../../features/cart/cartSlice'
import {
  addRecentlyViewed,
  fetchProducts,
} from '../../features/products/productsSlice'
import { showToast } from '../../features/ui/uiSlice'
import { formatETB } from '../../utils/formatters'

function ProductDetailPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [activeImage, setActiveImage] = useState(0)
  const language = useSelector((state) => state.ui.language)
  const { items, recentlyViewed } = useSelector((state) => state.products)
  const product = items.find((item) => item.id === id)

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts())
    }
  }, [dispatch, items.length])

  useEffect(() => {
    if (product) {
      dispatch(addRecentlyViewed(product))
    }
  }, [dispatch, product])

  const related = useMemo(
    () =>
      items
        .filter((item) => item.category === product?.category && item.id !== id)
        .slice(0, 4),
    [id, items, product],
  )

  if (!product) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10">
        <p className="rounded-lg bg-white p-5 shadow-sm">Product not found.</p>
      </main>
    )
  }

  const images = product.images?.length ? product.images : [product.image]

  function addToCart() {
    dispatch(addItem(product))
    dispatch(showToast(`${product.name} added to cart`))
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <nav className="mb-4 flex items-center gap-1 text-sm text-zinc-600">
        <Link to="/">Home</Link>
        <ChevronRight size={14} />
        <Link to="/products">Electronics</Link>
        <ChevronRight size={14} />
        <span>{product.category}</span>
      </nav>

      <section className="grid gap-6 rounded-lg bg-white p-4 shadow-sm ring-1 ring-zinc-200 lg:grid-cols-[1fr_1fr]">
        <div>
          <img
            className="aspect-square w-full rounded-lg bg-zinc-100 object-cover"
            src={images[activeImage]}
            alt={product.name}
          />
          <div className="mt-3 flex gap-2 overflow-x-auto">
            {images.map((image, index) => (
              <button
                className={`h-16 w-16 shrink-0 overflow-hidden rounded border ${
                  activeImage === index ? 'border-[#FFD700]' : 'border-zinc-200'
                }`}
                key={image}
                onClick={() => setActiveImage(index)}
              >
                <img className="h-full w-full object-cover" src={image} alt="" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-black uppercase text-zinc-500">
            {product.brand}
          </p>
          <h1 className="mt-1 text-3xl font-black leading-tight">
            {language === 'am' && product.nameAmharic
              ? product.nameAmharic
              : product.name}
          </h1>
          <div className="mt-3 flex items-center gap-2 text-sm">
            <Star className="text-[#FFC200]" size={18} fill="currentColor" />
            <strong>{product.rating}</strong>
            <span className="text-zinc-600">
              {product.reviewCount} reviews
            </span>
            {product.isOriginal && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-xs font-black text-emerald-800">
                <BadgeCheck size={13} />
                Original verified
              </span>
            )}
          </div>
          <p className="mt-4 text-3xl font-black">
            {formatETB(product.price, language)}
          </p>
          {product.comparePrice > product.price && (
            <p className="text-sm text-zinc-500 line-through">
              {formatETB(product.comparePrice, language)}
            </p>
          )}
          <p className="mt-4 text-zinc-700">
            {language === 'am' && product.descriptionAmharic
              ? product.descriptionAmharic
              : product.description}
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Info label="Warranty" value={`${product.warranty?.period} - ${product.warranty?.provider}`} />
            <Info label="Customs" value={product.customsInfo || 'Included where applicable'} />
            <Info label="Delivery" value="Addis same day, regions 3-7 days" />
            <Info label="Stock" value={`${product.totalStock} available`} />
          </div>

          <button
            className="mt-6 w-full rounded bg-[#FFD700] px-5 py-3 font-black text-[#0a0a0b] hover:bg-[#FFC200]"
            onClick={addToCart}
          >
            Add to cart
          </button>
        </div>
      </section>

      <section className="mt-6 grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-zinc-200">
          <h2 className="text-xl font-black">Technical specifications</h2>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            {Object.entries(product.specs || {}).map(([key, value]) => (
              <div className="rounded bg-zinc-50 p-3" key={key}>
                <dt className="text-xs font-black uppercase text-zinc-500">
                  {key}
                </dt>
                <dd className="mt-1 font-bold">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-zinc-200">
          <h2 className="text-xl font-black">Compatible accessories</h2>
          <p className="mt-2 text-zinc-600">
            Cases, chargers, cables, earbuds, and protection accessories that
            match this device.
          </p>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-black">Related products</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>

      {recentlyViewed.length > 1 && (
        <section className="mt-8 pb-10">
          <h2 className="mb-4 text-2xl font-black">Recently viewed</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recentlyViewed
              .filter((item) => item.id !== product.id)
              .slice(0, 4)
              .map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
          </div>
        </section>
      )}
    </main>
  )
}

function Info({ label, value }) {
  return (
    <div className="rounded bg-zinc-50 p-3">
      <p className="text-xs font-black uppercase text-zinc-500">{label}</p>
      <p className="mt-1 font-bold">{value}</p>
    </div>
  )
}

export default ProductDetailPage
