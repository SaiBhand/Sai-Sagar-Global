"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsOfServicePage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/">
            <Button variant="outline" className="mb-6 bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("backToHome")}
            </Button>
          </Link>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">{t("termsOfService")}</h1>

            <div className="prose max-w-none">
              <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Agreement to Terms</h2>
                <p className="text-gray-600 mb-4">
                  By accessing and using Sai Sagar Global's services, you accept and agree to be bound by the terms and
                  provision of this agreement.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product Quality & Standards</h2>
                <p className="text-gray-600 mb-4">
                  All our fruits meet international export standards and are certified by relevant authorities:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-4">
                  <li>ISO 22000:2024 Food Safety Management</li>
                  <li>HACCP Certified Processing</li>
                  <li>FSSAI Licensed Operations</li>
                  <li>APEDA Registered Exporter</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Terms</h2>
                <p className="text-gray-600 mb-4">
                  Orders are subject to availability and confirmation. Minimum order quantities apply for international
                  shipments.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment Terms</h2>
                <p className="text-gray-600 mb-4">
                  Payment terms are negotiated per order and may include advance payment, letter of credit, or other
                  mutually agreed terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Shipping & Delivery</h2>
                <p className="text-gray-600 mb-4">
                  We arrange international shipping through certified cold chain logistics partners to ensure product
                  quality during transit.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <p className="font-semibold">Sai Sagar Global</p>
                  <p>Phone: +91 9730456181</p>
                  <p>Email: info@saisagarglobal.com</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
