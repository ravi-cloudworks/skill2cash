"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Search,
  MoreHorizontal,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Package,
} from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

// Mock data for products
const mockProducts = [
  {
    id: "prod-001",
    title: "Complete DevOps Mastery Course",
    creator: "John Smith",
    creatorId: "user-001",
    category: "DevOps",
    price: 89.99,
    status: "approved",
    sales: 156,
    revenue: 14039.44,
    rating: 4.8,
    reviews: 42,
    createdAt: "2024-01-15",
    lastUpdated: "2024-01-20",
    flags: 0,
  },
  {
    id: "prod-002",
    title: "React Advanced Patterns",
    creator: "Sarah Johnson",
    creatorId: "user-002",
    category: "Frontend",
    price: 59.99,
    status: "pending",
    sales: 0,
    revenue: 0,
    rating: 0,
    reviews: 0,
    createdAt: "2024-01-22",
    lastUpdated: "2024-01-22",
    flags: 1,
  },
  {
    id: "prod-003",
    title: "Python Data Science Bootcamp",
    creator: "Mike Chen",
    creatorId: "user-003",
    category: "Data Science",
    price: 129.99,
    status: "rejected",
    sales: 0,
    revenue: 0,
    rating: 0,
    reviews: 0,
    createdAt: "2024-01-18",
    lastUpdated: "2024-01-19",
    flags: 3,
  },
  {
    id: "prod-004",
    title: "AWS Cloud Architecture Guide",
    creator: "Lisa Wang",
    creatorId: "user-004",
    category: "Cloud",
    price: 79.99,
    status: "approved",
    sales: 89,
    revenue: 7119.11,
    rating: 4.6,
    reviews: 28,
    createdAt: "2024-01-10",
    lastUpdated: "2024-01-21",
    flags: 0,
  },
  {
    id: "prod-005",
    title: "Kubernetes Production Deployment",
    creator: "David Kumar",
    creatorId: "user-005",
    category: "DevOps",
    price: 99.99,
    status: "flagged",
    sales: 23,
    revenue: 2299.77,
    rating: 4.2,
    reviews: 8,
    createdAt: "2024-01-12",
    lastUpdated: "2024-01-23",
    flags: 2,
  },
]

export default function AdminProductsPage() {
  const [products, setProducts] = useState(mockProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.creator.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || product.status === statusFilter
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  const handleStatusChange = (productId: string, newStatus: string) => {
    setProducts(products.map((product) => (product.id === productId ? { ...product, status: newStatus } : product)))
  }

  const handleViewProduct = (productId: string) => {
    // Navigate to same page instead of opening new tab
    window.location.href = `/admin/products/${productId}`
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      case "flagged":
        return <Badge className="bg-orange-100 text-orange-800">Flagged</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const stats = {
    total: products.length,
    approved: products.filter((p) => p.status === "approved").length,
    pending: products.filter((p) => p.status === "pending").length,
    flagged: products.filter((p) => p.status === "flagged").length,
    totalRevenue: products.reduce((sum, p) => sum + p.revenue, 0),
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header subtitle="Product Management" userType="admin" currentPage="products" />

      <div className="flex-1 container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
            <p className="text-gray-600 mt-1">Review and manage all products on the platform</p>
          </div>
          <Link href="/admin">
            <Button variant="outline">← Back to Dashboard</Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Flagged</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.flagged}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search products or creators..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="DevOps">DevOps</SelectItem>
                  <SelectItem value="Frontend">Frontend</SelectItem>
                  <SelectItem value="Backend">Backend</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                  <SelectItem value="Cloud">Cloud</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>Products ({filteredProducts.length})</CardTitle>
            <CardDescription>Manage product approvals, view details, and monitor performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Creator</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sales</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Flags</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{product.title}</div>
                          <div className="text-sm text-gray-500">ID: {product.id}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Link href={`/admin/users/${product.creatorId}`} className="text-blue-600 hover:underline">
                          {product.creator}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.category}</Badge>
                      </TableCell>
                      <TableCell>${product.price}</TableCell>
                      <TableCell>{getStatusBadge(product.status)}</TableCell>
                      <TableCell>{product.sales}</TableCell>
                      <TableCell>${product.revenue.toLocaleString()}</TableCell>
                      <TableCell>
                        {product.rating > 0 ? (
                          <div className="flex items-center gap-1">
                            <span>{product.rating}</span>
                            <span className="text-sm text-gray-500">({product.reviews})</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">No ratings</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {product.flags > 0 ? (
                          <Badge variant="destructive">{product.flags}</Badge>
                        ) : (
                          <span className="text-gray-400">0</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewProduct(product.id)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => (window.location.href = `/admin/products/${product.id}/analytics`)}
                            >
                              <TrendingUp className="mr-2 h-4 w-4" />
                              View Analytics
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(product.id, "approved")}
                              className="text-green-600"
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(product.id, "rejected")}
                              className="text-red-600"
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Reject
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(product.id, "flagged")}
                              className="text-orange-600"
                            >
                              <AlertTriangle className="mr-2 h-4 w-4" />
                              Flag for Review
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
