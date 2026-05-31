import {
  LayoutDashboard,
  Package,
  Search,
  ShoppingCart,
  Store,
  User,
} from 'lucide-react'
import { categories } from '../data/catalog'
import NavButton from './NavButton'

function Header({
  page,
  setPage,
  query,
  setQuery,
  category,
  setCategory,
  itemCount,
}) {
  return (
    <header className="sticky top-0 z-30 bg-[#131921] text-white shadow-lg">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3">
        <button
          className="flex items-center gap-2 text-2xl font-black"
          onClick={() => setPage('shop')}
        >
          <Store size={27} />
          NovaCart
        </button>
        <label className="order-last flex h-11 min-w-64 flex-1 overflow-hidden rounded bg-white text-slate-950 md:order-none">
          <input
            className="min-w-0 flex-1 px-4 outline-none"
            placeholder="Search products"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <span className="grid w-12 place-items-center bg-amber-400">
            <Search size={22} />
          </span>
        </label>
        <NavButton
          active={page === 'shop'}
          icon={Package}
          label="Shop"
          onClick={() => setPage('shop')}
        />
        <NavButton
          active={page === 'checkout'}
          icon={ShoppingCart}
          label={`Cart ${itemCount}`}
          onClick={() => setPage('checkout')}
        />
        <NavButton
          active={page === 'orders'}
          icon={User}
          label="Orders"
          onClick={() => setPage('orders')}
        />
        <NavButton
          active={page === 'admin'}
          icon={LayoutDashboard}
          label="Admin"
          onClick={() => setPage('admin')}
        />
      </div>
      <div className="bg-[#232f3e]">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-2">
          {categories.map((item) => (
            <button
              key={item}
              className={`shrink-0 rounded px-3 py-1.5 text-sm font-bold ${
                category === item
                  ? 'bg-white text-slate-950'
                  : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Header
