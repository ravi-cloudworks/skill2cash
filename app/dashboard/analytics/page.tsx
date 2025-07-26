"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, TrendingUp, DollarSign, Package, Download, Eye } from "lucide-react"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")

  const analyticsData = {
    overview: {
      totalRevenue: 1527,
      totalSales: 43,
      totalViews: 701,
      conversionRate: 6.1,
    },
    revenueByMonth: [
      { month: "Jan", revenue: 450 },
      { month: "Feb", revenue: 680 },
      { month: "Mar", revenue: 920 },
      { month: "Apr", revenue: 1200 },
      { month: "May", revenue: 1527 },
    ],
    topProducts: [
      { name: "Terraform AWS Guide", sales: 23, revenue: 667, views: 342 },
      { name: "Kubernetes Kit", sales: 12, revenue: 468, views: 203 },
      { name: "Docker Course", sales: 8, revenue: 392, views: 156 },
    ],
    trafficSources: [
      { source: "Direct", visits: 245, percentage: 35 },
      { source: "Social Media", visits: 189, percentage: 27 },
      { source: "Search", visits: 154, percentage: 22 },
      { source: "Referral", visits: 113, percentage: 16 },
    ],
    customerLocations: [
      { country: "United States", sales: 18, percentage: 42 },
      { country: "India", sales: 8, percentage: 19 },
      { country: "Germany", sales: 6, percentage: 14 },
      { country: "Canada", sales: 5, percentage: 12 },
      { country: "Others", sales: 6, percentage: 13 },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </Link>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span className="text-xl font-bold">Analytics</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <div className="flex gap-1">
                {["7d", "30d", "90d", "1y"].map((range) => (
                  <Button
                    key={range}
                    variant={timeRange === range ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeRange(range)}
                  >
                    {range}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${analyticsData.overview.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="w-3 h-3 inline mr-1" />
                +23% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.overview.totalSales}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Store Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.overview.totalViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.overview.conversionRate}%</div>
              <p className="text-xs text-muted-foreground">+0.8% from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.revenueByMonth.map((month, index) => (
                  <div key={month.month} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{month.month}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(month.revenue / 1600) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold">${month.revenue}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline">#{index + 1}</Badge>
                        <span className="font-medium text-sm">{product.name}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {product.sales} sales • {product.views} views
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">${product.revenue}</div>
                      <div className="text-xs text-gray-500">
                        {((product.sales / product.views) * 100).toFixed(1)}% conv.
                      </div>
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
                {analyticsData.trafficSources.map((source) => (
                  <div key={source.source} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{source.source}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${source.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">{source.visits}</span>
                      <span className="text-xs text-gray-500">({source.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Customer Locations */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.customerLocations.map((location) => (
                  <div key={location.country} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{location.country}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${location.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">{location.sales}</span>
                      <span className="text-xs text-gray-500">({location.percentage}%)</span>
                    </div>
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
