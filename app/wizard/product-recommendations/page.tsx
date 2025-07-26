"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Star, Clock, Users } from "lucide-react"

const productsByRole = {
  "hr-generalist": [
    {
      id: "employee-handbook-template",
      title: "Complete Employee Handbook Template",
      description: "Comprehensive 50-page employee handbook template with policies, procedures, and legal compliance",
      price: 1999,
      originalPrice: 2999,
      rating: 4.8,
      reviews: 156,
      sales: 890,
      category: "Policy Templates",
      includes: ["50+ page template", "Legal compliance checklist", "Customizable sections", "HR policy library"],
      timeToCreate: "2-3 weeks",
      difficulty: "Intermediate",
    },
    {
      id: "onboarding-kit",
      title: "New Employee Onboarding Kit",
      description: "Complete onboarding system with checklists, forms, and training materials",
      price: 1499,
      originalPrice: 2199,
      rating: 4.7,
      reviews: 203,
      sales: 1240,
      category: "Onboarding",
      includes: ["Onboarding checklist", "Welcome packet template", "Training schedule", "Feedback forms"],
      timeToCreate: "1-2 weeks",
      difficulty: "Beginner",
    },
    {
      id: "performance-review-system",
      title: "360-Degree Performance Review System",
      description: "Complete performance evaluation system with forms, rubrics, and feedback templates",
      price: 2299,
      originalPrice: 3199,
      rating: 4.9,
      reviews: 89,
      sales: 567,
      category: "Performance Management",
      includes: ["Review forms", "Rating rubrics", "Goal-setting templates", "Development plans"],
      timeToCreate: "3-4 weeks",
      difficulty: "Advanced",
    },
  ],
  "talent-acquisition": [
    {
      id: "recruitment-playbook",
      title: "Complete Recruitment Playbook",
      description: "End-to-end recruitment guide with sourcing strategies, interview guides, and assessment tools",
      price: 2499,
      originalPrice: 3499,
      rating: 4.9,
      reviews: 234,
      sales: 1450,
      category: "Recruitment",
      includes: ["Sourcing strategies", "Interview question bank", "Assessment rubrics", "Offer templates"],
      timeToCreate: "4-5 weeks",
      difficulty: "Advanced",
    },
    {
      id: "interview-guide-collection",
      title: "Behavioral Interview Guide Collection",
      description: "200+ behavioral interview questions with scoring guides for different roles",
      price: 1799,
      originalPrice: 2599,
      rating: 4.6,
      reviews: 178,
      sales: 890,
      category: "Interviewing",
      includes: ["200+ questions", "Scoring guides", "Role-specific questions", "STAR method guide"],
      timeToCreate: "2-3 weeks",
      difficulty: "Intermediate",
    },
    {
      id: "job-description-templates",
      title: "Job Description Template Library",
      description: "100+ job description templates across industries with legal compliance",
      price: 1299,
      originalPrice: 1899,
      rating: 4.5,
      reviews: 312,
      sales: 1890,
      category: "Job Descriptions",
      includes: ["100+ templates", "Legal compliance", "Skills matrices", "Salary benchmarks"],
      timeToCreate: "1-2 weeks",
      difficulty: "Beginner",
    },
  ],
  "learning-development": [
    {
      id: "leadership-development-program",
      title: "Leadership Development Program Curriculum",
      description: "12-week leadership program with modules, activities, and assessment tools",
      price: 3499,
      originalPrice: 4999,
      rating: 4.8,
      reviews: 67,
      sales: 234,
      category: "Leadership",
      includes: ["12 training modules", "Activity worksheets", "Assessment tools", "Facilitator guides"],
      timeToCreate: "6-8 weeks",
      difficulty: "Expert",
    },
    {
      id: "training-template-library",
      title: "Corporate Training Template Library",
      description: "50+ training templates for soft skills, compliance, and technical training",
      price: 1999,
      originalPrice: 2999,
      rating: 4.7,
      reviews: 145,
      sales: 678,
      category: "Training Design",
      includes: ["50+ templates", "Presentation slides", "Activity guides", "Evaluation forms"],
      timeToCreate: "3-4 weeks",
      difficulty: "Intermediate",
    },
    {
      id: "competency-framework",
      title: "Competency Framework Builder",
      description: "Complete system for building role-based competency frameworks",
      price: 2799,
      originalPrice: 3999,
      rating: 4.9,
      reviews: 89,
      sales: 345,
      category: "Competency Management",
      includes: ["Framework templates", "Assessment tools", "Development plans", "Progress tracking"],
      timeToCreate: "4-5 weeks",
      difficulty: "Advanced",
    },
  ],
  "hr-compliance": [
    {
      id: "hr-policy-library",
      title: "Complete HR Policy Library",
      description: "100+ HR policies covering all aspects of employment law and best practices",
      price: 2999,
      originalPrice: 4299,
      rating: 4.9,
      reviews: 123,
      sales: 567,
      category: "Policies",
      includes: ["100+ policies", "Legal updates", "Implementation guides", "Compliance checklists"],
      timeToCreate: "5-6 weeks",
      difficulty: "Expert",
    },
    {
      id: "compliance-audit-toolkit",
      title: "HR Compliance Audit Toolkit",
      description: "Comprehensive audit checklists and tools for HR compliance assessment",
      price: 1899,
      originalPrice: 2799,
      rating: 4.6,
      reviews: 98,
      sales: 456,
      category: "Compliance",
      includes: ["Audit checklists", "Risk assessment tools", "Corrective action plans", "Reporting templates"],
      timeToCreate: "3-4 weeks",
      difficulty: "Advanced",
    },
    {
      id: "labor-law-guide",
      title: "Labor Law Compliance Guide",
      description: "State-wise labor law guide with updates and compliance requirements",
      price: 2199,
      originalPrice: 3199,
      rating: 4.8,
      reviews: 156,
      sales: 789,
      category: "Legal Compliance",
      includes: ["State-wise guides", "Regular updates", "Compliance calendar", "Legal templates"],
      timeToCreate: "4-5 weeks",
      difficulty: "Expert",
    },
  ],
  "compensation-benefits": [
    {
      id: "salary-benchmarking-tool",
      title: "Salary Benchmarking Toolkit",
      description: "Complete toolkit for salary surveys, market analysis, and compensation planning",
      price: 2799,
      originalPrice: 3999,
      rating: 4.7,
      reviews: 134,
      sales: 445,
      category: "Compensation",
      includes: ["Survey templates", "Analysis tools", "Market data", "Reporting dashboards"],
      timeToCreate: "4-5 weeks",
      difficulty: "Advanced",
    },
    {
      id: "benefits-design-guide",
      title: "Employee Benefits Design Guide",
      description: "Comprehensive guide for designing competitive benefits packages",
      price: 2199,
      originalPrice: 3199,
      rating: 4.8,
      reviews: 89,
      sales: 234,
      category: "Benefits",
      includes: ["Benefits comparison", "Cost analysis", "Communication templates", "Enrollment guides"],
      timeToCreate: "3-4 weeks",
      difficulty: "Intermediate",
    },
    {
      id: "incentive-program-templates",
      title: "Incentive Program Templates",
      description: "Ready-to-use templates for various incentive and recognition programs",
      price: 1599,
      originalPrice: 2299,
      rating: 4.5,
      reviews: 167,
      sales: 678,
      category: "Incentives",
      includes: ["Program templates", "Calculation tools", "Communication kits", "Tracking systems"],
      timeToCreate: "2-3 weeks",
      difficulty: "Intermediate",
    },
  ],
  "employee-relations": [
    {
      id: "engagement-survey-toolkit",
      title: "Employee Engagement Survey Toolkit",
      description: "Complete survey system with questions, analysis tools, and action planning",
      price: 1799,
      originalPrice: 2599,
      rating: 4.6,
      reviews: 198,
      sales: 890,
      category: "Engagement",
      includes: ["Survey templates", "Analysis tools", "Action plan templates", "Communication guides"],
      timeToCreate: "2-3 weeks",
      difficulty: "Intermediate",
    },
    {
      id: "culture-development-toolkit",
      title: "Culture Development Toolkit",
      description: "Tools and templates for building and maintaining positive workplace culture",
      price: 2299,
      originalPrice: 3299,
      rating: 4.8,
      reviews: 123,
      sales: 456,
      category: "Culture",
      includes: ["Culture assessment", "Development plans", "Communication strategies", "Measurement tools"],
      timeToCreate: "4-5 weeks",
      difficulty: "Advanced",
    },
    {
      id: "conflict-resolution-guide",
      title: "Conflict Resolution Guide",
      description: "Step-by-step guide for handling workplace conflicts and grievances",
      price: 1499,
      originalPrice: 2199,
      rating: 4.7,
      reviews: 234,
      sales: 1234,
      category: "Conflict Resolution",
      includes: ["Resolution frameworks", "Mediation guides", "Documentation templates", "Prevention strategies"],
      timeToCreate: "2-3 weeks",
      difficulty: "Intermediate",
    },
  ],
}

export default function ProductRecommendationsPage() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<string>("")
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    const role = localStorage.getItem("selectedRole")
    if (role && productsByRole[role as keyof typeof productsByRole]) {
      setSelectedRole(role)
      setProducts(productsByRole[role as keyof typeof productsByRole])
    } else {
      router.push("/wizard/role-selection")
    }
  }, [router])

  const toggleProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const handleNext = () => {
    localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts))
    router.push("/wizard/store-setup")
  }

  const handleBack = () => {
    router.push("/wizard/skills-assessment")
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-orange-100 text-orange-800"
      case "Expert":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!selectedRole) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <span>Step 4 of 6</span>
            <span>67% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: "67%" }}></div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Recommended Products for You</h1>
          <p className="text-lg text-gray-600 mb-4">
            Based on your role and skills, here are products you could create and sell
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              Selected: {selectedProducts.length} products • Potential monthly earnings:{" "}
              {formatCurrency(selectedProducts.length * 15000)}
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedProducts.includes(product.id) ? "ring-2 ring-blue-500 shadow-lg" : "hover:shadow-md"
              }`}
              onClick={() => toggleProduct(product.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg line-clamp-2">{product.title}</CardTitle>
                  <Badge variant="outline">{product.category}</Badge>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Price and Stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-green-600">{formatCurrency(product.price)}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {formatCurrency(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Rating and Sales */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current text-yellow-400" />
                      <span className="font-medium">{product.rating}</span>
                      <span className="text-gray-500">({product.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Users className="w-4 h-4" />
                      <span>{product.sales} sales</span>
                    </div>
                  </div>

                  {/* Creation Info */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{product.timeToCreate}</span>
                    </div>
                    <Badge className={getDifficultyColor(product.difficulty)}>{product.difficulty}</Badge>
                  </div>

                  {/* What's Included */}
                  <div>
                    <h4 className="font-medium text-sm mb-2">What's included:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {product.includes.slice(0, 3).map((item: string, index: number) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-blue-600 rounded-full" />
                          {item}
                        </li>
                      ))}
                      {product.includes.length > 3 && (
                        <li className="text-blue-600">+{product.includes.length - 3} more items</li>
                      )}
                    </ul>
                  </div>

                  {/* Selection Indicator */}
                  {selectedProducts.includes(product.id) && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 text-center">
                      <span className="text-sm font-medium text-blue-800">✓ Selected for your store</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button onClick={handleNext} disabled={selectedProducts.length === 0}>
            Next: Store Setup
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
