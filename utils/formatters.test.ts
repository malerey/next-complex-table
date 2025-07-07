import { describe, it, expect } from 'vitest'
import {
  formatDate,
  formatCurrency,
  getStatusStyles,
  getTaskStatusStyles,
  getTaskStatusIcon,
  isOverdue,
  calculateProgress
} from './formatters'

describe('formatDate', () => {
  it('formats a date string', () => {
    expect(formatDate('2024-01-15')).toMatch(/Jan|2024/)
  })
})

describe('formatCurrency', () => {
  it('formats a number as USD', () => {
    expect(formatCurrency(1000)).toMatch(/\$/)
  })
})

describe('getStatusStyles', () => {
  it('returns correct style for all known statuses', () => {
    expect(getStatusStyles('idea')).toMatch(/gray/)
    expect(getStatusStyles('active')).toMatch(/blue/)
    expect(getStatusStyles('paused')).toMatch(/yellow/)
    expect(getStatusStyles('completed')).toMatch(/green/)
    expect(getStatusStyles('cancelled')).toMatch(/red/)
  })
  it('returns default style for unknown status', () => {
    expect(getStatusStyles('unknown')).toMatch(/gray/)
  })
})

describe('getTaskStatusStyles', () => {
  it('returns correct style for all known task statuses', () => {
    expect(getTaskStatusStyles('todo')).toMatch(/gray/)
    expect(getTaskStatusStyles('in-progress')).toMatch(/blue/)
    expect(getTaskStatusStyles('blocked')).toMatch(/red/)
    expect(getTaskStatusStyles('completed')).toMatch(/green/)
  })
  it('returns default style for unknown task status', () => {
    expect(getTaskStatusStyles('unknown')).toMatch(/gray/)
  })
})

describe('getTaskStatusIcon', () => {
  it('returns correct icon for all known task statuses', () => {
    expect(getTaskStatusIcon('todo')).toBe('○')
    expect(getTaskStatusIcon('in-progress')).toBe('◐')
    expect(getTaskStatusIcon('blocked')).toBe('⚠')
    expect(getTaskStatusIcon('completed')).toBe('✓')
  })
  it('returns default icon for unknown task status', () => {
    expect(getTaskStatusIcon('unknown')).toBe('○')
  })
})

describe('isOverdue', () => {
  it('returns false for null', () => {
    expect(isOverdue(null)).toBe(false)
  })
  it('returns false for future date', () => {
    const future = new Date(Date.now() + 100000000).toISOString().slice(0, 10)
    expect(isOverdue(future)).toBe(false)
  })
  it('returns true for past date', () => {
    const past = new Date(Date.now() - 100000000).toISOString().slice(0, 10)
    expect(isOverdue(past)).toBe(true)
  })
})

describe('calculateProgress', () => {
  it('returns 0 for no tasks', () => {
    expect(calculateProgress([])).toBe(0)
  })
  it('returns 0 if total weight is 0', () => {
    expect(calculateProgress([{ status: 'completed', weight: 0 }])).toBe(0)
  })
  it('returns 100 for all completed', () => {
    expect(calculateProgress([
      { status: 'completed', weight: 1 },
      { status: 'completed', weight: 1 }
    ])).toBe(100)
  })
  it('returns correct percent for partial completion', () => {
    expect(calculateProgress([
      { status: 'completed', weight: 1 },
      { status: 'todo', weight: 1 }
    ])).toBe(50)
  })
})
