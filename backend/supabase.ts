import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
//import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://ibqrwoqxvasaumckjnse.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlicXJ3b3F4dmFzYXVtY2tqbnNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAzNDc3NDgsImV4cCI6MjAzNTkyMzc0OH0.2jlpquvEyYGpCWzAMktKyUKwGPufZPM53-aDA__Yetk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})