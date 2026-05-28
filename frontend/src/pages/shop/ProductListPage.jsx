import { SlidersHorizontal } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../../components/product/ProductCard'
import ProductFilters from '../../components/product/ProductFilters'
import Skeleton from '../../components/common/Skeleton'
import {
  clearFilters,
  fetchProducts,
  setFilters,
} from '../../features/products/productsSlice'
import { normalizeText } from '../../utils/formatters'

function ProductListPage() {
  const dispatch = useDispatch()
  const { items, filters, status } = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchProducts(filters))
  }, [dispatch, filters])

  const filteredItems = useMemo(() => {
    const query = normalizeText(filters.q)
    return items.filter((product) => {
      const matchesQuery =
        !query ||
        normalizeText(product.name).includes(query) ||
        normalizeText(product.brand).includes(query) ||
        normalizeText(product.category).includes(query)
      const matchesBrand = !filters.brand || product.brand === filters.brand
      const matchesCategory =
        !filters.category || product.category === filters.category
      const min = Number(filters.minPrice || 0)
      const max = Number(filters.maxPrice || Infinity)
      const matchesPrice = product.price >= min && product.price <= max

      return matchesQuery && matchesBrand && matchesCategory && matchesPrice
    })
  }, [filters, items])

  return (
    <main className="mx-auto grid max-w-7xl gap-5 px-4 py-6 lg:grid-cols-[280px_1fr]">
      <ProductFilters
        filters={filters}
        setFilters={(next) => dispatch(setFilters(next))}
        clearFilters={() => dispatch(clearFilters())}
      />

      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black">Electronics marketplace</h1>
            <p className="text-sm text-zinc-600">
              {filteredItems.length} products found
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded border border-zinc-300 bg-white px-3 py-2 text-sm font-black lg:hidden">
            <SlidersHorizontal size={17} />
            Filters
          </button>
        </div>

        {status === 'loading' ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton className="h-80" key={index} />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default ProductListPage
