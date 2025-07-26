import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Creator {
  id: string
  clerk_user_id: string
  name: string
  email: string
  store_name: string
  store_url: string
  tagline?: string
  description?: string
  color_theme: string
  upi_id?: string
  avatar_url?: string
  location?: string
  verified: boolean
  status: "active" | "pending" | "suspended"
  total_products: number
  total_revenue: number
  total_sales: number
  avg_rating: number
  follower_count: number
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  creator_id: string
  title: string
  slug: string
  short_description?: string
  description?: string
  price: number
  compare_price?: number
  category: string
  status: "draft" | "active" | "pending" | "rejected" | "archived"
  cover_image_url?: string
  preview_file_url?: string
  main_file_url?: string
  video_url?: string
  video_type: "upload" | "youtube" | "vimeo"
  whats_included: string[]
  features: string[]
  tags: string[]
  sales_count: number
  view_count: number
  rating: number
  review_count: number
  revenue: number
  created_at: string
  updated_at: string
}

export interface Customer {
  id: string
  clerk_user_id: string
  name: string
  email: string
  phone?: string
  location?: string
  avatar_url?: string
  total_purchases: number
  total_spent: number
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  order_number: string
  customer_id: string
  creator_id: string
  product_id: string
  amount: number
  currency: string
  status: "pending" | "completed" | "failed" | "refunded"
  payment_method: string
  payment_reference?: string
  upi_transaction_id?: string
  download_token?: string
  download_expires_at?: string
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  product_id: string
  customer_id: string
  order_id: string
  rating: number
  comment?: string
  verified: boolean
  helpful_count: number
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  sender_id: string
  sender_type: "customer" | "creator" | "admin"
  recipient_id: string
  recipient_type: "customer" | "creator" | "admin"
  subject?: string
  content: string
  emotion?: "happy" | "confused" | "frustrated" | "excited" | "concerned"
  status: "unread" | "read" | "replied" | "archived"
  parent_message_id?: string
  created_at: string
  updated_at: string
}

export interface FileUpload {
  id: string
  file_name: string
  file_path: string
  file_size: number
  file_type: string
  bucket_name: string
  uploaded_by: string
  uploader_type: "customer" | "creator" | "admin"
  related_entity_type?: "product" | "creator" | "review"
  related_entity_id?: string
  is_public: boolean
  created_at: string
}

// Helper functions
export const getCreatorByStoreUrl = async (storeUrl: string) => {
  const { data, error } = await supabase.from("creators").select("*").eq("store_url", storeUrl).single()

  if (error) throw error
  return data as Creator
}

export const getProductsByCreator = async (creatorId: string) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("creator_id", creatorId)
    .eq("status", "active")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as Product[]
}

export const getProductBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      creator:creators(*)
    `)
    .eq("slug", slug)
    .single()

  if (error) throw error
  return data
}

export const createOrder = async (orderData: Partial<Order>) => {
  const { data, error } = await supabase.from("orders").insert(orderData).select().single()

  if (error) throw error
  return data as Order
}

export const updateOrderStatus = async (orderId: string, status: Order["status"], paymentReference?: string) => {
  const updateData: Partial<Order> = { status }
  if (paymentReference) {
    updateData.payment_reference = paymentReference
  }

  const { data, error } = await supabase.from("orders").update(updateData).eq("id", orderId).select().single()

  if (error) throw error
  return data as Order
}

export const getOrdersByCustomer = async (customerId: string) => {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      product:products(*),
      creator:creators(*)
    `)
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export const createReview = async (reviewData: Partial<Review>) => {
  const { data, error } = await supabase.from("reviews").insert(reviewData).select().single()

  if (error) throw error
  return data as Review
}

export const getReviewsByProduct = async (productId: string) => {
  const { data, error } = await supabase
    .from("reviews")
    .select(`
      *,
      customer:customers(name, avatar_url)
    `)
    .eq("product_id", productId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

// Supabase Storage functions
export const uploadFile = async (
  file: File,
  bucket: string,
  path: string,
  options?: { upsert?: boolean },
): Promise<{ data: { path: string } | null; error: any }> => {
  const { data, error } = await supabase.storage.from(bucket).upload(path, file, options)
  return { data, error }
}

export const getPublicUrl = (bucket: string, path: string): string => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

export const deleteFile = async (bucket: string, path: string) => {
  const { data, error } = await supabase.storage.from(bucket).remove([path])
  return { data, error }
}

export const createFileRecord = async (fileData: Partial<FileUpload>) => {
  const { data, error } = await supabase.from("file_uploads").insert(fileData).select().single()
  if (error) throw error
  return data as FileUpload
}
