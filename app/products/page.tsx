"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Filter, MapPin, Calendar, Layers } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface Product {
  id: string
  name?: string
  name_en?: string
  name_hi?: string
  name_gu?: string
  description?: string
  description_en?: string
  description_hi?: string
  description_gu?: string
  category?: string
  origin?: string
  origin_country?: string
  harvest_season?: string
  shelf_life?: string
  packaging_options?: string[]
  min_order_quantity?: number
  price_per_unit?: number
  currency?: string
  image_url?: string
  gallery_urls?: string[]
  [key: string]: unknown
}

const FIELD_LABEL_MAP: Record<string, string> = {
  availability: "Availability",
  certifications: "Certifications",
  quality_grade: "Quality Grade",
  variety: "Variety",
  storage_temperature: "Storage Temperature",
  moisture_content: "Moisture Content",
  size: "Size",
  color: "Color",
  grade: "Grade",
  product_code: "Product Code",
  shelf_life_notes: "Shelf Life Notes",
  additional_info: "Additional Information",
  best_for: "Best For",
  treatments: "Treatments",
  processing_method: "Processing Method",
  nutrition_facts: "Nutrition Facts",
  certifications_notes: "Certification Notes",
}

const RESERVED_DETAIL_KEYS = new Set<string>([
  "id",
  "created_at",
  "updated_at",
  "inserted_at",
  "name",
  "name_en",
  "name_hi",
  "name_gu",
  "description",
  "description_en",
  "description_hi",
  "description_gu",
  "category",
  "origin",
  "image_url",
  "gallery_urls",
  "packaging_options",
  "min_order_quantity",
  "price_per_unit",
  "currency",
  "origin_country",
  "harvest_season",
  "shelf_life",
])

const formatLabel = (key: string) => {
  if (FIELD_LABEL_MAP[key]) {
    return FIELD_LABEL_MAP[key]
  }

  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

const formatValue = (value: unknown): string => {
  if (value == null) {
    return ""
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (item == null) {
          return ""
        }
        if (typeof item === "string" || typeof item === "number") {
          return String(item)
        }
        if (typeof item === "boolean") {
          return item ? "Yes" : "No"
        }
        return JSON.stringify(item)
      })
      .filter((item) => item.length > 0)
      .join(", ")
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No"
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? value.toString() : ""
  }

  if (value instanceof Date) {
    return value.toLocaleDateString()
  }

  if (typeof value === "object") {
    const serialized = JSON.stringify(value)
    return serialized === "{}" ? "" : serialized
  }

  return String(value).trim()
}

const buildAdditionalDetails = (product: Product) => {
  return Object.entries(product)
    .filter(([key, value]) => {
      if (RESERVED_DETAIL_KEYS.has(key)) {
        return false
      }
      if (value == null) {
        return false
      }
      if (typeof value === "string") {
        return value.trim().length > 0
      }
      if (Array.isArray(value)) {
        return value.length > 0
      }
      if (typeof value === "object") {
        return Object.keys(value as Record<string, unknown>).length > 0
      }
      return true
    })
    .map(([key, value]) => {
      const formattedValue = formatValue(value)
      if (!formattedValue) {
        return null
      }
      return {
        key,
        label: formatLabel(key),
        value: formattedValue,
      }
    })
    .filter((entry): entry is { key: string; label: string; value: string } => entry !== null)
}

const normalizeStringArray = (input: unknown): string[] => {
  if (Array.isArray(input)) {
    return input
      .map((item) => {
        if (item == null) {
          return ""
        }
        if (typeof item === "string") {
          return item.trim()
        }
        return JSON.stringify(item).trim()
      })
      .filter((item) => item.length > 0)
  }

  if (typeof input === "string") {
    const trimmed = input.trim()
    if (!trimmed) {
      return []
    }

    if ((trimmed.startsWith("[") && trimmed.endsWith("]")) || trimmed.startsWith("{")) {
      try {
        const parsed = JSON.parse(trimmed)
        if (Array.isArray(parsed)) {
          return parsed
            .map((item) => (typeof item === "string" ? item.trim() : JSON.stringify(item).trim()))
            .filter((item) => item.length > 0)
        }
      } catch {
        // fall back to comma split
      }
    }

    return trimmed
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0)
  }

  return []
}

const formatPrice = (price?: number, currency?: string): string | null => {
  if (price == null || !Number.isFinite(price)) {
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

export default function ProductsPage() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("name")

  const supabase = createClient()

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    filterAndSortProducts()
  }, [products, searchTerm, selectedCategory, sortBy, language])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("products")
        .select("*")

      if (error) {
        console.error("Supabase error fetching products:", error.message, error.details)
        throw new Error(`Database error: ${error.message}`)
      }

      if (!data) {
        console.warn("No products data returned from database")
        setProducts([])
        return
      }

      console.log(`Successfully fetched ${data.length} products`)
      const normalized = data.map((product) => {
        const packaging = normalizeStringArray(product.packaging_options)
        const gallery = normalizeStringArray(product.gallery_urls)
        const minOrderRaw = product.min_order_quantity
        const priceInfo = parsePriceInput(product.price_per_unit)
        const currencyValue = sanitizeCurrency(product.currency) ?? sanitizeCurrency(priceInfo.currencyHint)

        return {
          ...product,
          id: product.id?.toString() ?? crypto.randomUUID(),
          packaging_options: packaging,
          gallery_urls: gallery,
          min_order_quantity: (() => {
            if (typeof minOrderRaw === "number") {
              return minOrderRaw
            }
            if (typeof minOrderRaw === "string" && minOrderRaw.trim().length > 0) {
              const parsed = Number.parseFloat(minOrderRaw)
              return Number.isNaN(parsed) ? undefined : parsed
            }
            return undefined
          })(),
          price_per_unit: priceInfo.amount,
          currency: currencyValue,
        } as Product
      })

      setProducts(normalized)
    } catch (error) {
      console.error("Error fetching products:", error)
      setProducts([])
      // Could set an error state here for user feedback
    } finally {
      setLoading(false)
    }
  }

  const filterAndSortProducts = () => {
    let filtered = [...products]

    if (searchTerm) {
      filtered = filtered.filter((product) => {
        const name = getLocalizedField(product, "name")
        const description = getLocalizedField(product, "description")
        return (
          name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (product.category ?? "").toLowerCase().includes(searchTerm.toLowerCase())
        )
      })
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return getLocalizedField(a, "name").localeCompare(getLocalizedField(b, "name"))
        case "price":
          return (a.price_per_unit ?? 0) - (b.price_per_unit ?? 0)
        case "category":
          return (a.category ?? "").localeCompare(b.category ?? "")
        default:
          return 0
      }
    })

    setFilteredProducts(filtered)
  }

  const getLocalizedField = (product: Product, field: "name" | "description") => {
    const localized = product[`${field}_${language}` as keyof Product]
    const fallbackEn = product[`${field}_en` as keyof Product]
    const base = product[field as keyof Product]

    const value = [localized, fallbackEn, base].find(
      (entry): entry is string => typeof entry === "string" && entry.trim().length > 0
    )

    if (value) {
      return value
    }

    return field === "name" ? "Unnamed product" : "Details coming soon."
  }

  const categories = [
    ...new Set(
      products
        .map((p) => p.category)
        .filter((category): category is string => typeof category === "string" && category.trim().length > 0)
    ),
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-emerald-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">{t("productsTitle")}</h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto">{t("productsSubtitle")}</p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="category">Category</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="text-sm text-gray-600">
            {filteredProducts.length} of {products.length} products
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="relative">
                    <img
                      src={
                        product.image_url ||
                        "/placeholder.svg?height=200&width=300&query=fresh fruit"
                      }
                      alt={getLocalizedField(product, "name")}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.category ? (
                      <Badge className="absolute top-3 right-3 flex items-center gap-1 bg-white text-gray-800">
                        <Layers className="h-3 w-3" />
                        {product.category}
                      </Badge>
                    ) : null}
                  </div>
                  <CardContent className="flex h-full flex-col gap-5 p-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                        {getLocalizedField(product, "name")}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {getLocalizedField(product, "description")}
                      </p>
                    </div>

                    {(() => {
                      const quickFacts = [
                        {
                          icon: MapPin,
                          label: "Origin",
                          value: (() => {
                            const originCandidates = [
                              typeof product.origin_country === "string" ? product.origin_country : undefined,
                              typeof product.origin === "string" ? product.origin : undefined,
                            ]

                            const origin = originCandidates.find(
                              (candidate) => typeof candidate === "string" && candidate.trim().length > 0
                            )

                            return origin ? origin.trim() : "Not provided"
                          })(),
                        },
                        {
                          icon: Calendar,
                          label: "Harvest Season",
                          value:
                            (typeof product.harvest_season === "string" && product.harvest_season.trim()) ||
                            "Not provided",
                        },
                      ] as const

                      const formattedPrice = formatPrice(
                        typeof product.price_per_unit === "number" ? product.price_per_unit : undefined,
                        typeof product.currency === "string" ? product.currency : undefined
                      )

                      const additionalDetails = buildAdditionalDetails(product)

                      return (
                        <div className="space-y-4 text-sm">
                          <div className="grid grid-cols-1 gap-3">
                            {quickFacts.map(({ icon: Icon, label, value }) => (
                              <div key={label} className="flex items-start gap-2">
                                <Icon className="mt-1 h-4 w-4 text-emerald-600" />
                                <div>
                                  <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    {label}
                                  </div>
                                  <div className="font-medium text-gray-800">{value}</div>
                                </div>
                              </div>
                            ))}
                          </div>

                          {formattedPrice ? (
                            <div className="rounded-md border border-emerald-100 bg-emerald-50 p-3">
                              <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                                Price Per Kg
                              </div>
                              <div className="flex items-baseline gap-1">
                                <span className="text-xl font-bold text-emerald-700">{formattedPrice}</span>
                                <span className="text-sm text-emerald-600">per kg</span>
                              </div>
                            </div>
                          ) : (
                            <div className="rounded-md border border-dashed border-gray-200 p-3 text-sm text-gray-500">
                              Contact for price
                            </div>
                          )}

                          {Array.isArray(product.packaging_options) && product.packaging_options.length > 0 ? (
                            <div>
                              <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Packaging Options
                              </div>
                              <div className="mt-2 flex flex-wrap gap-2">
                                {product.packaging_options.map((option, index) => (
                                  <Badge
                                    key={`${option}-${index}`}
                                    variant="secondary"
                                    className="bg-emerald-100 text-emerald-800"
                                  >
                                    {option}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ) : null}

                          {Array.isArray(product.gallery_urls) && product.gallery_urls.length > 0 ? (
                            <div>
                              <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Gallery
                              </div>
                              <div className="mt-2 flex gap-2">
                                {product.gallery_urls.slice(0, 3).map((url, index) => (
                                  <img
                                    key={`${url}-${index}`}
                                    src={url}
                                    alt={`${getLocalizedField(product, "name")} gallery ${index + 1}`}
                                    className="h-16 w-16 rounded-md border border-gray-200 object-cover"
                                  />
                                ))}
                              </div>
                            </div>
                          ) : null}

                          {additionalDetails.length > 0 ? (
                            <div>
                              <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Additional Details
                              </div>
                              <dl className="mt-2 space-y-2 text-sm">
                                {additionalDetails.map((detail) => (
                                  <div key={detail.key} className="flex items-start justify-between gap-3">
                                    <dt className="font-medium text-gray-700">{detail.label}</dt>
                                    <dd className="text-right text-gray-600">{detail.value}</dd>
                                  </div>
                                ))}
                              </dl>
                            </div>
                          ) : null}
                        </div>
                      )
                    })()}

                    <div className="mt-auto flex gap-2">
                      <Button
                        onClick={() =>
                          router.push(`/contact${product.id ? `?product=${product.id}` : ""}`)
                        }
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                        size="sm"
                      >
                        {t("getQuote")}
                      </Button>
                      <Button
                        onClick={() => router.push(`/products/${product.id}`)}
                        variant="outline"
                        size="sm"
                      >
                        Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
