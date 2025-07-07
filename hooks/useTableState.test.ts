import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTableState } from './useTableState'

describe('useTableState', () => {
  it('returns expanded and setExpanded', () => {
    const { result } = renderHook(() => useTableState())
    expect(result.current.expanded).toBeDefined()
    expect(typeof result.current.setExpanded).toBe('function')
  })

  it('can update expanded state', () => {
    const { result } = renderHook(() => useTableState())
    act(() => {
      result.current.setExpanded({ 1: true })
    })
    expect(result.current.expanded).toEqual({ 1: true })
  })
  
  it('can reset expanded state', () => {
    const { result } = renderHook(() => useTableState())
    act(() => {
      result.current.setExpanded({ 1: true })
    })
    act(() => {
      result.current.setExpanded({})
    })
    expect(result.current.expanded).toEqual({})
  })
})
