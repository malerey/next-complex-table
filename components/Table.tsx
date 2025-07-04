"use client"

import { useMemo } from "react"
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getExpandedRowModel,
  getSortedRowModel,
} from "@tanstack/react-table"
import { projects } from "@/data/projects"
import { useTableState } from "@/hooks/useTableState"
import { useTablePreferences } from "@/hooks/useTablePreferences"
import { columns } from "./table/columns"
import { ExpandedRow } from "./table/ExpandedRow"
import { FilterControls } from "./table/FiltersControls"
import { ColumnControls } from "./table/ColumnControls"
import { filterProjects, getUniqueAssignees, getUniqueCategories } from "@/utils/filters"

export function Table() {
  const { expanded, setExpanded } = useTableState()
  const { preferences, updateColumnVisibility, updateSorting, updateFilters } = useTablePreferences()

  // Filter projects based on current filters
  const filteredProjects = useMemo(() => {
    return filterProjects(projects, preferences.filters)
  }, [preferences.filters])

  // Get unique values for filter dropdowns
  const availableAssignees = useMemo(() => getUniqueAssignees(projects), [])
  const availableCategories = useMemo(() => getUniqueCategories(projects), [])

  const table = useReactTable({
    data: filteredProjects,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onExpandedChange: setExpanded,
    onSortingChange: (updater) => {
      const newSorting = typeof updater === "function" ? updater(preferences.sorting) : updater
      updateSorting(newSorting)
    },
    onColumnVisibilityChange: (updater) => {
      const newVisibility = typeof updater === "function" ? updater(preferences.columnVisibility) : updater
      updateColumnVisibility(newVisibility)
    },
    state: {
      expanded,
      sorting: preferences.sorting,
      columnVisibility: preferences.columnVisibility,
    },
    getRowCanExpand: (row) => row.original.tasks.length > 0,
  })

  return (
    <div>
      <FilterControls
        filters={preferences.filters}
        onFiltersChange={updateFilters}
        availableAssignees={availableAssignees}
        availableCategories={availableCategories}
      />

      <ColumnControls table={table} />

      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="border border-gray-300 p-3 text-left bg-gray-50 text-sm font-medium">
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort() ? "cursor-pointer select-none flex items-center gap-1" : ""
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <span className="text-gray-400">
                            {{
                              asc: "↑",
                              desc: "↓",
                            }[header.column.getIsSorted() as string] ?? "↕"}
                          </span>
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <>
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="border border-gray-300 p-3 text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
                {row.getIsExpanded() && (
                  <ExpandedRow
                    key={`${row.id}-expanded`}
                    project={row.original}
                    colSpan={row.getVisibleCells().length}
                  />
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Showing {table.getRowModel().rows.length} of {projects.length} projects
      </div>
    </div>
  )
}
