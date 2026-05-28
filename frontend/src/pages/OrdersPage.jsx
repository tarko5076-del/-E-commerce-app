import { money } from '../lib/format'

function OrdersPage({ orders }) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="text-2xl font-black">Orders</h1>
      <div className="mt-4 grid gap-4">
        {orders.length === 0 ? (
          <div className="rounded-lg bg-white p-5 text-slate-600 shadow-sm">
            No saved orders yet.
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="rounded-lg bg-white p-5 shadow-sm">
              <div className="flex flex-wrap justify-between gap-3">
                <div>
                  <p className="font-black">Order {order.id}</p>
                  <p className="text-sm text-slate-600">
                    {order.customer?.name} - {order.customer?.email}
                  </p>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-black text-emerald-800">
                  {order.status}
                </span>
              </div>
              <p className="mt-3 font-black">{money(order.totals?.total)}</p>
            </div>
          ))
        )}
      </div>
    </main>
  )
}

export default OrdersPage
