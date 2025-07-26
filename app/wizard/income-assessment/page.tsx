"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, DollarSign } from "lucide-react"

export default function IncomeAssessmentPage() {
  const router = useRouter()
  const [currentIncome, setCurrentIncome] = useState("")
  const [targetIncome, setTargetIncome] = useState("")
  const [timeframe, setTimeframe] = useState("")
  const [experience, setExperience] = useState("")

  useEffect(() => {
    // Load saved data from localStorage
    const savedData = localStorage.getItem("wizard-income-assessment")
    if (savedData) {
      const data = JSON.parse(savedData)
      setCurrentIncome(data.currentIncome || "")
      setTargetIncome(data.targetIncome || "")
      setTimeframe(data.timeframe || "")
      setExperience(data.experience || "")
    }
  }, [])

  const handleContinue = () => {
    if (!currentIncome || !targetIncome || !timeframe || !experience) {
      alert("Please fill in all fields")
      return
    }

    // Save data to localStorage
    const data = {
      currentIncome,
      targetIncome,
      timeframe,
      experience,
    }
    localStorage.setItem("wizard-income-assessment", JSON.stringify(data))

    router.push("/wizard/role-selection")
  }

  const handleBack = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <DollarSign className="w-8 h-8 text-green-600 mr-2" />
            <CardTitle className="text-2xl">Income Assessment</CardTitle>
          </div>
          <Progress value={20} className="w-full" />
          <p className="text-sm text-gray-600 mt-2">Step 1 of 5</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="current-income">Current Monthly Income (₹)</Label>
              <Input
                id="current-income"
                type="number"
                placeholder="e.g., 50000"
                value={currentIncome}
                onChange={(e) => setCurrentIncome(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="target-income">Target Monthly Income (₹)</Label>
              <Input
                id="target-income"
                type="number"
                placeholder="e.g., 100000"
                value={targetIncome}
                onChange={(e) => setTargetIncome(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="timeframe">When do you want to achieve this?</Label>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger>
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3-months">Within 3 months</SelectItem>
                <SelectItem value="6-months">Within 6 months</SelectItem>
                <SelectItem value="1-year">Within 1 year</SelectItem>
                <SelectItem value="2-years">Within 2 years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="experience">Your current experience level</Label>
            <Select value={experience} onValueChange={setExperience}>
              <SelectTrigger>
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                <SelectItem value="experienced">Experienced (5+ years)</SelectItem>
                <SelectItem value="expert">Expert (10+ years)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <Button onClick={handleContinue}>
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
