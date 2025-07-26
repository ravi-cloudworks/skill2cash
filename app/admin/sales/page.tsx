"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Search,
  Filter,
  Download,
  Mail,
  MessageSquare,
  Star,
  DollarSign,
  User,
  Eye,
  Send,
  Heart,
  Smile,
  Meh,
  Frown,
  Angry,
  Shield,
  Users,
  AlertTriangle,
  Clock,
} from "lucide-react"

const emotionIcons = {
  love: { icon: Heart, color: "text-pink-600", bg: "bg-pink-50" },
  happy: { icon: Smile, color: "text-green-600", bg: "bg-green-50" },
  satisfied: { icon: Meh, color: "text-blue-600", bg: "bg-blue-50" },
  frustrated: { icon: Frown, color: "text-orange-600", bg: "bg-orange-50" },
  angry: { icon: Angry, color: "text-red-600", bg: "bg-red-50" },
}

export default function AdminSalesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [creatorFilter, setCreatorFilter] = useState("all")
  const [productFilter, setProductFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [emotionFilter, setEmotionFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedSale, setSelectedSale] = useState<any>(null)
  const [messageText, setMessageText] = useState("")
  const [messageRecipient, setMessageRecipient] = useState<"buyer" | "creator">("buyer")

  // Mock sales data with creator information
  const [sales] = useState([
    {
      id: 1,
      orderId: "ORD-1703123456",
      transactionId: "TXN-PAY-789123456",
      productId: "terraform-guide",
      productTitle: "Terraform AWS Complete Guide",
      creatorId: "ravi-kumar",
      creatorName: "Ravi Kumar",
      creatorEmail: "ravi@skillcash.com",
      creatorStore: "ravi-tech-hub",
      buyerName: "Priya Sharma",
      buyerEmail: "priya.sharma@techcorp.com",
      buyerLocation: "Mumbai, India",
      amount: 29.99,
      platformFee: 2.99,
      creatorEarning: 27.0,
      currency: "USD",
      paymentMethod: "UPI",
      paymentStatus: "completed",
      purchaseDate: "2024-01-15T10:30:00Z",
      downloadCount: 3,
      lastDownload: "2024-01-16T14:20:00Z",
      rating: 5,
      reviewText: "Excellent guide! Very comprehensive and easy to follow.",
      reviewDate: "2024-01-17T09:15:00Z",
      emotion: "love",
      hasMessage: true,
      messageCount: 2,
      lastMessageDate: "2024-01-18T11:45:00Z",
      creatorResponded: true,
      responseTime: "2 hours",
      priority: "normal",
      refundStatus: null,
      adminNotes: "",
    },
    {
      id: 2,
      orderId: "ORD-1703123455",
      transactionId: "TXN-PAY-789123455",
      productId: "docker-mastery",
      productTitle: "Docker Mastery Course",
      creatorId: "priya-singh",
      creatorName: "Priya Singh",
      creatorEmail: "priya@skillcash.com",
      creatorStore: "priya-dev-academy",
      buyerName: "John Davis",
      buyerEmail: "john.davis@startup.io",
      buyerLocation: "San Francisco, USA",
      amount: 39.99,
      platformFee: 3.99,
      creatorEarning: 36.0,
      currency: "USD",
      paymentMethod: "Credit Card",
      paymentStatus: "completed",
      purchaseDate: "2024-01-14T15:45:00Z",
      downloadCount: 1,
      lastDownload: "2024-01-14T15:50:00Z",
      rating: 4,
      reviewText: "Good content, but could use more advanced examples.",
      reviewDate: "2024-01-15T12:30:00Z",
      emotion: "satisfied",
      hasMessage: false,
      messageCount: 0,
      lastMessageDate: null,
      creatorResponded: null,
      responseTime: null,
      priority: "normal",
      refundStatus: null,
      adminNotes: "",
    },
    {
      id: 3,
      orderId: "ORD-1703123454",
      transactionId: "TXN-PAY-789123454",
      productId: "kubernetes-guide",
      productTitle: "Kubernetes Production Guide",
      creatorId: "sarah-kim",
      creatorName: "Sarah Kim",
      creatorEmail: "sarah@skillcash.com",
      creatorStore: "sarah-devops",
      buyerName: "Sarah Kim Customer",
      buyerEmail: "sarah.kim@devops.com",
      buyerLocation: "Toronto, Canada",
      amount: 49.99,
      platformFee: 4.99,
      creatorEarning: 45.0,
      currency: "USD",
      paymentMethod: "UPI",
      paymentStatus: "completed",
      purchaseDate: "2024-01-13T08:20:00Z",
      downloadCount: 0,
      lastDownload: null,
      rating: null,
      reviewText: null,
      reviewDate: null,
      emotion: "frustrated",
      hasMessage: true,
      messageCount: 3,
      lastMessageDate: "2024-01-13T10:15:00Z",
      creatorResponded: false,
      responseTime: "No response",
      priority: "high",
      refundStatus: null,
      adminNotes: "Customer unable to download. Creator not responding.",
    },
    {
      id: 4,
      orderId: "ORD-1703123453",
      transactionId: "TXN-PAY-789123453",
      productId: "terraform-guide",
      productTitle: "Terraform AWS Complete Guide",
      creatorId: "ravi-kumar",
      creatorName: "Ravi Kumar",
      creatorEmail: "ravi@skillcash.com",
      creatorStore: "ravi-tech-hub",
      buyerName: "Mike Rodriguez",
      buyerEmail: "mike.r@consulting.com",
      buyerLocation: "Mexico City, Mexico",
      amount: 29.99,
      platformFee: 2.99,
      creatorEarning: 27.0,
      currency: "USD",
      paymentMethod: "Net Banking",
      paymentStatus: "completed",
      purchaseDate: "2024-01-12T19:10:00Z",
      downloadCount: 5,
      lastDownload: "2024-01-14T16:30:00Z",
      rating: 5,
      reviewText: "Amazing content! Saved me weeks of work.",
      reviewDate: "2024-01-13T20:45:00Z",
      emotion: "happy",
      hasMessage: false,
      messageCount: 0,
      lastMessageDate: null,
      creatorResponded: null,
      responseTime: null,
      priority: "normal",
      refundStatus: null,
      adminNotes: "",
    },
    {
      id: 5,
      orderId: "ORD-1703123452",
      transactionId: "TXN-PAY-789123452",
      productId: "docker-mastery",
      productTitle: "Docker Mastery Course",
      creatorId: "priya-singh",
      creatorName: "Priya Singh",
      creatorEmail: "priya@skillcash.com",
      creatorStore: "priya-dev-academy",
      buyerName: "Lisa Chen",
      buyerEmail: "lisa.chen@enterprise.com",
      buyerLocation: "Singapore",
      amount: 39.99,
      platformFee: 3.99,
      creatorEarning: 36.0,
      currency: "USD",
      paymentMethod: "Credit Card",
      paymentStatus: "refunded",
      purchaseDate: "2024-01-11T13:25:00Z",
      downloadCount: 0,
      lastDownload: null,
      rating: 2,
      reviewText: "Not what I expected. Content was too basic for my needs.",
      reviewDate: "2024-01-11T14:30:00Z",
      emotion: "angry",
      hasMessage: true,
      messageCount: 5,
      lastMessageDate: "2024-01-12T09:20:00Z",
      creatorResponded: true,
      responseTime: "1 day",
      priority: "urgent",
      refundStatus: "processed",
      adminNotes: "Refund processed due to content quality issues. Creator warned.",
    },
  ])

  const filteredSales = sales.filter((sale) => {
    const matchesSearch =
      sale.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.buyerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.creatorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.productTitle.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCreator = creatorFilter === "all" || sale.creatorId === creatorFilter
    const matchesProduct = productFilter === "all" || sale.productId === productFilter
    const matchesStatus = statusFilter === "all" || sale.paymentStatus === statusFilter
    const matchesEmotion = emotionFilter === "all" || sale.emotion === emotionFilter
    const matchesPriority = priorityFilter === "all" || sale.priority === priorityFilter

    return matchesSearch && matchesCreator && matchesProduct && matchesStatus && matchesEmotion && matchesPriority
  })

  const handleSendMessage = () => {
    if (messageText.trim() && selectedSale) {
      const recipient = messageRecipient === "buyer" ? selectedSale.buyerEmail : selectedSale.creatorEmail
      const recipientName = messageRecipient === "buyer" ? selectedSale.buyerName : selectedSale.creatorName
      alert(`Admin message sent to ${recipientName} (${recipient}): ${messageText}`)
      setMessageText("")
      setSelectedSale(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "refunded":
        return "bg-red-100 text-red-800"
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
      case "normal":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const totalRevenue = filteredSales
    .filter((sale) => sale.paymentStatus === "completed")
    .reduce((sum, sale) => sum + sale.amount, 0)

  const platformRevenue = filteredSales
    .filter((sale) => sale.paymentStatus === "completed")
    .reduce((sum, sale) => sum + sale.platformFee, 0)

  const totalSales = filteredSales.filter((sale) => sale.paymentStatus === "completed").length
  const avgRating =
    filteredSales.filter((sale) => sale.rating).reduce((sum, sale) => sum + (sale.rating || 0), 0) /
      filteredSales.filter((sale) => sale.rating).length || 0

  const creators = [...new Set(sales.map((sale) => ({ id: sale.creatorId, name: sale.creatorName })))]
  const products = [...new Set(sales.map((sale) => ({ id: sale.productId, title: sale.productTitle })))]

  const urgentIssues = sales.filter((sale) => sale.priority === "urgent" || sale.priority === "high").length
  const unresponsiveCreators = sales.filter((sale) => sale.hasMessage && !sale.creatorResponded).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Admin</span>
              </Link>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-red-600" />
                <span className="text-xl font-bold">Platform Sales Management</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export All Sales
              </Button>
              <Button>
                <AlertTriangle className="w-4 h-4 mr-2" />
                Urgent Issues ({urgentIssues})
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Admin Alert */}
        <div className="mb-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-red-600" />
              <span className="font-semibold text-red-800">Admin Sales Dashboard</span>
            </div>
            <p className="text-sm text-red-700">
              Monitor all platform sales, manage creator-buyer communications, and handle escalated issues.
              {unresponsiveCreators > 0 && (
                <span className="font-semibold"> ⚠️ {unresponsiveCreators} creators need attention!</span>
              )}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <div>
                  <p className="text-xl font-bold">${totalRevenue.toFixed(2)}</p>
                  <p className="text-xs text-gray-600">Total Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="text-xl font-bold">${platformRevenue.toFixed(2)}</p>
                  <p className="text-xs text-gray-600">Platform Fee</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-purple-600" />
                <div>
                  <p className="text-xl font-bold">{totalSales}</p>
                  <p className="text-xs text-gray-600">Total Sales</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-600" />
                <div>
                  <p className="text-xl font-bold">{avgRating.toFixed(1)}</p>
                  <p className="text-xs text-gray-600">Avg Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <div>
                  <p className="text-xl font-bold">{urgentIssues}</p>
                  <p className="text-xs text-gray-600">Urgent Issues</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-600" />
                <div>
                  <p className="text-xl font-bold">{unresponsiveCreators}</p>
                  <p className="text-xs text-gray-600">No Response</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search by buyer, creator, order ID, or product..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-6 gap-2">
                <Select value={creatorFilter} onValueChange={setCreatorFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Creators" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Creators</SelectItem>
                    {creators.map((creator) => (
                      <SelectItem key={creator.id} value={creator.id}>
                        {creator.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={productFilter} onValueChange={setProductFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Products" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Products</SelectItem>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={emotionFilter} onValueChange={setEmotionFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Emotion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Emotions</SelectItem>
                    <SelectItem value="love">❤️ Love</SelectItem>
                    <SelectItem value="happy">😊 Happy</SelectItem>
                    <SelectItem value="satisfied">😐 Satisfied</SelectItem>
                    <SelectItem value="frustrated">😞 Frustrated</SelectItem>
                    <SelectItem value="angry">😠 Angry</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="urgent">🔴 Urgent</SelectItem>
                    <SelectItem value="high">🟠 High</SelectItem>
                    <SelectItem value="normal">🔵 Normal</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sales List */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Sales ({filteredSales.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredSales.map((sale) => {
                const EmotionIcon = emotionIcons[sale.emotion as keyof typeof emotionIcons]?.icon || Meh
                const emotionColor = emotionIcons[sale.emotion as keyof typeof emotionIcons]?.color || "text-gray-600"

                return (
                  <div key={sale.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">{sale.buyerName}</span>
                          <Badge className={getStatusColor(sale.paymentStatus)}>{sale.paymentStatus}</Badge>
                          <Badge className={getPriorityColor(sale.priority)}>{sale.priority}</Badge>
                          {sale.hasMessage && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700">
                              💬 {sale.messageCount} messages
                            </Badge>
                          )}
                          <div className="flex items-center gap-1">
                            <EmotionIcon className={`w-4 h-4 ${emotionColor}`} />
                            <span className="text-xs capitalize text-gray-600">{sale.emotion}</span>
                          </div>
                          {sale.hasMessage && !sale.creatorResponded && (
                            <Badge variant="destructive" className="text-xs">
                              ⚠️ No Creator Response
                            </Badge>
                          )}
                        </div>

                        {/* Creator Info */}
                        <div className="bg-blue-50 p-3 rounded-lg mb-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Users className="w-4 h-4 text-blue-600" />
                            <span className="font-medium text-blue-900">Creator: {sale.creatorName}</span>
                            <Link href={`/store/${sale.creatorStore}`}>
                              <Badge variant="outline" className="text-blue-700 hover:bg-blue-100">
                                Visit Store
                              </Badge>
                            </Link>
                          </div>
                          <div className="text-sm text-blue-700">
                            📧 {sale.creatorEmail} • 💰 Earning: ${sale.creatorEarning}
                            {sale.responseTime && <span> • ⏱️ Response: {sale.responseTime}</span>}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <p className="font-medium text-gray-900">{sale.productTitle}</p>
                            <p>📦 Product</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{sale.orderId}</p>
                            <p>🔢 Order ID</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{sale.transactionId}</p>
                            <p>💳 Transaction ID</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              ${sale.amount} (Fee: ${sale.platformFee})
                            </p>
                            <p>💰 Amount</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mt-2">
                          <div>
                            <p className="font-medium text-gray-900">{sale.buyerEmail}</p>
                            <p>📧 Buyer Email</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{sale.buyerLocation}</p>
                            <p>🌍 Location</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{sale.paymentMethod}</p>
                            <p>💳 Payment Method</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{formatDate(sale.purchaseDate)}</p>
                            <p>📅 Purchase Date</p>
                          </div>
                        </div>

                        {sale.rating && (
                          <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < sale.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm font-medium">({sale.rating}/5)</span>
                              {sale.reviewDate && (
                                <span className="text-xs text-gray-500">{formatDate(sale.reviewDate)}</span>
                              )}
                            </div>
                            {sale.reviewText && <p className="text-sm text-gray-700">{sale.reviewText}</p>}
                          </div>
                        )}

                        {sale.adminNotes && (
                          <div className="mt-3 p-3 bg-red-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <Shield className="w-4 h-4 text-red-600" />
                              <span className="text-sm font-medium text-red-800">Admin Notes:</span>
                            </div>
                            <p className="text-sm text-red-700">{sale.adminNotes}</p>
                          </div>
                        )}

                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-3">
                          <span>📥 Downloads: {sale.downloadCount}</span>
                          {sale.lastDownload && <span>🕒 Last: {formatDate(sale.lastDownload)}</span>}
                          {sale.lastMessageDate && <span>💬 Last message: {formatDate(sale.lastMessageDate)}</span>}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" onClick={() => setSelectedSale(sale)}>
                              <Mail className="w-4 h-4 mr-2" />
                              Contact
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>Admin Contact - Order {sale.orderId}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <Tabs
                                value={messageRecipient}
                                onValueChange={(v) => setMessageRecipient(v as "buyer" | "creator")}
                              >
                                <TabsList className="grid w-full grid-cols-2">
                                  <TabsTrigger value="buyer">Contact Buyer</TabsTrigger>
                                  <TabsTrigger value="creator">Contact Creator</TabsTrigger>
                                </TabsList>

                                <TabsContent value="buyer" className="space-y-4">
                                  <div className="bg-blue-50 p-4 rounded-lg">
                                    <h4 className="font-medium mb-2">Buyer Information</h4>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                      <div>
                                        <p>
                                          <strong>Name:</strong> {sale.buyerName}
                                        </p>
                                        <p>
                                          <strong>Email:</strong> {sale.buyerEmail}
                                        </p>
                                        <p>
                                          <strong>Location:</strong> {sale.buyerLocation}
                                        </p>
                                      </div>
                                      <div>
                                        <p>
                                          <strong>Order:</strong> {sale.orderId}
                                        </p>
                                        <p>
                                          <strong>Amount:</strong> ${sale.amount}
                                        </p>
                                        <p>
                                          <strong>Downloads:</strong> {sale.downloadCount}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="mt-2 flex items-center gap-2">
                                      <EmotionIcon className={`w-4 h-4 ${emotionColor}`} />
                                      <span className="text-sm capitalize">Customer is feeling: {sale.emotion}</span>
                                    </div>
                                  </div>
                                </TabsContent>

                                <TabsContent value="creator" className="space-y-4">
                                  <div className="bg-green-50 p-4 rounded-lg">
                                    <h4 className="font-medium mb-2">Creator Information</h4>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                      <div>
                                        <p>
                                          <strong>Name:</strong> {sale.creatorName}
                                        </p>
                                        <p>
                                          <strong>Email:</strong> {sale.creatorEmail}
                                        </p>
                                        <p>
                                          <strong>Store:</strong> {sale.creatorStore}
                                        </p>
                                      </div>
                                      <div>
                                        <p>
                                          <strong>Product:</strong> {sale.productTitle}
                                        </p>
                                        <p>
                                          <strong>Earning:</strong> ${sale.creatorEarning}
                                        </p>
                                        <p>
                                          <strong>Response:</strong> {sale.responseTime || "No response"}
                                        </p>
                                      </div>
                                    </div>
                                    {!sale.creatorResponded && sale.hasMessage && (
                                      <div className="mt-2 p-2 bg-red-100 rounded text-red-800 text-sm">
                                        ⚠️ Creator has not responded to customer messages
                                      </div>
                                    )}
                                  </div>
                                </TabsContent>
                              </Tabs>

                              <div>
                                <label className="block text-sm font-medium mb-2">
                                  Admin Message to {messageRecipient === "buyer" ? sale.buyerName : sale.creatorName}:
                                </label>
                                <Textarea
                                  value={messageText}
                                  onChange={(e) => setMessageText(e.target.value)}
                                  placeholder={`Type your admin message here...`}
                                  rows={6}
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                  This message will be sent from SkillCash Admin to{" "}
                                  {messageRecipient === "buyer" ? sale.buyerEmail : sale.creatorEmail}
                                </p>
                              </div>

                              <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setSelectedSale(null)}>
                                  Cancel
                                </Button>
                                <Button onClick={handleSendMessage}>
                                  <Send className="w-4 h-4 mr-2" />
                                  Send Admin Message
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Link href={`/admin/messages`}>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Messages
                          </Button>
                        </Link>

                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}

              {filteredSales.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <DollarSign className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No sales found matching your filters</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
