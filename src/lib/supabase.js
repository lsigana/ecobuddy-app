import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database schema setup functions
export const createTables = async () => {
  // Users table
  await supabase.rpc('create_users_table', {
    sql: `
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        phone TEXT,
        points INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `
  })

  // Actions table
  await supabase.rpc('create_actions_table', {
    sql: `
      CREATE TABLE IF NOT EXISTS actions (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        action_type TEXT NOT NULL,
        points INTEGER NOT NULL,
        description TEXT,
        verified BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `
  })

  // Rewards table
  await supabase.rpc('create_rewards_table', {
    sql: `
      CREATE TABLE IF NOT EXISTS rewards (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        reward_type TEXT NOT NULL,
        points_cost INTEGER NOT NULL,
        status TEXT DEFAULT 'pending',
        mpesa_code TEXT,
        partner_reference TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `
  })

  // Tree planting verification table
  await supabase.rpc('create_tree_verifications_table', {
    sql: `
      CREATE TABLE IF NOT EXISTS tree_verifications (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        action_id UUID REFERENCES actions(id) ON DELETE CASCADE,
        location_lat DECIMAL,
        location_lng DECIMAL,
        photo_url TEXT,
        kfs_verification_code TEXT,
        verification_status TEXT DEFAULT 'pending',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `
  })
}
