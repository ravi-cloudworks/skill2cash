import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Check, Zap, Crown, Rocket } from "lucide-react"

export default function PricingPage() {
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
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Simple, Fair Pricing</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start free and only pay when you earn. No upfront costs, no hidden fees. You keep 85-95% of your revenue.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Free Plan */}
            <Card className="relative">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-green-600" />
                  <CardTitle>Free</CardTitle>
                </div>
                <div className="text-3xl font-bold">₹0</div>
                <p className="text-gray-600">Perfect to get started</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Up to 3 products</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Basic storefront</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Secure file delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">UPI payments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">15% platform fee</span>
                  </div>
                </div>
                <Link href="/wizard/income-assessment">
                  <Button className="w-full bg-green-600 hover:bg-green-700">Start Free</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="relative border-blue-200 shadow-lg">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">Most Popular</Badge>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="w-5 h-5 text-blue-600" />
                  <CardTitle>Pro</CardTitle>
                </div>
                <div className="text-3xl font-bold">₹999</div>
                <p className="text-gray-600">per month</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Unlimited products</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Custom domain</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Advanced analytics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Email marketing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">10% platform fee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Priority support</span>
                  </div>
                </div>
                <Link href="/wizard/income-assessment">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Start Pro Trial</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="relative">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Rocket className="w-5 h-5 text-purple-600" />
                  <CardTitle>Enterprise</CardTitle>
                </div>
                <div className="text-3xl font-bold">₹4,999</div>
                <p className="text-gray-600">per month</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Everything in Pro</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">White-label solution</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">API access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Dedicated support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">5% platform fee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Custom integrations</span>
                  </div>
                </div>
                <Link href="/contact">
                  <Button variant="outline" className="w-full bg-transparent">
                    Contact Sales
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* FAQ */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-2">How does the platform fee work?</h3>
                <p className="text-gray-600 text-sm">
                  We only charge when you make a sale. The fee is automatically deducted from each transaction, so you
                  always know exactly what you'll receive.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can I change plans anytime?</h3>
                <p className="text-gray-600 text-sm">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll
                  prorate any charges.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What payment methods do you support?</h3>
                <p className="text-gray-600 text-sm">
                  We support UPI, credit cards, debit cards, net banking, and digital wallets. All payments are
                  processed securely.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Is there a free trial?</h3>
                <p className="text-gray-600 text-sm">
                  The Free plan is available forever with no time limit. Pro and Enterprise plans come with a 14-day
                  free trial.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Earning?</h2>
            <p className="text-gray-600 mb-8">
              Join thousands of developers who are already turning their skills into cash.
            </p>
            <Link href="/wizard/income-assessment">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Your Free Store Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
