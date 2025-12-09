"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, Award, Shield, CheckCircle } from "lucide-react"

export default function CertificationsPage() {
  const { t } = useLanguage()

  const certifications = [
    {
      title: "ISO 22000:2024",
      description: "Food Safety Management System",
      icon: Shield,
      details: "International standard for food safety management throughout the food chain",
    },
    {
      title: "HACCP",
      description: "Hazard Analysis Critical Control Points",
      icon: CheckCircle,
      details: "Systematic preventive approach to food safety and biological hazards",
    },
    {
      title: "FSSAI",
      description: "Food Safety and Standards Authority of India",
      icon: Award,
      details: "Licensed food business operator with highest safety standards",
    },
    {
      title: "APEDA",
      description: "Agricultural and Processed Food Products Export",
      icon: Shield,
      details: "Registered exporter for agricultural and processed food products",
    },
    {
      title: "Organic Certification",
      description: "NPOP & NOP Certified",
      icon: CheckCircle,
      details: "National Programme for Organic Production and USDA Organic standards",
    },
    {
      title: "Global GAP",
      description: "Good Agricultural Practices",
      icon: Award,
      details: "International certification for safe and sustainable agriculture",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Link href="/">
            <Button variant="outline" className="mb-6 bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("backToHome")}
            </Button>
          </Link>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Our Certifications</h1>
            <p className="text-gray-600 mb-8">
              Sai Sagar Global maintains the highest standards of quality, safety, and sustainability through
              internationally recognized certifications.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => {
                const IconComponent = cert.icon
                return (
                  <Card key={index} className="border-orange-200 hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                      <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                        <IconComponent className="w-6 h-6 text-orange-600" />
                      </div>
                      <CardTitle className="text-lg font-semibold text-gray-800">{cert.title}</CardTitle>
                      <p className="text-orange-600 font-medium">{cert.description}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm text-center">{cert.details}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Quality Commitment</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Food Safety</h3>
                <p className="text-gray-600 mb-4">
                  Our facilities follow strict HACCP protocols and maintain ISO 22000:2024 certification to ensure the
                  highest food safety standards.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Sustainable Practices</h3>
                <p className="text-gray-600 mb-4">
                  We are committed to sustainable agriculture through Global GAP certification and organic farming
                  practices.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Export Excellence</h3>
                <p className="text-gray-600 mb-4">
                  APEDA registration ensures compliance with international export regulations and quality standards.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Continuous Improvement</h3>
                <p className="text-gray-600 mb-4">
                  Regular audits and certification renewals ensure we maintain the highest standards of quality and
                  safety.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
