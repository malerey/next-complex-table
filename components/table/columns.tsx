"use client"

import { createColumnHelper } from "@tanstack/react-table"
import type { Project } from "@/types/project"
import { formatDate, formatCurrency, getStatusStyles, calculateProgress } from "@/utils/formatters"

const columnHelper = createColumnHelper<Project>()

export const columns = [
  columnHelper.display({
    id: "expander",
    header: "",
    cell: ({ row }) => {
      if (row.original.tasks.length === 0) {
        return <div className="w-6"></div>
      }
      return (
        <button
          onClick={row.getToggleExpandedHandler()}
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200 transition-colors group relative"
          title={row.getIsExpanded() ? "Hide tasks" : "Show tasks"}
        >
          <span className="text-gray-600 group-hover:text-gray-800 transition-colors">
            {row.getIsExpanded() ? "−" : "+"}
          </span>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
            {row.getIsExpanded() ? "Hide tasks" : "Show tasks"}
          </div>
        </button>
      )
    },
  }),
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
  columnHelper.display({
    id: "progress",
    header: "Progress",
    cell: (info) => {
      const tasks = info.row.original.tasks
      const progress = calculateProgress(tasks)

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
  columnHelper.display({
    id: "tasks",
    header: "Tasks",
    cell: (info) => {
      const tasks = info.row.original.tasks
      const taskCount = tasks.length
      const completedTasks = tasks.filter((task) => task.status === "completed").length

      if (taskCount === 0) {
        return <span className="text-gray-400 text-sm">No tasks</span>
      }
      return (
        <span className="text-sm">
          {completedTasks}/{taskCount}
        </span>
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
