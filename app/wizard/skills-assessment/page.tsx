"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Star } from "lucide-react"

const skillsByRole = {
  "hr-generalist": [
    { name: "Recruitment & Selection", level: 0 },
    { name: "Employee Onboarding", level: 0 },
    { name: "Performance Management", level: 0 },
    { name: "HRIS Management", level: 0 },
    { name: "Employee Relations", level: 0 },
    { name: "Policy Development", level: 0 },
    { name: "Compensation Planning", level: 0 },
    { name: "Training Coordination", level: 0 },
    { name: "Exit Interviews", level: 0 },
    { name: "HR Analytics", level: 0 },
  ],
  "talent-acquisition": [
    { name: "Candidate Sourcing", level: 0 },
    { name: "Boolean Search Techniques", level: 0 },
    { name: "Interview Techniques", level: 0 },
    { name: "ATS Management", level: 0 },
    { name: "Employer Branding", level: 0 },
    { name: "Social Media Recruiting", level: 0 },
    { name: "Candidate Assessment", level: 0 },
    { name: "Offer Negotiation", level: 0 },
    { name: "Recruitment Analytics", level: 0 },
    { name: "Diversity Hiring", level: 0 },
  ],
  "learning-development": [
    { name: "Training Design", level: 0 },
    { name: "Curriculum Development", level: 0 },
    { name: "Leadership Development", level: 0 },
    { name: "Performance Coaching", level: 0 },
    { name: "E-learning Platforms", level: 0 },
    { name: "Learning Analytics", level: 0 },
    { name: "Succession Planning", level: 0 },
    { name: "Competency Mapping", level: 0 },
    { name: "Training Evaluation", level: 0 },
    { name: "Change Management", level: 0 },
  ],
  "hr-compliance": [
    { name: "Labor Law Knowledge", level: 0 },
    { name: "Policy Development", level: 0 },
    { name: "Compliance Auditing", level: 0 },
    { name: "Risk Management", level: 0 },
    { name: "Documentation Management", level: 0 },
    { name: "Regulatory Reporting", level: 0 },
    { name: "Investigation Procedures", level: 0 },
    { name: "Workplace Safety", level: 0 },
    { name: "Data Privacy (GDPR)", level: 0 },
    { name: "Ethics & Governance", level: 0 },
  ],
  "compensation-benefits": [
    { name: "Salary Benchmarking", level: 0 },
    { name: "Job Evaluation", level: 0 },
    { name: "Benefits Administration", level: 0 },
    { name: "Payroll Management", level: 0 },
    { name: "Incentive Design", level: 0 },
    { name: "Total Rewards Strategy", level: 0 },
    { name: "Market Analysis", level: 0 },
    { name: "Cost Analysis", level: 0 },
    { name: "Equity Compensation", level: 0 },
    { name: "Retirement Planning", level: 0 },
  ],
  "employee-relations": [
    { name: "Conflict Resolution", level: 0 },
    { name: "Employee Engagement", level: 0 },
    { name: "Culture Development", level: 0 },
    { name: "Grievance Handling", level: 0 },
    { name: "Communication Strategies", level: 0 },
    { name: "Team Building", level: 0 },
    { name: "Survey Design", level: 0 },
    { name: "Mediation Skills", level: 0 },
    { name: "Workplace Wellness", level: 0 },
    { name: "Recognition Programs", level: 0 },
  ],
}

const skillLevels = [
  { level: 1, label: "Beginner", description: "Basic understanding" },
  { level: 2, label: "Intermediate", description: "Some experience" },
  { level: 3, label: "Advanced", description: "Proficient" },
  { level: 4, label: "Expert", description: "Highly skilled" },
  { level: 5, label: "Master", description: "Industry expert" },
]

export default function SkillsAssessmentPage() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<string>("")
  const [skills, setSkills] = useState<{ name: string; level: number }[]>([])

  useEffect(() => {
    const role = localStorage.getItem("selectedRole")
    if (role && skillsByRole[role as keyof typeof skillsByRole]) {
      setSelectedRole(role)
      setSkills(skillsByRole[role as keyof typeof skillsByRole])
    } else {
      router.push("/wizard/role-selection")
    }
  }, [router])

  const updateSkillLevel = (skillIndex: number, level: number) => {
    const updatedSkills = [...skills]
    updatedSkills[skillIndex].level = level
    setSkills(updatedSkills)
  }

  const handleNext = () => {
    // Store the skills assessment
    localStorage.setItem("skillsAssessment", JSON.stringify(skills))
    router.push("/wizard/product-recommendations")
  }

  const handleBack = () => {
    router.push("/wizard/role-selection")
  }

  const completedSkills = skills.filter((skill) => skill.level > 0).length
  const progressPercentage = (completedSkills / skills.length) * 100

  if (!selectedRole) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <span>Step 3 of 6</span>
            <span>50% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: "50%" }}></div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Rate Your Skills</h1>
          <p className="text-lg text-gray-600 mb-4">Help us understand your expertise level in key HR areas</p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              Progress: {completedSkills} of {skills.length} skills rated ({Math.round(progressPercentage)}%)
            </p>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="space-y-6 mb-8">
          {skills.map((skill, index) => (
            <Card key={skill.name} className="overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center justify-between">
                  {skill.name}
                  {skill.level > 0 && (
                    <Badge variant="outline" className="ml-2">
                      {skillLevels[skill.level - 1].label}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {skillLevels.map((levelInfo) => (
                    <Button
                      key={levelInfo.level}
                      variant={skill.level === levelInfo.level ? "default" : "outline"}
                      size="sm"
                      className="flex flex-col items-center p-3 h-auto"
                      onClick={() => updateSkillLevel(index, levelInfo.level)}
                    >
                      <div className="flex mb-1">
                        {[...Array(5)].map((_, starIndex) => (
                          <Star
                            key={starIndex}
                            className={`w-3 h-3 ${
                              starIndex < levelInfo.level ? "fill-current text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-medium">{levelInfo.label}</span>
                      <span className="text-xs text-gray-500">{levelInfo.description}</span>
                    </Button>
                  ))}
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
          <Button onClick={handleNext} disabled={completedSkills === 0}>
            Next: Product Recommendations
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
