import { describe, it, expect, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useDragAndDrop } from './useDragAndDrop'

describe('useDragAndDrop', () => {
  it('should call handler with correct indices on drop', () => {
    const handler = vi.fn()
    const { result } = renderHook(() => useDragAndDrop())

    act(() => result.current.onDragStart(0))

    expect(result.current.draggingIndex).toBe(0)

    act(() => result.current.onDrop({ targetIndex: 1, handler }))

    expect(handler).toHaveBeenCalledWith(0, 1)
    expect(result.current.draggingIndex).toBe(null)
  })

  it('should not call handler if from === targetIndex', () => {
    const handler = vi.fn()
    const { result } = renderHook(() => useDragAndDrop())

    act(() => result.current.onDragStart(0))

    act(() => result.current.onDrop({ targetIndex: 0, handler }))

    expect(handler).not.toHaveBeenCalled()
  })
})
