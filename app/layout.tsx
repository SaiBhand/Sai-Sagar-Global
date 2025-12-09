import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { LanguageProvider } from "@/contexts/language-context"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { Footer } from "@/components/footer"
import { ErrorBoundary } from "@/components/error-boundary"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Sai Sagar Global - Premium Fruit Exports Worldwide",
  description:
    "Leading exporter of premium quality fruits from India to global markets. Specializing in pomegranates, mangoes, grapes, and more.",
  keywords: "fruit export, Indian fruits, pomegranate export, mango export, fruit supplier, international trade",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased">
        <ErrorBoundary>
          <LanguageProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <WhatsAppFloat />
          </LanguageProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
