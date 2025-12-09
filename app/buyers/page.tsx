"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Search,
  MapPin,
  Building,
  Mail,
  Phone,
  Globe,
  CheckCircle,
  MessageCircle,
  CreditCard,
  Ship,
  Calendar,
  BarChart3,
  Info,
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

interface Buyer {
  id: string
  company_name?: string
  contact_person?: string
  email?: string
  phone?: string
  website?: string
  whatsapp?: string
  country?: string
  city?: string
  address?: string
  business_type?: string
  annual_volume?: number
  annual_volume_units?: string
  preferred_payment_terms?: string
  preferred_shipping_terms?: string
  certifications_required?: string[]
  certifications_notes?: string
  products_interested?: string[]
  buying_frequency?: string
  notes?: string
  is_verified?: boolean
  is_active?: boolean
  created_at?: string
  updated_at?: string
  image_url?: string
  [key: string]: unknown
}

const FIELD_LABEL_MAP: Record<string, string> = {
  whatsapp: "WhatsApp",
  website: "Website",
  address: "Address",
  business_type: "Business Type",
  preferred_payment_terms: "Payment Terms",
  preferred_shipping_terms: "Shipping Terms",
  annual_volume: "Annual Volume",
  annual_volume_units: "Volume Units",
  buying_frequency: "Buying Frequency",
  certifications_required: "Certifications Required",
  certifications_notes: "Certification Notes",
  products_interested: "Products Interested",
  notes: "Notes",
  created_at: "Created At",
  updated_at: "Updated At",
}

const RESERVED_DETAIL_KEYS = new Set<string>([
  "id",
  "company_name",
  "contact_person",
  "email",
  "phone",
  "country",
  "city",
  "address",
  "business_type",
  "products_interested",
  "certifications_required",
  "annual_volume",
  "annual_volume_units",
  "preferred_payment_terms",
  "preferred_shipping_terms",
  "buying_frequency",
  "notes",
  "website",
  "whatsapp",
  "image_url",
  "is_verified",
  "is_active",
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

  const stringValue = String(value).trim()

  if (!stringValue) {
    return ""
  }

  const parsedDate = Date.parse(stringValue)
  if (!Number.isNaN(parsedDate) && /\d{4}-\d{2}-\d{2}/.test(stringValue)) {
    return new Date(parsedDate).toLocaleString()
  }

  return stringValue
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

const normalizeNumber = (value: unknown): number | undefined => {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : undefined
  }

  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number.parseFloat(value)
    return Number.isNaN(parsed) ? undefined : parsed
  }

  return undefined
}

const getString = (value: unknown): string | undefined => {
  if (typeof value === "string" && value.trim().length > 0) {
    return value.trim()
  }

  return undefined
}

const ensureUrlProtocol = (value: string) => {
  if (!value) {
    return value
  }

  if (/^https?:\/\//i.test(value)) {
    return value
  }

  return `https://${value}`
}

const sanitizePhoneNumber = (value: string) => value.replace(/[^\d+]/g, "")

const buildWhatsAppLink = (value: string): string | undefined => {
  const digits = value.replace(/\D/g, "")
  if (!digits) {
    return undefined
  }

  return `https://wa.me/${digits}`
}

const buildAdditionalDetails = (buyer: Buyer) => {
  return Object.entries(buyer)
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

const normalizeBuyerRecord = (record: Record<string, unknown>): Buyer => {
  const productsInterested = normalizeStringArray(record.products_interested)
  const certificationsRequired = normalizeStringArray(record.certifications_required)

  const toDateString = (value: unknown): string | undefined => {
    if (value instanceof Date) {
      return value.toISOString()
    }
    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim()
    }
    return undefined
  }

  const idValue = record.id

  return {
    ...(record as Record<string, unknown>),
    id:
      typeof idValue === "string"
        ? idValue
        : idValue != null
        ? String(idValue)
        : typeof crypto !== "undefined"
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2),
    company_name: getString(record.company_name) ?? "Unnamed Buyer",
    contact_person: getString(record.contact_person) ?? "Primary Contact",
    email: getString(record.email),
    phone: getString(record.phone),
    website: getString(record.website),
    whatsapp: getString(record.whatsapp),
    country: getString(record.country),
    city: getString(record.city),
    address: getString(record.address),
    business_type: getString(record.business_type),
    annual_volume: normalizeNumber(record.annual_volume),
    annual_volume_units: getString(record.annual_volume_units),
    preferred_payment_terms: getString(record.preferred_payment_terms),
    preferred_shipping_terms: getString(record.preferred_shipping_terms),
    certifications_required: certificationsRequired,
    certifications_notes: getString(record.certifications_notes),
    products_interested: productsInterested,
    buying_frequency: getString(record.buying_frequency),
    notes: getString(record.notes),
    is_verified: Boolean(record.is_verified),
    is_active: record.is_active !== false,
    created_at: toDateString(record.created_at),
    updated_at: toDateString(record.updated_at),
    image_url: getString(record.image_url),
  } as Buyer
}

const mockBuyers: Buyer[] = [
  {
    id: "1",
    company_name: "Global Fruits Import",
    contact_person: "John Smith",
    email: "john@globalfruits.com",
    phone: "+1-555-0123",
    country: "United States",
    city: "New York",
    business_type: "Importer",
    products_interested: ["Mangoes", "Bananas", "Apples"],
    annual_volume: 5000,
    preferred_payment_terms: "LC 60 days",
    is_verified: true,
    is_active: true,
    image_url: "/fresh-alphonso-mangoes.png",
  },
  {
    id: "2",
    company_name: "European Fresh Market",
    contact_person: "Maria Rodriguez",
    email: "maria@eufresh.com",
    phone: "+49-123-4567",
    country: "Germany",
    city: "Berlin",
    business_type: "Distributor",
    products_interested: ["Mangoes", "Pomegranates", "Grapes"],
    annual_volume: 3000,
    preferred_payment_terms: "TT 30 days",
    is_verified: true,
    is_active: true,
    image_url: "/fresh-green-grapes.png",
  },
  {
    id: "3",
    company_name: "Asia Pacific Foods",
    contact_person: "Wei Chen",
    email: "wei@asiapacificfoods.com",
    phone: "+65-9876-5432",
    country: "Singapore",
    city: "Singapore",
    business_type: "Wholesaler",
    products_interested: ["Bananas", "Papayas", "Pineapples"],
    annual_volume: 2000,
    preferred_payment_terms: "TT 45 days",
    is_verified: false,
    is_active: true,
    image_url: "/mango-packing-warehouse.png",
  },
]

const normalizedMockBuyers = mockBuyers.map((buyer) => normalizeBuyerRecord(buyer))

export default function BuyersPage() {
  const [buyers, setBuyers] = useState<Buyer[]>([])
  const [filteredBuyers, setFilteredBuyers] = useState<Buyer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("all")
  const [selectedBusinessType, setSelectedBusinessType] = useState("all")
  const [isHydrated, setIsHydrated] = useState(false)
  const [usingMockData, setUsingMockData] = useState(false)
  const { t: translate } = useLanguage()
  const t: (key: string) => string = translate || ((key: string) => key)
  const router = useRouter()

  useEffect(() => {
    setIsHydrated(true)
    fetchBuyers()
  }, [])

  useEffect(() => {
    filterBuyers()
  }, [buyers, searchTerm, selectedCountry, selectedBusinessType])

  const fetchBuyers = async () => {
    setLoading(true)
    setError(null)

    try {
      // Try to fetch from Supabase first
      const supabase = createClient()
      const { data, error: supabaseError } = await supabase
        .from("buyers")
        .select("*")
        .eq("is_active", true)

      if (supabaseError) {
        throw supabaseError
      }

      if (data && data.length > 0) {
        const normalized = data.map((record) => normalizeBuyerRecord(record as Record<string, unknown>))
        setBuyers(normalized)
        setUsingMockData(false)
      } else {
        // Fallback to mock data if no data from Supabase
        setBuyers(normalizedMockBuyers)
        setUsingMockData(true)
      }
    } catch (err: any) {
      console.error("Error fetching buyers:", err)
      setError(err.message || "An unexpected error occurred.")
      // Use mock data in case of error (for development/demo)
      setBuyers(normalizedMockBuyers)
      setUsingMockData(true)
    } finally {
      setLoading(false)
    }
  }

  const filterBuyers = () => {
    const normalizedSearch = searchTerm.trim().toLowerCase()
    let filtered = buyers.filter((buyer) => buyer.is_active !== false)

    if (normalizedSearch) {
      const includesSearch = (value?: string) =>
        typeof value === "string" && value.toLowerCase().includes(normalizedSearch)

      filtered = filtered.filter((buyer) => {
        const haystacks = [
          buyer.company_name,
          buyer.contact_person,
          buyer.country,
          buyer.city,
          buyer.business_type,
          buyer.buying_frequency,
          buyer.notes,
        ]

        if (haystacks.some((field) => includesSearch(field))) {
          return true
        }

        if (buyer.products_interested?.some((product) => product.toLowerCase().includes(normalizedSearch))) {
          return true
        }

        if (
          buyer.certifications_required?.some((certification) =>
            certification.toLowerCase().includes(normalizedSearch)
          )
        ) {
          return true
        }

        return false
      })
    }

    if (selectedCountry !== "all") {
      filtered = filtered.filter((buyer) => buyer.country === selectedCountry)
    }

    if (selectedBusinessType !== "all") {
      filtered = filtered.filter((buyer) => buyer.business_type === selectedBusinessType)
    }

    setFilteredBuyers(filtered)
  }

  const countries = [
    ...new Set(
      buyers
        .map((b) => (typeof b.country === "string" ? b.country.trim() : ""))
        .filter((country): country is string => country.length > 0)
    ),
  ].sort()
  const businessTypes = [
    ...new Set(
      buyers
        .map((b) => (typeof b.business_type === "string" ? b.business_type.trim() : ""))
        .filter((type): type is string => type.length > 0)
    ),
  ].sort()

  const activeBuyerCount = buyers.length
  const countryCount = Math.max(countries.length, 25)
  const verifiedBuyerCount = Math.max(
    buyers.filter((b) => b.is_verified).length,
    2,
  )
  const annualVolumeThousands = Math.max(
    Math.round(buyers.reduce((sum, b) => sum + (b.annual_volume || 0), 0) / 1000),
    100,
  )

  const handleRegisterAsBuyer = () => {
    router.push("/contact?type=buyer-registration")
  }

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading buyers directory...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Warning/Error banners */}
      {usingMockData && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Development Mode:</strong> Using mock data.{" "}
                  {error || "Supabase connection is not available."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && !usingMockData && (
        <div className="bg-red-100 border-l-4 border-red-500 p-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-emerald-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
              {t("buyers") || "Buyers"} Directory
            </h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Connect with verified international buyers looking for premium
              Indian fruits
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-emerald-600">
                {activeBuyerCount}+
              </div>
              <div className="text-gray-600">Active Buyers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600">
                {countryCount}+
              </div>
              <div className="text-gray-600">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600">
                {verifiedBuyerCount}+
              </div>
              <div className="text-gray-600">Verified Buyers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600">
                {annualVolumeThousands}K+
              </div>
              <div className="text-gray-600">Tons Annual Volume</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search buyers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-full sm:w-48">
                  <Globe className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={selectedBusinessType}
                onValueChange={setSelectedBusinessType}
              >
                <SelectTrigger className="w-full sm:w-48">
                  <Building className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Business Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {businessTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm text-gray-600">
              {filteredBuyers.length} of {buyers.length} buyers
            </div>
          </div>
        </div>
      </section>

      {/* Buyers Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading buyers directory...</p>
            </div>
          ) : filteredBuyers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBuyers.map((buyer) => {
                const companyName = buyer.company_name ?? "Unnamed Buyer"
                const contactName = buyer.contact_person ?? "Primary Contact"
                const locationParts = [buyer.city, buyer.country]
                  .filter((part): part is string => typeof part === "string" && part.trim().length > 0)
                const locationLine = locationParts.length > 0 ? locationParts.join(", ") : undefined
                const addressLine =
                  typeof buyer.address === "string" && buyer.address.trim().length > 0 ? buyer.address.trim() : undefined
                const annualVolumeLabel =
                  typeof buyer.annual_volume === "number"
                    ? `${buyer.annual_volume.toLocaleString()} ${buyer.annual_volume_units ?? "tons"}`
                    : undefined
                const paymentTerms =
                  typeof buyer.preferred_payment_terms === "string" && buyer.preferred_payment_terms.length > 0
                    ? buyer.preferred_payment_terms
                    : undefined
                const shippingTerms =
                  typeof buyer.preferred_shipping_terms === "string" && buyer.preferred_shipping_terms.length > 0
                    ? buyer.preferred_shipping_terms
                    : undefined
                const buyingFrequency =
                  typeof buyer.buying_frequency === "string" && buyer.buying_frequency.length > 0
                    ? buyer.buying_frequency
                    : undefined
                const certifications = buyer.certifications_required ?? []
                const additionalDetails = buildAdditionalDetails(buyer)
                const sanitizedPhone = typeof buyer.phone === "string" ? sanitizePhoneNumber(buyer.phone) : undefined
                const whatsappLink =
                  typeof buyer.whatsapp === "string" ? buildWhatsAppLink(buyer.whatsapp) : undefined
                const websiteLink =
                  typeof buyer.website === "string" && buyer.website.length > 0
                    ? ensureUrlProtocol(buyer.website)
                    : undefined
                const hasContactInfo = Boolean(buyer.email || sanitizedPhone || whatsappLink || websiteLink)

                return (
                  <Card key={buyer.id} className="flex h-full flex-col hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-1 flex items-center gap-2">
                            {companyName}
                            {buyer.is_verified && (
                              <CheckCircle
                                className="h-5 w-5 text-emerald-600"
                                aria-label="Verified Buyer"
                              />
                            )}
                          </CardTitle>
                          <p className="text-gray-600 text-sm">{contactName}</p>
                        </div>
                        {buyer.business_type && (
                          <Badge variant="outline" className="text-xs">
                            {buyer.business_type}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col gap-6">
                      {hasContactInfo && (
                        <div className="space-y-2 text-sm">
                          {buyer.email && (
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-emerald-600" />
                              <a
                                href={`mailto:${buyer.email}`}
                                className="text-emerald-700 hover:underline"
                              >
                                {buyer.email}
                              </a>
                            </div>
                          )}
                          {sanitizedPhone && buyer.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-emerald-600" />
                              <a
                                href={`tel:${sanitizedPhone}`}
                                className="text-emerald-700 hover:underline"
                              >
                                {buyer.phone}
                              </a>
                            </div>
                          )}
                          {whatsappLink && buyer.whatsapp && (
                            <div className="flex items-center gap-2">
                              <MessageCircle className="h-4 w-4 text-emerald-600" />
                              <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-700 hover:underline"
                              >
                                {buyer.whatsapp}
                              </a>
                            </div>
                          )}
                          {websiteLink && (
                            <div className="flex items-center gap-2">
                              <Globe className="h-4 w-4 text-emerald-600" />
                              <a
                                href={websiteLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-700 hover:underline"
                              >
                                {buyer.website}
                              </a>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="grid gap-4 text-sm sm:grid-cols-2">
                        <div className="flex items-start gap-2">
                          <MapPin className="mt-1 h-4 w-4 text-emerald-600 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
                              Location
                            </div>
                            {locationLine ? (
                              <div className="text-gray-700 font-medium">{locationLine}</div>
                            ) : (
                              <div className="text-gray-500 italic">Not provided</div>
                            )}
                            {addressLine && (
                              <div className={`text-xs text-gray-500 ${locationLine ? "mt-1" : "mt-0.5"}`}>
                                {addressLine}
                              </div>
                            )}
                          </div>
                        </div>

                        {annualVolumeLabel && (
                          <div className="flex items-start gap-2">
                            <BarChart3 className="mt-1 h-4 w-4 text-emerald-600" />
                            <div>
                              <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Annual Volume
                              </div>
                              <div className="text-gray-700">{annualVolumeLabel}</div>
                            </div>
                          </div>
                        )}

                        {paymentTerms && (
                          <div className="flex items-start gap-2">
                            <CreditCard className="mt-1 h-4 w-4 text-emerald-600" />
                            <div>
                              <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Payment Terms
                              </div>
                              <div className="text-gray-700">{paymentTerms}</div>
                            </div>
                          </div>
                        )}

                        {shippingTerms && (
                          <div className="flex items-start gap-2">
                            <Ship className="mt-1 h-4 w-4 text-emerald-600" />
                            <div>
                              <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Shipping Terms
                              </div>
                              <div className="text-gray-700">{shippingTerms}</div>
                            </div>
                          </div>
                        )}

                        {buyingFrequency && (
                          <div className="flex items-start gap-2">
                            <Calendar className="mt-1 h-4 w-4 text-emerald-600" />
                            <div>
                              <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Buying Frequency
                              </div>
                              <div className="text-gray-700">{buyingFrequency}</div>
                            </div>
                          </div>
                        )}
                      </div>

                      {buyer.products_interested && buyer.products_interested.length > 0 && (
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Products Interested
                          </div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {buyer.products_interested.map((product, index) => (
                              <Badge
                                key={`${buyer.id}-product-${index}`}
                                variant="secondary"
                                className="bg-emerald-100 text-emerald-800"
                              >
                                {product}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {certifications.length > 0 && (
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Certifications Required
                          </div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {certifications.map((certification, index) => (
                              <Badge
                                key={`${buyer.id}-cert-${index}`}
                                variant="outline"
                                className="border-emerald-200 text-emerald-700"
                              >
                                {certification}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {buyer.certifications_notes && (
                        <div className="rounded-md border border-dashed border-emerald-200 bg-emerald-50/70 p-3 text-sm text-emerald-900">
                          {buyer.certifications_notes}
                        </div>
                      )}

                      {buyer.notes && (
                        <div className="rounded-md bg-emerald-50 p-3 text-sm text-emerald-900">
                          {buyer.notes}
                        </div>
                      )}

                      {additionalDetails.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                            <Info className="h-4 w-4 text-emerald-600" />
                            Additional Details
                          </div>
                          <dl className="mt-2 space-y-2 text-sm">
                            {additionalDetails.map((detail) => (
                              <div key={detail.key} className="flex items-start justify-between gap-4">
                                <dt className="font-medium text-gray-700">{detail.label}</dt>
                                <dd className="text-right text-gray-600">{detail.value}</dd>
                              </div>
                            ))}
                          </dl>
                        </div>
                      )}

                      <div className="mt-auto flex flex-wrap gap-2 pt-2">
                        <Button
                          onClick={() =>
                            router.push(
                              `/contact?buyer=${encodeURIComponent(
                                companyName
                              )}&buyerId=${encodeURIComponent(buyer.id)}`
                            )
                          }
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                          size="sm"
                        >
                          <Mail className="h-4 w-4" />
                          Contact
                        </Button>

                        {buyer.email && (
                          <Button asChild variant="outline" size="sm">
                            <a href={`mailto:${buyer.email}`}>
                              <Mail className="h-4 w-4" />
                              Email
                            </a>
                          </Button>
                        )}

                        {sanitizedPhone && (
                          <Button asChild variant="outline" size="sm">
                            <a href={`tel:${sanitizedPhone}`}>
                              <Phone className="h-4 w-4" />
                              Call
                            </a>
                          </Button>
                        )}

                        {whatsappLink && (
                          <Button asChild variant="outline" size="sm">
                            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                              <MessageCircle className="h-4 w-4" />
                              WhatsApp
                            </a>
                          </Button>
                        )}

                        {websiteLink && (
                          <Button asChild variant="outline" size="sm">
                            <a href={websiteLink} target="_blank" rel="noopener noreferrer">
                              <Globe className="h-4 w-4" />
                              Website
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No buyers found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-emerald-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 font-serif">
            Ready to Connect with International Buyers?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join our network of verified buyers and expand your export opportunities.
          </p>
          <Button
            onClick={handleRegisterAsBuyer}
            className="bg-white text-emerald-800 hover:bg-gray-100 px-8 py-3 text-lg"
          >
            Register as a Buyer
          </Button>
        </div>
      </section>
    </div>
  )
}

