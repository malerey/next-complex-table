"use client"

import { useReactTable, getCoreRowModel, flexRender, getExpandedRowModel } from "@tanstack/react-table"
import { projects } from "@/data/projects"
import { useTableState } from "@/hooks/useTableState"
import { columns } from "./table/columns"
import { ExpandedRow } from "./table/ExpandedRow"

export function Table() {
  const { expanded, setExpanded } = useTableState()

  const table = useReactTable({
    data: projects,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onExpandedChange: setExpanded,
    state: {
      expanded,
    },
    getRowCanExpand: (row) => row.original.tasks.length > 0,
  })

  return (
    <table className="w-full mt-4 border-collapse">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="border border-gray-300 p-3 text-left bg-gray-50 text-sm font-medium">
                {flexRender(header.column.columnDef.header, header.getContext())}
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
              <ExpandedRow key={`${row.id}-expanded`} project={row.original} colSpan={columns.length} />
            )}
          </>
        ))}
      </tbody>
    </table>
  )
}
