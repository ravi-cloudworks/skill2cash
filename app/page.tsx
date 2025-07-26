"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Users,
  TrendingUp,
  Shield,
  Zap,
  Star,
  CheckCircle,
  UserCheck,
  GraduationCap,
  Calculator,
  Heart,
  FileText,
  Award,
  Target,
  Globe,
} from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

const skills = [
  { name: "Recruitment", icon: UserCheck, color: "bg-blue-500" },
  { name: "Performance Management", icon: Target, color: "bg-green-500" },
  { name: "Training & Development", icon: GraduationCap, color: "bg-purple-500" },
  { name: "HR Compliance", icon: Shield, color: "bg-red-500" },
  { name: "Compensation & Benefits", icon: Calculator, color: "bg-orange-500" },
  { name: "Employee Relations", icon: Heart, color: "bg-pink-500" },
]

const successStories = [
  {
    name: "Priya Sharma",
    role: "HR Manager",
    company: "Tech Startup",
    product: "Employee Onboarding Templates",
    earnings: "₹1,85,000",
    timeframe: "6 months",
    image: "/placeholder.svg?height=60&width=60",
    quote: "My onboarding templates have helped 200+ companies streamline their hiring process.",
  },
  {
    name: "Rajesh Kumar",
    role: "L&D Manager",
    company: "Fortune 500",
    product: "Leadership Development Program",
    earnings: "₹3,20,000",
    timeframe: "8 months",
    image: "/placeholder.svg?height=60&width=60",
    quote: "Created a comprehensive leadership program that's now used by 50+ organizations.",
  },
  {
    name: "Anita Desai1",
    role: "HR Compliance Officer",
    company: "Manufacturing",
    product: "HR Policy Templates",
    earnings: "₹2,45,000",
    timeframe: "4 months",
    image: "/placeholder.svg?height=60&width=60",
    quote: "My policy templates ensure legal compliance for SMEs across India.",
  },
]

const productCategories = [
  {
    name: "Recruitment & Talent Acquisition",
    description: "Job descriptions, interview guides, assessment tools",
    icon: UserCheck,
    products: 150,
    avgPrice: "₹1,899",
  },
  {
    name: "Learning & Development",
    description: "Training programs, leadership courses, skill assessments",
    icon: GraduationCap,
    products: 120,
    avgPrice: "₹2,499",
  },
  {
    name: "HR Compliance & Policies",
    description: "Policy templates, compliance checklists, legal guides",
    icon: FileText,
    products: 200,
    avgPrice: "₹2,199",
  },
  {
    name: "Compensation & Benefits",
    description: "Salary benchmarking, benefits design, incentive programs",
    icon: Calculator,
    products: 80,
    avgPrice: "₹2,799",
  },
  {
    name: "Employee Relations & Engagement",
    description: "Survey tools, culture guides, conflict resolution",
    icon: Heart,
    products: 95,
    avgPrice: "₹1,699",
  },
  {
    name: "Performance Management",
    description: "Review systems, goal-setting templates, feedback tools",
    icon: Target,
    products: 110,
    avgPrice: "₹2,299",
  },
]

export default function HomePage() {
  const [selectedSkill, setSelectedSkill] = useState("")

  return (
    <div className="min-h-screen bg-white">
      <Header userType="visitor" />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-100">
              🚀 Join 2,500+ HR Professionals Already Earning
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Turn Your HR Expertise Into{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Cash</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Create and sell HR templates, training programs, and policy documents. Transform your years of experience
              into a profitable digital business.
            </p>

            {/* Quick Skill Selector */}
            <div className="mb-8">
              <p className="text-sm text-gray-500 mb-4">What's your HR specialty?</p>
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {skills.map((skill) => {
                  const IconComponent = skill.icon
                  return (
                    <Button
                      key={skill.name}
                      variant={selectedSkill === skill.name ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSkill(skill.name)}
                      className="flex items-center gap-2"
                    >
                      <IconComponent className="w-4 h-4" />
                      {skill.name}
                    </Button>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/wizard/income-assessment">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                  Start Earning Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/store/ravi-hr-hub">
                <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent">
                  View Success Story
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>2,500+ HR Professionals</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>₹12.5Cr+ Total Earnings</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-current text-yellow-400" />
                <span>4.8/5 Creator Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">HR Professionals Are Already Earning</h2>
            <p className="text-lg text-gray-600">See how HR experts are monetizing their knowledge and experience</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {successStories.map((story, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <img
                      src={story.image || "/placeholder.svg"}
                      alt={story.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{story.name}</h3>
                      <p className="text-sm text-gray-600">
                        {story.role} at {story.company}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <blockquote className="text-gray-700 italic">"{story.quote}"</blockquote>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-green-800">Product:</span>
                        <Badge variant="outline" className="text-green-700 border-green-300">
                          {story.product}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-green-600">{story.earnings}</span>
                        <span className="text-sm text-green-600">in {story.timeframe}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What HR Products Can You Create?</h2>
            <p className="text-lg text-gray-600">
              Turn your expertise into profitable digital products across these categories
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {productCategories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <IconComponent className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{category.products} products</span>
                      <span className="font-semibold text-green-600">{category.avgPrice} avg</span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why HR Professionals Choose Skill2Cash</h2>
            <p className="text-lg text-gray-600">Everything you need to monetize your HR expertise</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Setup</h3>
              <p className="text-gray-600">Launch your HR product store in under 10 minutes with our guided wizard</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600">UPI integration ensures instant, secure payments directly to your account</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
              <p className="text-gray-600">Sell to HR professionals worldwide with automatic digital delivery</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-600">Get guidance from successful HR entrepreneurs and our support team</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Monetize Your HR Expertise?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of HR professionals who are already earning from their knowledge. Start your journey today
            with our free setup wizard.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/wizard/income-assessment">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
                Start Free Setup
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 text-lg px-8 py-3 bg-transparent"
              >
                Learn More
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm opacity-80">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Free to start</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>No monthly fees</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Instant payouts</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
