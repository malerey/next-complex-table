"use client"

import { useReactTable, getCoreRowModel, flexRender, createColumnHelper } from "@tanstack/react-table"
import { projects } from "@/data/projects"
import type { Project } from "@/types/project"

const columnHelper = createColumnHelper<Project>()

const getStatusStyles = (status: Project["status"]) => {
  switch (status) {
    case "idea":
      return "bg-gray-100 text-gray-800"
    case "active":
      return "bg-blue-100 text-blue-800"
    case "paused":
      return "bg-yellow-100 text-yellow-800"
    case "completed":
      return "bg-green-100 text-green-800"
    case "cancelled":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount)
}

const columns = [
  columnHelper.accessor("name", {
    header: "Project Name",
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => {
      const status = info.getValue()
      return (
        <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusStyles(status)}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      )
    },
  }),
  columnHelper.accessor("owner", {
    header: "Owner",
  }),
  columnHelper.accessor("endDate", {
    header: "Due Date",
    cell: (info) => formatDate(info.getValue()),
  }),
  columnHelper.accessor("progress", {
    header: "Progress",
    cell: (info) => {
      const progress = info.getValue()
      return (
        <div className="flex items-center gap-2">
          <div className="w-16 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-sm text-gray-600">{progress}%</span>
        </div>
      )
    },
  }),
  columnHelper.accessor("budget", {
    header: "Budget",
    cell: (info) => {
      const budget = info.getValue()
      const isOverBudget = budget.spent > budget.current

      return (
        <div className="text-right">
          <div className="text-sm font-medium">{formatCurrency(budget.current)}</div>
          <div className={`text-xs ${isOverBudget ? "text-red-600" : "text-gray-500"}`}>
            {formatCurrency(budget.spent)} spent
          </div>
        </div>
      )
    },
  }),
]

export function Table() {
  const table = useReactTable({
    data: projects,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="border border-gray-300 p-3 text-sm">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
