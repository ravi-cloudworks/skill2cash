"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Star, ShoppingCart, Download, Eye, Users, Globe, MessageSquare, Send } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { dataManager, type Creator } from "@/lib/static-data"

export default function StorePage() {
  const params = useParams()
  const storeId = params.storeId as string
  const [storeData, setStoreData] = useState<Creator | null>(null)
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    productId: "",
  })
  const [showContactDialog, setShowContactDialog] = useState(false)

  useEffect(() => {
    // Load store data from static data manager
    const creator = dataManager.getCreatorByStoreUrl(storeId)
    if (creator) {
      setStoreData(creator)
    }
  }, [storeId])

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // In production, this would send to API or email service
    console.log("Contact form submitted:", contactForm)

    // Simulate API call
    alert(`Message sent to ${storeData?.name}! They'll respond within 24 hours.`)

    // Reset form
    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: "",
      productId: "",
    })
    setShowContactDialog(false)
  }

  const handleProductInquiry = (product: any) => {
    setContactForm({
      ...contactForm,
      subject: `Question about ${product.title}`,
      productId: product.id,
    })
    setShowContactDialog(true)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  if (!storeData) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header userType="customer" />
        <div className="flex-1 flex items-center justify-center">
          <Card className="max-w-md">
            <CardContent className="text-center py-8">
              <h2 className="text-xl font-semibold mb-2">Store Not Found</h2>
              <p className="text-gray-600 mb-4">The store "{storeId}" doesn't exist yet.</p>
              <div className="text-sm text-gray-500 mb-4">
                Available demo stores:
                <div className="mt-2 space-y-1">
                  <Link href="/store/ravi-hr-hub" className="block text-blue-600 hover:underline">
                    • ravi-hr-hub (Ravi's HR Hub)
                  </Link>
                  <Link href="/store/demo-store" className="block text-blue-600 hover:underline">
                    • demo-store (HR Excellence Hub)
                  </Link>
                </div>
              </div>
              <Link href="/">
                <Button>Go Home</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }

  const totalProducts = storeData.products.length
  const totalSales = storeData.products.reduce((sum, product) => sum + product.sales, 0)
  const avgRating = storeData.products.reduce((sum, product) => sum + product.rating, 0) / totalProducts

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header userType="customer" />

      <div className="flex-1">
        {/* Store Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">{storeData.storeName}</h1>
              <p className="text-xl mb-6 opacity-90">{storeData.tagline}</p>
              <div className="flex justify-center items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>{totalProducts} Products</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{totalSales.toLocaleString()} Sales</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{avgRating.toFixed(1)} Rating</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={() => setShowContactDialog(true)}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contact Seller
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">HR Digital Products</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {storeData.products.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gray-100">
                    <img
                      src={product.coverImage || "/placeholder.svg"}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg line-clamp-2">{product.title}</CardTitle>
                      <Badge variant="outline">{product.category}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{product.shortDescription}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Rating and Sales */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-current text-yellow-400" />
                          <span className="font-medium">{product.rating}</span>
                          <span className="text-gray-500">({product.reviewCount})</span>
                        </div>
                        <div className="text-gray-500">{product.sales} sales</div>
                      </div>

                      {/* Recent Reviews */}
                      {product.recentReviews && product.recentReviews.length > 0 && (
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Star className="w-4 h-4 fill-current text-yellow-400" />
                            <span className="text-sm font-medium">Recent Review:</span>
                          </div>
                          <p className="text-xs text-gray-600 italic">"{product.recentReviews[0].comment}"</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500">- {product.recentReviews[0].name}</span>
                            {product.recentReviews[0].verified && (
                              <Badge variant="outline" className="text-xs px-1 py-0">
                                ✓ Verified Purchase
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      {/* What's Included */}
                      <div>
                        <h4 className="font-medium text-sm mb-2">What's included:</h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {product.whatsIncluded.slice(0, 3).map((item, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-blue-600 rounded-full" />
                              {item}
                            </li>
                          ))}
                          {product.whatsIncluded.length > 3 && (
                            <li className="text-blue-600">+{product.whatsIncluded.length - 3} more items</li>
                          )}
                        </ul>
                      </div>

                      {/* Price and CTA */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold">{formatCurrency(product.price)}</span>
                          {product.comparePrice && (
                            <span className="text-sm text-gray-500 line-through">
                              {formatCurrency(product.comparePrice)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Link href={`/purchase/${product.id}`} className="flex-1">
                          <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Buy Now
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm" onClick={() => handleProductInquiry(product)}>
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Store Info */}
            <div className="mt-12 bg-white rounded-lg p-6 border">
              <h3 className="text-xl font-semibold mb-4">About {storeData.storeName}</h3>
              <p className="text-gray-600 mb-4">{storeData.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>skill2cash.com/store/{storeData.storeUrl}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  <span>Instant download after purchase</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Dialog */}
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Contact {storeData.name}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Your Name</label>
              <Input
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Your Email</label>
              <Input
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subject</label>
              <Input
                value={contactForm.subject}
                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                placeholder="What's this about?"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <Textarea
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                placeholder="Your question or message..."
                rows={4}
                required
              />
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => setShowContactDialog(false)} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
