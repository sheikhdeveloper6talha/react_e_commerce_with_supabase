import { createClient } from "@supabase/supabase-js";

const PUBLIC_KEY = process.env.REACT_APP_SUPABASE_PUBLIC_KEY;
const PROJECT_KEY = process.env.REACT_APP_SUPABASE_PROJECT_KEY;

export const connectSupabase = createClient(
  PROJECT_KEY,
  PUBLIC_KEY
);