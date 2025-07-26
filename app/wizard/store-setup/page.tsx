"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Store, CreditCard } from "lucide-react"

export default function StoreSetupPage() {
  const router = useRouter()
  const [storeName, setStoreName] = useState("")
  const [storeDescription, setStoreDescription] = useState("")
  const [upiId, setUpiId] = useState("")
  const [bankAccount, setBankAccount] = useState("")
  const [ifscCode, setIfscCode] = useState("")

  useEffect(() => {
    // Load saved data from localStorage
    const savedData = localStorage.getItem("wizard-store-setup")
    if (savedData) {
      const data = JSON.parse(savedData)
      setStoreName(data.storeName || "")
      setStoreDescription(data.storeDescription || "")
      setUpiId(data.upiId || "")
      setBankAccount(data.bankAccount || "")
      setIfscCode(data.ifscCode || "")
    }
  }, [])

  const handleContinue = () => {
    if (!storeName || !storeDescription || !upiId) {
      alert("Please fill in all required fields")
      return
    }

    // Save data to localStorage
    const data = {
      storeName,
      storeDescription,
      upiId,
      bankAccount,
      ifscCode,
    }
    localStorage.setItem("wizard-store-setup", JSON.stringify(data))

    router.push("/wizard/complete")
  }

  const handleBack = () => {
    router.push("/wizard/product-recommendations")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Store className="w-8 h-8 text-blue-600 mr-2" />
            <CardTitle className="text-2xl">Setup Your Store</CardTitle>
          </div>
          <Progress value={100} className="w-full" />
          <p className="text-sm text-gray-600 mt-2">Step 5 of 5</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="store-name">Store Name *</Label>
            <Input
              id="store-name"
              placeholder="e.g., Tech Solutions Hub"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="store-description">Store Description *</Label>
            <Textarea
              id="store-description"
              placeholder="Describe what your store offers..."
              value={storeDescription}
              onChange={(e) => setStoreDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center mb-4">
              <CreditCard className="w-5 h-5 text-green-600 mr-2" />
              <h3 className="text-lg font-semibold">Payment Settings</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="upi-id">UPI ID * (for receiving payments)</Label>
                <Input
                  id="upi-id"
                  placeholder="your-upi-id@paytm"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">This will be used to generate QR codes for payments</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bank-account">Bank Account Number (Optional)</Label>
                  <Input
                    id="bank-account"
                    placeholder="Account number"
                    value={bankAccount}
                    onChange={(e) => setBankAccount(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="ifsc-code">IFSC Code (Optional)</Label>
                  <Input
                    id="ifsc-code"
                    placeholder="IFSC code"
                    value={ifscCode}
                    onChange={(e) => setIfscCode(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button onClick={handleContinue}>
              Complete Setup
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
