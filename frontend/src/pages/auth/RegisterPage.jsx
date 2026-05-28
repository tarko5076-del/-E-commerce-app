import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setCredentials } from '../../features/auth/authSlice'
import { showToast } from '../../features/ui/uiSlice'
import { authService } from '../../services/authService'
import { isEthiopianPhone } from '../../utils/formatters'

function RegisterPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, formState } = useForm()

  async function submit(values) {
    if (!isEthiopianPhone(values.phone)) {
      dispatch(showToast('Use Ethiopian phone format: +2519XXXXXXXX'))
      return
    }

    try {
      const data = await authService.register(values)
      dispatch(setCredentials(data))
      dispatch(showToast('Account created.'))
      navigate('/')
    } catch (error) {
      dispatch(showToast(error.message || 'Registration failed.'))
    }
  }

  return (
    <main className="mx-auto grid min-h-[calc(100vh-74px)] max-w-md place-items-center px-4 py-8">
      <form
        className="w-full rounded-lg bg-white p-6 shadow-sm ring-1 ring-zinc-200"
        onSubmit={handleSubmit(submit)}
      >
        <h1 className="text-2xl font-black">Create account</h1>
        <Field label="Full name" {...register('name', { required: true })} />
        <Field label="Email" type="email" {...register('email', { required: true })} />
        <Field label="Phone (+251)" {...register('phone', { required: true })} />
        <Field label="Password" type="password" {...register('password', { required: true })} />
        <button
          className="mt-5 w-full rounded bg-[#FFD700] px-4 py-3 font-black"
          disabled={formState.isSubmitting}
        >
          Register
        </button>
        <p className="mt-4 text-center text-sm">
          Already have account? <Link className="font-black" to="/login">Login</Link>
        </p>
      </form>
    </main>
  )
}

function Field({ label, ...props }) {
  return (
    <label className="mt-4 block text-sm font-black">
      {label}
      <input className="mt-1 h-11 w-full rounded border border-zinc-300 px-3 font-normal" {...props} />
    </label>
  )
}

export default RegisterPage
