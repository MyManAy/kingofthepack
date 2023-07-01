import { createClient } from "@supabase/supabase-js";
import { Database } from "../generated/types_db";

export const supabase = createClient<Database>(
  process.env.SUPABASE_API_URL!,
  process.env.SUPABASE_API_ANON_KEY!
);
