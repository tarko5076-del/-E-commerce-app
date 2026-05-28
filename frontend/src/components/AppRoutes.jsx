import AdminPage from '../pages/AdminPage'
import CheckoutPage from '../pages/CheckoutPage'
import OrdersPage from '../pages/OrdersPage'
import ShopPage from '../pages/ShopPage'

function AppRoutes({
  page,
  products,
  cart,
  orders,
  customer,
  setCustomer,
  payment,
  setPayment,
  productForm,
  setProductForm,
  editingId,
  setEditingId,
  totals,
  addToCart,
  updateCart,
  placeOrder,
  saveProduct,
  editProduct,
  removeProduct,
  loadProducts,
}) {
  const routes = {
    shop: <ShopPage products={products} addToCart={addToCart} />,
    checkout: (
      <CheckoutPage
        cart={cart}
        updateCart={updateCart}
        placeOrder={placeOrder}
        customer={customer}
        setCustomer={setCustomer}
        payment={payment}
        setPayment={setPayment}
        subtotal={totals.subtotal}
        shipping={totals.shipping}
        tax={totals.tax}
        total={totals.total}
      />
    ),
    orders: <OrdersPage orders={orders} />,
    admin: (
      <AdminPage
        products={products}
        productForm={productForm}
        setProductForm={setProductForm}
        editingId={editingId}
        setEditingId={setEditingId}
        saveProduct={saveProduct}
        editProduct={editProduct}
        removeProduct={removeProduct}
        loadProducts={loadProducts}
      />
    ),
  }

  return routes[page] ?? routes.shop
}

export default AppRoutes
