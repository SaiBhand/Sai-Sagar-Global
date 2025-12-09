"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WhatsAppFloat() {
  const whatsappMessage = encodeURIComponent(
    "Hello Sai Sagar Global! I'm interested in your premium pomegranate exports and other fruits. Could you please provide more information about your products and pricing?",
  )

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/919730456181?text=${whatsappMessage}`, "_blank")
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={handleWhatsAppClick}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  )
}
