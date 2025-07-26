"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload, Eye, Save, Trash2, BarChart3, DollarSign, Users, Star } from "lucide-react"

// Mock product data
const mockProduct = {
  id: "terraform-guide",
  title: "Terraform AWS Complete Guide",
  subtitle: "Master AWS infrastructure automation in 30 days with expert guidance",
  description:
    "This comprehensive guide covers everything you need to know about Terraform and AWS infrastructure automation. Perfect for DevOps engineers and cloud architects.",
  price: 29.99,
  comparePrice: 49.99,
  category: "DevOps",
  status: "active",
  tags: ["terraform", "aws", "devops", "infrastructure"],
  files: [
    { name: "terraform-guide.pdf", size: "2.4 MB", type: "PDF" },
    { name: "terraform-scripts.zip", size: "1.8 MB", type: "ZIP" },
  ],
  coverImage: "/placeholder.svg?height=200&width=300&text=Terraform+Guide",
  stats: {
    sales: 156,
    revenue: 4674,
    views: 2340,
    rating: 4.8,
  },
}

export default function EditProductPage({ params }: { params: { productId: string } }) {
  const [product, setProduct] = useState(mockProduct)
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert("Product updated successfully!")
    }, 1000)
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      alert("Product deleted successfully!")
      window.location.href = "/dashboard"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <div className="flex items-center gap-2">
              <Link href={`/dashboard/analytics/${params.productId}`}>
                <Button variant="outline" size="sm">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </Button>
              </Link>
              <Link href={`/store/demo-store`}>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Product Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Revenue</p>
                    <p className="text-xl font-bold">${product.stats.revenue.toLocaleString()}</p>
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
                    <p className="text-sm text-gray-600">Sales</p>
                    <p className="text-xl font-bold">{product.stats.sales}</p>
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
                    <p className="text-sm text-gray-600">Views</p>
                    <p className="text-xl font-bold">{product.stats.views.toLocaleString()}</p>
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
                    <p className="text-sm text-gray-600">Rating</p>
                    <p className="text-xl font-bold">{product.stats.rating}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Edit Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Product Title *</Label>
                    <Input
                      id="title"
                      value={product.title}
                      onChange={(e) => setProduct({ ...product, title: e.target.value })}
                      placeholder="Enter product title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subtitle">Subtitle</Label>
                    <Input
                      id="subtitle"
                      value={product.subtitle}
                      onChange={(e) => setProduct({ ...product, subtitle: e.target.value })}
                      placeholder="Brief description"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={product.description}
                      onChange={(e) => setProduct({ ...product, description: e.target.value })}
                      placeholder="Detailed product description"
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={product.category}
                        onValueChange={(value) => setProduct({ ...product, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="DevOps">DevOps</SelectItem>
                          <SelectItem value="Programming">Programming</SelectItem>
                          <SelectItem value="Design">Design</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Business">Business</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={product.status}
                        onValueChange={(value) => setProduct({ ...product, status: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing */}
              <Card>
                <CardHeader>
                  <CardTitle>Pricing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (USD) *</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={product.price}
                        onChange={(e) => setProduct({ ...product, price: Number.parseFloat(e.target.value) })}
                        placeholder="29.99"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="comparePrice">Compare Price (Optional)</Label>
                      <Input
                        id="comparePrice"
                        type="number"
                        step="0.01"
                        value={product.comparePrice}
                        onChange={(e) => setProduct({ ...product, comparePrice: Number.parseFloat(e.target.value) })}
                        placeholder="49.99"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                    <p className="text-sm text-blue-800">
                      <strong>INR Price:</strong> ₹{(product.price * 83).toFixed(0)}
                      (Auto-converted for Indian customers)
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Files */}
              <Card>
                <CardHeader>
                  <CardTitle>Product Files</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {product.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-100 rounded">
                            <Upload className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-sm text-gray-600">
                              {file.size} • {file.type}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full bg-transparent">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload New File
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Cover Image */}
              <Card>
                <CardHeader>
                  <CardTitle>Cover Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={product.coverImage || "/placeholder.svg"}
                        alt="Product cover"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Upload className="w-4 h-4 mr-2" />
                      Change Image
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Input placeholder="Add new tag..." />
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button onClick={handleSave} className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Saving...
                      </div>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>

                  <Button variant="destructive" onClick={handleDelete} className="w-full">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Product
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
