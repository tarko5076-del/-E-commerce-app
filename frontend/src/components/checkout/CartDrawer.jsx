import { Minus, Plus, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  selectCartTotals,
  updateQty,
} from '../../features/cart/cartSlice'
import { closeCart } from '../../features/ui/uiSlice'
import { formatETB } from '../../utils/formatters'

function CartDrawer() {
  const dispatch = useDispatch()
  const open = useSelector((state) => state.ui.cartOpen)
  const items = useSelector((state) => state.cart.items)
  const totals = useSelector(selectCartTotals)
  const language = useSelector((state) => state.ui.language)

  if (!open) return null

  return (
    <aside className="fixed inset-0 z-50 bg-black/50">
      <div className="ml-auto flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-zinc-200 p-4">
          <div>
            <h2 className="text-xl font-black">Cart</h2>
            <p className="text-sm text-zinc-600">{totals.count} items</p>
          </div>
          <button
            className="grid h-9 w-9 place-items-center rounded-full bg-zinc-100"
            onClick={() => dispatch(closeCart())}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <p className="text-zinc-600">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <img
                    className="h-20 w-20 rounded object-cover"
                    src={item.image}
                    alt={item.name}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-black">
                      {item.name}
                    </p>
                    <p className="text-sm text-zinc-600">
                      {formatETB(item.price, language)}
                    </p>
                    <div className="mt-2 inline-flex items-center rounded-full border border-zinc-300">
                      <button
                        className="grid h-8 w-8 place-items-center"
                        onClick={() =>
                          dispatch(updateQty({ id: item.id, qty: item.qty - 1 }))
                        }
                      >
                        <Minus size={15} />
                      </button>
                      <span className="w-8 text-center text-sm font-black">
                        {item.qty}
                      </span>
                      <button
                        className="grid h-8 w-8 place-items-center"
                        onClick={() =>
                          dispatch(updateQty({ id: item.id, qty: item.qty + 1 }))
                        }
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-zinc-200 p-4">
          <div className="flex justify-between font-black">
            <span>Total</span>
            <span>{formatETB(totals.total, language)}</span>
          </div>
          <p className="mt-1 text-xs text-zinc-600">
            Add {formatETB(Math.max(15000 - totals.subtotal, 0), language)} more
            for free Addis Ababa delivery.
          </p>
          <Link
            className="mt-4 block rounded bg-[#FFD700] px-4 py-3 text-center font-black text-[#0a0a0b]"
            to="/checkout"
            onClick={() => dispatch(closeCart())}
          >
            Checkout
          </Link>
        </div>
      </div>
    </aside>
  )
}

export default CartDrawer
