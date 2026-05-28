import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchOrders } from '../../features/orders/ordersSlice'
import { ORDER_STATUSES, STORE } from '../../utils/constants'
import { formatETB } from '../../utils/formatters'

function OrdersPage() {
  const dispatch = useDispatch()
  const orders = useSelector((state) => state.orders.items)
  const language = useSelector((state) => state.ui.language)

  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="text-2xl font-black">Order history</h1>
      <div className="mt-4 grid gap-4">
        {orders.length === 0 ? (
          <div className="rounded-lg bg-white p-5 text-zinc-600 shadow-sm">
            No orders yet.
          </div>
        ) : (
          orders.map((order) => {
            const status =
              ORDER_STATUSES.find((item) => item.value === order.orderStatus) ||
              ORDER_STATUSES[0]
            return (
              <article
                className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-zinc-200"
                key={order.id}
              >
                <div className="flex flex-wrap justify-between gap-3">
                  <div>
                    <p className="font-black">
                      Order {order.orderNumber || order.id}
                    </p>
                    <p className="text-sm text-zinc-600">
                      {order.customer?.name || order.deliveryAddress?.fullName}
                    </p>
                  </div>
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-black text-[#785a00]">
                    {language === 'am' ? status.amharic : status.label}
                  </span>
                </div>
                <p className="mt-3 font-black">
                  {formatETB(order.totals?.total || order.total, language)}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Link
                    className="rounded bg-[#0a0a0b] px-3 py-2 text-sm font-black text-white"
                    to={`/orders/${order.id}`}
                  >
                    View details
                  </Link>
                  <a
                    className="rounded border border-zinc-300 px-3 py-2 text-sm font-black"
                    href={`https://wa.me/${STORE.whatsapp.replace('+', '')}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp support
                  </a>
                </div>
              </article>
            )
          })
        )}
      </div>
    </main>
  )
}

export default OrdersPage
