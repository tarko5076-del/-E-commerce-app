import { Route, Routes } from 'react-router-dom'
import StoreLayout from './layouts/StoreLayout'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AdminProductsPage from './pages/admin/AdminProductsPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import CheckoutPage from './pages/shop/CheckoutPage'
import HomePage from './pages/shop/HomePage'
import OrderDetailPage from './pages/shop/OrderDetailPage'
import OrdersPage from './pages/shop/OrdersPage'
import ProductDetailPage from './pages/shop/ProductDetailPage'
import ProductListPage from './pages/shop/ProductListPage'

// App renders route groups only; page logic lives in page components.
function App() {
  return (
    <Routes>
      <Route element={<StoreLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/:id" element={<OrderDetailPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/products" element={<AdminProductsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  )
}

export default App
