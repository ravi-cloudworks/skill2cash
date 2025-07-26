import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S2C</span>
            </div>
            <span className="text-xl font-bold">Skill2Cash</span>
          </div>
          <p className="text-lg text-gray-300 mb-4">Turn Skills Into Cash in 30 Minutes</p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <Link href="/about" className="hover:text-white">
              About
            </Link>
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-white">
              Support
            </Link>
          </div>
          <div className="mt-4 text-sm text-gray-500">© 2025 Skill2Cash. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}
