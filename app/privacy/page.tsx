"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicyPage() {
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
            <h1 className="text-3xl font-bold text-gray-900 mb-6">{t("privacyPolicy")}</h1>

            <div className="prose max-w-none">
              <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
                <p className="text-gray-600 mb-4">
                  At Sai Sagar Global, we collect information you provide directly to us, such as when you:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-4">
                  <li>Submit inquiry forms or contact us</li>
                  <li>Request quotes for our premium fruits</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Communicate with us via phone, email, or WhatsApp</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Your Information</h2>
                <p className="text-gray-600 mb-4">We use the information we collect to:</p>
                <ul className="list-disc pl-6 text-gray-600 mb-4">
                  <li>Respond to your inquiries and provide customer service</li>
                  <li>Process and fulfill your fruit export orders</li>
                  <li>Send you updates about our products and services</li>
                  <li>Improve our website and services</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information Sharing</h2>
                <p className="text-gray-600 mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your
                  consent, except as described in this policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
                <p className="text-gray-600">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-orange-50 rounded-lg">
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
