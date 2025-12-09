"use server"

import { createClient } from "@/lib/supabase/server"

interface InquiryData {
  name: string
  email: string
  phone?: string
  company?: string
  country: string
  subject: string
  message: string
  inquiryType: string
  productId?: string
}

export async function sendInquiryNotification(inquiryData: InquiryData) {
  console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
  console.log('Supabase Key set:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  const supabase = await createClient()

  try {
    // Store inquiry in database
    const { data, error } = await supabase
      .from("inquiries")
      .insert([
        {
          name: inquiryData.name,
          email: inquiryData.email,
          phone: inquiryData.phone,
          company: inquiryData.company,
          country: inquiryData.country,
          subject: inquiryData.subject,
          message: inquiryData.message,
          inquiry_type: inquiryData.inquiryType,
          status: "new",
          priority: "medium",
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Supabase insert error:", error)
      throw error
    }

    // Enhanced logging for successful submission
    console.log("[v1] Inquiry successfully submitted:", {
      inquiryId: data.id,
      type: inquiryData.inquiryType,
      email: inquiryData.email,
      subject: inquiryData.subject,
      timestamp: new Date().toISOString(),
    })

    // Log notification details
    console.log("[v1] Email notification would be sent:", {
      to: "admin@saisagarglobal.com",
      subject: `New ${inquiryData.inquiryType} Inquiry: ${inquiryData.subject}`,
      from: inquiryData.email,
      name: inquiryData.name,
      company: inquiryData.company,
      country: inquiryData.country,
      message: inquiryData.message.substring(0, 100) + (inquiryData.message.length > 100 ? "..." : ""),
      inquiryId: data.id,
    })

    return { success: true, data }
  } catch (error) {
    console.error("[v1] Error processing inquiry:", {
      error: error instanceof Error ? error.message : "Unknown error",
      inquiryType: inquiryData.inquiryType,
      email: inquiryData.email,
      timestamp: new Date().toISOString(),
    })
    return { success: false, error: "Failed to process inquiry. Please try again or contact us directly." }
  }
}
