import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setCredentials } from '../../features/auth/authSlice'
import { showToast } from '../../features/ui/uiSlice'
import { authService } from '../../services/authService'

function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, formState } = useForm()

  async function submit(values) {
    try {
      const data = await authService.login(values)
      dispatch(setCredentials(data))
      dispatch(showToast('Welcome back.'))
      navigate('/')
    } catch (error) {
      dispatch(showToast(error.message || 'Login failed.'))
    }
  }

  return (
    <main className="mx-auto grid min-h-[calc(100vh-74px)] max-w-md place-items-center px-4 py-8">
      <form
        className="w-full rounded-lg bg-white p-6 shadow-sm ring-1 ring-zinc-200"
        onSubmit={handleSubmit(submit)}
      >
        <h1 className="text-2xl font-black">Login</h1>
        <Field label="Email or phone" {...register('identifier', { required: true })} />
        <Field label="Password" type="password" {...register('password', { required: true })} />
        <button
          className="mt-5 w-full rounded bg-[#FFD700] px-4 py-3 font-black"
          disabled={formState.isSubmitting}
        >
          Login
        </button>
        <button
          className="mt-3 w-full rounded border border-zinc-300 px-4 py-3 font-black"
          type="button"
        >
          Continue with Google
        </button>
        <p className="mt-4 text-center text-sm">
          New here? <Link className="font-black" to="/register">Create account</Link>
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

export default LoginPage
