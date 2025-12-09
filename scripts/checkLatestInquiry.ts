import { createClient } from "../lib/supabase/server"

async function checkLatestInquiry() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("id", { ascending: false })
    .limit(1)
    .single()

  if (error) {
    console.error("Error fetching latest inquiry:", error)
    process.exit(1)
  }

  console.log("Latest inquiry:", data)
}

checkLatestInquiry()
