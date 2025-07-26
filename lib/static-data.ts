// Static data management for GitHub Pages compatibility
// All data is stored client-side and managed through localStorage

export interface Creator {
  id: string
  name: string
  email: string
  storeName: string
  storeUrl: string
  tagline: string
  description: string
  colorTheme: string
  upiId: string
  products: Product[]
}

export interface Product {
  id: string
  title: string
  shortDescription: string
  description: string
  price: number
  comparePrice?: number
  rating: number
  reviewCount: number
  sales: number
  category: string
  coverImage: string
  whatsIncluded: string[]
  recentReviews: Review[]
  features: string[]
  creatorId: string
}

export interface Review {
  name: string
  rating: number
  comment: string
  verified: boolean
}

// Default creators and their stores
export const defaultCreators: Creator[] = [
  {
    id: "ravi-hr-expert",
    name: "Ravishankar HR Expert",
    email: "ravi@skill2cash.com",
    storeName: "Ravi's HR Hub",
    storeUrl: "ravi-hr-hub",
    tagline: "Your Complete HR Solutions Partner",
    description:
      "8+ years HR experience across startups and enterprises. Helped 300+ companies build better HR processes. SHRM Certified & Employment Law Expert.",
    colorTheme: "blue",
    upiId: "ravishankar.pala@okicici",
    products: [
      {
        id: "hr-policy-library",
        title: "Complete HR Policy Library",
        shortDescription: "100+ HR policies covering all aspects of employment and compliance",
        description:
          "Master HR compliance with this comprehensive policy library covering all aspects of employment law, workplace policies, and regulatory requirements.",
        price: 2999,
        comparePrice: 4299,
        rating: 4.8,
        reviewCount: 89,
        sales: 456,
        category: "HR Policies",
        coverImage: "/placeholder.svg?height=200&width=300&text=HR",
        whatsIncluded: [
          "100+ policy templates",
          "Legal compliance guide",
          "Implementation checklist",
          "Regular updates included",
          "Email support for 30 days",
        ],
        features: [
          "Complete HR policy templates",
          "Legal compliance coverage",
          "Implementation guidelines",
          "Regular policy updates",
          "Expert email support",
          "Customizable templates",
        ],
        recentReviews: [
          { name: "Priya S.", rating: 5, comment: "Best HR policy collection! Very comprehensive.", verified: true },
          { name: "Amit D.", rating: 5, comment: "Excellent templates! Legally compliant.", verified: true },
          { name: "Neha M.", rating: 4, comment: "Great resource for HR professionals.", verified: true },
        ],
        creatorId: "ravi-hr-expert",
      },
      {
        id: "onboarding-masterclass",
        title: "Employee Onboarding Masterclass",
        shortDescription: "Complete onboarding system from day 1 to 90 days",
        description:
          "Create exceptional employee experiences with this comprehensive onboarding system covering the first 90 days of employment.",
        price: 1799,
        comparePrice: 2999,
        rating: 4.6,
        reviewCount: 67,
        sales: 234,
        category: "Onboarding",
        coverImage: "/placeholder.svg?height=200&width=300&text=ON",
        whatsIncluded: [
          "90-day onboarding plan",
          "Checklist templates",
          "Welcome kit designs",
          "Training schedules",
          "Feedback forms",
        ],
        features: [
          "90-day structured plan",
          "Comprehensive checklists",
          "Welcome kit templates",
          "Training schedules",
          "Feedback mechanisms",
          "Progress tracking",
        ],
        recentReviews: [
          { name: "Rohit R.", rating: 5, comment: "Clear & comprehensive onboarding system!", verified: true },
          { name: "Deepa K.", rating: 4, comment: "Good practical templates.", verified: true },
        ],
        creatorId: "ravi-hr-expert",
      },
      {
        id: "performance-management-guide",
        title: "Performance Management Complete Guide",
        shortDescription: "360-degree performance system with KPIs and review templates",
        description:
          "Implement effective performance management with this comprehensive guide covering 360-degree reviews, KPIs, and development planning.",
        price: 2199,
        comparePrice: null,
        rating: 4.9,
        reviewCount: 123,
        sales: 678,
        category: "Performance",
        coverImage: "/placeholder.svg?height=200&width=300&text=PM",
        whatsIncluded: [
          "Performance review templates",
          "KPI frameworks",
          "Goal-setting guides",
          "Feedback tools",
          "Development plans",
        ],
        features: [
          "360-degree review system",
          "KPI frameworks",
          "Goal-setting methodologies",
          "Feedback tools",
          "Development planning",
          "Performance tracking",
        ],
        recentReviews: [
          { name: "Sanjay P.", rating: 5, comment: "Excellent performance management system!", verified: true },
          { name: "Ritu T.", rating: 5, comment: "Very practical and easy to implement.", verified: true },
        ],
        creatorId: "ravi-hr-expert",
      },
    ],
  },
  {
    id: "sarah-hr-expert",
    name: "Sarah HR Expert",
    email: "sarah@hrexcellence.com",
    storeName: "HR Excellence Hub",
    storeUrl: "demo-store",
    tagline: "Premium HR resources and templates",
    description: "High-quality digital products for HR professionals and people managers",
    colorTheme: "blue",
    upiId: "sarah.hr@okaxis",
    products: [
      {
        id: "employee-handbook",
        title: "Complete Employee Handbook Template",
        shortDescription: "Comprehensive 50-page handbook with policies, procedures, and legal compliance",
        description:
          "Create a professional employee handbook with this comprehensive template covering all essential policies, procedures, and legal requirements.",
        price: 1999,
        comparePrice: 2999,
        rating: 4.8,
        reviewCount: 127,
        sales: 890,
        category: "HR Policies",
        coverImage: "/placeholder.svg?height=200&width=300",
        whatsIncluded: [
          "50-page comprehensive template",
          "Legal compliance checklist",
          "Customizable policy sections",
          "Implementation guide",
          "HR community access",
        ],
        features: [
          "Comprehensive handbook template",
          "Legal compliance coverage",
          "Customizable sections",
          "Implementation guidance",
          "Community support",
          "Regular updates",
        ],
        recentReviews: [
          { name: "Priya K.", rating: 5, comment: "Excellent template! Saved me weeks of work.", verified: true },
          { name: "Rajesh M.", rating: 4, comment: "Very comprehensive, great legal coverage.", verified: true },
          { name: "Anita S.", rating: 5, comment: "Best HR handbook template I've found.", verified: true },
        ],
        creatorId: "sarah-hr-expert",
      },
      {
        id: "performance-review-system",
        title: "360-Degree Performance Review System",
        shortDescription: "Complete performance evaluation system with forms, rubrics, and feedback templates",
        description:
          "Implement a comprehensive 360-degree performance review system with structured forms, evaluation rubrics, and feedback templates.",
        price: 2299,
        comparePrice: null,
        rating: 4.6,
        reviewCount: 89,
        sales: 567,
        category: "Performance Management",
        coverImage: "/placeholder.svg?height=200&width=300",
        whatsIncluded: ["Review forms", "Rating rubrics", "Goal-setting templates", "Development plans"],
        features: [
          "360-degree review forms",
          "Structured rating rubrics",
          "Goal-setting templates",
          "Development planning",
          "Feedback collection",
          "Progress tracking",
        ],
        recentReviews: [
          { name: "Vikram L.", rating: 5, comment: "Clear structure and practical templates.", verified: true },
          { name: "Meera R.", rating: 4, comment: "Good content, well organized.", verified: true },
        ],
        creatorId: "sarah-hr-expert",
      },
      {
        id: "recruitment-toolkit",
        title: "Complete Recruitment Toolkit",
        shortDescription: "End-to-end recruitment resources including job descriptions and interview guides",
        description:
          "Streamline your recruitment process with this comprehensive toolkit covering job descriptions, interview guides, and assessment tools.",
        price: 2499,
        comparePrice: 3499,
        rating: 4.9,
        reviewCount: 156,
        sales: 1240,
        category: "Talent Acquisition",
        coverImage: "/placeholder.svg?height=200&width=300",
        whatsIncluded: [
          "100+ job description templates",
          "Interview question bank",
          "Assessment rubrics",
          "Offer letter templates",
        ],
        features: [
          "Job description templates",
          "Interview question bank",
          "Assessment rubrics",
          "Offer letter templates",
          "Candidate evaluation",
          "Recruitment tracking",
        ],
        recentReviews: [
          { name: "Arjun W.", rating: 5, comment: "Comprehensive toolkit, excellent quality.", verified: true },
          { name: "Kavya T.", rating: 5, comment: "Saved our team months of preparation.", verified: true },
        ],
        creatorId: "sarah-hr-expert",
      },
    ],
  },
]

// Client-side data management
export class StaticDataManager {
  private static instance: StaticDataManager
  private creators: Creator[] = []

  private constructor() {
    this.loadData()
  }

  public static getInstance(): StaticDataManager {
    if (!StaticDataManager.instance) {
      StaticDataManager.instance = new StaticDataManager()
    }
    return StaticDataManager.instance
  }

  private loadData() {
    if (typeof window !== "undefined") {
      const savedCreators = localStorage.getItem("creators")
      if (savedCreators) {
        this.creators = JSON.parse(savedCreators)
      } else {
        this.creators = defaultCreators
        this.saveData()
      }
    } else {
      this.creators = defaultCreators
    }
  }

  private saveData() {
    if (typeof window !== "undefined") {
      localStorage.setItem("creators", JSON.stringify(this.creators))
    }
  }

  public getCreators(): Creator[] {
    return this.creators
  }

  public getCreatorByStoreUrl(storeUrl: string): Creator | undefined {
    return this.creators.find((creator) => creator.storeUrl === storeUrl)
  }

  public getProductById(productId: string): { product: Product; creator: Creator } | undefined {
    for (const creator of this.creators) {
      const product = creator.products.find((p) => p.id === productId)
      if (product) {
        return { product, creator }
      }
    }
    return undefined
  }

  public addCreator(creator: Creator) {
    this.creators.push(creator)
    this.saveData()
  }

  public updateCreator(creatorId: string, updates: Partial<Creator>) {
    const index = this.creators.findIndex((c) => c.id === creatorId)
    if (index !== -1) {
      this.creators[index] = { ...this.creators[index], ...updates }
      this.saveData()
    }
  }

  public addProduct(creatorId: string, product: Product) {
    const creator = this.creators.find((c) => c.id === creatorId)
    if (creator) {
      creator.products.push(product)
      this.saveData()
    }
  }

  public updateProduct(productId: string, updates: Partial<Product>) {
    for (const creator of this.creators) {
      const productIndex = creator.products.findIndex((p) => p.id === productId)
      if (productIndex !== -1) {
        creator.products[productIndex] = { ...creator.products[productIndex], ...updates }
        this.saveData()
        break
      }
    }
  }
}

export const dataManager = StaticDataManager.getInstance()
