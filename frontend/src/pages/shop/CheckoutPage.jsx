import { useForm, useWatch } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearCart, selectCartTotals } from '../../features/cart/cartSlice'
import { showToast } from '../../features/ui/uiSlice'
import { orderService } from '../../services/orderService'
import { paymentService } from '../../services/paymentService'
import { DELIVERY_ZONES, PAYMENT_METHODS } from '../../utils/constants'
import { formatETB, isEthiopianPhone } from '../../utils/formatters'

function CheckoutPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const items = useSelector((state) => state.cart.items)
  const totals = useSelector(selectCartTotals)
  const language = useSelector((state) => state.ui.language)
  const { register, handleSubmit, control, formState } = useForm({
    defaultValues: {
      paymentMethod: 'chapa',
      deliveryZone: 'Addis Ababa',
    },
  })
  const deliveryZone = useWatch({ control, name: 'deliveryZone' })
  const paymentMethod = useWatch({ control, name: 'paymentMethod' })
  const selectedZone =
    DELIVERY_ZONES.find((zone) => zone.name === deliveryZone) ||
    DELIVERY_ZONES[0]

  async function submitOrder(values) {
    if (!isEthiopianPhone(values.phone)) {
      dispatch(showToast('Use Ethiopian phone format: +2519XXXXXXXX'))
      return
    }

    try {
      const payment = await paymentService.initialize(values.paymentMethod, {
        amount: totals.total,
        currency: 'ETB',
        customer: {
          name: values.fullName,
          email: values.email,
          phone: values.phone,
        },
      })

      const order = await orderService.create({
        items: items.map((item) => ({
          product_id: item.id,
          title: item.name,
          price: item.price,
          quantity: item.qty,
        })),
        customer: {
          name: values.fullName,
          email: values.email,
          phone: values.phone,
          address: values.specificAddress,
        },
        deliveryAddress: values,
        deliveryMethod: selectedZone.estimatedDays,
        deliveryZone: selectedZone.name,
        deliveryCost: totals.deliveryCost,
        paymentMethod: values.paymentMethod,
        paymentStatus: payment.status,
        totals: {
          subtotal: totals.subtotal,
          shipping: totals.deliveryCost,
          tax: 0,
          total: totals.total,
        },
        notes: values.notes || '',
      })

      dispatch(clearCart())
      dispatch(showToast('Order placed successfully.'))
      navigate(`/orders/${order.id || 'latest'}`)
    } catch (error) {
      dispatch(showToast(error.message || 'Checkout failed.'))
    }
  }

  return (
    <main className="mx-auto grid max-w-7xl gap-5 px-4 py-6 lg:grid-cols-[1fr_380px]">
      <form
        className="space-y-5"
        onSubmit={handleSubmit(submitOrder)}
      >
        <Step title="1. Delivery address">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Full name" {...register('fullName', { required: true })} />
            <Field label="Phone (+251)" {...register('phone', { required: true })} />
            <Field label="Email" type="email" {...register('email', { required: true })} />
            <Field label="Region" {...register('region', { required: true })} />
            <Field label="City" {...register('city', { required: true })} />
            <Field label="Subcity / Woreda" {...register('subcity')} />
          </div>
          <label className="mt-3 block text-sm font-black">
            Specific address
            <textarea
              className="mt-1 min-h-24 w-full rounded border border-zinc-300 px-3 py-2 font-normal"
              {...register('specificAddress', { required: true })}
            />
          </label>
        </Step>

        <Step title="2. Delivery method">
          <div className="grid gap-3 sm:grid-cols-3">
            {DELIVERY_ZONES.map((zone) => (
              <label
                className="rounded-lg border border-zinc-200 p-4 has-[:checked]:border-[#FFD700] has-[:checked]:bg-yellow-50"
                key={zone.name}
              >
                <input
                  className="sr-only"
                  type="radio"
                  value={zone.name}
                  {...register('deliveryZone')}
                />
                <strong>{zone.name}</strong>
                <span className="mt-1 block text-sm text-zinc-600">
                  {zone.estimatedDays}
                </span>
                <span className="mt-2 block font-black">
                  {formatETB(zone.baseCost, language)}
                </span>
              </label>
            ))}
          </div>
        </Step>

        <Step title="3. Payment">
          <div className="grid gap-3 sm:grid-cols-2">
            {PAYMENT_METHODS.map((method) => (
              <label
                className="rounded-lg border border-zinc-200 p-4 has-[:checked]:border-[#FFD700] has-[:checked]:bg-yellow-50"
                key={method.id}
              >
                <input
                  className="sr-only"
                  type="radio"
                  value={method.id}
                  {...register('paymentMethod')}
                />
                <strong>{method.name}</strong>
                <span className="mt-1 block text-sm text-zinc-600">
                  {method.description}
                </span>
              </label>
            ))}
          </div>
          {paymentMethod === 'cod' && (
            <p className="mt-3 rounded bg-yellow-50 p-3 text-sm font-bold">
              COD may include a small handling fee depending on delivery zone.
            </p>
          )}
        </Step>

        <button
          className="w-full rounded bg-[#FFD700] px-5 py-3 font-black text-[#0a0a0b] hover:bg-[#FFC200] disabled:opacity-50"
          disabled={items.length === 0 || formState.isSubmitting}
        >
          Place order
        </button>
      </form>

      <aside className="h-fit rounded-lg bg-[#0a0a0b] p-5 text-white shadow-sm">
        <h2 className="text-xl font-black">Order summary</h2>
        <div className="mt-4 space-y-3">
          {items.map((item) => (
            <div className="flex justify-between gap-3 text-sm" key={item.id}>
              <span>{item.name} x {item.qty}</span>
              <strong>{formatETB(item.price * item.qty, language)}</strong>
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-2 border-t border-white/10 pt-4">
          <Row label="Subtotal" value={formatETB(totals.subtotal, language)} />
          <Row label="Delivery" value={formatETB(totals.deliveryCost, language)} />
          <Row label="Discount" value={formatETB(totals.discount, language)} />
          <Row label="Total" value={formatETB(totals.total, language)} strong />
        </div>
      </aside>
    </main>
  )
}

function Step({ title, children }) {
  return (
    <section className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-zinc-200">
      <h1 className="text-xl font-black">{title}</h1>
      <div className="mt-4">{children}</div>
    </section>
  )
}

function Field({ label, ...props }) {
  return (
    <label className="block text-sm font-black">
      {label}
      <input
        className="mt-1 h-11 w-full rounded border border-zinc-300 px-3 font-normal"
        {...props}
      />
    </label>
  )
}

function Row({ label, value, strong }) {
  return (
    <div className={`flex justify-between ${strong ? 'text-lg font-black' : ''}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

export default CheckoutPage
