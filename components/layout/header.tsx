import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Globe, Plus } from "lucide-react"
import { Banner } from "@/components/banner"

interface HeaderProps {
  title?: string
  subtitle?: string
  showStoreLink?: boolean
  storeUrl?: string
  userType?: "creator" | "admin" | "customer"
  currentPage?: string
}

export function Header({
  title = "Skill2Cash",
  subtitle,
  showStoreLink = false,
  storeUrl,
  userType = "creator",
  currentPage,
}: HeaderProps) {
  return (
    <>
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
              {subtitle && (
                <>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-600">{subtitle}</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-4">
              {/* Store Link for Creators */}
              {userType === "creator" && (
                <div className="flex items-center gap-2">
                  {storeUrl ? (
                    <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
                      <Globe className="w-4 h-4 text-blue-600" />
                      <Link href={`/store/${storeUrl}`} target="_blank" className="text-sm font-medium text-blue-800">
                        View Store
                      </Link>
                    </div>
                  ) : (
                    <Link href="/wizard/income-assessment">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Storefront in 30 Minutes
                      </Button>
                    </Link>
                  )}
                </div>
              )}

              {/* Navigation based on user type */}
              {userType === "creator" && (
                <nav className="hidden md:flex items-center space-x-6">
                  <Link
                    href="/dashboard"
                    className={`${currentPage === "dashboard" ? "text-blue-600 font-medium" : "text-gray-600 hover:text-gray-900"}`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/products/add"
                    className={`${currentPage === "products" ? "text-blue-600 font-medium" : "text-gray-600 hover:text-gray-900"}`}
                  >
                    Add Product
                  </Link>
                  <Link
                    href="/dashboard/analytics"
                    className={`${currentPage === "analytics" ? "text-blue-600 font-medium" : "text-gray-600 hover:text-gray-900"}`}
                  >
                    Analytics
                  </Link>
                  <Link
                    href="/dashboard/messages"
                    className={`${currentPage === "messages" ? "text-blue-600 font-medium" : "text-gray-600 hover:text-gray-900"}`}
                  >
                    Messages
                  </Link>
                </nav>
              )}

              {userType === "admin" && (
                <nav className="hidden md:flex items-center space-x-6">
                  <Link
                    href="/admin"
                    className={`${currentPage === "dashboard" ? "text-red-600 font-medium" : "text-gray-600 hover:text-gray-900"}`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/admin/users"
                    className={`${currentPage === "users" ? "text-red-600 font-medium" : "text-gray-600 hover:text-gray-900"}`}
                  >
                    Users
                  </Link>
                  <Link
                    href="/admin/products"
                    className={`${currentPage === "products" ? "text-red-600 font-medium" : "text-gray-600 hover:text-gray-900"}`}
                  >
                    Products
                  </Link>
                  <Link
                    href="/admin/reports"
                    className={`${currentPage === "reports" ? "text-red-600 font-medium" : "text-gray-600 hover:text-gray-900"}`}
                  >
                    Reports
                  </Link>
                </nav>
              )}
            </div>
          </div>
        </div>
      </header>
      <Banner />
    </>
  )
}
