'use client'

import { useMemo, useEffect, useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getExpandedRowModel,
  getSortedRowModel,
} from '@tanstack/react-table'
import type { Project } from '@/types/project'
import { projectService } from '@/lib/clientProjectService'
import { useTableState } from '@/hooks/useTableState'
import { useTablePreferences } from '@/hooks/useTablePreferences'
import { columns } from './table/columns'
import { ExpandedRow } from './table/ExpandedRow'
import { FilterControls } from './table/FiltersControls'
import { ColumnControls } from './table/ColumnControls'
import { ProjectEditor } from './ProjectEditor'
import { TaskEditor } from './TaskEditor'
import {
  filterProjects,
  getUniqueAssignees,
  getUniqueCategories,
} from '@/utils/filters'
import type { Task } from '@/types/task'

export function Table() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [editingTask, setEditingTask] = useState<{
    task: Task
    projectId: string
  } | null>(null)
  const { expanded, setExpanded } = useTableState()
  const {
    preferences,
    updateColumnVisibility,
    updateColumnSizing,
    updateSorting,
    updateFilters,
  } = useTablePreferences()

  // Fetch projects using client service
  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await projectService.getAllProjects()
        setProjects(data)
      } catch (error) {
        console.error('Failed to fetch projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Handle project editing
  const handleEditProject = (project: Project) => {
    setEditingProject(project)
  }

  const handleSaveProject = async (updates: Partial<Project>) => {
    if (!editingProject) return

    try {
      const updatedProject = await projectService.updateProject(
        editingProject.id,
        updates
      )
      if (updatedProject) {
        setProjects(
          projects.map((p) => (p.id === editingProject.id ? updatedProject : p))
        )
        setEditingProject(null)
      }
    } catch (error) {
      console.error('Failed to update project:', error)
    }
  }

  const handleCancelEdit = () => {
    setEditingProject(null)
  }

  // Handle task editing
  const handleEditTask = (task: Task, projectId: string) => {
    setEditingTask({ task, projectId })
  }

  const handleSaveTask = async (updates: Partial<Task>) => {
    if (!editingTask) return

    try {
      // Update the task in the project
      const updatedProjects = projects.map((project) => {
        if (project.id === editingTask.projectId) {
          return {
            ...project,
            tasks: project.tasks.map((task) =>
              task.id === editingTask.task.id ? { ...task, ...updates } : task
            ),
          }
        }
        return project
      })

      setProjects(updatedProjects)
      setEditingTask(null)

      // In development, you could also update via API
      // In production, this just updates localStorage
    } catch (error) {
      console.error('Failed to update task:', error)
    }
  }

  const handleCancelTaskEdit = () => {
    setEditingTask(null)
  }

  // Filter projects based on current filters
  const filteredProjects = useMemo(() => {
    return filterProjects(projects, preferences.filters)
  }, [projects, preferences.filters])

  // Get unique values for filter dropdowns
  const availableAssignees = useMemo(
    () => getUniqueAssignees(projects),
    [projects]
  )
  const availableCategories = useMemo(
    () => getUniqueCategories(projects),
    [projects]
  )

  const table = useReactTable({
    data: filteredProjects,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onExpandedChange: setExpanded,
    onSortingChange: (updater) => {
      const newSorting =
        typeof updater === 'function' ? updater(preferences.sorting) : updater
      updateSorting(newSorting)
    },
    onColumnVisibilityChange: (updater) => {
      const newVisibility =
        typeof updater === 'function'
          ? updater(preferences.columnVisibility)
          : updater
      updateColumnVisibility(newVisibility)
    },
    onColumnSizingChange: (updater) => {
      const newSizing =
        typeof updater === 'function'
          ? updater(preferences.columnSizing)
          : updater
      updateColumnSizing(newSizing)
    },
    state: {
      expanded,
      sorting: preferences.sorting,
      columnVisibility: preferences.columnVisibility,
      columnSizing: preferences.columnSizing,
    },
    getRowCanExpand: (row) => row.original.tasks.length > 0,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    columnResizeDirection: 'ltr',
    meta: {
      onEditProject: handleEditProject,
      onEditTask: handleEditTask,
    },
  })

  // Handle column resizing state
  const isResizing = table.getState().columnSizingInfo.isResizingColumn
  useEffect(() => {
    if (isResizing) {
      document.body.classList.add('column-resizing')
    } else {
      document.body.classList.remove('column-resizing')
    }

    return () => {
      document.body.classList.remove('column-resizing')
    }
  }, [isResizing])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Loading projects...</div>
      </div>
    )
  }

  return (
    <div>
      <FilterControls
        filters={preferences.filters}
        onFiltersChange={updateFilters}
        availableAssignees={availableAssignees}
        availableCategories={availableCategories}
      />

      <ColumnControls table={table} />

      <div className="bg-card border border-border rounded-lg relative shadow-sm">
        <table className="w-full border-collapse table-fixed">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border border-border p-3 text-left bg-muted text-sm font-medium relative text-muted-foreground"
                    style={{
                      width: `${(header.getSize() / table.getCenterTotalSize()) * 100}%`,
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? 'cursor-pointer select-none flex items-center gap-1'
                            : ''
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanSort() && (
                          <span className="text-muted-foreground opacity-60">
                            {{
                              asc: '↑',
                              desc: '↓',
                            }[header.column.getIsSorted() as string] ?? '↕'}
                          </span>
                        )}
                      </div>
                    )}
                    {/* Column resize handle */}
                    {header.column.getCanResize() && (
                      <div
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        className={`absolute right-0 top-0 h-full w-2 cursor-col-resize select-none touch-none group transition-all ${
                          header.column.getIsResizing()
                            ? 'bg-primary/20'
                            : 'hover:bg-muted'
                        }`}
                        style={{
                          transform: 'translateX(1px)',
                        }}
                      >
                        <div
                          className={`h-full ml-auto ${
                            header.column.getIsResizing()
                              ? 'bg-primary w-1'
                              : 'bg-transparent group-hover:bg-primary/60 w-0.5 transition-all'
                          }`}
                        />
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => [
              <tr key={row.id} className="hover:bg-muted/50 transition-colors">
                {row.getVisibleCells().map((cell, cellIndex) => {
                  // Get the corresponding header for this cell to access resize handler
                  const headerGroup = table.getHeaderGroups()[0]
                  const header = headerGroup?.headers[cellIndex]

                  return (
                    <td
                      key={cell.id}
                      className="border border-border p-3 text-sm relative bg-card text-card-foreground"
                      style={{
                        width: `${(cell.column.getSize() / table.getCenterTotalSize()) * 100}%`,
                      }}
                    >
                      <div className="overflow-hidden">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>

                      {/* Column resize handle for table cells */}
                      {cell.column.getCanResize() && header && (
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className={`absolute right-0 top-0 h-full w-2 cursor-col-resize select-none touch-none group transition-all ${
                            cell.column.getIsResizing()
                              ? 'bg-primary/20'
                              : 'hover:bg-muted'
                          }`}
                          style={{
                            transform: 'translateX(1px)',
                          }}
                        >
                          <div
                            className={`h-full ml-auto ${
                              cell.column.getIsResizing()
                                ? 'bg-primary w-1'
                                : 'bg-transparent group-hover:bg-primary/60 w-0.5 transition-all'
                            }`}
                          />
                        </div>
                      )}
                    </td>
                  )
                })}
              </tr>,
              ...(row.getIsExpanded()
                ? [
                    <ExpandedRow
                      key={`${row.id}-expanded`}
                      project={row.original}
                      colSpan={row.getVisibleCells().length}
                      onEditTask={handleEditTask}
                    />,
                  ]
                : []),
            ])}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-muted-foreground">
        Showing {table.getRowModel().rows.length} of {projects.length} projects
      </div>

      {editingProject && (
        <ProjectEditor
          project={editingProject}
          onSave={handleSaveProject}
          onCancel={handleCancelEdit}
        />
      )}

      {editingTask && (
        <TaskEditor
          task={editingTask.task}
          onSave={handleSaveTask}
          onCancel={handleCancelTaskEdit}
        />
      )}
    </div>
  )
}
