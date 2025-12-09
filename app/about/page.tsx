"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Star, ArrowRight, CheckCircle, Target, Heart, Zap } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function AboutPage() {
  const { t } = useLanguage()

  const milestones = [
    {
      year: "2021",
      event: "Company Founded",
      description: "Started with a vision to export premium Indian fruits globally",
    },
    {
      year: "2024",
      event: "ISO Certification",
      description: "Achieved ISO 22000 certification for food safety management",
    },
    {
      year: "2025",
      event: "Global Expansion",
      description: "Expanded to 15+ countries across Asia, Europe, and Middle East",
    },
    {
      year: "2025",
      event: "Cold Chain Excellence",
      description: "Invested in state-of-the-art cold storage and logistics",
    },
    {
      year: "2025",
      event: "Digital Transformation",
      description: "Launched online platform for seamless buyer experience",
    },
    {
      year: "2025",
      event: "Sustainability Focus",
      description: "Committed to sustainable farming and eco-friendly packaging",
    },
  ]

  const values = [
    {
      icon: <Shield className="h-8 w-8 text-emerald-600" />,
      title: "Quality First",
      description:
        "We never compromise on quality. Every fruit is carefully selected and meets international standards.",
    },
    {
      icon: <Heart className="h-8 w-8 text-emerald-600" />,
      title: "Customer Care",
      description: "Building long-term relationships with our buyers through exceptional service and support.",
    },
    {
      icon: <Target className="h-8 w-8 text-emerald-600" />,
      title: "Reliability",
      description: "Consistent delivery schedules and transparent communication throughout the export process.",
    },
    {
      icon: <Zap className="h-8 w-8 text-emerald-600" />,
      title: "Innovation",
      description: "Continuously improving our processes and adopting new technologies for better efficiency.",
    },
  ]

  const certifications = [
    "ISO 22000:2024 - Food Safety Management",
    "HACCP - Hazard Analysis Critical Control Points",
    "FSSAI - Food Safety and Standards Authority of India",
    "APEDA - Agricultural and Processed Food Products Export",
    "Organic Certification - NPOP & NOP",
    "Global GAP - Good Agricultural Practices",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-emerald-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">{t("aboutTitle")}</h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Connecting India's finest fruits to global markets with quality, trust, and excellence since 2021
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-emerald-100 text-emerald-800">Our Story</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 font-serif">
                From Local Farms to Global Markets
              </h2>
              <p className="text-lg text-gray-600 mb-6">{t("aboutDescription")}</p>
              <p className="text-gray-600 mb-8">
                What started as a small family business has grown into one of India's most trusted fruit export
                companies. We work directly with farmers across India, ensuring fair prices for growers while delivering
                premium quality fruits to international buyers.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">2+</div>
                  <div className="text-sm text-gray-600">Years of Excellence</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">2+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">25+</div>
                  <div className="text-sm text-gray-600">Countries Served</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">100K+</div>
                  <div className="text-sm text-gray-600">Tons Exported</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/pomegranate-packing-warehouse.png"
                alt="Sai Sagar Global pomegranate packing facility"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">4.9/5 Rating</span>
                </div>
                <p className="text-sm text-gray-600">From 2+ verified buyers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-emerald-100 text-emerald-800">Our Values</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 font-serif">What Drives Us Forward</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our core values guide every decision we make and every relationship we build
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-8 pb-6">
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-emerald-100 text-emerald-800">Our Journey</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 font-serif">Milestones & Achievements</h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-emerald-200"></div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="text-emerald-600 font-bold text-lg mb-2">{milestone.year}</div>
                        <h3 className="font-semibold text-gray-900 mb-2">{milestone.event}</h3>
                        <p className="text-gray-600 text-sm">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-emerald-600 rounded-full border-4 border-white shadow"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-emerald-100 text-emerald-800">Quality Assurance</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 font-serif">Certifications & Standards</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We maintain the highest international standards through rigorous certifications
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-emerald-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                <span className="text-gray-800 font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">Ready to Partner With Us?</h2>
          <p className="text-xl mb-8 text-emerald-100">
            Join hundreds of satisfied buyers who trust us for their fruit import needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-emerald-800 hover:bg-gray-100">
              {t("contactUsNow")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
              View Our Products
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
