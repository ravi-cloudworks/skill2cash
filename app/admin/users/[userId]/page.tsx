"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Shield,
  MessageSquare,
  UserX,
  CheckCircle,
  Package,
  DollarSign,
  Star,
  Calendar,
  MapPin,
  Mail,
  Phone,
} from "lucide-react"

export default function UserDetailPage({ params }: { params: { userId: string } }) {
  const [user] = useState({
    id: Number.parseInt(params.userId),
    name: "Ravishankar Palaniappan",
    email: "ravi@skillcash.com",
    phone: "+91 98765 43210",
    role: "Creator",
    status: "active",
    joinDate: "2024-01-10",
    lastActive: "2 hours ago",
    avatar: "/placeholder.svg?height=120&width=120&text=RP",
    location: "Chennai, India",
    verified: true,
    bio: "Full-stack developer with 8+ years of experience in cloud technologies and DevOps. Passionate about teaching and sharing knowledge.",
    stats: {
      products: 3,
      revenue: 1247.5,
      totalSales: 42,
      avgRating: 4.8,
      followers: 156,
    },
    products: [
      {
        id: 1,
        title: "Complete Terraform AWS Guide",
        price: 29.99,
        sales: 23,
        rating: 4.8,
        status: "active",
        created: "2024-01-15",
      },
      {
        id: 2,
        title: "Docker Production Mastery",
        price: 49.99,
        sales: 12,
        rating: 4.9,
        status: "active",
        created: "2024-01-20",
      },
      {
        id: 3,
        title: "Kubernetes Deployment Kit",
        price: 39.99,
        sales: 7,
        rating: 5.0,
        status: "draft",
        created: "2024-01-25",
      },
    ],
    recentActivity: [
      { type: "product_created", description: "Created new product: Kubernetes Deployment Kit", time: "2 days ago" },
      { type: "sale", description: "Sold Terraform AWS Guide to john.doe@email.com", time: "3 days ago" },
      { type: "review_received", description: "Received 5-star review on Docker course", time: "5 days ago" },
      { type: "product_updated", description: "Updated Terraform AWS Guide", time: "1 week ago" },
    ],
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "pending":
        return "secondary"
      case "suspended":
        return "destructive"
      case "draft":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/admin/users"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Users
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Message
              </Button>
              {user.status !== "suspended" && (
                <Button variant="outline" size="sm" className="text-orange-600 bg-transparent">
                  <UserX className="w-4 h-4 mr-2" />
                  Suspend User
                </Button>
              )}
              {!user.verified && (
                <Button size="sm">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Verify User
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* User Profile Header */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-start gap-6">
                <img
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    {user.verified && <Shield className="w-5 h-5 text-blue-500" />}
                    <Badge variant={getStatusColor(user.status)}>{user.status}</Badge>
                    <Badge variant="outline">{user.role}</Badge>
                  </div>
                  <p className="text-gray-600 mb-4">{user.bio}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{user.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{user.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <Package className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{user.stats.products}</div>
                  <div className="text-sm text-gray-600">Products</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <DollarSign className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">${user.stats.revenue}</div>
                  <div className="text-sm text-gray-600">Revenue</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <Package className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{user.stats.totalSales}</div>
                  <div className="text-sm text-gray-600">Total Sales</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <Star className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{user.stats.avgRating}</div>
                  <div className="text-sm text-gray-600">Avg Rating</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <Shield className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{user.stats.followers}</div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Information */}
          <Tabs defaultValue="products" className="space-y-6">
            <TabsList>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="products">
              <Card>
                <CardHeader>
                  <CardTitle>User Products ({user.products.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {user.products.map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-medium">{product.title}</span>
                            <Badge variant={getStatusColor(product.status)}>{product.status}</Badge>
                          </div>
                          <div className="text-sm text-gray-600">
                            ${product.price} • {product.sales} sales • {product.rating}⭐
                          </div>
                          <div className="text-xs text-gray-500">
                            Created {new Date(product.created).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            View Product
                          </Button>
                          <Button variant="outline" size="sm">
                            Analytics
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {user.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm">{activity.description}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Conversion Rate</span>
                        <span className="font-medium">6.8%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Average Order Value</span>
                        <span className="font-medium">${(user.stats.revenue / user.stats.totalSales).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Customer Satisfaction</span>
                        <span className="font-medium">{user.stats.avgRating}/5.0</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Response Time</span>
                        <span className="font-medium">2.3 hours</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
