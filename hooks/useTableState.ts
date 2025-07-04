"use client"

import { useState } from "react"
import type { ExpandedState } from "@tanstack/react-table"

export function useTableState() {
  const [expanded, setExpanded] = useState<ExpandedState>({})

  return {
    expanded,
    setExpanded,
  }
}
