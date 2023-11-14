// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseURL = 'https://ohmroxthswkiyctkfyrf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9obXJveHRoc3draXljdGtmeXJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5MjcxODQsImV4cCI6MjAxNTUwMzE4NH0.Lg-IMqM7RW_ZJewxMTfCOWzj6KmhhNvHQeshpSERJlw';

const supabase = createClient(supabaseURL, supabaseAnonKey);

export { supabase };
