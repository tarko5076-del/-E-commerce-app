import { money } from '../lib/format'

function OrderSummary({ subtotal, shipping, tax, total }) {
  return (
    <div className="mt-4 space-y-2 border-t border-slate-200 pt-4 text-sm">
      <div className="flex justify-between">
        <span>Subtotal</span>
        <strong>{money(subtotal)}</strong>
      </div>
      <div className="flex justify-between">
        <span>Shipping</span>
        <strong>{shipping === 0 ? 'Free' : money(shipping)}</strong>
      </div>
      <div className="flex justify-between">
        <span>Tax</span>
        <strong>{money(tax)}</strong>
      </div>
      <div className="flex justify-between text-base">
        <span>Total</span>
        <strong>{money(total)}</strong>
      </div>
    </div>
  )
}

export default OrderSummary
