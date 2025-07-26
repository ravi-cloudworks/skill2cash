import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to SkillCash</h1>
          <p className="text-gray-600">🚀 Start Your Digital Product Journey</p>
        </div>

        <SignUp
          appearance={{
            elements: {
              formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
              card: "shadow-lg",
            },
          }}
          redirectUrl="/wizard/income-assessment"
        />

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">🎯 Join 2,847 creators earning from skills</p>
        </div>
      </div>
    </div>
  )
}
