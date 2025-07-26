"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Edit, TrendingUp, TrendingDown, DollarSign, Users, Eye, Star, Globe, Calendar } from "lucide-react"

// Mock analytics data
const mockAnalytics = {
  product: {
    id: "terraform-guide",
    title: "Terraform AWS Complete Guide",
    status: "active",
    category: "DevOps",
  },
  overview: {
    totalSales: 156,
    totalRevenue: 4674,
    totalViews: 2340,
    averageRating: 4.8,
    conversionRate: 6.7,
  },
  salesTrend: [
    { date: "2024-01-01", sales: 12, revenue: 359.88 },
    { date: "2024-01-02", sales: 8, revenue: 239.92 },
    { date: "2024-01-03", sales: 15, revenue: 449.85 },
    { date: "2024-01-04", sales: 10, revenue: 299.9 },
    { date: "2024-01-05", sales: 18, revenue: 539.82 },
    { date: "2024-01-06", sales: 14, revenue: 419.86 },
    { date: "2024-01-07", sales: 20, revenue: 599.8 },
  ],
  topCountries: [
    { country: "India", sales: 45, percentage: 28.8 },
    { country: "United States", sales: 32, percentage: 20.5 },
    { country: "United Kingdom", sales: 18, percentage: 11.5 },
    { country: "Germany", sales: 15, percentage: 9.6 },
    { country: "Canada", sales: 12, percentage: 7.7 },
  ],
  trafficSources: [
    { source: "Direct", visits: 890, percentage: 38.0 },
    { source: "Google Search", visits: 650, percentage: 27.8 },
    { source: "Social Media", visits: 420, percentage: 17.9 },
    { source: "Referrals", visits: 280, percentage: 12.0 },
    { source: "Email", visits: 100, percentage: 4.3 },
  ],
  recentActivity: [
    { type: "sale", customer: "Priya S.", amount: 29.99, time: "2 hours ago", country: "India" },
    { type: "review", customer: "John D.", rating: 5, time: "4 hours ago", country: "USA" },
    { type: "sale", customer: "Ahmed K.", amount: 29.99, time: "6 hours ago", country: "UAE" },
    { type: "sale", customer: "Sarah M.", amount: 29.99, time: "8 hours ago", country: "UK" },
    { type: "review", customer: "Raj P.", rating: 4, time: "12 hours ago", country: "India" },
  ],
  reviews: [
    {
      customer: "Priya Sharma",
      rating: 5,
      comment: "Excellent guide! Very comprehensive and easy to follow.",
      time: "1 day ago",
    },
    {
      customer: "John Davis",
      rating: 5,
      comment: "Perfect for beginners. The examples are very practical.",
      time: "2 days ago",
    },
    {
      customer: "Ahmed Khan",
      rating: 4,
      comment: "Good content, but could use more advanced examples.",
      time: "3 days ago",
    },
    {
      customer: "Sarah Miller",
      rating: 5,
      comment: "Exactly what I needed to learn Terraform. Highly recommended!",
      time: "4 days ago",
    },
  ],
}

export default function ProductAnalyticsPage({ params }: { params: { productId: string } }) {
  const [timeRange, setTimeRange] = useState("7d")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>
              <div>
                <h1 className="text-xl font-semibold">{mockAnalytics.product.title}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary">{mockAnalytics.product.category}</Badge>
                  <Badge variant={mockAnalytics.product.status === "active" ? "default" : "secondary"}>
                    {mockAnalytics.product.status}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
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
              <Link href={`/dashboard/products/edit/${params.productId}`}>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Product
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-xl font-bold">${mockAnalytics.overview.totalRevenue.toLocaleString()}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-green-600">+12.5%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Sales</p>
                    <p className="text-xl font-bold">{mockAnalytics.overview.totalSales}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-green-600">+8.3%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Eye className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Views</p>
                    <p className="text-xl font-bold">{mockAnalytics.overview.totalViews.toLocaleString()}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-green-600">+15.2%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Star className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Avg Rating</p>
                    <p className="text-xl font-bold">{mockAnalytics.overview.averageRating}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-green-600">+0.2</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Conversion</p>
                    <p className="text-xl font-bold">{mockAnalytics.overview.conversionRate}%</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingDown className="w-3 h-3 text-red-500" />
                      <span className="text-xs text-red-600">-1.2%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Sales Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Sales Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAnalytics.salesTrend.map((day, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{new Date(day.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">{day.sales} sales</span>
                        <span className="font-medium">${day.revenue}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Countries */}
            <Card>
              <CardHeader>
                <CardTitle>Sales by Country</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAnalytics.topCountries.map((country, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Globe className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{country.country}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">{country.sales} sales</span>
                        <span className="font-medium">{country.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Traffic Sources */}
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAnalytics.trafficSources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{source.source}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">{source.visits} visits</span>
                        <span className="font-medium">{source.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAnalytics.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {activity.type === "sale" ? (
                          <DollarSign className="w-4 h-4 text-green-500" />
                        ) : (
                          <Star className="w-4 h-4 text-yellow-500" />
                        )}
                        <div>
                          <p className="text-sm font-medium">{activity.customer}</p>
                          <p className="text-xs text-gray-500">{activity.country}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {activity.type === "sale" ? (
                          <p className="text-sm font-medium">${activity.amount}</p>
                        ) : (
                          <p className="text-sm font-medium">{activity.rating}⭐</p>
                        )}
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customer Reviews */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnalytics.reviews.map((review, index) => (
                  <div key={index} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{review.customer}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.time}</span>
                    </div>
                    <p className="text-sm text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
