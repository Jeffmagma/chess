import {createClient} from '@supabase/supabase-js'

const SUPABASE_URL = "https://yoidnmxbwrwrsldxpqrh.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvaWRubXhid3J3cnNsZHhwcXJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ3NTM1MzcsImV4cCI6MTk5MDMyOTUzN30.qrQZ6Z0Y-5SUOaSlVGBKIvW2yQUH2QI3cfNhIxOBiRM"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
