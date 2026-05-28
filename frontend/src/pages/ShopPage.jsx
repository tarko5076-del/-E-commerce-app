import { Star } from 'lucide-react'
import { money } from '../lib/format'

function ShopPage({ products, addToCart }) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <section className="mb-6 rounded-lg bg-gradient-to-r from-cyan-100 via-white to-amber-100 p-6 shadow-sm md:p-10">
        <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
          Shop products, pay online, track orders.
        </h1>
        <p className="mt-3 max-w-2xl text-slate-700">
          This is now a working ecommerce frontend connected to Python APIs for
          products, payments, and orders.
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <article
            key={product.id}
            className="flex flex-col rounded-lg bg-white p-4 shadow-sm"
          >
            <img
              className="aspect-square w-full rounded object-cover"
              src={product.image}
              alt={product.title}
            />
            <div className="flex flex-1 flex-col pt-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase text-cyan-700">
                    {product.brand}
                  </p>
                  <h2 className="mt-1 min-h-12 font-black leading-snug">
                    {product.title}
                  </h2>
                </div>
                <span className="rounded bg-red-600 px-2 py-1 text-xs font-black text-white">
                  {product.badge}
                </span>
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                {product.description || product.category}
              </p>
              <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                <Star className="text-amber-500" size={17} fill="currentColor" />
                {product.rating} ({Number(product.reviews).toLocaleString()})
              </div>
              <div className="mt-3">
                <p className="text-2xl font-black">{money(product.price)}</p>
                <p className="text-sm text-slate-600">
                  {product.stock} in stock
                </p>
              </div>
              <button
                className="mt-4 rounded-full bg-amber-400 px-4 py-2 font-black hover:bg-amber-300 disabled:opacity-50"
                disabled={product.stock < 1}
                onClick={() => addToCart(product)}
              >
                Add to cart
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}

export default ShopPage
