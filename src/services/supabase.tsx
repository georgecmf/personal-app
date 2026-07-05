import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  "https://szybilwmjipsokbenlog.supabase.co";

const supabaseKey =
  "sb_publishable_1y0nFI4ErHhWStWkMUecpg_ZOsWab_n";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);