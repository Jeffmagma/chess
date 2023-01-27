import {createClient} from '@supabase/supabase-js'

const SUPABASE_URL = "https://yoidnmxbwrwrsldxpqrh.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvaWRubXhid3J3cnNsZHhwcXJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ3NTM1MzcsImV4cCI6MTk5MDMyOTUzN30.qrQZ6Z0Y-5SUOaSlVGBKIvW2yQUH2QI3cfNhIxOBiRM"
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export function test11() {
	supabase.from("games").select().then(x => console.log(x));
	const channel = supabase.channel("table-db-changes").on("postgres_changes", {event: "UPDATE", schema: "public", table: "games"}, (payload => console.log(payload))).subscribe();
}
