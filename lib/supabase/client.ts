import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Only create client if we have real credentials
export const supabase = supabaseUrl && supabaseAnonKey && 
  !supabaseUrl.includes('your-project') && !supabaseAnonKey.includes('your-anon-key')
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Server-side client for API routes
export const createServerClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  // Only create client if we have real credentials
  if (supabaseUrl && supabaseServiceKey && 
      !supabaseUrl.includes('your-project') && 
      !supabaseServiceKey.includes('your-service-role-key')) {
    return createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  }
  
  return null
}
