"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { Users, Package, MessageSquare, TrendingUp, CheckCircle, Mail, Phone, Eye } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface DashboardStats {
  totalInquiries: number
  newInquiries: number
  totalProducts: number
  activeProducts: number
  totalBuyers: number
  verifiedBuyers: number
  monthlyInquiries: number
}

interface Inquiry {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  country: string
  subject: string
  message: string
  inquiry_type: string
  status: string
  priority: string
  created_at: string
  notes?: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalInquiries: 0,
    newInquiries: 0,
    totalProducts: 0,
    activeProducts: 0,
    totalBuyers: 0,
    verifiedBuyers: 0,
    monthlyInquiries: 0,
  })
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch inquiries
      const { data: inquiriesData } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false })

      // Fetch products
      const { data: productsData } = await supabase.from("products").select("*")

      // Fetch buyers
      const { data: buyersData } = await supabase.from("buyers").select("*")

      const now = new Date()
      const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)

      setInquiries(inquiriesData || [])
      setStats({
        totalInquiries: inquiriesData?.length || 0,
        newInquiries: inquiriesData?.filter((i) => i.status === "new").length || 0,
        totalProducts: productsData?.length || 0,
        activeProducts: productsData?.filter((p) => p.is_active).length || 0,
        totalBuyers: buyersData?.length || 0,
        verifiedBuyers: buyersData?.filter((b) => b.is_verified).length || 0,
        monthlyInquiries: inquiriesData?.filter((i) => new Date(i.created_at) >= thisMonth).length || 0,
      })
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateInquiryStatus = async (inquiryId: string, status: string) => {
    try {
      const { error } = await supabase
        .from("inquiries")
        .update({
          status,
          updated_at: new Date().toISOString(),
          notes: status === "resolved" ? "Inquiry resolved by admin" : null,
        })
        .eq("id", inquiryId)

      if (error) throw error

      console.log("[v0] Inquiry status updated successfully")
      fetchDashboardData()
    } catch (error) {
      console.error("Error updating inquiry status:", error)
      // In a real app, you'd show a toast notification here
    }
  }

  const deleteInquiry = async (inquiryId: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return

    try {
      const { error } = await supabase.from("inquiries").delete().eq("id", inquiryId)

      if (error) throw error

      console.log("[v0] Inquiry deleted successfully")
      fetchDashboardData()
    } catch (error) {
      console.error("Error deleting inquiry:", error)
    }
  }

  const exportInquiries = () => {
    const csvContent = [
      ["Name", "Email", "Phone", "Company", "Country", "Subject", "Status", "Date"],
      ...inquiries.map((inquiry) => [
        inquiry.name,
        inquiry.email,
        inquiry.phone || "",
        inquiry.company || "",
        inquiry.country,
        inquiry.subject,
        inquiry.status,
        new Date(inquiry.created_at).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `inquiries-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800"
      case "in_progress":
        return "bg-yellow-100 text-yellow-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Sample data for charts
  const monthlyData = [
    { month: "Jan", inquiries: 45, buyers: 12 },
    { month: "Feb", inquiries: 52, buyers: 15 },
    { month: "Mar", inquiries: 48, buyers: 18 },
    { month: "Apr", inquiries: 61, buyers: 22 },
    { month: "May", inquiries: 55, buyers: 19 },
    { month: "Jun", inquiries: 67, buyers: 25 },
  ]

  const countryData = [
    { name: "USA", value: 35, color: "#10B981" },
    { name: "Germany", value: 25, color: "#F59E0B" },
    { name: "UAE", value: 20, color: "#EF4444" },
    { name: "UK", value: 12, color: "#8B5CF6" },
    { name: "Others", value: 8, color: "#6B7280" },
  ]

  const inquiryTypeData = [
    { type: "Product Info", count: 45 },
    { type: "Pricing", count: 38 },
    { type: "Partnership", count: 22 },
    { type: "Quality", count: 18 },
    { type: "Logistics", count: 15 },
    { type: "General", count: 12 },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your export business operations</p>
            </div>
            <div className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Inquiries</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalInquiries}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-emerald-600" />
              </div>
              <div className="mt-2 flex items-center text-sm">
                <Badge className="bg-blue-100 text-blue-800">{stats.newInquiries} New</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Products</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
                </div>
                <Package className="h-8 w-8 text-emerald-600" />
              </div>
              <div className="mt-2 flex items-center text-sm">
                <Badge className="bg-green-100 text-green-800">{stats.activeProducts} Active</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Buyers</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalBuyers}</p>
                </div>
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <div className="mt-2 flex items-center text-sm">
                <Badge className="bg-emerald-100 text-emerald-800">{stats.verifiedBuyers} Verified</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.monthlyInquiries}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-emerald-600" />
              </div>
              <div className="mt-2 flex items-center text-sm text-green-600">
                <span>+12% from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="inquiries" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="buyers">Buyers</TabsTrigger>
          </TabsList>

          {/* Inquiries Tab */}
          <TabsContent value="inquiries">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Recent Inquiries
                  <Button variant="outline" onClick={exportInquiries} className="bg-emerald-50 hover:bg-emerald-100">
                    Export CSV
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inquiries.slice(0, 10).map((inquiry) => (
                    <div key={inquiry.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{inquiry.name}</h3>
                            <Badge className={getStatusColor(inquiry.status)}>{inquiry.status}</Badge>
                            <Badge className={getPriorityColor(inquiry.priority)}>{inquiry.priority}</Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            {inquiry.company && `${inquiry.company} • `}
                            {inquiry.country}
                          </p>
                        </div>
                        <div className="text-sm text-gray-500">{new Date(inquiry.created_at).toLocaleDateString()}</div>
                      </div>

                      <div className="mb-3">
                        <p className="font-medium text-gray-900 mb-1">{inquiry.subject}</p>
                        <p className="text-sm text-gray-600 line-clamp-2">{inquiry.message}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {inquiry.email}
                          </div>
                          {inquiry.phone && (
                            <div className="flex items-center gap-1">
                              <Phone className="h-4 w-4" />
                              {inquiry.phone}
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          {inquiry.status === "new" && (
                            <Button
                              size="sm"
                              onClick={() => updateInquiryStatus(inquiry.id, "in_progress")}
                              className="bg-emerald-600 hover:bg-emerald-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Process
                            </Button>
                          )}
                          {(inquiry.status === "resolved" || inquiry.status === "closed") && (
                            <Button size="sm" variant="destructive" onClick={() => deleteInquiry(inquiry.id)}>
                              Delete
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="inquiries" stroke="#10B981" strokeWidth={2} />
                      <Line type="monotone" dataKey="buyers" stroke="#F59E0B" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Buyers by Country</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={countryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {countryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Inquiry Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={inquiryTypeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="type" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Product Management
                  </div>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">Add New Product</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Package className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>Product management interface would be implemented here</p>
                  <p className="text-sm">Features: Add, edit, delete products, manage inventory, pricing</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Buyers Tab */}
          <TabsContent value="buyers">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Buyer Management
                  </div>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">Add New Buyer</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>Buyer management interface would be implemented here</p>
                  <p className="text-sm">Features: Verify buyers, manage contacts, track purchase history</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
