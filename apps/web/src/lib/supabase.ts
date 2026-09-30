import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xnrdqvxktuwucukohbzm.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhucmRxdnhrdHV3dWN1a29oYnptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5NTM1NDcsImV4cCI6MjA2MTUyOTU0N30.08XNdr5H_2cW-3k1YdG_W5G-g7pS8yFqFqU1E2L7f2E';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
