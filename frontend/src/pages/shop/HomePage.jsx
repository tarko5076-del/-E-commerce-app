import { ArrowRight, ShieldCheck, Truck, Zap } from 'lucide-react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ProductCard from '../../components/product/ProductCard'
import { fetchProducts } from '../../features/products/productsSlice'
import { STORE } from '../../utils/constants'

function HomePage() {
  const dispatch = useDispatch()
  const { items } = useSelector((state) => state.products)
  const featured = items.filter((product) => product.isFeatured).slice(0, 4)

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts())
    }
  }, [dispatch, items.length])

  return (
    <main>
      <section className="bg-[#0a0a0b] text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-16">
          <div>
            <p className="mb-3 inline-flex rounded-full bg-[#FFD700] px-3 py-1 text-sm font-black text-[#0a0a0b]">
              {STORE.nameAmharic}
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
              {STORE.tagline}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/75">
              Original phones, laptops, gaming gear, audio, and accessories
              delivered across Ethiopia with warranty and local payment options.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                className="inline-flex items-center gap-2 rounded bg-[#FFD700] px-5 py-3 font-black text-[#0a0a0b] transition hover:bg-[#FFC200]"
                to="/products"
              >
                Shop electronics
                <ArrowRight size={18} />
              </Link>
              <a
                className="rounded border border-white/20 px-5 py-3 font-black text-white transition hover:bg-white/10"
                href="#featured"
              >
                View deals
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {items.slice(0, 4).map((product) => (
              <img
                key={product.id}
                className="aspect-square rounded-lg object-cover ring-1 ring-white/10"
                src={product.images?.[0] || product.image}
                alt={product.name}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-3 px-4 py-5 sm:grid-cols-3">
        {[
          ['Same day Addis delivery', Truck],
          ['Original product badge', ShieldCheck],
          ['Saturday flash deals', Zap],
        ].map(([label, Icon]) => (
          <div
            className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm ring-1 ring-zinc-200"
            key={label}
          >
            <Icon className="text-[#9b7600]" size={24} />
            <span className="font-black">{label}</span>
          </div>
        ))}
      </section>

      <section id="featured" className="mx-auto max-w-7xl px-4 pb-12">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-black">Featured electronics</h2>
            <p className="text-sm text-zinc-600">
              Warranty-backed products for Ethiopian shoppers.
            </p>
          </div>
          <Link className="text-sm font-black text-[#9b7600]" to="/products">
            View all
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(featured.length ? featured : items.slice(0, 4)).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  )
}

export default HomePage
