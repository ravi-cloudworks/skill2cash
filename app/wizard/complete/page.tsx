"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle, Store, DollarSign, Package, CreditCard } from "lucide-react"

export default function WizardCompletePage() {
  const router = useRouter()
  const [wizardData, setWizardData] = useState<any>({})

  useEffect(() => {
    // Load all wizard data
    const incomeData = JSON.parse(localStorage.getItem("wizard-income-assessment") || "{}")
    const roleData = JSON.parse(localStorage.getItem("wizard-role-selection") || "{}")
    const skillsData = JSON.parse(localStorage.getItem("wizard-skills-assessment") || "{}")
    const productsData = JSON.parse(localStorage.getItem("wizard-product-recommendations") || "{}")
    const storeData = JSON.parse(localStorage.getItem("wizard-store-setup") || "{}")

    setWizardData({
      income: incomeData,
      role: roleData,
      skills: skillsData,
      products: productsData,
      store: storeData,
    })
  }, [])

  const handleGoToDashboard = () => {
    // Save completion status
    localStorage.setItem("wizard-completed", "true")
    router.push("/dashboard")
  }

  const handleBack = () => {
    router.push("/wizard/store-setup")
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <CardTitle className="text-3xl text-green-600">Congratulations!</CardTitle>
          <p className="text-gray-600 mt-2">Your Skill2Cash store is ready to launch</p>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-blue-50">
              <CardContent className="p-4 text-center">
                <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold">Income Goal</h3>
                <p className="text-sm text-gray-600">
                  {formatCurrency(Number.parseInt(wizardData.income?.targetIncome || "0"))}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-purple-50">
              <CardContent className="p-4 text-center">
                <Store className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold">Store Name</h3>
                <p className="text-sm text-gray-600">{wizardData.store?.storeName || "Not set"}</p>
              </CardContent>
            </Card>

            <Card className="bg-green-50">
              <CardContent className="p-4 text-center">
                <Package className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold">Products</h3>
                <p className="text-sm text-gray-600">{wizardData.products?.customizedProducts?.length || 0} ready</p>
              </CardContent>
            </Card>

            <Card className="bg-orange-50">
              <CardContent className="p-4 text-center">
                <CreditCard className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <h3 className="font-semibold">Payment Setup</h3>
                <p className="text-sm text-gray-600">{wizardData.store?.upiId ? "UPI Ready" : "Not configured"}</p>
              </CardContent>
            </Card>
          </div>

          {/* Selected Skills */}
          {wizardData.skills?.selectedSkills && (
            <div>
              <h3 className="font-semibold mb-3">Your Selected Skills</h3>
              <div className="flex flex-wrap gap-2">
                {wizardData.skills.selectedSkills.map((skill: string) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Products Preview */}
          {wizardData.products?.customizedProducts && (
            <div>
              <h3 className="font-semibold mb-3">Your Products</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {wizardData.products.customizedProducts.map((product: any) => (
                  <Card key={product.id} className="bg-gray-50">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">{product.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{product.customDescription}</p>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">{product.category}</Badge>
                        <span className="font-semibold text-green-600">{formatCurrency(product.price)}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-3">What's Next?</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Access your dashboard to manage products</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Customize your store further</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Start selling and track your progress</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Monitor analytics and optimize</span>
              </li>
            </ul>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Store Setup
            </Button>
            <Button onClick={handleGoToDashboard} size="lg" className="bg-green-600 hover:bg-green-700">
              Go to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
