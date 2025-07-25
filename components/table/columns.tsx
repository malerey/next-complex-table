"use client"

import { createColumnHelper } from "@tanstack/react-table"
import type { Project } from "@/types/project"
import { formatDate, formatCurrency, getStatusStyles, calculateProgress } from "@/utils/formatters"
import { TruncatedCell } from "@/components/TruncatedCell"

const columnHelper = createColumnHelper<Project>()

export const columns = [
  columnHelper.display({
    id: "expander",
    header: "",
    size: 50,
    minSize: 40,
    maxSize: 60,
    enableResizing: false, // Don't allow resizing the expander column
    cell: ({ row }) => {
      if (row.original.tasks.length === 0) {
        return <div className="w-6"></div>
      }
      return (
        <button
          onClick={row.getToggleExpandedHandler()}
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors group relative"
          title={row.getIsExpanded() ? "Hide tasks" : "Show tasks"}
        >
          <span className="text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors">
            {row.getIsExpanded() ? "−" : "+"}
          </span>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 dark:bg-gray-200 border border-gray-700 dark:border-gray-300 text-white dark:text-gray-800 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-md">
            {row.getIsExpanded() ? "Hide tasks" : "Show tasks"}
          </div>
        </button>
      )
    },
  }),
  columnHelper.accessor("name", {
    header: "Project Name",
    size: 200,
    minSize: 80,
    maxSize: 400,
    enableResizing: true,
    cell: (info) => (
      <TruncatedCell>{info.getValue()}</TruncatedCell>
    ),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    size: 100,
    minSize: 60,
    maxSize: 150,
    enableResizing: true,
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
    size: 150,
    minSize: 60,
    maxSize: 200,
    enableResizing: true,
    cell: (info) => (
      <TruncatedCell>{info.getValue()}</TruncatedCell>
    ),
  }),
  columnHelper.accessor("endDate", {
    header: "Due Date",
    size: 120,
    minSize: 80,
    maxSize: 160,
    enableResizing: true,
    cell: (info) => formatDate(info.getValue()),
  }),
  columnHelper.display({
    id: "progress",
    header: "Progress",
    size: 120,
    minSize: 80,
    maxSize: 180,
    enableResizing: true,
    cell: (info) => {
      const tasks = info.row.original.tasks
      const progress = calculateProgress(tasks)

      return (
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex-1 bg-secondary rounded-full h-2 min-w-[40px]">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-sm text-muted-foreground flex-shrink-0">{progress}%</span>
        </div>
      )
    },
  }),
  columnHelper.display({
    id: "tasks",
    header: "Tasks",
    size: 80,
    minSize: 50,
    maxSize: 120,
    enableResizing: true,
    cell: (info) => {
      const tasks = info.row.original.tasks
      const taskCount = tasks.length
      const completedTasks = tasks.filter((task) => task.status === "completed").length

      if (taskCount === 0) {
        return <span className="text-muted-foreground text-sm">No tasks</span>
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
    size: 140,
    minSize: 80,
    maxSize: 200,
    enableResizing: true,
    cell: (info) => {
      const budget = info.getValue()
      const isOverBudget = budget.spent > budget.current

      return (
        <div className="text-right">
          <div className="text-sm font-medium text-foreground">{formatCurrency(budget.current)}</div>
          <div className={`text-xs ${isOverBudget ? "text-destructive" : "text-muted-foreground"}`}>
            {formatCurrency(budget.spent)} spent
          </div>
        </div>
      )
    },
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    size: 80,
    minSize: 60,
    maxSize: 100,
    enableResizing: false,
    cell: ({ row, table }) => {
      const handleEdit = () => {
        // Get the edit handler from table options
        const onEdit = (table.options.meta as { onEditProject?: (project: Project) => void })?.onEditProject
        if (onEdit) {
          onEdit(row.original)
        }
      }

      return (
        <button
          onClick={handleEdit}
          className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          title="Edit project"
        >
          Edit
        </button>
      )
    },
  }),
]
