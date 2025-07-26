"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Star, Download, Shield, Clock, CreditCard, CheckCircle, Heart, Smile, Meh, Frown, Angry } from "lucide-react"
import { QRCode } from "react-qrcode-logo"
import { dataManager, type Product, type Creator } from "@/lib/static-data"

const emotionOptions = [
  { value: "love", label: "Love it! 😍", icon: Heart, color: "text-pink-600" },
  { value: "happy", label: "Very Happy 😊", icon: Smile, color: "text-green-600" },
  { value: "satisfied", label: "Satisfied 😌", icon: Meh, color: "text-blue-600" },
  { value: "frustrated", label: "Frustrated 😤", icon: Frown, color: "text-orange-600" },
  { value: "angry", label: "Angry 😠", icon: Angry, color: "text-red-600" },
]

const contactReasons = [
  { value: "technical-support", label: "Technical Support" },
  { value: "download-issue", label: "Download Issue" },
  { value: "content-question", label: "Content Question" },
  { value: "billing-issue", label: "Billing Issue" },
  { value: "general-feedback", label: "General Feedback" },
  { value: "feature-request", label: "Feature Request" },
  { value: "other", label: "Other" },
]

export default function PurchasePage() {
  const params = useParams()
  const productId = params.productId as string
  const [paymentMethod, setPaymentMethod] = useState("upi")
  const [upiId, setUpiId] = useState("")
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactEmotion, setContactEmotion] = useState("")
  const [contactReason, setContactReason] = useState("")
  const [contactMessage, setContactMessage] = useState("")
  const [productData, setProductData] = useState<{ product: Product; creator: Creator } | null>(null)

  useEffect(() => {
    // Load product data from static data manager
    const data = dataManager.getProductById(productId)
    if (data) {
      setProductData(data)
    }
  }, [productId])

  const handlePurchase = () => {
    // For all payment methods, redirect to success page
    window.location.href = `/purchase/${productId}/success`
  }

  const handleContactSubmit = () => {
    if (contactEmotion && contactReason && contactMessage.trim()) {
      alert(`Contact message sent with emotion: ${contactEmotion}, reason: ${contactReason}`)
      setShowContactForm(false)
      setContactEmotion("")
      setContactReason("")
      setContactMessage("")
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Generate UPI payment URL for QR code
  const generateUPIUrl = () => {
    if (!productData) return ""
    const upiNote = `Payment for ${productData.product.title}`
    const upiPaymentLink = `upi://pay?pa=${productData.creator.upiId}&pn=${encodeURIComponent(productData.creator.name)}&tn=${encodeURIComponent(upiNote)}&am=${productData.product.price}`
    return upiPaymentLink
  }

  if (!productData) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header userType="customer" />
        <div className="flex-1 flex items-center justify-center">
          <Card className="max-w-md">
            <CardContent className="text-center py-8">
              <h2 className="text-xl font-semibold mb-2">Product Not Found</h2>
              <p className="text-gray-600 mb-4">The product "{productId}" doesn't exist.</p>
              <Button onClick={() => window.history.back()}>Go Back</Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }

  const { product, creator } = productData

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header userType="customer" />

      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Product Details */}
            <div>
              <img
                src={product.coverImage || "/placeholder.svg"}
                alt={product.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />

              <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
                <Badge variant="secondary">by {creator.name}</Badge>
              </div>

              <p className="text-gray-600 mb-6">{product.description}</p>

              <div className="space-y-3 mb-6">
                <h3 className="font-semibold">What you'll get:</h3>
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 mb-6">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">30-day money-back guarantee</span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <Download className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-600">Instant download after purchase</span>
              </div>
            </div>

            {/* Purchase Form */}
            <div>
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Complete Purchase</span>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{formatCurrency(product.price)}</div>
                      {product.comparePrice && (
                        <div className="text-sm text-gray-500 line-through">{formatCurrency(product.comparePrice)}</div>
                      )}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Payment Method */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Payment Method</label>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upi">UPI Payment</SelectItem>
                        <SelectItem value="card">Credit/Debit Card</SelectItem>
                        <SelectItem value="netbanking">Net Banking</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* UPI Payment Section */}
                  {paymentMethod === "upi" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Your UPI ID (Optional)</label>
                        <Input
                          placeholder="your-upi-id@paytm"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                        />
                        <p className="text-xs text-gray-500 mt-1">You can also pay by scanning QR code below</p>
                      </div>

                      {/* QR Code Section */}
                      <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                        <div className="text-center mb-4">
                          <h3 className="font-semibold text-lg">Scan QR Code to Pay</h3>
                          <p className="text-sm text-gray-600">Use any UPI app to scan and pay</p>
                        </div>

                        <div className="flex justify-center mb-4">
                          <QRCode
                            value={generateUPIUrl()}
                            size={176}
                            logoWidth={40}
                            logoHeight={40}
                            logoOpacity={0.6}
                          />
                        </div>

                        <div className="text-center space-y-2">
                          <p className="font-semibold">Pay to: {creator.name}</p>
                          <p className="text-sm text-gray-600">UPI ID: {creator.upiId}</p>
                          <p className="text-lg font-bold text-green-600">{formatCurrency(product.price)}</p>
                        </div>

                        <div className="mt-4">
                          <Button
                            onClick={() => window.open(generateUPIUrl(), "_blank")}
                            className="w-full"
                            variant="outline"
                          >
                            Open UPI App
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  <Button onClick={handlePurchase} className="w-full" size="lg">
                    <CreditCard className="w-4 h-4 mr-2" />
                    {paymentMethod === "upi" ? "I've Completed Payment" : `Pay ${formatCurrency(product.price)}`}
                  </Button>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>Secure payment • Instant access</span>
                    </div>
                  </div>

                  {/* Contact Seller */}
                  <div className="border-t pt-4">
                    <Button variant="outline" onClick={() => setShowContactForm(!showContactForm)} className="w-full">
                      Contact Seller
                    </Button>

                    {showContactForm && (
                      <div className="mt-4 space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">How are you feeling?</label>
                          <Select value={contactEmotion} onValueChange={setContactEmotion}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your emotion" />
                            </SelectTrigger>
                            <SelectContent>
                              {emotionOptions.map((emotion) => (
                                <SelectItem key={emotion.value} value={emotion.value}>
                                  <div className="flex items-center gap-2">
                                    <emotion.icon className={`w-4 h-4 ${emotion.color}`} />
                                    <span>{emotion.label}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Contact Reason</label>
                          <Select value={contactReason} onValueChange={setContactReason}>
                            <SelectTrigger>
                              <SelectValue placeholder="Why are you contacting?" />
                            </SelectTrigger>
                            <SelectContent>
                              {contactReasons.map((reason) => (
                                <SelectItem key={reason.value} value={reason.value}>
                                  {reason.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Message</label>
                          <Textarea
                            placeholder="Type your message here..."
                            value={contactMessage}
                            onChange={(e) => setContactMessage(e.target.value)}
                            rows={4}
                          />
                        </div>

                        <div className="flex gap-2">
                          <Button onClick={handleContactSubmit} className="flex-1">
                            Send Message
                          </Button>
                          <Button variant="outline" onClick={() => setShowContactForm(false)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
