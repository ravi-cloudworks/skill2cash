"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import {
  Users,
  Search,
  Eye,
  MessageSquare,
  Shield,
  Download,
  Plus,
  MoreHorizontal,
  DollarSign,
  Package,
  Calendar,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")

  const [users] = useState([
    {
      id: 1,
      name: "Ravishankar Palaniappan",
      email: "ravi@skillcash.com",
      role: "Creator",
      status: "active",
      joinDate: "2024-01-10",
      lastActive: "2 hours ago",
      products: 3,
      revenue: 1247.5,
      avatar: "/placeholder.svg?height=40&width=40&text=RP",
      location: "Chennai, India",
      verified: true,
    },
    {
      id: 2,
      name: "Priya Singh",
      email: "priya.singh@email.com",
      role: "Creator",
      status: "active",
      joinDate: "2024-01-08",
      lastActive: "1 day ago",
      products: 5,
      revenue: 2890.75,
      avatar: "/placeholder.svg?height=40&width=40&text=PS",
      location: "Mumbai, India",
      verified: true,
    },
    {
      id: 3,
      name: "John Davis",
      email: "john.davis@email.com",
      role: "Customer",
      status: "active",
      joinDate: "2024-01-15",
      lastActive: "3 hours ago",
      products: 0,
      revenue: 0,
      purchases: 8,
      spent: 245.92,
      avatar: "/placeholder.svg?height=40&width=40&text=JD",
      location: "New York, USA",
      verified: false,
    },
    {
      id: 4,
      name: "Sarah Miller",
      email: "sarah.m@email.com",
      role: "Creator",
      status: "pending",
      joinDate: "2024-01-20",
      lastActive: "5 hours ago",
      products: 1,
      revenue: 0,
      avatar: "/placeholder.svg?height=40&width=40&text=SM",
      location: "London, UK",
      verified: false,
    },
    {
      id: 5,
      name: "Ahmed Khan",
      email: "ahmed.khan@email.com",
      role: "Customer",
      status: "suspended",
      joinDate: "2024-01-12",
      lastActive: "1 week ago",
      products: 0,
      revenue: 0,
      purchases: 2,
      spent: 59.98,
      avatar: "/placeholder.svg?height=40&width=40&text=AK",
      location: "Dubai, UAE",
      verified: true,
    },
  ])

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesRole = roleFilter === "all" || user.role.toLowerCase() === roleFilter.toLowerCase()
    return matchesSearch && matchesStatus && matchesRole
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "pending":
        return "secondary"
      case "suspended":
        return "destructive"
      default:
        return "outline"
    }
  }

  const handleUserAction = (action: string, userId: number, userName: string) => {
    switch (action) {
      case "view":
        window.location.href = `/admin/users/${userId}`
        break
      case "message":
        alert(`Opening message dialog for ${userName}`)
        break
      case "suspend":
        if (confirm(`Are you sure you want to suspend ${userName}?`)) {
          alert(`${userName} has been suspended`)
        }
        break
      case "delete":
        if (confirm(`Are you sure you want to delete ${userName}? This action cannot be undone.`)) {
          alert(`${userName} has been deleted`)
        }
        break
      case "verify":
        alert(`${userName} has been verified`)
        break
      default:
        break
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header subtitle="User Management" userType="admin" currentPage="users" />

      <div className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
              <p className="text-gray-600 mt-2">Manage all platform users, creators, and customers</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Users
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold">{users.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Creators</p>
                    <p className="text-2xl font-bold">
                      {users.filter((u) => u.role === "Creator" && u.status === "active").length}
                    </p>
                  </div>
                  <Package className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
                    <p className="text-2xl font-bold">{users.filter((u) => u.status === "pending").length}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold">
                      ${users.reduce((sum, u) => sum + (u.revenue || 0), 0).toLocaleString()}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search users by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="creator">Creators</SelectItem>
                    <SelectItem value="customer">Customers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Users List */}
          <Card>
            <CardHeader>
              <CardTitle>Users ({filteredUsers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-semibold text-gray-900">{user.name}</span>
                          {user.verified && <Shield className="w-4 h-4 text-blue-500" />}
                          <Badge variant={getStatusColor(user.status)}>{user.status}</Badge>
                          <Badge variant="outline">{user.role}</Badge>
                        </div>
                        <div className="text-sm text-gray-600 mb-1">
                          {user.email} • {user.location}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                          <span>Last active {user.lastActive}</span>
                          {user.role === "Creator" ? (
                            <>
                              <span>{user.products} products</span>
                              <span>${user.revenue.toFixed(2)} revenue</span>
                            </>
                          ) : (
                            <>
                              <span>{user.purchases || 0} purchases</span>
                              <span>${(user.spent || 0).toFixed(2)} spent</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleUserAction("view", user.id, user.name)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleUserAction("message", user.id, user.name)}>
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleUserAction("view", user.id, user.name)}>
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUserAction("message", user.id, user.name)}>
                            Send Message
                          </DropdownMenuItem>
                          {!user.verified && (
                            <DropdownMenuItem onClick={() => handleUserAction("verify", user.id, user.name)}>
                              Verify User
                            </DropdownMenuItem>
                          )}
                          {user.status !== "suspended" && (
                            <DropdownMenuItem
                              className="text-orange-600"
                              onClick={() => handleUserAction("suspend", user.id, user.name)}
                            >
                              Suspend User
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleUserAction("delete", user.id, user.name)}
                          >
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
