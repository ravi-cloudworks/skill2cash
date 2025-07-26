"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Users, Eye, Star, Download, Calendar } from "lucide-react"

export default function ProductAnalyticsPage({ params }: { params: { productId: string } }) {
  const [timeRange, setTimeRange] = useState("30d")

  const [analytics] = useState({
    product: {
      title: "Complete Terraform AWS Guide",
      seller: "Ravishankar Palaniappan",
    },
    overview: {
      totalSales: 45,
      totalRevenue: 1347.55,
      totalViews: 892,
      conversionRate: 5.0,
      averageRating: 4.8,
      totalReviews: 23,
    },
    salesTrend: [
      { date: "2024-01-15", sales: 3, revenue: 89.97, views: 45 },
      { date: "2024-01-16", sales: 2, revenue: 59.98, views: 38 },
      { date: "2024-01-17", sales: 5, revenue: 149.95, views: 67 },
      { date: "2024-01-18", sales: 1, revenue: 29.99, views: 23 },
      { date: "2024-01-19", sales: 4, revenue: 119.96, views: 56 },
      { date: "2024-01-20", sales: 6, revenue: 179.94, views: 78 },
      { date: "2024-01-21", sales: 3, revenue: 89.97, views: 41 },
    ],
    topCountries: [
      { country: "India", sales: 15, percentage: 33.3 },
      { country: "United States", sales: 12, percentage: 26.7 },
      { country: "Germany", sales: 6, percentage: 13.3 },
      { country: "United Kingdom", sales: 5, percentage: 11.1 },
      { country: "Canada", sales: 4, percentage: 8.9 },
      { country: "Others", sales: 3, percentage: 6.7 },
    ],
    trafficSources: [
      { source: "Direct", visits: 312, percentage: 35.0 },
      { source: "Google Search", visits: 267, percentage: 29.9 },
      { source: "Social Media", visits: 178, percentage: 20.0 },
      { source: "Referrals", visits: 89, percentage: 10.0 },
      { source: "Email", visits: 46, percentage: 5.1 },
    ],
    revenueByMonth: [
      { month: "Oct 2023", revenue: 0 },
      { month: "Nov 2023", revenue: 0 },
      { month: "Dec 2023", revenue: 0 },
      { month: "Jan 2024", revenue: 1347.55 },
    ],
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href={`/admin/products/${params.productId}`}
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Product
            </Link>
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
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Product Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{analytics.product.title}</h1>
            <p className="text-gray-600">Analytics for product by {analytics.product.seller}</p>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <DollarSign className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{analytics.overview.totalSales}</div>
                  <div className="text-sm text-gray-600">Total Sales</div>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">+12%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <DollarSign className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">${analytics.overview.totalRevenue.toFixed(0)}</div>
                  <div className="text-sm text-gray-600">Revenue</div>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">+18%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <Eye className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{analytics.overview.totalViews}</div>
                  <div className="text-sm text-gray-600">Views</div>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">+22%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <TrendingUp className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{analytics.overview.conversionRate}%</div>
                  <div className="text-sm text-gray-600">Conversion</div>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <TrendingDown className="w-3 h-3 text-red-500" />
                    <span className="text-xs text-red-600">-0.5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <Star className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{analytics.overview.averageRating}</div>
                  <div className="text-sm text-gray-600">Avg Rating</div>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">+0.2</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <Users className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{analytics.overview.totalReviews}</div>
                  <div className="text-sm text-gray-600">Reviews</div>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">+3</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Sales Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Sales Trend (Last 7 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.salesTrend.map((day, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{new Date(day.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">{day.sales} sales</span>
                        <span className="font-medium">${day.revenue}</span>
                        <span className="text-xs text-gray-500">{day.views} views</span>
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
                  {analytics.topCountries.map((country, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{country.country}</span>
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
                  {analytics.trafficSources.map((source, index) => (
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

            {/* Revenue by Month */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.revenueByMonth.map((month, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{month.month}</span>
                      <span className="font-medium">${month.revenue.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
