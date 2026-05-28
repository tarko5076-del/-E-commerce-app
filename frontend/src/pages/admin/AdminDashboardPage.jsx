import { Package, TrendingUp, Users, Wallet } from 'lucide-react'
import { useSelector } from 'react-redux'
import { formatETB } from '../../utils/formatters'

function AdminDashboardPage() {
  const products = useSelector((state) => state.products.items)
  const orders = useSelector((state) => state.orders.items)
  const revenue = orders.reduce(
    (sum, order) => sum + Number(order.totals?.total || order.total || 0),
    0,
  )
  const lowStock = products.filter(
    (product) => (product.totalStock || product.stock || 0) <= 3,
  )

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="text-2xl font-black">Admin dashboard</h1>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={Wallet} label="Total revenue" value={formatETB(revenue)} />
        <Stat icon={Package} label="Products" value={products.length} />
        <Stat icon={TrendingUp} label="Orders today" value={orders.length} />
        <Stat icon={Users} label="Low stock" value={lowStock.length} />
      </div>
      <section className="mt-5 rounded-lg bg-white p-5 shadow-sm ring-1 ring-zinc-200">
        <h2 className="text-xl font-black">Low stock alerts</h2>
        <div className="mt-3 divide-y divide-zinc-100">
          {lowStock.map((product) => (
            <div className="flex justify-between py-3" key={product.id}>
              <span className="font-bold">{product.name}</span>
              <strong>{product.totalStock || product.stock} left</strong>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-zinc-200">
      <Icon className="text-[#9b7600]" size={24} />
      <p className="mt-3 text-sm text-zinc-600">{label}</p>
      <p className="mt-1 text-2xl font-black">{value}</p>
    </div>
  )
}

export default AdminDashboardPage
