import { describe, it, expect } from 'vitest'
import { filterProjects, getUniqueAssignees, getUniqueCategories } from './filters'
import type { Project } from '@/types/project'

describe('filterProjects', () => {
  const baseProject: Project = {
    id: '1',
    name: 'Test Project',
    status: 'active',
    owner: 'Alice',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    budget: { current: 10000, spent: 5000 },
    tasks: [
      { id: 't1', title: 'Task 1', status: 'completed', assignee: 'Bob', dueDate: '2024-01-01', category: 'dev', weight: 1 },
      { id: 't2', title: 'Task 2', status: 'todo', assignee: 'Charlie', dueDate: '2023-01-01', category: 'design', weight: 1 }
    ]
  }

  const projects: Project[] = [
    baseProject,
    {
      ...baseProject,
      id: '2',
      name: 'Test Project 2',
      status: 'paused',
      owner: 'Bob',
      startDate: '2024-02-01',
      endDate: '2024-11-30',
      budget: { current: 5000, spent: 2000 },
      tasks: [
        { id: 't3', title: 'Task 3', status: 'todo', assignee: 'Alice', dueDate: null, category: 'dev', weight: 1 }
      ]
    }
  ]

  it('filters by status', () => {
    const filters = { status: ['active'], assignee: [], overdue: false, category: [] }
    expect(filterProjects(projects, filters)).toHaveLength(1)
    expect(filterProjects(projects, filters)[0].status).toBe('active')
  })

  it('filters by assignee', () => {
    const filters = { status: [], assignee: ['Bob'], overdue: false, category: [] }
    expect(filterProjects(projects, filters)).toHaveLength(1)
    expect(filterProjects(projects, filters)[0].owner).toBe('Bob')
  })

  it('filters by overdue', () => {
    const filters = { status: [], assignee: [], overdue: true, category: [] }
    // Only project 1 has an overdue task (t2, dueDate: 2023-01-01)
    expect(filterProjects(projects, filters)).toHaveLength(1)
    expect(filterProjects(projects, filters)[0].id).toBe('1')
  })

  it('filters by category', () => {
    const filters = { status: [], assignee: [], overdue: false, category: ['design'] }
    expect(filterProjects(projects, filters)).toHaveLength(1)
    expect(filterProjects(projects, filters)[0].id).toBe('1')
  })

  it('returns all projects if no filters', () => {
    const filters = { status: [], assignee: [], overdue: false, category: [] }
    expect(filterProjects(projects, filters)).toHaveLength(2)
  })
})

describe('getUniqueAssignees', () => {
  it('returns unique assignees and owners sorted', () => {
    const projects: Project[] = [
      {
        id: '1',
        name: 'A',
        status: 'active',
        owner: 'Alice',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        budget: { current: 10000, spent: 5000 },
        tasks: [
          { id: 't1', title: 'Task 1', status: 'todo', assignee: 'Bob', dueDate: null, category: 'dev', weight: 1 },
          { id: 't2', title: 'Task 2', status: 'completed', assignee: 'Charlie', dueDate: null, category: 'design', weight: 1 }
        ]
      },
      {
        id: '2',
        name: 'B',
        status: 'paused',
        owner: 'Bob',
        startDate: '2024-02-01',
        endDate: '2024-11-30',
        budget: { current: 5000, spent: 2000 },
        tasks: [
          { id: 't3', title: 'Task 3', status: 'todo', assignee: 'Alice', dueDate: null, category: 'dev', weight: 1 }
        ]
      }
    ]
    expect(getUniqueAssignees(projects)).toEqual(['Alice', 'Bob', 'Charlie'])
  })

  it('returns empty array for no projects', () => {
    expect(getUniqueAssignees([])).toEqual([])
  })
})

describe('getUniqueCategories', () => {
  it('returns unique categories sorted', () => {
    const projects: Project[] = [
      {
        id: '1',
        name: 'A',
        status: 'active',
        owner: 'Alice',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        budget: { current: 10000, spent: 5000 },
        tasks: [
          { id: 't1', title: 'Task 1', status: 'todo', assignee: 'Bob', dueDate: null, category: 'dev', weight: 1 },
          { id: 't2', title: 'Task 2', status: 'completed', assignee: 'Charlie', dueDate: null, category: 'design', weight: 1 }
        ]
      },
      {
        id: '2',
        name: 'B',
        status: 'paused',
        owner: 'Bob',
        startDate: '2024-02-01',
        endDate: '2024-11-30',
        budget: { current: 5000, spent: 2000 },
        tasks: [
          { id: 't3', title: 'Task 3', status: 'todo', assignee: 'Alice', dueDate: null, category: 'dev', weight: 1 }
        ]
      }
    ]
    expect(getUniqueCategories(projects)).toEqual(['design', 'dev'])
  })

  it('returns empty array for no projects', () => {
    expect(getUniqueCategories([])).toEqual([])
  })
})
