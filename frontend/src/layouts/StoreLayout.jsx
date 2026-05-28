import { Outlet } from 'react-router-dom'
import Toast from '../components/common/Toast'
import WhatsAppButton from '../components/common/WhatsAppButton'
import CartDrawer from '../components/checkout/CartDrawer'
import StoreHeader from '../components/common/StoreHeader'

function StoreLayout() {
  return (
    <div className="min-h-screen bg-[#f7f7f2] text-[#0a0a0b]">
      <StoreHeader />
      <Outlet />
      <CartDrawer />
      <Toast />
      <WhatsAppButton />
    </div>
  )
}

export default StoreLayout
