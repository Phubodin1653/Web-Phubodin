import { createClient } from '@supabase/supabase-js';

// Access environment variables using import.meta.env for Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; 
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Supabase client untuk certificates (ตัวเก่า)
const supabaseOld = createClient(
  'https://kcmkrlicqivuhietxacd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjbWtybGljcWl2dWhpZXR4YWNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4OTMyMDksImV4cCI6MjA4NDQ2OTIwOX0.vUZUFeoyoTl6wncrISqGO4cF-lcAojEVGQ7jieCfwog'
);

// Supabase client สำหรับ projects (ตัวใหม่)
const supabaseNew = createClient(
  'https://ltfrqdseuxyfmmlbjlwm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0ZnJxZHNldXh5Zm1tbGJqbHdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwNzcyNjcsImV4cCI6MjA4NDY1MzI2N30.WkuqyK5y-VpowA9_3BjlmmZ6Rv0waXsieVzrsXZeFFU'
);

let supabase = null;

if (!supabaseUrl || !supabaseKey) {
  console.warn("Supabase credentials not configured. Using default project credentials.");
  supabase = supabaseNew; // Use the new Supabase project by default
} else {
  supabase = createClient(supabaseUrl, supabaseKey);
}

export { supabase, supabaseOld, supabaseNew };