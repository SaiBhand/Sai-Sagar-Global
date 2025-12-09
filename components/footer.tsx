"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Send } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function Footer() {
  const [email, setEmail] = useState("")
  const { t } = useLanguage()

  const quickLinks = [
    { name: t("home"), href: "/" },
    { name: t("about"), href: "/about" },
    { name: t("products"), href: "/products" },
    { name: t("buyers"), href: "/buyers" },
    { name: t("contact"), href: "/contact" },
  ]

  const productCategories = ["Mangoes", "Pomegranates", "Grapes", "Bananas"]

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email)
    setEmail("")
  }

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-emerald-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">{t("newsletter")}</h3>
            <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">{t("newsletterDesc")}</p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white text-gray-900"
                required
              />
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 whitespace-nowrap">
                <Send className="h-4 w-4 mr-2" />
                {t("subscribe")}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center p-1">
                  <img
                    src="/satyamev-jayate-emblem.png"
                    alt="Satyamev Jayate"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Sai Sagar Global</h3>
                  <p className="text-sm text-gray-400">Premium Fruit Exports</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6">
                Leading exporter of premium quality fruits from India to global markets with 2+ years of experience.
              </p>
              <div className="flex gap-4">
                {/* TODO: Replace the Facebook URL below with your exact page URL */}
                <Link
                  href="https://www.facebook.com/share/1FBDU7Ynv4/?mibextid=wwXIfr"
                  className="text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link
                  href="https://twitter.com/SaiSagar_Global"
                  className="text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link
                  href="https://www.instagram.com/sai_sagar_global"
                  className="text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
                {/* TODO: Replace the LinkedIn URL below with your exact profile or company page URL */}
                <Link
                  href="https://www.linkedin.com/in/sai-sagar-global-4a830439b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                  className="text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">{t("quickLinks")}</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Our Products</h4>
              <ul className="space-y-3">
                {productCategories.map((product) => (
                  <li key={product}>
                    <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
                      {product}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-6">{t("contactInfo")}</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-emerald-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400">Shrirampur, Maharashtra, India</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  <Link href="tel:+919730456181" className="text-gray-400 hover:text-white transition-colors">
                    +91 9730456181
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  <Link
                    href="mailto:info@saisagarglobal.com"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    info@saisagarglobal.com
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">© 2024 Sai Sagar Global. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/certifications" className="text-gray-400 hover:text-white transition-colors">
                Certifications
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
