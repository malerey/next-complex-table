import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTablePreferences } from './useTablePreferences'

describe('useTablePreferences', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns default preferences', () => {
    const { result } = renderHook(() => useTablePreferences())
    expect(result.current.preferences).toBeDefined()
  })

  it('updates column visibility', () => {
    const { result } = renderHook(() => useTablePreferences())
    act(() => {
      result.current.updateColumnVisibility({ name: false })
    })
    expect(result.current.preferences.columnVisibility.name).toBe(false)
  })

  it('updates sorting', () => {
    const { result } = renderHook(() => useTablePreferences())
    act(() => {
      result.current.updateSorting([{ id: 'name', desc: false }])
    })
    expect(result.current.preferences.sorting[0]?.id).toBe('name')
  })

  it('updates filters', () => {
    const { result } = renderHook(() => useTablePreferences())
    act(() => {
      result.current.updateFilters({ status: ['active'] })
    })
    expect(result.current.preferences.filters.status).toContain('active')
  })
})

describe('useTablePreferences edge cases', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('handles invalid JSON in localStorage gracefully', () => {
    localStorage.setItem('table-preferences', '{invalid json}')
    const { result } = renderHook(() => useTablePreferences())
    expect(result.current.preferences).toBeDefined()
  })

  it('merges saved preferences with defaults', () => {
    localStorage.setItem('table-preferences', JSON.stringify({ sorting: [{ id: 'name', desc: true }] }))
    const { result } = renderHook(() => useTablePreferences())
    expect(result.current.preferences.sorting[0]?.id).toBe('name')
  })

  it('updateFilters merges with previous filters', () => {
    const { result } = renderHook(() => useTablePreferences())
    act(() => {
      result.current.updateFilters({ status: ['paused'] })
    })
    expect(result.current.preferences.filters.status).toContain('paused')
    act(() => {
      result.current.updateFilters({ assignee: ['Alex Kim'] })
    })
    expect(result.current.preferences.filters.assignee).toContain('Alex Kim')
    expect(result.current.preferences.filters.status).toContain('paused')
  })
})
