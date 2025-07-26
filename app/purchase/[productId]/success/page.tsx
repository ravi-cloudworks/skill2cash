"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  CheckCircle,
  Download,
  Star,
  MessageSquare,
  Home,
  Mail,
  Copy,
  Heart,
  Frown,
  Meh,
  Smile,
  Angry,
} from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

// Mock product data
const productData = {
  id: "terraform-guide",
  title: "Terraform AWS Complete Guide",
  subtitle: "Master AWS infrastructure automation in 30 days with expert guidance",
  price: 29.99,
  seller: "Ravi's Tech Hub",
  sellerEmail: "ravi@skillcash.com",
  downloadLinks: [
    { name: "Main Guide (PDF)", url: "#", size: "15.2 MB" },
    { name: "Terraform Scripts (ZIP)", url: "#", size: "8.7 MB" },
    { name: "Video Course (MP4)", url: "#", size: "1.2 GB" },
  ],
}

const emotionOptions = [
  { value: "happy", label: "😊 Happy", icon: Smile, color: "text-green-600" },
  { value: "satisfied", label: "😌 Satisfied", icon: Meh, color: "text-blue-600" },
  { value: "frustrated", label: "😤 Frustrated", icon: Frown, color: "text-orange-600" },
  { value: "angry", label: "😠 Angry", icon: Angry, color: "text-red-600" },
  { value: "love", label: "😍 Love it!", icon: Heart, color: "text-pink-600" },
]

export default function PurchaseSuccessPage({ params }: { params: { productId: string } }) {
  const searchParams = useSearchParams()
  const email = searchParams.get("email")
  const [orderId] = useState(`ORD-${Date.now()}`)
  const [showRatingDialog, setShowRatingDialog] = useState(false)
  const [showContactDialog, setShowContactDialog] = useState(false)
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState("")
  const [emotion, setEmotion] = useState("")
  const [contactReason, setContactReason] = useState("")
  const [contactMessage, setContactMessage] = useState("")
  const [downloadAttempts, setDownloadAttempts] = useState(0)

  const handleDownload = (link: any) => {
    if (downloadAttempts >= 3) {
      alert("Download limit reached. Please contact seller for additional downloads.")
      return
    }
    setDownloadAttempts(downloadAttempts + 1)
    // In production, this would track downloads and provide secure links
    console.log(`Downloading: ${link.name}`)
  }

  const handleRatingSubmit = () => {
    if (rating === 0) {
      alert("Please select a rating")
      return
    }

    // In production, save to database
    console.log("Rating submitted:", { rating, reviewText, emotion, orderId })
    alert("Thank you for your review! It helps other customers.")
    setShowRatingDialog(false)
  }

  const handleContactSubmit = () => {
    if (!contactReason || !contactMessage.trim()) {
      alert("Please fill in all fields")
      return
    }

    // In production, send to creator's messages
    console.log("Contact submitted:", { contactReason, contactMessage, orderId, emotion })
    alert("Message sent to seller! They'll respond within 24 hours.")
    setShowContactDialog(false)
  }

  const copyOrderId = () => {
    navigator.clipboard.writeText(orderId)
    alert("Order ID copied!")
  }

  const selectedEmotion = emotionOptions.find((e) => e.value === emotion)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header userType="customer" />

      <div className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Success Header */}
            <Card className="mb-6 border-green-200 bg-green-50">
              <CardContent className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-green-800 mb-2">Payment Successful!</h1>
                <p className="text-green-700 mb-4">Your purchase has been completed successfully.</p>
                <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                  <span>Order ID:</span>
                  <code className="bg-green-100 px-2 py-1 rounded font-mono">{orderId}</code>
                  <Button variant="ghost" size="sm" onClick={copyOrderId} className="h-6 w-6 p-0">
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Product Details */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{productData.title}</span>
                  <Badge variant="secondary">${productData.price}</Badge>
                </CardTitle>
                <p className="text-gray-600">{productData.subtitle}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-3">📥 Download Your Files</h3>
                    <div className="space-y-2">
                      {productData.downloadLinks.map((link, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{link.name}</p>
                            <p className="text-sm text-gray-500">{link.size}</p>
                          </div>
                          <Button size="sm" onClick={() => handleDownload(link)}>
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      💡 Downloads remaining: {3 - downloadAttempts}/3 • Links expire in 7 days
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-600 mb-2">
                      📧 Confirmation email sent to: <strong>{email}</strong>
                    </p>
                    <p className="text-sm text-gray-600">
                      🏪 Sold by: <strong>{productData.seller}</strong>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Button
                onClick={() => setShowRatingDialog(true)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white"
              >
                <Star className="w-4 h-4 mr-2" />
                Rate & Review
              </Button>
              <Button variant="outline" onClick={() => setShowContactDialog(true)}>
                <MessageSquare className="w-4 h-4 mr-2" />
                Contact Seller
              </Button>
            </div>

            {/* Navigation */}
            <div className="flex gap-4">
              <Link href="/" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <Link href={`/store/${productData.seller.toLowerCase().replace(/\s+/g, "-")}`} className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">
                  More from {productData.seller}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Rating Dialog */}
      <Dialog open={showRatingDialog} onOpenChange={setShowRatingDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Rate Your Experience</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">How would you rate this product?</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button" onClick={() => setRating(star)} className="p-1">
                    <Star
                      className={`w-8 h-8 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">How are you feeling?</label>
              <Select value={emotion} onValueChange={setEmotion}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your emotion" />
                </SelectTrigger>
                <SelectContent>
                  {emotionOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <option.icon className={`w-4 h-4 ${option.color}`} />
                        {option.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Write a review (optional)</label>
              <Textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience with other customers..."
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowRatingDialog(false)} className="flex-1">
                Skip
              </Button>
              <Button onClick={handleRatingSubmit} className="flex-1">
                Submit Review
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Contact Dialog */}
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Contact {productData.seller}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-800">
                <strong>✓ Verified Purchase</strong> • Order: {orderId}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">What's this about?</label>
              <Select value={contactReason} onValueChange={setContactReason}>
                <SelectTrigger>
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="download-issue">📥 Download Issue</SelectItem>
                  <SelectItem value="technical-support">🔧 Technical Support</SelectItem>
                  <SelectItem value="content-question">❓ Content Question</SelectItem>
                  <SelectItem value="refund-request">💰 Refund Request</SelectItem>
                  <SelectItem value="general-feedback">💬 General Feedback</SelectItem>
                  <SelectItem value="other">🔄 Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">How are you feeling?</label>
              <Select value={emotion} onValueChange={setEmotion}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your emotion" />
                </SelectTrigger>
                <SelectContent>
                  {emotionOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <option.icon className={`w-4 h-4 ${option.color}`} />
                        {option.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Your message</label>
              <Textarea
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="Describe your issue or question..."
                rows={4}
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowContactDialog(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleContactSubmit} className="flex-1">
                <Mail className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
