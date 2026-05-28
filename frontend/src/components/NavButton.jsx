function NavButton({ active, icon: Icon, label, onClick }) {
  return (
    <button
      className={`flex items-center gap-2 rounded px-3 py-2 text-sm font-black ${
        active ? 'bg-white text-slate-950' : 'hover:bg-white/10'
      }`}
      onClick={onClick}
    >
      <Icon size={18} />
      {label}
    </button>
  )
}

export default NavButton
