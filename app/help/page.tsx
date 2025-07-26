import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Search,
  BookOpen,
  MessageCircle,
  Video,
  FileText,
  Rocket,
  CreditCard,
  TrendingUp,
  Settings,
} from "lucide-react"

export default function HelpPage() {
  const helpCategories = [
    {
      title: "Getting Started",
      icon: Rocket,
      articles: [
        "How to create your first product",
        "Setting up your storefront",
        "Understanding pricing strategies",
        "Publishing your store",
      ],
    },
    {
      title: "Payments & Payouts",
      icon: CreditCard,
      articles: [
        "How payments work",
        "Setting up UPI for payouts",
        "Understanding platform fees",
        "Tax information and invoices",
      ],
    },
    {
      title: "Marketing & Sales",
      icon: TrendingUp,
      articles: [
        "Promoting your products",
        "Using social media effectively",
        "Email marketing best practices",
        "Building customer relationships",
      ],
    },
    {
      title: "Technical Support",
      icon: Settings,
      articles: ["File upload troubleshooting", "Custom domain setup", "API documentation", "Integration guides"],
    },
  ]

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
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Help Center</h1>
            <p className="text-xl text-gray-600 mb-8">
              Find answers to your questions and learn how to make the most of Skill2Cash
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input placeholder="Search for help articles..." className="pl-12 py-3 text-lg" />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Documentation</h3>
              <p className="text-gray-600 text-sm">Complete guides and tutorials</p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <Video className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Video Tutorials</h3>
              <p className="text-gray-600 text-sm">Step-by-step video guides</p>
            </Card>

            <Link href="/contact">
              <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <MessageCircle className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Contact Support</h3>
                <p className="text-gray-600 text-sm">Get help from our team</p>
              </Card>
            </Link>
          </div>

          {/* Help Categories */}
          <div className="grid md:grid-cols-2 gap-8">
            {helpCategories.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {React.createElement(category.icon, { className: "w-5 h-5 text-blue-600" })}
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.articles.map((article, articleIndex) => (
                      <li key={articleIndex}>
                        <Link href="#" className="text-blue-600 hover:underline text-sm">
                          {article}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Popular Articles */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Popular Articles</h2>
            <div className="space-y-4">
              {[
                "How to create your first digital product in 30 minutes",
                "Best practices for pricing your products",
                "How to promote your store on social media",
                "Understanding Skill2Cash fees and payouts",
                "Setting up automated email marketing",
              ].map((article, index) => (
                <Card key={index} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <span className="text-blue-600 hover:underline">{article}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Still Need Help */}
          <div className="mt-16 text-center bg-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
            <p className="text-gray-600 mb-6">Can't find what you're looking for? Our support team is here to help.</p>
            <Link href="/contact">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
