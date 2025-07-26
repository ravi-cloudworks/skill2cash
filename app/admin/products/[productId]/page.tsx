"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  CheckCircle,
  X,
  Flag,
  MessageSquare,
  Download,
  Star,
  DollarSign,
  Calendar,
  User,
} from "lucide-react"

export default function ProductDetailPage({ params }: { params: { productId: string } }) {
  const [product] = useState({
    id: Number.parseInt(params.productId),
    title: "Complete Terraform AWS Guide",
    seller: "Ravishankar Palaniappan",
    sellerEmail: "ravi@skillcash.com",
    category: "DevOps",
    price: 29.99,
    comparePrice: 49.99,
    sales: 45,
    rating: 4.8,
    reviews: 23,
    status: "approved",
    created: "2024-01-15",
    lastUpdated: "2024-01-20",
    description:
      "This comprehensive guide covers everything you need to know about Terraform and AWS infrastructure automation. Perfect for DevOps engineers and cloud architects looking to master infrastructure as code.",
    thumbnail: "/placeholder.svg?height=300&width=400&text=Terraform+Guide",
    files: [
      { name: "terraform-complete-guide.pdf", size: "15.2 MB", downloads: 45 },
      { name: "terraform-scripts.zip", size: "3.8 MB", downloads: 45 },
      { name: "bonus-templates.zip", size: "2.1 MB", downloads: 45 },
    ],
    tags: ["terraform", "aws", "devops", "infrastructure", "cloud"],
    whatsIncluded: [
      "150-page comprehensive PDF guide",
      "50+ production-ready Terraform scripts",
      "Video walkthrough (3 hours)",
      "30-day email support",
      "Bonus: AWS cost optimization templates",
    ],
    recentSales: [
      { customer: "john.doe@email.com", amount: 29.99, date: "2 hours ago", country: "USA" },
      { customer: "priya.s@email.com", amount: 29.99, date: "1 day ago", country: "India" },
      { customer: "thomas.k@email.com", amount: 29.99, date: "2 days ago", country: "Germany" },
    ],
    recentReviews: [
      {
        customer: "John D.",
        rating: 5,
        comment: "Excellent guide! Very comprehensive and practical. The Terraform scripts saved me weeks of work.",
        date: "2 days ago",
      },
      {
        customer: "Priya S.",
        rating: 5,
        comment: "Best Terraform resource I've found. Worth every penny. Clear explanations and great examples.",
        date: "5 days ago",
      },
      {
        customer: "Mike R.",
        rating: 4,
        comment: "Great content, could use more advanced examples but overall very helpful.",
        date: "1 week ago",
      },
    ],
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "default"
      case "pending":
        return "secondary"
      case "flagged":
        return "destructive"
      case "rejected":
        return "outline"
      default:
        return "secondary"
    }
  }

  const handleAction = (action: string) => {
    switch (action) {
      case "approve":
        if (confirm(`Approve "${product.title}"?`)) {
          alert(`"${product.title}" has been approved`)
        }
        break
      case "reject":
        if (confirm(`Reject "${product.title}"?`)) {
          alert(`"${product.title}" has been rejected`)
        }
        break
      case "flag":
        if (confirm(`Flag "${product.title}" for review?`)) {
          alert(`"${product.title}" has been flagged`)
        }
        break
      case "contact":
        alert(`Opening message dialog for seller: ${product.sellerEmail}`)
        break
      default:
        break
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => handleAction("contact")}>
                <MessageSquare className="w-4 h-4 mr-2" />
                Contact Seller
              </Button>
              {product.status === "pending" && (
                <>
                  <Button size="sm" onClick={() => handleAction("approve")}>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleAction("reject")}>
                    <X className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                </>
              )}
              <Button
                variant="outline"
                size="sm"
                className="text-orange-600 bg-transparent"
                onClick={() => handleAction("flag")}
              >
                <Flag className="w-4 h-4 mr-2" />
                Flag Product
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Product Header */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-start gap-6">
                <img
                  src={product.thumbnail || "/placeholder.svg"}
                  alt={product.title}
                  className="w-48 h-32 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold">{product.title}</h1>
                    <Badge variant={getStatusColor(product.status)}>{product.status}</Badge>
                    <Badge variant="outline">{product.category}</Badge>
                  </div>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span>{product.seller}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <span>${product.price}</span>
                      {product.comparePrice && (
                        <span className="text-gray-500 line-through">${product.comparePrice}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-gray-400" />
                      <span>
                        {product.rating} ({product.recentReviews.length} reviews)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>Created {new Date(product.created).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <DollarSign className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{product.sales}</div>
                  <div className="text-sm text-gray-600">Total Sales</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <DollarSign className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">${(product.sales * product.price).toFixed(0)}</div>
                  <div className="text-sm text-gray-600">Revenue</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <Star className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{product.rating}</div>
                  <div className="text-sm text-gray-600">Avg Rating</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <Download className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{product.files.reduce((sum, f) => sum + f.downloads, 0)}</div>
                  <div className="text-sm text-gray-600">Downloads</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Information */}
          <Tabs defaultValue="details" className="space-y-6">
            <TabsList>
              <TabsTrigger value="details">Product Details</TabsTrigger>
              <TabsTrigger value="sales">Sales History</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>What's Included</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {product.whatsIncluded.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="sales">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {product.recentSales.map((sale, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{sale.customer}</div>
                          <div className="text-sm text-gray-500">
                            {sale.country} • {sale.date}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600">${sale.amount}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Reviews ({product.recentReviews.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {product.recentReviews.map((review, index) => (
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
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-sm text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="files">
              <Card>
                <CardHeader>
                  <CardTitle>Product Files</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {product.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Download className="w-5 h-5 text-gray-400" />
                          <div>
                            <div className="font-medium">{file.name}</div>
                            <div className="text-sm text-gray-500">
                              {file.size} • {file.downloads} downloads
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
