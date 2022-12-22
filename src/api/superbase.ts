import { createClient } from "@supabase/supabase-js"

const SUPERBASE_KEY = process.env.REACT_APP_SUPERBASE_KEY ?? ""
const SUPERBASE_URL = process.env.REACT_APP_SUPERBASE_URL ?? ""

export const superbase = createClient(SUPERBASE_URL, SUPERBASE_KEY)
