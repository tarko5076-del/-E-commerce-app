import { Edit3, Trash2 } from 'lucide-react'
import Input from '../components/Input'
import { emptyProduct } from '../data/catalog'
import { money } from '../lib/format'

function AdminPage({
  products,
  productForm,
  setProductForm,
  editingId,
  setEditingId,
  saveProduct,
  editProduct,
  removeProduct,
  loadProducts,
}) {
  return (
    <main className="mx-auto grid max-w-7xl gap-5 px-4 py-6 lg:grid-cols-[420px_1fr]">
      <form className="rounded-lg bg-white p-5 shadow-sm" onSubmit={saveProduct}>
        <h1 className="text-2xl font-black">
          {editingId ? 'Edit product' : 'Add product'}
        </h1>
        <Input
          label="Title"
          value={productForm.title}
          onChange={(value) => setProductForm({ ...productForm, title: value })}
          required
        />
        <Input
          label="Brand"
          value={productForm.brand}
          onChange={(value) => setProductForm({ ...productForm, brand: value })}
          required
        />
        <Input
          label="Category"
          value={productForm.category}
          onChange={(value) =>
            setProductForm({ ...productForm, category: value })
          }
          required
        />
        <Input
          label="Price"
          type="number"
          value={productForm.price}
          onChange={(value) => setProductForm({ ...productForm, price: value })}
          required
        />
        <Input
          label="Stock"
          type="number"
          value={productForm.stock}
          onChange={(value) => setProductForm({ ...productForm, stock: value })}
          required
        />
        <Input
          label="Image URL"
          value={productForm.image}
          onChange={(value) => setProductForm({ ...productForm, image: value })}
          required
        />
        <Input
          label="Badge"
          value={productForm.badge}
          onChange={(value) => setProductForm({ ...productForm, badge: value })}
        />
        <Input
          label="Description"
          value={productForm.description}
          onChange={(value) =>
            setProductForm({ ...productForm, description: value })
          }
        />
        <button className="mt-4 w-full rounded bg-[#131921] px-4 py-3 font-black text-white">
          {editingId ? 'Update product' : 'Add product'}
        </button>
        {editingId && (
          <button
            type="button"
            className="mt-2 w-full rounded border border-slate-300 px-4 py-3 font-black"
            onClick={() => {
              setEditingId(null)
              setProductForm(emptyProduct)
            }}
          >
            Cancel edit
          </button>
        )}
      </form>

      <section className="rounded-lg bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-2xl font-black">Manage products</h2>
          <button
            className="rounded border border-slate-300 px-3 py-2 text-sm font-black"
            onClick={loadProducts}
          >
            Refresh
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-slate-200 text-slate-600">
              <tr>
                <th className="py-3">Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-slate-100">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <img
                        className="h-12 w-12 rounded object-cover"
                        src={product.image}
                        alt={product.title}
                      />
                      <div>
                        <p className="font-black">{product.title}</p>
                        <p className="text-slate-600">{product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td>{product.category}</td>
                  <td>{money(product.price)}</td>
                  <td>{product.stock}</td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <button
                        className="grid h-9 w-9 place-items-center rounded bg-slate-100"
                        onClick={() => editProduct(product)}
                        aria-label="Edit product"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        className="grid h-9 w-9 place-items-center rounded bg-red-50 text-red-700"
                        onClick={() => removeProduct(product.id)}
                        aria-label="Delete product"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}

export default AdminPage
