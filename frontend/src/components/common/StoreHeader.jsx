import { Menu, Search, ShoppingCart, UserRound } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { selectCartTotals } from '../../features/cart/cartSlice'
import {
  openCart,
  setLanguage,
  toggleLowDataMode,
} from '../../features/ui/uiSlice'
import { STORE } from '../../utils/constants'

function StoreHeader() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { count } = useSelector(selectCartTotals)
  const language = useSelector((state) => state.ui.language)
  const lowDataMode = useSelector((state) => state.ui.lowDataMode)

  function submitSearch(event) {
    event.preventDefault()
    const query = new FormData(event.currentTarget).get('q')
    navigate(`/products?q=${encodeURIComponent(query || '')}`)
  }

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0b] text-white shadow-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-3">
        <button
          className="grid h-10 w-10 place-items-center rounded border border-white/10 md:hidden"
          aria-label="Open navigation"
        >
          <Menu size={22} />
        </button>

        <Link className="min-w-fit leading-none" to="/">
          <span className="block text-lg font-black text-[#FFD700] sm:text-2xl">
            {STORE.name}
          </span>
          <span className="block text-xs font-bold text-white/75">
            {STORE.nameAmharic}
          </span>
        </Link>

        <form
          className="order-last flex h-11 w-full overflow-hidden rounded-md bg-white text-[#0a0a0b] ring-1 ring-white/10 md:order-none md:mx-3"
          onSubmit={submitSearch}
        >
          <input
            className="min-w-0 flex-1 px-3 text-sm outline-none"
            name="q"
            placeholder="Search phones, laptops, accessories..."
          />
          <button className="grid w-12 place-items-center bg-[#FFD700]">
            <Search size={20} />
          </button>
        </form>

        <nav className="hidden items-center gap-1 text-sm font-bold lg:flex">
          <NavItem to="/products" label="Shop" />
          <NavItem to="/orders" label="Orders" />
          <NavItem to="/admin" label="Admin" />
        </nav>

        <button
          className="hidden rounded px-2 py-2 text-xs font-black hover:bg-white/10 sm:block"
          onClick={() => dispatch(toggleLowDataMode())}
        >
          {lowDataMode ? 'Low data on' : 'Low data'}
        </button>

        <button
          className="rounded px-2 py-2 text-xs font-black hover:bg-white/10"
          onClick={() => dispatch(setLanguage(language === 'en' ? 'am' : 'en'))}
        >
          {language === 'en' ? 'አማ' : 'EN'}
        </button>

        <Link
          className="grid h-10 w-10 place-items-center rounded hover:bg-white/10"
          to="/login"
          aria-label="Account"
        >
          <UserRound size={21} />
        </Link>

        <button
          className="relative grid h-10 w-10 place-items-center rounded hover:bg-white/10"
          onClick={() => dispatch(openCart())}
          aria-label="Open cart"
        >
          <ShoppingCart size={23} />
          <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#FFD700] px-1 text-xs font-black text-[#0a0a0b]">
            {count}
          </span>
        </button>
      </div>
    </header>
  )
}

function NavItem({ to, label }) {
  return (
    <NavLink
      className={({ isActive }) =>
        `rounded px-3 py-2 transition ${
          isActive ? 'bg-[#FFD700] text-[#0a0a0b]' : 'hover:bg-white/10'
        }`
      }
      to={to}
    >
      {label}
    </NavLink>
  )
}

export default StoreHeader
