import { MessageCircle } from 'lucide-react'
import { STORE } from '../../utils/constants'

function WhatsAppButton() {
  const href = `https://wa.me/${STORE.whatsapp.replace('+', '')}`

  return (
    <a
      className="fixed bottom-20 right-4 z-40 grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-105"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp order support"
    >
      <MessageCircle size={24} />
    </a>
  )
}

export default WhatsAppButton
