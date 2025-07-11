"use client"

import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "@/contexts/ThemeContext"

export function ThemeToggle() {
  const context = useContext(ThemeContext)
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // If context is not available or not mounted, show a placeholder
  if (!mounted || !context) {
    return (
      <div className="relative inline-flex h-10 w-20 items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-1 opacity-50">
        <div className="absolute left-1 top-1 h-8 w-8 rounded-full bg-gray-400 dark:bg-gray-500" />
        <div className="flex w-full items-center justify-between px-2">
          <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </div>
      </div>
    )
  }

  const { theme, toggleTheme } = context

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-20 items-center justify-center rounded-full border border-border bg-background p-1 transition-all duration-200 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <div
        className={`absolute left-1 top-1 h-8 w-8 rounded-full bg-primary transition-transform duration-200 ${
          theme === "dark" ? "translate-x-10" : "translate-x-0"
        }`}
      />
      <div className="flex w-full items-center justify-between px-2">
        {/* Sun icon */}
        <svg
          className={`h-4 w-4 transition-opacity duration-200 ${
            theme === "light" ? "opacity-100 text-primary-foreground" : "opacity-50 text-muted-foreground"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        {/* Moon icon */}
        <svg
          className={`h-4 w-4 transition-opacity duration-200 ${
            theme === "dark" ? "opacity-100 text-primary-foreground" : "opacity-50 text-muted-foreground"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </div>
    </button>
  )
}
