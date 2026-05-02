import { createClient } from '@supabase/supabase-js';

// 你在这里填入 Supabase 项目的 URL 和 Anon Key
// 等你建好项目，把这俩替换掉或者写进 .env.local 文件里
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseKey);
