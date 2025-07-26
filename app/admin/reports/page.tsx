"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { TrendingUp, DollarSign, Users, Package, Download, Calendar, BarChart3, PieChart, Activity } from "lucide-react"

export default function AdminReportsPage() {
  const [timeRange, setTimeRange] = useState("30d")

  const [reports] = useState({
    overview: {
      totalRevenue: 45678.9,
      totalUsers: 1234,
      totalProducts: 89,
      totalSales: 567,
      revenueGrowth: 12.5,
      userGrowth: 8.3,
      productGrowth: 15.2,
      salesGrowth: 9.7,
    },
    revenueByMonth: [
      { month: "Oct 2023", revenue: 12450.3, sales: 145 },
      { month: "Nov 2023", revenue: 15678.45, sales: 178 },
      { month: "Dec 2023", revenue: 18234.67, sales: 201 },
      { month: "Jan 2024", revenue: 22890.12, sales: 234 },
    ],
    topCategories: [
      { category: "DevOps", products: 23, sales: 156, revenue: 8945.67 },
      { category: "Frontend", products: 18, sales: 134, revenue: 7234.89 },
      { category: "Backend", products: 15, sales: 98, revenue: 5678.34 },
      { category: "Data Science", products: 12, sales: 87, revenue: 4567.23 },
      { category: "Cloud", products: 10, sales: 76, revenue: 3456.78 },
    ],
    topSellers: [
      { name: "Ravishankar Palaniappan", products: 3, sales: 45, revenue: 1347.55 },
      { name: "Priya Singh", products: 5, sales: 67, revenue: 2678.9 },
      { name: "Amit Sharma", products: 2, sales: 23, revenue: 1149.77 },
      { name: "Sarah Johnson", products: 4, sales: 34, revenue: 1189.66 },
      { name: "Lisa Chen", products: 6, sales: 89, revenue: 5339.44 },
    ],
    userActivity: [
      { date: "2024-01-15", newUsers: 23, activeUsers: 456, purchases: 12 },
      { date: "2024-01-16", newUsers: 18, activeUsers: 478, purchases: 15 },
      { date: "2024-01-17", newUsers: 31, activeUsers: 502, purchases: 18 },
      { date: "2024-01-18", newUsers: 25, activeUsers: 489, purchases: 14 },
      { date: "2024-01-19", newUsers: 29, activeUsers: 523, purchases: 21 },
      { date: "2024-01-20", newUsers: 34, activeUsers: 545, purchases: 19 },
      { date: "2024-01-21", newUsers: 27, activeUsers: 534, purchases: 16 },
    ],
    contentReports: [
      { type: "Copyright Violation", count: 3, status: "pending" },
      { type: "Inappropriate Content", count: 1, status: "resolved" },
      { type: "Spam", count: 2, status: "pending" },
      { type: "Quality Issues", count: 5, status: "investigating" },
    ],
  })

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header subtitle="Analytics & Reports" userType="admin" currentPage="reports" />

      <div className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Platform Reports</h1>
              <p className="text-gray-600 mt-2">Comprehensive analytics and insights for the SkillCash platform</p>
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
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Reports
              </Button>
            </div>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold">${reports.overview.totalRevenue.toLocaleString()}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-green-600">+{reports.overview.revenueGrowth}%</span>
                    </div>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold">{reports.overview.totalUsers.toLocaleString()}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-green-600">+{reports.overview.userGrowth}%</span>
                    </div>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Products</p>
                    <p className="text-2xl font-bold">{reports.overview.totalProducts}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-green-600">+{reports.overview.productGrowth}%</span>
                    </div>
                  </div>
                  <Package className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Sales</p>
                    <p className="text-2xl font-bold">{reports.overview.totalSales}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-green-600">+{reports.overview.salesGrowth}%</span>
                    </div>
                  </div>
                  <BarChart3 className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Reports */}
          <Tabs defaultValue="revenue" className="space-y-6">
            <TabsList>
              <TabsTrigger value="revenue">Revenue Analytics</TabsTrigger>
              <TabsTrigger value="users">User Analytics</TabsTrigger>
              <TabsTrigger value="products">Product Performance</TabsTrigger>
              <TabsTrigger value="content">Content Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="revenue">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Revenue Trend
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {reports.revenueByMonth.map((month, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">{month.month}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600">{month.sales} sales</span>
                            <span className="font-medium">${month.revenue.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="w-5 h-5" />
                      Top Categories
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {reports.topCategories.map((category, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{category.category}</div>
                            <div className="text-sm text-gray-500">{category.products} products</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">${category.revenue.toLocaleString()}</div>
                            <div className="text-sm text-gray-500">{category.sales} sales</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="users">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      User Activity (Last 7 Days)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {reports.userActivity.map((day, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">{new Date(day.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-green-600">{day.newUsers} new</span>
                            <span className="text-blue-600">{day.activeUsers} active</span>
                            <span className="text-purple-600">{day.purchases} purchases</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Top Sellers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {reports.topSellers.map((seller, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{seller.name}</div>
                            <div className="text-sm text-gray-500">{seller.products} products</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">${seller.revenue.toLocaleString()}</div>
                            <div className="text-sm text-gray-500">{seller.sales} sales</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="products">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Product Performance by Category
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {reports.topCategories.map((category, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold">{category.category}</h3>
                          <div className="text-right">
                            <div className="font-bold text-green-600">${category.revenue.toLocaleString()}</div>
                            <div className="text-sm text-gray-500">Revenue</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="font-medium">{category.products}</div>
                            <div className="text-gray-500">Products</div>
                          </div>
                          <div>
                            <div className="font-medium">{category.sales}</div>
                            <div className="text-gray-500">Sales</div>
                          </div>
                          <div>
                            <div className="font-medium">${(category.revenue / category.sales).toFixed(2)}</div>
                            <div className="text-gray-500">Avg Order</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">Content Moderation Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reports.contentReports.map((report, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-medium">{report.type}</div>
                          <div className="text-sm text-gray-500">{report.count} reports</div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              report.status === "resolved"
                                ? "bg-green-100 text-green-800"
                                : report.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {report.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  )
}
