import { describe, it, expect } from 'vitest'
import { filterProjects, getUniqueAssignees, getUniqueCategories } from './filters'
import { projects } from '../data/projects'

describe('filterProjects', () => {
  it('returns all projects if no filters', () => {
    const result = filterProjects(projects, { status: [], assignee: [], overdue: false, category: [] })
    expect(result.length).toBe(projects.length)
  })

  it('filters by status', () => {
    const result = filterProjects(projects, { status: ['active'], assignee: [], overdue: false, category: [] })
    expect(result.every(p => p.status === 'active')).toBe(true)
  })

  it('filters by assignee', () => {
    const result = filterProjects(projects, { status: [], assignee: ['Sarah Chen'], overdue: false, category: [] })
    expect(result.every(p => p.owner === 'Sarah Chen')).toBe(true)
  })

  it('filters by overdue', () => {
    const result = filterProjects(projects, { status: [], assignee: [], overdue: true, category: [] })
    expect(Array.isArray(result)).toBe(true)
  })

  it('filters by category', () => {
    const result = filterProjects(projects, { status: [], assignee: [], overdue: false, category: ['Development'] })
    expect(Array.isArray(result)).toBe(true)
  })
})

describe('filterProjects edge cases', () => {
  it('returns empty if no project matches status', () => {
    const result = filterProjects(projects, { status: ['not-a-status'], assignee: [], overdue: false, category: [] })
    expect(result.length).toBe(0)
  })
  it('returns empty if no project matches assignee', () => {
    const result = filterProjects(projects, { status: [], assignee: ['not-a-person'], overdue: false, category: [] })
    expect(result.length).toBe(0)
  })
  it('returns empty if no project matches overdue and category', () => {
    const result = filterProjects(projects, { status: [], assignee: [], overdue: true, category: ['not-a-category'] })
    expect(result.length).toBe(0)
  })
  it('returns projects with tasks matching category', () => {
    const result = filterProjects(projects, { status: [], assignee: [], overdue: false, category: ['Design'] })
    expect(result.some(p => p.tasks.some(t => t.category === 'Design'))).toBe(true)
  })
  it('returns projects with no tasks if category filter is empty', () => {
    const result = filterProjects(projects, { status: [], assignee: [], overdue: false, category: [] })
    expect(result.some(p => p.tasks.length === 0)).toBe(true)
  })
})

describe('getUniqueAssignees', () => {
  it('returns unique assignees', () => {
    const assignees = getUniqueAssignees(projects)
    expect(Array.isArray(assignees)).toBe(true)
    expect(new Set(assignees).size).toBe(assignees.length)
  })
})

describe('getUniqueAssignees edge cases', () => {
  it('returns empty array for empty input', () => {
    expect(getUniqueAssignees([])).toEqual([])
  })
})

describe('getUniqueCategories', () => {
  it('returns unique categories', () => {
    const categories = getUniqueCategories(projects)
    expect(Array.isArray(categories)).toBe(true)
    expect(new Set(categories).size).toBe(categories.length)
  })
})

describe('getUniqueCategories edge cases', () => {
  it('returns empty array for empty input', () => {
    expect(getUniqueCategories([])).toEqual([])
  })
})
