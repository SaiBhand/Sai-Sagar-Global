"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { type Language, defaultLanguage, getTranslation } from "@/lib/i18n"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    console.log("[v0] LanguageProvider hydrating...")
    try {
      setIsHydrated(true)
      const savedLanguage = localStorage.getItem("preferred-language") as Language
      if (savedLanguage && ["en", "hi", "gu"].includes(savedLanguage)) {
        console.log("[v0] Found saved language:", savedLanguage)
        setLanguageState(savedLanguage)
      }
      console.log("[v0] LanguageProvider hydration complete")
    } catch (error) {
      console.error("[v0] Error during LanguageProvider hydration:", error)
    }
  }, [])

  // Save language to localStorage when changed
  const setLanguage = (newLanguage: Language) => {
    console.log("[v0] Changing language to:", newLanguage)
    try {
      setLanguageState(newLanguage)
      if (isHydrated) {
        localStorage.setItem("preferred-language", newLanguage)
      }
    } catch (error) {
      console.error("[v0] Error setting language:", error)
    }
  }

  const t = (key: string) => {
    try {
      return getTranslation(language, key)
    } catch (error) {
      console.error("[v0] Translation error for key:", key, error)
      return key // Return the key as fallback
    }
  }

  if (!isHydrated) {
    return <div className="min-h-screen bg-white" />
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    console.error("[v0] useLanguage called outside of LanguageProvider")
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
