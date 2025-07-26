"use client"

import { useState, useEffect } from "react"
import { X, ExternalLink, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface BannerData {
  id: string
  type: "maintenance" | "feature" | "promotion" | "notice"
  title: string
  message: string
  ctaText?: string
  ctaLink?: string
  isActive: boolean
  priority: number
  startDate?: string
  endDate?: string
  dismissible: boolean
}

// Mock banner data - in real app, this would come from API
const mockBanners: BannerData[] = [
  {
    id: "1",
    type: "promotion",
    title: "🎉 Limited Time Offer",
    message: "Get 50% off on your first product listing! Use code LAUNCH50",
    ctaText: "Claim Offer",
    ctaLink: "/wizard/income-assessment",
    isActive: true,
    priority: 1,
    dismissible: true,
  },
  {
    id: "2",
    type: "feature",
    title: "🚀 New Feature",
    message: "Introducing automated email marketing for your products",
    ctaText: "Learn More",
    ctaLink: "/features/email-marketing",
    isActive: false,
    priority: 2,
    dismissible: true,
  },
]

export function Banner() {
  const [dismissedBanners, setDismissedBanners] = useState<string[]>([])
  const [currentBanner, setCurrentBanner] = useState<BannerData | null>(null)

  useEffect(() => {
    // Get dismissed banners from localStorage
    const dismissed = JSON.parse(localStorage.getItem("dismissedBanners") || "[]")
    setDismissedBanners(dismissed)

    // Find the highest priority active banner that hasn't been dismissed
    const activeBanner = mockBanners
      .filter((banner) => banner.isActive && !dismissed.includes(banner.id))
      .sort((a, b) => a.priority - b.priority)[0]

    setCurrentBanner(activeBanner || null)
  }, [])

  const dismissBanner = (bannerId: string) => {
    const newDismissed = [...dismissedBanners, bannerId]
    setDismissedBanners(newDismissed)
    localStorage.setItem("dismissedBanners", JSON.stringify(newDismissed))
    setCurrentBanner(null)
  }

  const isExternalLink = (url: string) => {
    return url.startsWith("http://") || url.startsWith("https://")
  }

  if (!currentBanner) return null

  const getBannerStyles = (type: string) => {
    switch (type) {
      case "maintenance":
        return "bg-red-600 text-white"
      case "feature":
        return "bg-blue-600 text-white"
      case "promotion":
        return "bg-green-600 text-white"
      case "notice":
        return "bg-yellow-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  return (
    <div className={`${getBannerStyles(currentBanner.type)} py-3 px-4 relative z-50`}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <Badge variant="secondary" className="text-xs bg-white/20 text-white border-white/30">
            {currentBanner.type.toUpperCase()}
          </Badge>
          <div className="flex items-center gap-2">
            <span className="font-medium">{currentBanner.title}</span>
            <span className="hidden sm:inline">{currentBanner.message}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {currentBanner.ctaText && currentBanner.ctaLink && (
            <>
              {isExternalLink(currentBanner.ctaLink) ? (
                <a
                  href={currentBanner.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1"
                >
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                  >
                    {currentBanner.ctaText}
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </a>
              ) : (
                <Link href={currentBanner.ctaLink}>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                  >
                    {currentBanner.ctaText}
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </Link>
              )}
            </>
          )}

          {currentBanner.dismissible && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dismissBanner(currentBanner.id)}
              className="text-white hover:bg-white/20 p-1 h-auto"
            >
              <X className="w-4 h-4" />
              <span className="sr-only">Dismiss banner</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
