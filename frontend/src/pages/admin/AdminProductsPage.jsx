import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../features/products/productsSlice'
import { showToast } from '../../features/ui/uiSlice'
import { productService } from '../../services/productService'
import { CATEGORIES } from '../../utils/constants'
import { formatETB } from '../../utils/formatters'

function AdminProductsPage() {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products.items)
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      category: CATEGORIES[0],
      warrantyPeriod: '1 year',
      warrantyProvider: 'Kdame Gebya',
      isOriginal: true,
      isFeatured: false,
    },
  })

  async function submit(values) {
    const payload = {
      ...values,
      price: Number(values.price),
      comparePrice: Number(values.comparePrice || values.price),
      totalStock: Number(values.totalStock),
      images: values.images.split('\n').filter(Boolean),
      warranty: {
        period: values.warrantyPeriod,
        type: 'official',
        provider: values.warrantyProvider,
      },
      specs: {
        processor: values.processor,
        RAM: values.RAM,
        storage: values.storage,
        battery: values.battery,
        display: values.display,
        camera: values.camera,
      },
    }
    await productService.create(payload)
    dispatch(showToast('Product saved.'))
    dispatch(fetchProducts())
    reset()
  }

  async function remove(id) {
    await productService.remove(id)
    dispatch(showToast('Product deleted.'))
    dispatch(fetchProducts())
  }

  return (
    <main className="mx-auto grid max-w-7xl gap-5 px-4 py-6 lg:grid-cols-[420px_1fr]">
      <form className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-zinc-200" onSubmit={handleSubmit(submit)}>
        <h1 className="text-2xl font-black">Add electronics</h1>
        <Field label="Name" {...register('name', { required: true })} />
        <Field label="Amharic name" {...register('nameAmharic')} />
        <Field label="Brand" {...register('brand', { required: true })} />
        <label className="mt-3 block text-sm font-black">
          Category
          <select className="mt-1 h-11 w-full rounded border border-zinc-300 px-3 font-normal" {...register('category')}>
            {CATEGORIES.map((category) => <option key={category}>{category}</option>)}
          </select>
        </label>
        <Field label="Price ETB" type="number" {...register('price', { required: true })} />
        <Field label="Compare price ETB" type="number" {...register('comparePrice')} />
        <Field label="Total stock" type="number" {...register('totalStock', { required: true })} />
        <Field label="Image URLs, one per line" as="textarea" {...register('images', { required: true })} />
        <Field label="Description" as="textarea" {...register('description')} />
        <Field label="Amharic description" as="textarea" {...register('descriptionAmharic')} />
        <Field label="Processor" {...register('processor')} />
        <Field label="RAM" {...register('RAM')} />
        <Field label="Storage" {...register('storage')} />
        <Field label="Battery" {...register('battery')} />
        <Field label="Display" {...register('display')} />
        <Field label="Camera" {...register('camera')} />
        <Field label="Warranty period" {...register('warrantyPeriod')} />
        <button className="mt-4 w-full rounded bg-[#FFD700] px-4 py-3 font-black">
          Save product
        </button>
      </form>

      <section className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-zinc-200">
        <h2 className="text-2xl font-black">Products</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-zinc-200 text-zinc-600">
              <tr>
                <th className="py-3">Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr className="border-b border-zinc-100" key={product.id}>
                  <td className="py-3 font-black">{product.name}</td>
                  <td>{product.category}</td>
                  <td>{formatETB(product.price)}</td>
                  <td>{product.totalStock || product.stock}</td>
                  <td className="text-right">
                    <button className="rounded bg-red-50 px-3 py-2 font-black text-red-700" onClick={() => remove(product.id)}>
                      Delete
                    </button>
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

function Field({ label, as, ...props }) {
  const Control = as === 'textarea' ? 'textarea' : 'input'
  return (
    <label className="mt-3 block text-sm font-black">
      {label}
      <Control
        className="mt-1 min-h-11 w-full rounded border border-zinc-300 px-3 py-2 font-normal"
        {...props}
      />
    </label>
  )
}

export default AdminProductsPage
