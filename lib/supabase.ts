// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper function to get creator data (Test Creator)
export const getTestCreatorData = async () => {
  try {
    // Get the test creator and product
    const { data: users, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('role', 'creator')
      .limit(1)

    if (userError) throw userError

    const { data: products, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('status', 'approved')

    if (productError) throw productError

    return {
      user: users?.[0] || null,
      products: products || []
    }
  } catch (error) {
    console.error('Error fetching test data:', error)
    return { user: null, products: [] }
  }
}

// Helper to check if we have real data
export const hasRealData = async (): Promise<boolean> => {
  try {
    const { data } = await supabase
      .from('users')
      .select('id')
      .eq('role', 'creator')
      .limit(1)
    
    return (data?.length || 0) > 0
  } catch {
    return false
  }
}