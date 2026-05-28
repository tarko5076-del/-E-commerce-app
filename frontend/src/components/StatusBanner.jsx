function StatusBanner({ status }) {
  if (!status) return null

  return (
    <div className="mx-auto mt-4 max-w-7xl px-4">
      <div className="rounded bg-cyan-50 px-4 py-3 text-sm font-bold text-cyan-900 ring-1 ring-cyan-200">
        {status}
      </div>
    </div>
  )
}

export default StatusBanner
