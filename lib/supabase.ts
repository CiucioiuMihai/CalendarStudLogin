// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jhramukssvhiicxevzjq.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpocmFtdWtzc3ZoaWljeGV2empxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5Nzc5NjIsImV4cCI6MjA2NzU1Mzk2Mn0.HYhqwuHxr7sNyEiXREnHI94OXnFAu4jiFL8UyBxwJZg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  },
  global: {
    headers: {
      'apikey': supabaseAnonKey,
      'Authorization': `Bearer ${supabaseAnonKey}`
    }
  }
});

// Test function to verify Supabase connection
export const testSupabaseConnection = async () => {
  try {
    console.log("Testing Supabase connection...");
    
    // Try a simple operation to test the connection
    const { error } = await supabase
      .from('Student')
      .select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error("Supabase connection test failed:", error);
      return false;
    } else {
      console.log("Supabase connection test successful!");
      return true;
    }
  } catch (error) {
    console.error("Unexpected error testing Supabase connection:", error);
    return false;
  }
};
