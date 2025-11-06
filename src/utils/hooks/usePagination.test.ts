import { describe, it, expect } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { usePagination } from './usePagination'

describe('usePagination', () => {
  const data = Array.from({ length: 15 }, (_, i) => i + 1)

  it('should increase page by 1 on onNext', () => {
    const initialPage = 1

    const { result } = renderHook(() => usePagination({ data, initialPage, initialPerPage: 5 }))

    expect(result.current.page).toEqual(initialPage)

    act(() => result.current.onNext())

    expect(result.current.page).toEqual(initialPage + 1)
  })

  it('should not increase page by 1 on onNext when is last page', () => {
    const initialPage = 3

    const { result } = renderHook(() => usePagination({ data, initialPage, initialPerPage: 5 }))

    expect(result.current.page).toEqual(initialPage)

    act(() => result.current.onNext())

    expect(result.current.page).toEqual(initialPage)
  })

  it('should decrease page by 1 on onPrevious', () => {
    const initialPage = 2

    const { result } = renderHook(() => usePagination({ data, initialPage, initialPerPage: 5 }))

    expect(result.current.page).toEqual(initialPage)

    act(() => result.current.onPrevious())

    expect(result.current.page).toEqual(initialPage - 1)
  })

  it('should not decrease page by 1 on onPrevious is first page', () => {
    const initialPage = 1

    const { result } = renderHook(() => usePagination({ data, initialPage, initialPerPage: 5 }))

    expect(result.current.page).toEqual(initialPage)

    act(() => result.current.onPrevious())

    expect(result.current.page).toEqual(initialPage)
  })

  it('should change perPage when called setPerPage', () => {
    const initialPerPage = 5

    const { result } = renderHook(() => usePagination({ data, initialPage: 1, initialPerPage }))

    expect(result.current.perPage).toEqual(initialPerPage)

    act(() => result.current.setPerPage(10))

    expect(result.current.perPage).toEqual(10)
  })
})
