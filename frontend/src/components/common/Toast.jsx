import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearToast } from '../../features/ui/uiSlice'

function Toast() {
  const dispatch = useDispatch()
  const toast = useSelector((state) => state.ui.toast)

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => dispatch(clearToast()), 3200)
    return () => window.clearTimeout(timer)
  }, [dispatch, toast])

  if (!toast) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 rounded-lg bg-[#0a0a0b] px-4 py-3 text-sm font-bold text-white shadow-2xl sm:left-auto sm:w-96">
      {toast}
    </div>
  )
}

export default Toast
