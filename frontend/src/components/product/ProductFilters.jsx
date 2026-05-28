import { BRANDS, CATEGORIES } from '../../utils/constants'

function ProductFilters({ filters, setFilters, clearFilters }) {
  return (
    <aside className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-zinc-200">
      <div className="flex items-center justify-between">
        <h2 className="font-black">Filters</h2>
        <button className="text-sm font-bold text-zinc-600" onClick={clearFilters}>
          Clear
        </button>
      </div>

      <label className="mt-4 block text-sm font-bold">
        Category
        <select
          className="mt-1 h-11 w-full rounded border border-zinc-300 px-3"
          value={filters.category || ''}
          onChange={(event) => setFilters({ category: event.target.value })}
        >
          <option value="">All electronics</option>
          {CATEGORIES.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
      </label>

      <label className="mt-4 block text-sm font-bold">
        Brand
        <select
          className="mt-1 h-11 w-full rounded border border-zinc-300 px-3"
          value={filters.brand || ''}
          onChange={(event) => setFilters({ brand: event.target.value })}
        >
          <option value="">All brands</option>
          {BRANDS.map((brand) => (
            <option key={brand}>{brand}</option>
          ))}
        </select>
      </label>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <label className="block text-sm font-bold">
          Min ETB
          <input
            className="mt-1 h-11 w-full rounded border border-zinc-300 px-3"
            type="number"
            value={filters.minPrice || ''}
            onChange={(event) => setFilters({ minPrice: event.target.value })}
          />
        </label>
        <label className="block text-sm font-bold">
          Max ETB
          <input
            className="mt-1 h-11 w-full rounded border border-zinc-300 px-3"
            type="number"
            value={filters.maxPrice || ''}
            onChange={(event) => setFilters({ maxPrice: event.target.value })}
          />
        </label>
      </div>

      <label className="mt-4 block text-sm font-bold">
        Sort
        <select
          className="mt-1 h-11 w-full rounded border border-zinc-300 px-3"
          value={filters.sort || 'popular'}
          onChange={(event) => setFilters({ sort: event.target.value })}
        >
          <option value="popular">Popularity</option>
          <option value="newest">Newest</option>
          <option value="price_asc">Price: low to high</option>
          <option value="price_desc">Price: high to low</option>
          <option value="rating">Top rated</option>
        </select>
      </label>
    </aside>
  )
}

export default ProductFilters
