"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Menu, X, Phone, Mail } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useRouter } from "next/navigation"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage()
  const router = useRouter()

  const navigation = [
    { name: t("home"), href: "/" },
    { name: t("about"), href: "/about" },
    { name: t("products"), href: "/products" },
    { name: t("buyers"), href: "/buyers" },
    { name: t("contact"), href: "/contact" },
  ]

  const handleGetQuote = () => {
    router.push("/contact")
  }

  return (
    <>
      {/* Top Bar */}
      <div className="bg-emerald-800 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+91 9730456181</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>info@saisagarglobal.com</span>
            </div>
          </div>
          <LanguageSwitcher />
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-gray-900">
                <img
                  src="/sai-sagar-global-logo.png.jpg"
                  alt="Sai Sagar Global logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-emerald-800">Sai Sagar Global</h1>
                <p className="text-xs text-amber-600 font-medium">Premium Fruit Exports</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <Button onClick={handleGetQuote} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                {t("getQuote")}
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-2 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-gray-700 hover:text-emerald-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button onClick={handleGetQuote} className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white">
                {t("getQuote")}
              </Button>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
