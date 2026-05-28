import { Minus, Plus } from 'lucide-react'
import Input from '../components/Input'
import OrderSummary from '../components/OrderSummary'
import { money } from '../lib/format'

function CheckoutPage({
  cart,
  updateCart,
  placeOrder,
  customer,
  setCustomer,
  payment,
  setPayment,
  subtotal,
  shipping,
  tax,
  total,
}) {
  return (
    <main className="mx-auto grid max-w-7xl gap-5 px-4 py-6 lg:grid-cols-[1fr_420px]">
      <section className="rounded-lg bg-white p-5 shadow-sm">
        <h1 className="text-2xl font-black">Checkout</h1>
        <div className="mt-4 space-y-4">
          {cart.length === 0 ? (
            <p className="text-slate-600">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 border-b border-slate-200 pb-4"
              >
                <img
                  className="h-24 w-24 rounded object-cover"
                  src={item.image}
                  alt={item.title}
                />
                <div className="flex-1">
                  <p className="font-black">{item.title}</p>
                  <p className="text-sm text-slate-600">{money(item.price)}</p>
                  <div className="mt-2 inline-flex items-center rounded-full border border-slate-300">
                    <button
                      className="grid h-8 w-8 place-items-center"
                      onClick={() => updateCart(item.id, item.quantity - 1)}
                    >
                      <Minus size={15} />
                    </button>
                    <span className="w-8 text-center text-sm font-black">
                      {item.quantity}
                    </span>
                    <button
                      className="grid h-8 w-8 place-items-center"
                      onClick={() => updateCart(item.id, item.quantity + 1)}
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <form className="rounded-lg bg-white p-5 shadow-sm" onSubmit={placeOrder}>
        <h2 className="text-xl font-black">Delivery and payment</h2>
        <Input
          label="Full name"
          value={customer.name}
          onChange={(value) => setCustomer({ ...customer, name: value })}
          required
        />
        <Input
          label="Email"
          type="email"
          value={customer.email}
          onChange={(value) => setCustomer({ ...customer, email: value })}
          required
        />
        <Input
          label="Address"
          value={customer.address}
          onChange={(value) => setCustomer({ ...customer, address: value })}
          required
        />
        <Input
          label="Name on card"
          value={payment.card_name}
          onChange={(value) => setPayment({ ...payment, card_name: value })}
          required
        />
        <Input
          label="Card number"
          value={payment.card_number}
          onChange={(value) => setPayment({ ...payment, card_number: value })}
          placeholder="4242 4242 4242 4242"
          required
        />
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Expiry"
            value={payment.expiry}
            onChange={(value) => setPayment({ ...payment, expiry: value })}
            placeholder="12/30"
            required
          />
          <Input
            label="CVC"
            value={payment.cvc}
            onChange={(value) => setPayment({ ...payment, cvc: value })}
            required
          />
        </div>
        <OrderSummary
          subtotal={subtotal}
          shipping={shipping}
          tax={tax}
          total={total}
        />
        <button
          className="mt-4 w-full rounded bg-amber-400 px-4 py-3 font-black hover:bg-amber-300 disabled:opacity-50"
          disabled={cart.length === 0}
        >
          Pay and place order
        </button>
      </form>
    </main>
  )
}

export default CheckoutPage
