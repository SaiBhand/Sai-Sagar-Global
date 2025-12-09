"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  MapPin,
  Calendar,
  DollarSign,
  Truck,
  Star
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { createClient } from "@/lib/supabase/client"

interface Product {
  id: string
  name: string
  name_hi?: string
  name_gu?: string
  description: string
  description_hi?: string
  description_gu?: string
  category: string
  origin_country: string
  harvest_season: string
  shelf_life: string
  packaging_options: string[]
  min_order_quantity?: number
  price_per_unit?: number
  currency?: string
  image_url?: string
  gallery_urls?: string[]
}

export default function ProductDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const { t, language } = useLanguage()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentImage, setCurrentImage] = useState<string>("")

  const supabase = createClient()

  useEffect(() => {
    if (id) {
      fetchProduct()
    }
  }, [id])

  useEffect(() => {
    if (product) {
      const mainImage = product.image_url && product.image_url !== "" ? product.image_url : "/placeholder.svg"
      setCurrentImage(mainImage)
    }
  }, [product])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single()

      if (error) {
        console.error("Supabase error fetching product:", error.message, error.details)
        throw error
      }

      if (!data) {
        setError("Product not found")
        return
      }

      // Normalize price data - handle various formats from Supabase
      const { amount: normalizedPrice, currencyHint } = parsePriceInput(data.price_per_unit)
      const normalizedCurrency = sanitizeCurrency(data.currency) ?? sanitizeCurrency(currencyHint)
      const normalizedProduct = {
        ...data,
        price_per_unit: normalizedPrice,
        currency: normalizedCurrency,
      }

      console.log("Price normalization:", {
        raw: data.price_per_unit,
        normalized: normalizedPrice,
        currency: normalizedProduct.currency,
      })

      console.log("Fetched product:", normalizedProduct)
      setProduct(normalizedProduct as Product)
    } catch (error) {
      console.error("Error fetching product:", error)
      setError("Failed to load product details")
    } finally {
      setLoading(false)
    }
  }

  const getLocalizedField = (product: Product, field: "name" | "description") => {
    const langField = `${field}_${language}` as keyof Product
    return (product[langField] as string) || product[field] || ""
  }

const formatPrice = (price?: number, currency?: string): string | null => {
    // Handle 0 as a valid price, but reject null, undefined, or NaN
    if (price == null || (typeof price !== "number") || !Number.isFinite(price)) {
      return null
    }

    const formattedAmount = Number(price).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })

    const unit = currency?.trim()

    if (!unit) {
      return `$${formattedAmount}`
    }

    return unit.length === 1 ? `${unit}${formattedAmount}` : `${unit} ${formattedAmount}`
  }

const sanitizeCurrency = (input?: unknown): string | undefined => {
  if (typeof input !== "string") {
    return undefined
  }
  const trimmed = input.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

const detectCurrencyFromString = (raw: string): string | undefined => {
  const trimmed = raw.trim()
  if (!trimmed) {
    return undefined
  }

  const prefixMatch = trimmed.match(/^[^\d\s.,-]+/)
  if (prefixMatch && prefixMatch[0].length <= 6) {
    return prefixMatch[0]
  }

  const suffixMatch = trimmed.match(/[^\d\s.,-]+$/)
  if (suffixMatch && suffixMatch[0].length <= 6) {
    return suffixMatch[0]
  }

  return undefined
}

const parsePriceInput = (
  value: unknown
): {
  amount?: number
  currencyHint?: string
} => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return { amount: value }
  }

  if (typeof value === "string") {
    const currencyHint = detectCurrencyFromString(value)
    const numericPortion = value.replace(/[^0-9.,-]/g, "")
    const normalizedNumber = numericPortion.replace(/,/g, "")
    const parsed = Number.parseFloat(normalizedNumber)

    if (!Number.isNaN(parsed) && Number.isFinite(parsed)) {
      return { amount: parsed, currencyHint }
    }

    return { currencyHint }
  }

  if (value != null) {
    const coerced = Number(value)
    if (!Number.isNaN(coerced) && Number.isFinite(coerced)) {
      return { amount: coerced }
    }
  }

  return {}
}

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">{error || "Product not found"}</div>
          <Button onClick={() => router.push("/products")} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            onClick={() => router.push("/products")}
            variant="ghost"
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={
                  product.image_url && product.image_url !== ""
                    ? product.image_url
                    : "/placeholder.svg"
                }
                alt={getLocalizedField(product, "name")}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg";
                }}
              />
            </div>
            {product.gallery_urls && product.gallery_urls.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {product.gallery_urls.map((url, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img
                src={url && url !== "" ? url : "/placeholder.svg"}
                alt={`${getLocalizedField(product, "name")} ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg";
                }}
              />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{product.category}</Badge>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {getLocalizedField(product, "name")}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                {getLocalizedField(product, "description")}
              </p>
            </div>

            <Separator />

            {/* Key Information */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-emerald-600" />
                <div>
                  <div className="text-sm text-gray-500">Origin</div>
                  <div className="font-medium">{product.origin_country}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-emerald-600" />
                <div>
                  <div className="text-sm text-gray-500">Harvest Season</div>
                  <div className="font-medium">{product.harvest_season}</div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Pricing */}
            <div className="bg-emerald-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-6 w-6 text-emerald-600" />
                  {(() => {
                    const priceValue = 
                      typeof product.price_per_unit === "number" && Number.isFinite(product.price_per_unit)
                        ? product.price_per_unit
                        : undefined
                    const currencyValue = 
                      typeof product.currency === "string" && product.currency.trim().length > 0
                        ? product.currency.trim()
                        : undefined
                    
                    const formattedPrice = formatPrice(priceValue, currencyValue)
                    
                    return formattedPrice ? (
                      <>
                        <span className="text-2xl font-bold text-emerald-600">
                          {formattedPrice}
                        </span>
                        <span className="text-gray-600">per kg</span>
                      </>
                    ) : (
                      <span className="text-lg text-gray-500">Contact for price</span>
                    )
                  })()}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() =>
                    router.push(`/contact${product.id ? `?product=${product.id}` : ""}`)
                  }
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                  size="lg"
                >
                  <Truck className="h-4 w-4 mr-2" />
                  {t("getQuote")}
                </Button>
              </div>
            </div>

            {/* Packaging Options */}
            {Array.isArray(product.packaging_options) && product.packaging_options.length > 0 && (
              <>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold mb-3">Packaging Options</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.packaging_options.map((option, index) => (
                      <Badge key={index} variant="outline">
                        {option}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
