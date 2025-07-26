// Client-side storage solution for GitHub Pages
export class ClientStorage {
  private static instance: ClientStorage
  private products: any[] = []

  static getInstance() {
    if (!ClientStorage.instance) {
      ClientStorage.instance = new ClientStorage()
    }
    return ClientStorage.instance
  }

  // Store products in localStorage for demo
  saveProduct(product: any) {
    const products = this.getProducts()
    products.push(product)
    localStorage.setItem("skillcash_products", JSON.stringify(products))
    return product
  }

  getProducts() {
    if (typeof window === "undefined") return []
    const stored = localStorage.getItem("skillcash_products")
    return stored ? JSON.parse(stored) : []
  }

  // For production, this would integrate with:
  // - Supabase for database
  // - Vercel Blob for file storage
  // - Stripe for payments
}

export const clientStorage = ClientStorage.getInstance()
