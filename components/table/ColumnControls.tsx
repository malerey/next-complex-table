"use client"

import type { Table } from "@tanstack/react-table"
import type { Project } from "@/types/project"

interface ColumnControlsProps {
  table: Table<Project>
}

export function ColumnControls({ table }: ColumnControlsProps) {
  return (
    <div className="bg-white p-4 border rounded-lg mb-4">
      <h3 className="text-sm font-medium mb-3">Column Visibility</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => (
            <label key={column.id} className="flex items-center">
              <input
                type="checkbox"
                checked={column.getIsVisible()}
                onChange={column.getToggleVisibilityHandler()}
                className="mr-2"
              />
              <span className="text-xs">{column.columnDef.header?.toString() || column.id}</span>
            </label>
          ))}
      </div>
    </div>
  )
}
