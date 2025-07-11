"use client"

import dynamic from 'next/dynamic'

// Dynamically import ThemeToggle with no SSR to avoid hydration issues
const ThemeToggle = dynamic(() => import('./ThemeToggle').then(mod => ({ default: mod.ThemeToggle })), {
  ssr: false,
  loading: () => (
    <div className="relative inline-flex h-10 w-20 items-center justify-center rounded-full border border-gray-300 bg-white p-1 animate-pulse">
      <div className="absolute left-1 top-1 h-8 w-8 rounded-full bg-gray-300" />
    </div>
  )
})

export function ClientThemeToggle() {
  return <ThemeToggle />
}
