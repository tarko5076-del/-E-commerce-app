function Input({ label, value, onChange, type = 'text', ...props }) {
  return (
    <label className="mt-3 block text-sm font-black text-slate-700">
      {label}
      <input
        className="mt-1 h-11 w-full rounded border border-slate-300 px-3 font-normal text-slate-950 outline-none focus:border-cyan-700"
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        {...props}
      />
    </label>
  )
}

export default Input
