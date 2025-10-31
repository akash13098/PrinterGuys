// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = 'https://dtcbikvrcuhcuawrkhqr.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0Y2Jpa3ZyY3VoY3Vhd3JraHFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2Nzc0NTYsImV4cCI6MjA3NTI1MzQ1Nn0.Axt5vX2EqAakaN6sDYcgNWCHMWsuSG225aw7OgbkII0';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
