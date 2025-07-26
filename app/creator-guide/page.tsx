import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, Users, Target, Zap, TrendingUp } from "lucide-react"

export default function CreatorGuidePage() {
  const guideSteps = [
    {
      step: 1,
      title: "Choose Your Niche",
      time: "5 minutes",
      description: "Identify your strongest technical skills and market demand",
      tips: [
        "Focus on skills you use daily at work",
        "Check job boards for in-demand technologies",
        "Consider your unique experience and perspective",
      ],
    },
    {
      step: 2,
      title: "Create Your First Product",
      time: "2-4 hours",
      description: "Start with a simple PDF guide or template",
      tips: [
        "Begin with a problem you've solved before",
        "Keep it focused and actionable",
        "Include real examples and code snippets",
      ],
    },
    {
      step: 3,
      title: "Set Up Your Store",
      time: "30 minutes",
      description: "Use our wizard to create your automated storefront",
      tips: ["Choose a memorable store name", "Write a compelling bio", "Add a professional profile photo"],
    },
    {
      step: 4,
      title: "Price Your Product",
      time: "10 minutes",
      description: "Research market rates and set competitive pricing",
      tips: [
        "Start with ₹500-₹2500 for your first product",
        "Consider the time saved for your customers",
        "You can always adjust prices later",
      ],
    },
    {
      step: 5,
      title: "Launch and Promote",
      time: "Ongoing",
      description: "Share your store and start making sales",
      tips: [
        "Share on LinkedIn and Twitter",
        "Post in relevant developer communities",
        "Ask colleagues and friends for feedback",
      ],
    },
  ]

  const productTypes = [
    {
      type: "PDF Guides",
      icon: "📄",
      description: "Step-by-step tutorials and documentation",
      examples: ["Setup guides", "Best practices", "Troubleshooting manuals"],
      timeToCreate: "2-4 hours",
      priceRange: "₹500-₹1500",
    },
    {
      type: "Code Templates",
      icon: "💻",
      description: "Ready-to-use code snippets and boilerplates",
      examples: ["React components", "API templates", "Configuration files"],
      timeToCreate: "4-8 hours",
      priceRange: "₹1000-₹3000",
    },
    {
      type: "Video Courses",
      icon: "🎥",
      description: "Screen recordings and tutorials",
      examples: ["Technology walkthroughs", "Live coding sessions", "Concept explanations"],
      timeToCreate: "8-16 hours",
      priceRange: "₹2000-₹5000",
    },
    {
      type: "Tools & Scripts",
      icon: "🛠️",
      description: "Automation scripts and utilities",
      examples: ["Deployment scripts", "Data migration tools", "Monitoring utilities"],
      timeToCreate: "6-12 hours",
      priceRange: "₹1500-₹4000",
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
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Creator Guide</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to know to turn your technical skills into a profitable digital product business
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="text-center p-6">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">30 Minutes</h3>
              <p className="text-gray-600 text-sm">Average time to launch your first store</p>
            </Card>
            <Card className="text-center p-6">
              <Target className="w-8 h-8 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">₹25,000</h3>
              <p className="text-gray-600 text-sm">Average first month earnings</p>
            </Card>
            <Card className="text-center p-6">
              <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">85%</h3>
              <p className="text-gray-600 text-sm">Revenue you keep (we take 5-15%)</p>
            </Card>
          </div>

          {/* Step-by-Step Guide */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">5-Step Launch Process</h2>
            <div className="space-y-8">
              {guideSteps.map((step) => (
                <Card key={step.step} className="p-6">
                  <div className="flex items-start gap-6">
                    <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-xl font-semibold">{step.title}</h3>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {step.time}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-4">{step.description}</p>
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Pro Tips:</h4>
                        <ul className="space-y-1">
                          {step.tips.map((tip, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                              <span className="text-green-600 mt-1">•</span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Product Types */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What Can You Sell?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {productTypes.map((product, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{product.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{product.type}</h3>
                      <p className="text-gray-600 text-sm mb-4">{product.description}</p>

                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium text-sm mb-1">Examples:</h4>
                          <ul className="text-sm text-gray-600">
                            {product.examples.map((example, i) => (
                              <li key={i}>• {example}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex justify-between text-sm">
                          <div>
                            <span className="font-medium">Time: </span>
                            <span className="text-gray-600">{product.timeToCreate}</span>
                          </div>
                          <div>
                            <span className="font-medium">Price: </span>
                            <span className="text-green-600">{product.priceRange}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Success Tips */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Success Tips</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-600" />
                  Quick Wins
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Start with problems you've already solved</li>
                  <li>• Create a simple PDF guide first</li>
                  <li>• Price it at ₹500-₹1000 to start</li>
                  <li>• Share in 3-5 relevant communities</li>
                  <li>• Get your first sale within 48 hours</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Building Audience
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Share your journey on LinkedIn</li>
                  <li>• Post helpful tips on Twitter</li>
                  <li>• Answer questions in Stack Overflow</li>
                  <li>• Join relevant Discord/Slack communities</li>
                  <li>• Write technical blog posts</li>
                </ul>
              </Card>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your Journey?</h2>
            <p className="text-gray-600 mb-8">
              Follow this guide and you'll have your first product live in just a few hours.
            </p>
            <Link href="/wizard/income-assessment">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Your Store Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
