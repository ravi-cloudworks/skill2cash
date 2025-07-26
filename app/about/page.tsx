import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Users, Target, Zap, Heart } from "lucide-react"

export default function AboutPage() {
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
            <h1 className="text-4xl font-bold text-gray-900 mb-6">About Skill2Cash</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We believe every developer has valuable skills that can generate sustainable income. Our mission is to
              make it incredibly easy to turn your expertise into cash.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  To democratize income generation for developers by providing the simplest platform to create, sell,
                  and deliver digital products. We want every developer to have the opportunity to build a sustainable
                  side income from their skills.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-green-600" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  A world where every developer can turn their skills into cash in just 30 minutes. We envision a future
                  where technical expertise is easily monetized, creating financial freedom for millions of developers
                  worldwide.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Story */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Story</h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="mb-6">
                Skill2Cash was born from a simple frustration: talented developers were struggling to monetize their
                expertise. We saw brilliant engineers creating amazing solutions at work but unable to turn their
                personal projects and knowledge into income.
              </p>
              <p className="mb-6">
                Traditional platforms were too complex, required too much setup, or took huge commissions. We wanted to
                create something different - a platform where you could literally go from idea to income in 30 minutes.
              </p>
              <p className="mb-6">
                Today, over 2,847 developers use Skill2Cash to generate sustainable income from their skills. From
                DevOps engineers selling automation scripts to React developers creating component libraries, our
                community is proof that technical skills can be turned into cash quickly and easily.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-600" />
                    Speed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We believe in rapid execution. Our platform is designed to get you from idea to income in the
                    shortest time possible.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    Community
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We're building a community of creators who support each other's success. Your win is our win.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-600" />
                    Fairness
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We keep our fees low (5-15%) because we believe creators should keep the majority of what they earn.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-blue-50 rounded-lg p-8 mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Platform Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">2,847</div>
                <div className="text-sm text-gray-600">Active Creators</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">₹2.1Cr</div>
                <div className="text-sm text-gray-600">Creator Earnings</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">12,340</div>
                <div className="text-sm text-gray-600">Products Sold</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">30 min</div>
                <div className="text-sm text-gray-600">Average Setup Time</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Join Our Community?</h2>
            <p className="text-gray-600 mb-8">
              Start your journey from skills to cash today. No upfront costs, no complex setup.
            </p>
            <Link href="/wizard/income-assessment">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Your Free Store
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
