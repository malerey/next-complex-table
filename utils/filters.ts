import type { Project } from "@/types/project"
import type { TablePreferences } from "@/types/preferences"
import { isOverdue } from "./formatters"

export function filterProjects(projects: Project[], filters: TablePreferences["filters"]): Project[] {
  return projects.filter((project) => {
    // Filter by project status
    if (filters.status.length > 0 && !filters.status.includes(project.status)) {
      return false
    }

    // Filter by project owner
    if (filters.assignee.length > 0 && !filters.assignee.includes(project.owner)) {
      return false
    }

    // Filter by overdue tasks
    if (filters.overdue) {
      const hasOverdueTasks = project.tasks.some(
        (task) => task.dueDate && isOverdue(task.dueDate) && task.status !== "completed"
      )
      if (!hasOverdueTasks) {
        return false
      }
    }

    // Filter by task categories
    if (filters.category.length > 0) {
      const hasMatchingCategory = project.tasks.some((task) => filters.category.includes(task.category))
      if (!hasMatchingCategory && project.tasks.length > 0) {
        return false
      }
    }

    return true
  })
}

export function getUniqueAssignees(projects: Project[]): string[] {
  const assignees = new Set<string>()
  
  // Add project owners
  projects.forEach((project) => {
    assignees.add(project.owner)
  })
  
  // Add task assignees
  projects.forEach((project) => {
    project.tasks.forEach((task) => {
      if (task.assignee) {
        assignees.add(task.assignee)
      }
    })
  })
  
  return Array.from(assignees).sort()
}

export function getUniqueCategories(projects: Project[]): string[] {
  const categories = new Set<string>()
  
  projects.forEach((project) => {
    project.tasks.forEach((task) => {
      categories.add(task.category)
    })
  })
  
  return Array.from(categories).sort()
}
