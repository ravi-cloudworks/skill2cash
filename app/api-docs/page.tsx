import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Code, Key, Zap, Shield } from "lucide-react"

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S2C</span>
                </div>
                <span className="text-xl font-bold">Skill2Cash</span>
              </Link>
            </div>
            <Link href="/">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">API Documentation</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Integrate Skill2Cash into your applications with our powerful REST API
            </p>
            <Badge className="mt-4">Coming Soon</Badge>
          </div>

          {/* API Features */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-blue-600" />
                  RESTful API
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Clean, predictable REST API with JSON responses and standard HTTP status codes.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Product management endpoints</li>
                  <li>• Order and payment tracking</li>
                  <li>• Customer data access</li>
                  <li>• Analytics and reporting</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5 text-green-600" />
                  Authentication
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Secure API key authentication with rate limiting and usage monitoring.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• API key-based authentication</li>
                  <li>• Rate limiting protection</li>
                  <li>• Usage analytics</li>
                  <li>• Webhook support</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-600" />
                  Real-time Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Get instant notifications about sales, customer actions, and system events.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Webhook notifications</li>
                  <li>• Real-time sales alerts</li>
                  <li>• Customer activity tracking</li>
                  <li>• System status updates</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-600" />
                  Enterprise Ready
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Built for scale with enterprise-grade security and reliability features.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 99.9% uptime SLA</li>
                  <li>• Enterprise security</li>
                  <li>• Dedicated support</li>
                  <li>• Custom integrations</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* API Endpoints Preview */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">API Endpoints (Preview)</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Products</h3>
                    <div className="space-y-2 text-sm font-mono bg-gray-100 p-4 rounded">
                      <div>GET /api/v1/products - List all products</div>
                      <div>POST /api/v1/products - Create a new product</div>
                      <div>GET /api/v1/products/:id - Get product details</div>
                      <div>PUT /api/v1/products/:id - Update product</div>
                      <div>DELETE /api/v1/products/:id - Delete product</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Orders</h3>
                    <div className="space-y-2 text-sm font-mono bg-gray-100 p-4 rounded">
                      <div>GET /api/v1/orders - List all orders</div>
                      <div>GET /api/v1/orders/:id - Get order details</div>
                      <div>POST /api/v1/orders/:id/refund - Process refund</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Analytics</h3>
                    <div className="space-y-2 text-sm font-mono bg-gray-100 p-4 rounded">
                      <div>GET /api/v1/analytics/sales - Sales analytics</div>
                      <div>GET /api/v1/analytics/customers - Customer analytics</div>
                      <div>GET /api/v1/analytics/products - Product performance</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Coming Soon */}
          <div className="text-center bg-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">API Coming Soon</h2>
            <p className="text-gray-600 mb-8">
              We're working hard to bring you a powerful API. Join our waitlist to be notified when it's ready.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Join API Waitlist
                </Button>
              </Link>
              <Link href="/wizard/income-assessment">
                <Button size="lg" variant="outline">
                  Start Using Skill2Cash
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
