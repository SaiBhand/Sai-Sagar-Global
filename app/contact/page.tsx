"use client"

import type React from "react"
import { sendInquiryNotification } from "@/lib/actions/email-notifications"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle,
  Globe,
  Building,
  User,
  MessageSquare,
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { createClient } from "@/lib/supabase/client"

interface ContactFormData {
  name: string
  email: string
  phone: string
  company: string
  country: string
  subject: string
  message: string
  inquiryType: string
  productId?: string
}

export default function ContactPage() {
  const { t } = useLanguage()
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    subject: "",
    message: "",
    inquiryType: "general",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const supabase = createClient()

  useEffect(() => {
    const type = searchParams.get("type")
    if (type === "buyer-registration") {
      setFormData((prev) => ({
        ...prev,
        inquiryType: "buyer-registration",
        subject: "Buyer Registration Request",
        message:
          "I would like to register as a verified buyer in your network. Please provide me with the registration process and requirements.",
      }))
    }
  }, [searchParams])

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, inquiryType: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const result = await sendInquiryNotification(formData)

      if (!result.success) {
        throw new Error(result.error)
      }

      setSubmitStatus("success")
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        country: "",
        subject: "",
        message: "",
        inquiryType: "general",
      })
    } catch (error) {
      console.error("Error submitting inquiry:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const whatsappMessage = encodeURIComponent(
    "Hello Sai Sagar Global! I'm interested in your premium fruit exports. Could you please provide more information about your products and pricing?",
  )

  const inquiryTypes = [
    { value: "general", label: "General Inquiry" },
    { value: "product", label: "Product Information" },
    { value: "pricing", label: "Pricing & Quotes" },
    { value: "partnership", label: "Partnership Opportunity" },
    { value: "quality", label: "Quality & Certifications" },
    { value: "logistics", label: "Shipping & Logistics" },
    { value: "buyer-registration", label: "Buyer Registration" }, // Added buyer registration option
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-orange-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">{t("contactTitle")}</h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto">{t("contactSubtitle")}</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Details Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-orange-600" />
                  {t("contactInfo")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <a href="tel:+919730456181" className="text-orange-600 hover:underline">
                      +91 9730456181
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:info@saisagarglobal.com" className="text-orange-600 hover:underline">
                      info@saisagarglobal.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-gray-600">Shrirampur, Maharashtra, India</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Business Hours</p>
                    <p className="text-gray-600">Mon - Sat: 9:00 AM - 6:00 PM IST</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Contact Options */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => window.open(`https://wa.me/919730456181?text=${whatsappMessage}`, "_blank")}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp Chat
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => window.open("mailto:info@saisagarglobal.com", "_blank")}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => window.open("tel:+919730456181", "_blank")}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-orange-600" />
                  <span className="font-medium text-orange-800">Fast Response Guarantee</span>
                </div>
                <p className="text-orange-700 text-sm">
                  We respond to all inquiries within 2-4 hours during business hours. For urgent matters, please call or
                  WhatsApp us directly.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-orange-600" />
                  Send us a Message
                </CardTitle>
                <p className="text-gray-600">Fill out the form below and we'll get back to you as soon as possible.</p>
              </CardHeader>
              <CardContent>
                {submitStatus === "success" && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 text-green-800">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-medium">Message Sent Successfully!</span>
                    </div>
                    <p className="text-green-700 text-sm mt-1">
                      Thank you for your inquiry. We'll respond within 2-4 hours.
                    </p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2 text-red-800">
                      <span className="font-medium">Error Sending Message</span>
                    </div>
                    <p className="text-red-700 text-sm mt-1">
                      Please try again or contact us directly via phone or email.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          required
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="pl-10"
                          placeholder="Your full name"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="pl-10"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="pl-10"
                          placeholder="+1 234 567 8900"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Company Name</label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          className="pl-10"
                          placeholder="Your company name"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Country *</label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          required
                          value={formData.country}
                          onChange={(e) => handleInputChange("country", e.target.value)}
                          className="pl-10"
                          placeholder="Your country"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Inquiry Type *</label>
                      <Select value={formData.inquiryType} onValueChange={handleSelectChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          {inquiryTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Subject *</label>
                    <Input
                      required
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      placeholder="Brief subject of your inquiry"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Message *</label>
                    <Textarea
                      required
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      rows={6}
                      placeholder="Please provide details about your inquiry, including specific products you're interested in, quantities, and any other relevant information..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Global Shipping</h3>
              <p className="text-gray-600 text-sm">
                We ship to 25+ countries worldwide with reliable cold chain logistics
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600 text-sm">ISO certified facilities with rigorous quality control processes</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">Dedicated support team available for all your export needs</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
