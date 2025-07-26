"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Search,
  MessageSquare,
  Reply,
  Archive,
  User,
  Store,
  Star,
  Heart,
  Frown,
  Meh,
  Smile,
  Angry,
  AlertTriangle,
  BarChart3,
} from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

const emotionIcons = {
  happy: { icon: Smile, color: "text-green-600", bg: "bg-green-50" },
  satisfied: { icon: Meh, color: "text-blue-600", bg: "bg-blue-50" },
  frustrated: { icon: Frown, color: "text-orange-600", bg: "bg-orange-50" },
  angry: { icon: Angry, color: "text-red-600", bg: "bg-red-50" },
  love: { icon: Heart, color: "text-pink-600", bg: "bg-pink-50" },
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "Priya Sharma",
      email: "priya@email.com",
      subject: "Installation help needed",
      message:
        "Hi! I purchased your Terraform guide and have a question about the AWS IAM setup. In chapter 3, you mention creating a custom policy, but I'm getting permission errors.",
      time: "2 hours ago",
      unread: true,
      type: "customer_question",
      creatorStore: "Ravi's Tech Hub",
      creatorId: "ravi-tech-hub",
      productId: "terraform-guide",
      productTitle: "Terraform AWS Complete Guide",
      priority: "high",
      customerType: "buyer",
      orderId: "ORD-1703123456",
      emotion: "frustrated",
      rating: null,
      contactReason: "technical-support",
    },
    {
      id: 2,
      from: "John Davis",
      email: "john@email.com",
      subject: "Excellent course!",
      message:
        "Just wanted to say thanks for the excellent Docker course. The production tips were invaluable! I've already implemented several suggestions.",
      time: "4 hours ago",
      unread: false,
      type: "review",
      creatorStore: "Ravi's Tech Hub",
      creatorId: "ravi-tech-hub",
      productId: "docker-mastery",
      productTitle: "Docker Mastery Course",
      priority: "low",
      customerType: "buyer",
      orderId: "ORD-1703123455",
      emotion: "love",
      rating: 5,
      contactReason: "general-feedback",
    },
    {
      id: 3,
      from: "Sarah Kim",
      email: "sarah@email.com",
      subject: "Download link expired",
      message:
        "I purchased the Kubernetes guide yesterday but the download link in my email isn't working. Could you please resend the download link?",
      time: "1 day ago",
      unread: true,
      type: "technical_issue",
      creatorStore: "DevOps Hub",
      creatorId: "demo-store",
      productId: "k8s-production",
      productTitle: "Production-Ready Kubernetes Deployment Guide",
      priority: "high",
      customerType: "buyer",
      orderId: "ORD-1703123454",
      emotion: "frustrated",
      rating: null,
      contactReason: "download-issue",
    },
    {
      id: 4,
      from: "Mike Rodriguez",
      email: "mike@email.com",
      subject: "Bulk purchase inquiry",
      message:
        "Hi, I'm interested in purchasing your Docker course for my team of 15 developers. Do you offer bulk discounts?",
      time: "2 days ago",
      unread: false,
      type: "business_inquiry",
      creatorStore: "Ravi's Tech Hub",
      creatorId: "ravi-tech-hub",
      productId: "docker-mastery",
      productTitle: "Docker Mastery Course",
      priority: "medium",
      customerType: "prospect",
      orderId: null,
      emotion: "satisfied",
      rating: null,
      contactReason: "other",
    },
    {
      id: 5,
      from: "Lisa Chen",
      email: "lisa@email.com",
      subject: "Amazing content!",
      message:
        "This Terraform guide is exactly what I needed! The step-by-step approach made it so easy to follow. Definitely worth every penny!",
      time: "3 days ago",
      unread: false,
      type: "review",
      creatorStore: "Ravi's Tech Hub",
      creatorId: "ravi-tech-hub",
      productId: "terraform-guide",
      productTitle: "Terraform AWS Complete Guide",
      priority: "low",
      customerType: "buyer",
      orderId: "ORD-1703123453",
      emotion: "happy",
      rating: 5,
      contactReason: "general-feedback",
    },
    {
      id: 6,
      from: "Alex Thompson",
      email: "alex@email.com",
      subject: "K8s deployment issue",
      message:
        "Having trouble with the production deployment configs. Getting permission errors when trying to apply the YAML files.",
      time: "3 hours ago",
      unread: true,
      type: "customer_question",
      creatorStore: "DevOps Hub",
      creatorId: "demo-store",
      productId: "k8s-production",
      productTitle: "Production-Ready Kubernetes Deployment Guide",
      priority: "high",
      customerType: "buyer",
      orderId: "ORD-1703123452",
      emotion: "frustrated",
      rating: null,
      contactReason: "technical-support",
    },
  ])

  const [selectedMessage, setSelectedMessage] = useState<any>(null)
  const [replyText, setReplyText] = useState("")
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [emotionFilter, setEmotionFilter] = useState("all")
  const [creatorFilter, setCreatorFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const filteredMessages = messages.filter((message) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "unread" && message.unread) ||
      (filter === "buyers" && message.customerType === "buyer") ||
      (filter === "prospects" && message.customerType === "prospect") ||
      (filter === "technical" && message.type === "technical_issue") ||
      (filter === "business" && message.type === "business_inquiry") ||
      (filter === "reviews" && message.type === "review")

    const matchesEmotion = emotionFilter === "all" || message.emotion === emotionFilter
    const matchesCreator = creatorFilter === "all" || message.creatorId === creatorFilter
    const matchesPriority = priorityFilter === "all" || message.priority === priorityFilter

    const matchesSearch =
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.creatorStore.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesFilter && matchesEmotion && matchesCreator && matchesPriority && matchesSearch
  })

  const handleReply = (messageId: number) => {
    if (replyText.trim()) {
      alert(`Admin reply sent to message ${messageId}: ${replyText}`)
      setReplyText("")
      setSelectedMessage(null)
      setMessages(messages.map((m) => (m.id === messageId ? { ...m, unread: false } : m)))
    }
  }

  const markAsRead = (messageId: number) => {
    setMessages(messages.map((m) => (m.id === messageId ? { ...m, unread: false } : m)))
  }

  const getMessageIcon = (type: string) => {
    switch (type) {
      case "customer_question":
        return "❓"
      case "review":
        return "⭐"
      case "technical_issue":
        return "🔧"
      case "business_inquiry":
        return "💼"
      default:
        return "💬"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200"
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "low":
        return "text-green-600 bg-green-50 border-green-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const unreadCount = messages.filter((m) => m.unread).length
  const buyerMessages = messages.filter((m) => m.customerType === "buyer").length
  const prospectMessages = messages.filter((m) => m.customerType === "prospect").length
  const reviewCount = messages.filter((m) => m.type === "review").length

  // Analytics
  const emotionStats = Object.keys(emotionIcons).map((emotion) => ({
    emotion,
    count: messages.filter((m) => m.emotion === emotion).length,
    ...emotionIcons[emotion as keyof typeof emotionIcons],
  }))

  const creators = [...new Set(messages.map((m) => ({ id: m.creatorId, name: m.creatorStore })))]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header userType="admin" />

      <div className="flex-1">
        {/* Header */}
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/admin" className="flex items-center space-x-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Admin</span>
                </Link>
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span className="text-xl font-bold">Platform Messages & Analytics</span>
                  {unreadCount > 0 && <Badge variant="destructive">{unreadCount} unread</Badge>}
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">{messages.length}</p>
                    <p className="text-sm text-gray-600">Total Messages</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">{buyerMessages}</p>
                    <p className="text-sm text-gray-600">From Buyers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Store className="w-4 h-4 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold">{prospectMessages}</p>
                    <p className="text-sm text-gray-600">From Prospects</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <div>
                    <p className="text-2xl font-bold">{unreadCount}</p>
                    <p className="text-sm text-gray-600">Needs Response</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Platform Emotion Analytics */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Platform Customer Emotions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-4">
                {emotionStats.map((stat) => (
                  <div key={stat.emotion} className={`p-4 rounded-lg ${stat.bg} text-center`}>
                    <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                    <p className="text-2xl font-bold">{stat.count}</p>
                    <p className="text-sm capitalize">{stat.emotion}</p>
                    <p className="text-xs text-gray-500">
                      {messages.length > 0 ? Math.round((stat.count / messages.length) * 100) : 0}%
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Filters and Search */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search messages, creators, or customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All ({messages.length})</SelectItem>
                  <SelectItem value="unread">Unread ({unreadCount})</SelectItem>
                  <SelectItem value="buyers">Buyers ({buyerMessages})</SelectItem>
                  <SelectItem value="prospects">Prospects ({prospectMessages})</SelectItem>
                  <SelectItem value="reviews">Reviews ({reviewCount})</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectContent>
              </Select>

              <Select value={emotionFilter} onValueChange={setEmotionFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Emotion" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Emotions</SelectItem>
                  {Object.keys(emotionIcons).map((emotion) => (
                    <SelectItem key={emotion} value={emotion}>
                      <div className="flex items-center gap-2">
                        {React.createElement(emotionIcons[emotion as keyof typeof emotionIcons].icon, {
                          className: `w-4 h-4 ${emotionIcons[emotion as keyof typeof emotionIcons].color}`,
                        })}
                        <span className="capitalize">{emotion}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={creatorFilter} onValueChange={setCreatorFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Creator" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Creators</SelectItem>
                  {creators.map((creator) => (
                    <SelectItem key={creator.id} value={creator.id}>
                      {creator.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Messages List */}
          <div className="space-y-4">
            {filteredMessages.map((message) => {
              const EmotionIcon = emotionIcons[message.emotion as keyof typeof emotionIcons]?.icon || Meh
              const emotionColor = emotionIcons[message.emotion as keyof typeof emotionIcons]?.color || "text-gray-600"

              return (
                <Card
                  key={message.id}
                  className={`transition-all hover:shadow-md ${message.unread ? "border-blue-200 bg-blue-50" : ""}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="text-lg">{getMessageIcon(message.type)}</span>
                          <span className="font-semibold">{message.from}</span>
                          {message.unread && (
                            <Badge variant="destructive" className="text-xs">
                              New
                            </Badge>
                          )}
                          <Badge
                            variant="outline"
                            className={
                              message.customerType === "buyer"
                                ? "bg-green-50 text-green-700"
                                : "bg-purple-50 text-purple-700"
                            }
                          >
                            {message.customerType === "buyer" ? "🛒 Buyer" : "👀 Prospect"}
                          </Badge>
                          <Badge className={`text-xs ${getPriorityColor(message.priority)}`}>{message.priority}</Badge>
                          <div className="flex items-center gap-1">
                            <EmotionIcon className={`w-4 h-4 ${emotionColor}`} />
                            <span className="text-xs capitalize text-gray-600">{message.emotion}</span>
                          </div>
                          <span className="text-sm text-gray-500">{message.time}</span>
                        </div>

                        <h3 className="font-medium mb-1">{message.subject}</h3>

                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <span>🏪 {message.creatorStore}</span>
                          {message.productTitle && <span>📦 {message.productTitle}</span>}
                          {message.orderId && <span>🔢 {message.orderId}</span>}
                          <span>📧 {message.contactReason?.replace("-", " ")}</span>
                        </div>

                        {message.rating && (
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < message.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="text-sm text-gray-600 ml-1">({message.rating}/5)</span>
                          </div>
                        )}

                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{message.message}</p>

                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                onClick={() => {
                                  setSelectedMessage(message)
                                  markAsRead(message.id)
                                }}
                              >
                                <Reply className="w-4 h-4 mr-2" />
                                Reply
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Admin Reply to {message.from}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                  <div className="flex items-center gap-2 mb-2">
                                    <EmotionIcon className={`w-4 h-4 ${emotionColor}`} />
                                    <span className="text-sm font-medium capitalize">
                                      Customer is feeling: {message.emotion}
                                    </span>
                                    <Badge
                                      variant="outline"
                                      className={
                                        message.customerType === "buyer"
                                          ? "bg-green-50 text-green-700"
                                          : "bg-purple-50 text-purple-700"
                                      }
                                    >
                                      {message.customerType === "buyer" ? "🛒 Verified Buyer" : "👀 Prospect"}
                                    </Badge>
                                    {message.orderId && <Badge variant="outline">Order: {message.orderId}</Badge>}
                                  </div>
                                  <p className="text-sm font-medium mb-2">Original Message:</p>
                                  <p className="text-sm text-gray-600">{message.message}</p>
                                  <div className="mt-2 text-xs text-gray-500">
                                    <p>Creator: {message.creatorStore}</p>
                                    <p>Product: {message.productTitle}</p>
                                    <p>Contact Reason: {message.contactReason?.replace("-", " ")}</p>
                                  </div>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium mb-2">Admin Reply:</label>
                                  <Textarea
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    placeholder="Type your admin response here..."
                                    rows={6}
                                  />
                                </div>
                                <div className="flex justify-end gap-2">
                                  <Button variant="outline" onClick={() => setSelectedMessage(null)}>
                                    Cancel
                                  </Button>
                                  <Button onClick={() => handleReply(message.id)}>Send Admin Reply</Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          {message.unread && (
                            <Button variant="outline" size="sm" onClick={() => markAsRead(message.id)}>
                              Mark as Read
                            </Button>
                          )}

                          <Link href={`/store/${message.creatorId}`} target="_blank">
                            <Button variant="outline" size="sm">
                              View Store
                            </Button>
                          </Link>

                          <Button variant="ghost" size="sm">
                            <Archive className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filteredMessages.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No messages found</h3>
                <p className="text-gray-500">
                  {searchTerm ? "Try adjusting your search terms" : "All messages are handled!"}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
