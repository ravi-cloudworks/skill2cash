import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function CookiesPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: January 26, 2025</p>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Cookies?</h2>
              <p>
                Cookies are small text files that are stored on your device when you visit our website. They help us
                provide you with a better experience by remembering your preferences and analyzing how you use our site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Cookies</h2>
              <p>We use cookies for several purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Essential Cookies:</strong> Required for the website to function properly
                </li>
                <li>
                  <strong>Performance Cookies:</strong> Help us understand how visitors interact with our website
                </li>
                <li>
                  <strong>Functionality Cookies:</strong> Remember your preferences and settings
                </li>
                <li>
                  <strong>Marketing Cookies:</strong> Used to deliver relevant advertisements
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Types of Cookies We Use</h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Essential Cookies</h3>
              <p>These cookies are necessary for the website to function and cannot be switched off:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Authentication cookies to keep you logged in</li>
                <li>Security cookies to protect against fraud</li>
                <li>Session cookies to maintain your shopping cart</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Analytics Cookies</h3>
              <p>These cookies help us understand how our website is being used:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Google Analytics to track website usage</li>
                <li>Performance monitoring cookies</li>
                <li>Error tracking cookies</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Marketing Cookies</h3>
              <p>These cookies are used to deliver relevant advertisements:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Social media tracking pixels</li>
                <li>Advertising network cookies</li>
                <li>Retargeting cookies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Your Cookie Preferences</h2>
              <p>You can control and manage cookies in several ways:</p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Browser Settings</h3>
              <p>Most browsers allow you to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>View what cookies are stored on your device</li>
                <li>Delete cookies</li>
                <li>Block cookies from specific sites</li>
                <li>Block all cookies</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Cookie Consent</h3>
              <p>
                When you first visit our website, you'll see a cookie banner where you can choose which types of cookies
                to accept. You can change your preferences at any time by clicking the cookie settings link in our
                footer.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Cookies</h2>
              <p>We use services from third parties that may set their own cookies:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Google Analytics:</strong> For website analytics
                </li>
                <li>
                  <strong>Payment Processors:</strong> For secure payment processing
                </li>
                <li>
                  <strong>Social Media:</strong> For social sharing features
                </li>
                <li>
                  <strong>Customer Support:</strong> For chat and support features
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookie Retention</h2>
              <p>Different cookies have different lifespans:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Session Cookies:</strong> Deleted when you close your browser
                </li>
                <li>
                  <strong>Persistent Cookies:</strong> Remain on your device for a set period or until deleted
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> Typically expire after 2 years
                </li>
                <li>
                  <strong>Marketing Cookies:</strong> Usually expire after 30-90 days
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Updates to This Policy</h2>
              <p>
                We may update this cookie policy from time to time to reflect changes in our practices or for other
                operational, legal, or regulatory reasons. Please check this page periodically for updates.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p>If you have any questions about our use of cookies, please contact us at:</p>
              <ul className="list-none space-y-2">
                <li>Email: privacy@skill2cash.com</li>
                <li>Address: Koramangala, Bangalore, Karnataka, India 560034</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
