import { useCallback, useMemo, useState } from 'react'

type UsePaginationProps<T> = {
  data: T[]
  initialPage: number
  initialPerPage: number
}
export const usePagination =  <T>({
  data,
  initialPage,
  initialPerPage,
}: UsePaginationProps<T>) => {
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [perPage, setPerPage] = useState(initialPerPage)

  const paginationInfo = useMemo(() => {
    const startIdx = (currentPage - 1) * perPage
    const endIdx = startIdx + perPage

    return {
      totalPages: Math.ceil(data.length / perPage),
      data: data.slice(startIdx, endIdx),
    }

  }, [currentPage, data, perPage])

  const onNext = useCallback(() => {
    setCurrentPage((prev) => prev !== paginationInfo.totalPages ? prev + 1 : prev)
  }, [paginationInfo.totalPages])

  const onPrevious = useCallback(() => {
    setCurrentPage(prev => prev === 1 ? prev : prev - 1)
  }, [])

  return {
    data: paginationInfo.data,
    page: currentPage,
    totalPages: paginationInfo.totalPages,

    onNext,
    onPrevious,

    perPage,
    setPerPage,
  }
}
