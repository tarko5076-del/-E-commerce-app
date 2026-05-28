import { Link, useParams } from 'react-router-dom'

function OrderDetailPage() {
  const { id } = useParams()

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <section className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-zinc-200">
        <h1 className="text-2xl font-black">Order confirmation</h1>
        <p className="mt-2 text-zinc-600">
          Your order reference is <strong>{id}</strong>. Confirmation by SMS and
          email will be sent after payment verification.
        </p>
        <Link
          className="mt-5 inline-block rounded bg-[#FFD700] px-4 py-3 font-black text-[#0a0a0b]"
          to="/products"
        >
          Continue shopping
        </Link>
      </section>
    </main>
  )
}

export default OrderDetailPage
