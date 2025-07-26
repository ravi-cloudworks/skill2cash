"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Eye,
  DollarSign,
  Plus,
  MessageSquare,
  BarChart3,
  Store,
  Star,
  Search,
  Settings,
} from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

// Mock data for dashboard
const dashboardData = {
  stats: {
    totalRevenue: 45670,
    totalSales: 234,
    totalViews: 12450,
    conversionRate: 1.88,
    trends: {
      revenue: 12.5,
      sales: 8.3,
      views: -2.1,
      conversion: 0.4,
    },
  },
  revenueData: [
    { month: "Jan", revenue: 4200, sales: 28 },
    { month: "Feb", revenue: 3800, sales: 25 },
    { month: "Mar", revenue: 5200, sales: 34 },
    { month: "Apr", revenue: 4600, sales: 31 },
    { month: "May", revenue: 6800, sales: 42 },
    { month: "Jun", revenue: 7200, sales: 48 },
    { month: "Jul", revenue: 8100, sales: 52 },
    { month: "Aug", revenue: 7800, sales: 49 },
    { month: "Sep", revenue: 9200, sales: 58 },
    { month: "Oct", revenue: 8900, sales: 56 },
    { month: "Nov", revenue: 10200, sales: 64 },
    { month: "Dec", revenue: 11500, sales: 72 },
  ],
  products: [
    {
      id: "hr-policy-library",
      title: "Complete HR Policy Library",
      sales: 89,
      revenue: 266911,
      views: 2340,
      rating: 4.8,
      status: "active",
      lastSale: "2 hours ago",
    },
    {
      id: "onboarding-masterclass",
      title: "Employee Onboarding Masterclass",
      sales: 67,
      revenue: 120533,
      views: 1890,
      rating: 4.6,
      status: "active",
      lastSale: "5 hours ago",
    },
    {
      id: "performance-management-guide",
      title: "Performance Management Complete Guide",
      sales: 123,
      revenue: 270477,
      views: 3210,
      rating: 4.9,
      status: "active",
      lastSale: "1 hour ago",
    },
  ],
  messages: [
    {
      id: 1,
      from: "Priya Sharma",
      subject: "Question about HR Policy Library",
      preview: "Hi, I wanted to know if the policy templates are customizable...",
      time: "2 hours ago",
      status: "unread",
      emotion: "happy",
      productId: "hr-policy-library",
    },
    {
      id: 2,
      from: "Rajesh Kumar",
      subject: "Download issue with Onboarding guide",
      preview: "I'm having trouble downloading the files after purchase...",
      time: "4 hours ago",
      status: "unread",
      emotion: "frustrated",
      productId: "onboarding-masterclass",
    },
    {
      id: 3,
      from: "Anita Desai",
      subject: "Excellent Performance Management Guide!",
      preview: "Just wanted to say thank you for this amazing resource...",
      time: "1 day ago",
      status: "read",
      emotion: "love",
      productId: "performance-management-guide",
    },
    {
      id: 4,
      from: "Vikram Singh",
      subject: "Bulk purchase inquiry",
      preview: "We're interested in purchasing multiple licenses for our team...",
      time: "2 days ago",
      status: "read",
      emotion: "satisfied",
      productId: "hr-policy-library",
    },
  ],
  trafficSources: [
    { name: "Direct", value: 35, color: "#8884d8" },
    { name: "Google Search", value: 28, color: "#82ca9d" },
    { name: "Social Media", value: 20, color: "#ffc658" },
    { name: "Referrals", value: 12, color: "#ff7300" },
    { name: "Email", value: 5, color: "#00ff00" },
  ],
  customerLocations: [
    { city: "Mumbai", customers: 45, revenue: 89000 },
    { city: "Bangalore", customers: 38, revenue: 76000 },
    { city: "Delhi", customers: 42, revenue: 84000 },
    { city: "Pune", customers: 28, revenue: 56000 },
    { city: "Chennai", customers: 25, revenue: 50000 },
    { city: "Hyderabad", customers: 22, revenue: 44000 },
  ],
}

const emotionColors = {
  happy: "text-green-600 bg-green-50",
  love: "text-pink-600 bg-pink-50",
  satisfied: "text-blue-600 bg-blue-50",
  frustrated: "text-orange-600 bg-orange-50",
  angry: "text-red-600 bg-red-50",
}

const emotionEmojis = {
  happy: "😊",
  love: "😍",
  satisfied: "😌",
  frustrated: "😤",
  angry: "😠",
}

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d")
  const [messageFilter, setMessageFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const filteredMessages = dashboardData.messages.filter((message) => {
    const matchesFilter = messageFilter === "all" || message.status === messageFilter
    const matchesSearch =
      message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header userType="creator" />

      <div className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-gray-600">Welcome back! Here's your HR business overview.</p>
              </div>
              <div className="flex items-center gap-3">
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                    <SelectItem value="1y">Last year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                      <p className="text-2xl font-bold">{formatCurrency(dashboardData.stats.totalRevenue)}</p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-full">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600 font-medium">+{dashboardData.stats.trends.revenue}%</span>
                    <span className="text-sm text-gray-500 ml-1">vs last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Sales</p>
                      <p className="text-2xl font-bold">{dashboardData.stats.totalSales}</p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-full">
                      <ShoppingCart className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600 font-medium">+{dashboardData.stats.trends.sales}%</span>
                    <span className="text-sm text-gray-500 ml-1">vs last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Views</p>
                      <p className="text-2xl font-bold">{dashboardData.stats.totalViews.toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-full">
                      <Eye className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                    <span className="text-sm text-red-600 font-medium">{dashboardData.stats.trends.views}%</span>
                    <span className="text-sm text-gray-500 ml-1">vs last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                      <p className="text-2xl font-bold">{dashboardData.stats.conversionRate}%</p>
                    </div>
                    <div className="p-3 bg-orange-100 rounded-full">
                      <TrendingUp className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600 font-medium">
                      +{dashboardData.stats.trends.conversion}%
                    </span>
                    <span className="text-sm text-gray-500 ml-1">vs last month</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <Link href="/dashboard/products/add">
                    <Button variant="outline" className="w-full h-20 flex flex-col gap-2 bg-transparent">
                      <Plus className="w-5 h-5" />
                      <span className="text-sm">Add Product</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/sales">
                    <Button variant="outline" className="w-full h-20 flex flex-col gap-2 bg-transparent">
                      <ShoppingCart className="w-5 h-5" />
                      <span className="text-sm">View Sales</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/messages">
                    <Button variant="outline" className="w-full h-20 flex flex-col gap-2 bg-transparent">
                      <MessageSquare className="w-5 h-5" />
                      <span className="text-sm">Messages</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/analytics">
                    <Button variant="outline" className="w-full h-20 flex flex-col gap-2 bg-transparent">
                      <BarChart3 className="w-5 h-5" />
                      <span className="text-sm">Analytics</span>
                    </Button>
                  </Link>
                  <Link href="/store/ravi-hr-hub">
                    <Button variant="outline" className="w-full h-20 flex flex-col gap-2 bg-transparent">
                      <Store className="w-5 h-5" />
                      <span className="text-sm">View Store</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/settings">
                    <Button variant="outline" className="w-full h-20 flex flex-col gap-2 bg-transparent">
                      <Settings className="w-5 h-5" />
                      <span className="text-sm">Settings</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Revenue Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue & Sales Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={dashboardData.revenueData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip
                            formatter={(value, name) => [
                              name === "revenue" ? formatCurrency(value as number) : value,
                              name === "revenue" ? "Revenue" : "Sales",
                            ]}
                          />
                          <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                          <Line type="monotone" dataKey="sales" stroke="#82ca9d" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Product Performance */}
                <Card>
                  <CardHeader>
                    <CardTitle>Product Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dashboardData.products.map((product) => (
                        <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h3 className="font-semibold">{product.title}</h3>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                              <span>{product.sales} sales</span>
                              <span>{formatCurrency(product.revenue)} revenue</span>
                              <span>{product.views} views</span>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-current text-yellow-400" />
                                <span>{product.rating}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant={product.status === "active" ? "default" : "secondary"}>
                              {product.status}
                            </Badge>
                            <span className="text-sm text-gray-500">{product.lastSale}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Recent Messages */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Recent Messages</CardTitle>
                      <Link href="/dashboard/messages">
                        <Button variant="ghost" size="sm">
                          View All
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Search messages..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="flex-1"
                        />
                        <Button variant="outline" size="icon">
                          <Search className="w-4 h-4" />
                        </Button>
                      </div>
                      <Select value={messageFilter} onValueChange={setMessageFilter}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Messages</SelectItem>
                          <SelectItem value="unread">Unread</SelectItem>
                          <SelectItem value="read">Read</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      {filteredMessages.slice(0, 5).map((message) => (
                        <div key={message.id} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">{message.from}</span>
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${emotionColors[message.emotion as keyof typeof emotionColors]}`}
                              >
                                {emotionEmojis[message.emotion as keyof typeof emotionEmojis]}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500">{message.time}</span>
                          </div>
                          <h4 className="font-medium text-sm mb-1">{message.subject}</h4>
                          <p className="text-xs text-gray-600 line-clamp-2">{message.preview}</p>
                          {message.status === "unread" && <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Traffic Sources */}
                <Card>
                  <CardHeader>
                    <CardTitle>Traffic Sources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={dashboardData.trafficSources}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {dashboardData.trafficSources.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value}%`, "Traffic"]} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-2 mt-4">
                      {dashboardData.trafficSources.map((source) => (
                        <div key={source.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }}></div>
                            <span className="text-sm">{source.name}</span>
                          </div>
                          <span className="text-sm font-medium">{source.value}%</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Top Customer Locations */}
                <Card>
                  <CardHeader>
                    <CardTitle>Top Customer Locations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {dashboardData.customerLocations.map((location, index) => (
                        <div key={location.city} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-xs font-bold text-blue-600">{index + 1}</span>
                            </div>
                            <div>
                              <p className="font-medium text-sm">{location.city}</p>
                              <p className="text-xs text-gray-500">{location.customers} customers</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-sm">{formatCurrency(location.revenue)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
