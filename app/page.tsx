"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Star, Globe, Shield, Truck, Award } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function HomePage() {
  const { t } = useLanguage()
  const router = useRouter()

  const handleGetQuote = () => {
    router.push("/contact")
  }

  const handleExploreProducts = () => {
    router.push("/products")
  }

  const handleLearnMore = () => {
    router.push("/about")
  }

  const features = [
    {
      icon: <Globe className="h-8 w-8 text-emerald-600" />,
      title: t("globalReach"),
      description: t("globalReachDesc"),
    },
    {
      icon: <Shield className="h-8 w-8 text-emerald-600" />,
      title: t("qualityAssured"),
      description: t("qualityAssuredDesc"),
    },
    {
      icon: <Truck className="h-8 w-8 text-emerald-600" />,
      title: t("fastDelivery"),
      description: t("fastDeliveryDesc"),
    },
    {
      icon: <Award className="h-8 w-8 text-emerald-600" />,
      title: t("experience"),
      description: t("experienceDesc"),
    },
  ]

  const featuredProducts = [
    {
      id: 1,
      name: "Premium Pomegranates",
      image: "https://th.bing.com/th/id/OIP.hapmN8DmR6IU6hHv788HeQHaHa?w=186&h=186&c=7&r=0&o=7&cb=ucfimg2&dpr=1.5&pid=1.7&rm=3&ucfimg=1",
      price: "$5.50/kg",
      season: "Oct - Feb",
      origin: "Maharashtra, India",
      featured: true,
    },
    {
      id: 2,
      name: "Fresh Alphonso Mangoes",
      image: "/fresh-alphonso-mangoes.png",
      price: "$8.50/kg",
      season: "April - June",
      origin: "Ratnagiri, India",
      featured: true,
    },
    {
      id: 3,
      name: "Premium Grapes",
      image: "/fresh-green-grapes.png",
      price: "$6.75/kg",
      season: "Dec - Apr",
      origin: "Nashik, India",
      featured: true,
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 fruit-pattern relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{
            backgroundImage: "url('/full-pomegranate-background.png')",
            backgroundBlendMode: "multiply",
          }}
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">🌟 {t("trustedBy")}</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif drop-shadow-lg">{t("heroTitle")}</h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto drop-shadow-md">
              {t("heroSubtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleExploreProducts}
                size="lg"
                className="bg-white text-emerald-800 hover:bg-gray-100 font-semibold shadow-lg"
              >
                {t("heroButton")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                onClick={handleGetQuote}
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 bg-transparent shadow-lg"
              >
                {t("getQuote")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 font-serif">{t("aboutTitle")}</h2>
              <p className="text-lg text-gray-600 mb-6">{t("aboutDescription")}</p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">2+</div>
                  <div className="text-sm text-gray-600">{t("globalBuyers")}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">25+</div>
                  <div className="text-sm text-gray-600">{t("countries")}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">2+</div>
                  <div className="text-sm text-gray-600">{t("yearsExperience")}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">100%</div>
                  <div className="text-sm text-gray-600">{t("qualityAssurance")}</div>
                </div>
              </div>
              <Button onClick={handleLearnMore} className="bg-emerald-600 hover:bg-emerald-700">
                {t("learnMore")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
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
                  <span className="font-semibold">4.9/5 {t("rating")}</span>
                </div>
                <p className="text-sm text-gray-600">{t("verifiedBuyers")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 font-serif">{t("productsTitle")}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t("productsSubtitle")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  {product.featured && <Badge className="absolute top-3 left-3 bg-emerald-600">{t("featured")}</Badge>}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{product.name}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{t("price")}:</span>
                      <span className="font-semibold text-emerald-600">Contact for price</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{t("season")}:</span>
                      <span>{product.season}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{t("origin")}:</span>
                      <span>{product.origin}</span>
                    </div>
                  </div>
                  <Button onClick={handleGetQuote} className="w-full bg-emerald-600 hover:bg-emerald-700">
                    {t("getQuote")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/products">
              <Button
                variant="outline"
                size="lg"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-transparent"
              >
                {t("viewAll")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">{t("contactTitle")}</h2>
          <p className="text-xl mb-8 text-emerald-100">{t("contactSubtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => router.push("/contact")}
              size="lg"
              className="bg-white text-emerald-800 hover:bg-gray-100"
            >
              {t("contactUsNow")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={() =>
                window.open(
                  "https://wa.me/919730456181?text=Hello%20Sai%20Sagar%20Global!%20I%27m%20interested%20in%20your%20premium%20fruit%20exports.",
                  "_blank",
                )
              }
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 bg-transparent"
            >
              {t("whatsappContact")}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
