"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Users,
  Package,
  DollarSign,
  TrendingUp,
  Search,
  Eye,
  Ban,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Settings,
  Shield,
  Megaphone,
} from "lucide-react"

export default function AdminDashboard() {
  const [stats] = useState({
    totalUsers: 2847,
    totalProducts: 1234,
    totalRevenue: 47000,
    monthlyGrowth: 23.5,
  })

  const [recentUsers] = useState([
    { id: 1, name: "Ravi Kumar", email: "ravi@email.com", role: "DevOps", joined: "2 days ago", status: "active" },
    { id: 2, name: "Priya Singh", email: "priya@email.com", role: "Frontend", joined: "1 week ago", status: "active" },
    { id: 3, name: "Amit Sharma", email: "amit@email.com", role: "Backend", joined: "3 days ago", status: "pending" },
    { id: 4, name: "Sarah Johnson", email: "sarah@email.com", role: "Cloud", joined: "5 days ago", status: "active" },
  ])

  const [recentProducts] = useState([
    { id: 1, title: "Terraform AWS Guide", seller: "Ravi Kumar", price: 29.99, sales: 45, status: "approved" },
    { id: 2, title: "React Hooks Mastery", seller: "Priya Singh", price: 39.99, sales: 23, status: "approved" },
    { id: 3, title: "Node.js Security", seller: "Amit Sharma", price: 49.99, sales: 0, status: "pending" },
    { id: 4, title: "AWS Lambda Guide", seller: "Sarah Johnson", price: 34.99, sales: 12, status: "approved" },
  ])

  const [flaggedContent] = useState([
    { id: 1, type: "Product", title: "Hacking Tutorial", reason: "Inappropriate content", severity: "high" },
    { id: 2, type: "User", title: "Spam Account", reason: "Multiple fake reviews", severity: "medium" },
    { id: 3, type: "Product", title: "Copied Content", reason: "Copyright violation", severity: "high" },
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold">SkillCash Admin</span>
              </Link>
              <nav className="hidden md:flex items-center space-x-6">
                <Link href="/admin" className="text-red-600 font-medium">
                  Dashboard
                </Link>
                <Link href="/admin/users" className="text-gray-600 hover:text-gray-900">
                  Users
                </Link>
                <Link href="/admin/products" className="text-gray-600 hover:text-gray-900">
                  Products
                </Link>
                <Link href="/admin/reports" className="text-gray-600 hover:text-gray-900">
                  Reports
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard 🛡️</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800">
              <strong>Admin Demo:</strong> This is the admin panel for managing users, products, and platform
              operations.
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Platform Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Monthly total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{stats.monthlyGrowth}%</div>
              <p className="text-xs text-muted-foreground">Month over month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Users */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Users
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-gray-400" />
                  <Input placeholder="Search users..." className="w-40" />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{user.name}</span>
                        <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {user.email} • {user.role} • {user.joined}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Ban className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Products */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{product.title}</span>
                        <Badge variant={product.status === "approved" ? "default" : "secondary"}>
                          {product.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        by {product.seller} • ${product.price} • {product.sales} sales
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      {product.status === "pending" && (
                        <>
                          <Button variant="ghost" size="sm">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Ban className="w-4 h-4 text-red-600" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Flagged Content */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              Flagged Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {flaggedContent.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg bg-orange-50">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline">{item.type}</Badge>
                      <span className="font-medium">{item.title}</span>
                      <Badge variant={item.severity === "high" ? "destructive" : "secondary"}>{item.severity}</Badge>
                    </div>
                    <div className="text-sm text-gray-600">Reason: {item.reason}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Review
                    </Button>
                    <Button variant="destructive" size="sm">
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Link href="/admin/users">
                <Button
                  variant="outline"
                  className="flex flex-col items-center gap-2 h-auto py-4 bg-transparent w-full"
                >
                  <Users className="w-5 h-5" />
                  <span className="text-xs">Manage Users</span>
                </Button>
              </Link>
              <Link href="/admin/products">
                <Button
                  variant="outline"
                  className="flex flex-col items-center gap-2 h-auto py-4 bg-transparent w-full"
                >
                  <Package className="w-5 h-5" />
                  <span className="text-xs">Review Products</span>
                </Button>
              </Link>
              <Link href="/admin/sales">
                <Button
                  variant="outline"
                  className="flex flex-col items-center gap-2 h-auto py-4 bg-transparent w-full"
                >
                  <DollarSign className="w-5 h-5" />
                  <span className="text-xs">Sales Management</span>
                </Button>
              </Link>
              <Link href="/admin/reports">
                <Button
                  variant="outline"
                  className="flex flex-col items-center gap-2 h-auto py-4 bg-transparent w-full"
                >
                  <BarChart3 className="w-5 h-5" />
                  <span className="text-xs">Analytics</span>
                </Button>
              </Link>
              <Link href="/admin/reports">
                <Button
                  variant="outline"
                  className="flex flex-col items-center gap-2 h-auto py-4 bg-transparent w-full"
                >
                  <AlertTriangle className="w-5 h-5" />
                  <span className="text-xs">Reports</span>
                </Button>
              </Link>
              <Link href="/admin/banners">
                <Button
                  variant="outline"
                  className="flex flex-col items-center gap-2 h-auto py-4 bg-transparent w-full"
                >
                  <Megaphone className="w-5 h-5" />
                  <span className="text-xs">Banner Management</span>
                </Button>
              </Link>
              <Link href="/admin/settings">
                <Button
                  variant="outline"
                  className="flex flex-col items-center gap-2 h-auto py-4 bg-transparent w-full"
                >
                  <Settings className="w-5 h-5" />
                  <span className="text-xs">Settings</span>
                </Button>
              </Link>
              <Link href="/admin/security">
                <Button
                  variant="outline"
                  className="flex flex-col items-center gap-2 h-auto py-4 bg-transparent w-full"
                >
                  <Shield className="w-5 h-5" />
                  <span className="text-xs">Security</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
