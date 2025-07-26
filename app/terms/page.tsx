import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last updated: January 26, 2025</p>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using Skill2Cash, you accept and agree to be bound by the terms and provision of this
                agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
              <p>
                Skill2Cash is a platform that enables creators to sell digital products. We provide tools for creating
                storefronts, processing payments, and delivering digital content to customers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
              <p>To use our service, you must:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Be at least 18 years old</li>
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account</li>
                <li>Be responsible for all activities under your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Content Guidelines</h2>
              <p>You agree not to upload or sell content that:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Violates any laws or regulations</li>
                <li>Infringes on intellectual property rights</li>
                <li>Contains malicious code or viruses</li>
                <li>Is fraudulent or misleading</li>
                <li>Contains adult or inappropriate content</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Fees and Payments</h2>
              <p>Skill2Cash charges a platform fee on each successful transaction. Current fees are:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Free Plan: 15% per transaction</li>
                <li>Pro Plan: 10% per transaction + ₹999/month</li>
                <li>Enterprise Plan: 5% per transaction + ₹4,999/month</li>
              </ul>
              <p>Fees are subject to change with 30 days notice. Payment processing fees may apply separately.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>
              <p>
                You retain ownership of your content. By using our service, you grant us a license to host, display, and
                distribute your content as necessary to provide the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Refunds and Disputes</h2>
              <p>
                Refund policies are set by individual creators. Skill2Cash may facilitate dispute resolution but is not
                responsible for refund decisions. We reserve the right to issue refunds in cases of fraud or policy
                violations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Termination</h2>
              <p>
                We may terminate or suspend your account at any time for violations of these terms. You may terminate
                your account at any time by contacting support.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
              <p>
                Skill2Cash shall not be liable for any indirect, incidental, special, consequential, or punitive
                damages, or any loss of profits or revenues.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will notify users of significant changes via
                email or platform notifications.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Information</h2>
              <p>For questions about these terms, please contact us at:</p>
              <ul className="list-none space-y-2">
                <li>Email: legal@skill2cash.com</li>
                <li>Address: Koramangala, Bangalore, Karnataka, India 560034</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
