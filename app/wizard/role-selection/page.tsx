"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Users, UserCheck, GraduationCap, Shield, Calculator, Heart } from "lucide-react"

const roles = [
  {
    id: "hr-generalist",
    title: "HR Generalist",
    description: "Handle end-to-end HR operations including recruitment, employee relations, and policy implementation",
    icon: Users,
    color: "bg-blue-500",
    skills: ["Recruitment", "Employee Relations", "Policy Development", "HRIS Management"],
    earning: "₹8-15 LPA",
  },
  {
    id: "talent-acquisition",
    title: "Talent Acquisition Specialist",
    description: "Focus on sourcing, recruiting, and hiring top talent for organizations",
    icon: UserCheck,
    color: "bg-green-500",
    skills: ["Sourcing", "Interview Techniques", "ATS Management", "Employer Branding"],
    earning: "₹6-12 LPA",
  },
  {
    id: "learning-development",
    title: "Learning & Development Manager",
    description: "Design and implement training programs to enhance employee skills and performance",
    icon: GraduationCap,
    color: "bg-purple-500",
    skills: ["Training Design", "Leadership Development", "Performance Coaching", "E-learning"],
    earning: "₹10-18 LPA",
  },
  {
    id: "hr-compliance",
    title: "HR Compliance Officer",
    description: "Ensure organizational compliance with labor laws and regulatory requirements",
    icon: Shield,
    color: "bg-red-500",
    skills: ["Labor Law", "Policy Development", "Compliance Auditing", "Risk Management"],
    earning: "₹8-16 LPA",
  },
  {
    id: "compensation-benefits",
    title: "Compensation & Benefits Analyst",
    description: "Design and manage compensation structures and employee benefits programs",
    icon: Calculator,
    color: "bg-orange-500",
    skills: ["Salary Benchmarking", "Job Evaluation", "Benefits Administration", "Payroll Management"],
    earning: "₹9-17 LPA",
  },
  {
    id: "employee-relations",
    title: "Employee Relations Specialist",
    description: "Foster positive workplace culture and resolve employee conflicts and grievances",
    icon: Heart,
    color: "bg-pink-500",
    skills: ["Conflict Resolution", "Employee Engagement", "Culture Development", "Grievance Handling"],
    earning: "₹7-14 LPA",
  },
]

export default function RoleSelectionPage() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<string>("")

  const handleNext = () => {
    if (selectedRole) {
      // Store the selected role
      localStorage.setItem("selectedRole", selectedRole)
      router.push("/wizard/skills-assessment")
    }
  }

  const handleBack = () => {
    router.push("/wizard/income-assessment")
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <span>Step 2 of 6</span>
            <span>33% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: "33%" }}></div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">What's Your HR Role?</h1>
          <p className="text-lg text-gray-600">
            Select your primary HR specialization to get personalized product recommendations
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {roles.map((role) => {
            const IconComponent = role.icon
            return (
              <Card
                key={role.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedRole === role.id ? "ring-2 ring-blue-500 shadow-lg" : "hover:shadow-md"
                }`}
                onClick={() => setSelectedRole(role.id)}
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`${role.color} p-3 rounded-lg text-white`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{role.title}</CardTitle>
                      <Badge variant="outline" className="mb-2">
                        {role.earning}
                      </Badge>
                      <p className="text-gray-600 text-sm">{role.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div>
                    <h4 className="font-medium text-sm mb-2">Key Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {role.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button onClick={handleNext} disabled={!selectedRole}>
            Next: Skills Assessment
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
