"use client"

import { useState, useEffect } from "react"
import type { TablePreferences } from "@/types/preferences"
import type { SortingState, VisibilityState, ColumnSizingState } from "@tanstack/react-table"

const DEFAULT_PREFERENCES: TablePreferences = {
  columnVisibility: {
    expander: true,
    name: true,
    status: true,
    owner: true,
    endDate: true,
    progress: true,
    tasks: true,
    budget: true,
  },
  columnSizing: {
    expander: 50,
    name: 200,
    status: 100,
    owner: 150,
    endDate: 120,
    progress: 120,
    tasks: 80,
    budget: 140,
  },
  sorting: [],
  filters: {
    status: [],
    assignee: [],
    overdue: false,
    category: [],
  },
}

export function useTablePreferences() {
  const [preferences, setPreferences] = useState<TablePreferences>(DEFAULT_PREFERENCES)

  // Load preferences from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("table-preferences")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setPreferences({ ...DEFAULT_PREFERENCES, ...parsed })
      } catch (error) {
        console.error("Failed to parse saved preferences:", error)
      }
    }
  }, [])

  // Save preferences to localStorage whenever they change
  const updatePreferences = (updates: Partial<TablePreferences>) => {
    const newPreferences = { ...preferences, ...updates }
    setPreferences(newPreferences)
    localStorage.setItem("table-preferences", JSON.stringify(newPreferences))
  }

  const updateColumnVisibility = (visibility: VisibilityState) => {
    updatePreferences({ columnVisibility: visibility })
  }

  const updateColumnSizing = (sizing: ColumnSizingState) => {
    updatePreferences({ columnSizing: sizing })
  }

  const updateSorting = (sorting: SortingState) => {
    updatePreferences({ sorting })
  }

  const updateFilters = (filters: Partial<TablePreferences["filters"]>) => {
    updatePreferences({ filters: { ...preferences.filters, ...filters } })
  }

  return {
    preferences,
    updateColumnVisibility,
    updateColumnSizing,
    updateSorting,
    updateFilters,
  }
}
