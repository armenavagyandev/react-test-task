import { useEffect, useMemo } from 'react'
import { createEvent, createStore } from 'effector'
import { useUnit } from 'effector-react/effector-react.umd'

type UsePaginationProps<T> = {
  data: T[]
  initialPage: number
  initialPerPage: number
}

const $currentPage = createStore<number | null>(null)
const $perPage = createStore<number | null>(null)

const changePage = createEvent<number>()
const changePerPage = createEvent<number>()

$currentPage.on(changePage, (_, page) => page)

$perPage.on(changePerPage, (_, perPage) => perPage)

export const usePagination =  <T>({
  data,
  initialPage,
  initialPerPage,
}: UsePaginationProps<T>) => {
  const [currentPage, perPage, setCurrentPage, setPerPage] = useUnit([
    $currentPage,
    $perPage,
    changePage,
    changePerPage,
  ])

  const paginationInfo = useMemo(() => {
    const startIdx = ((currentPage ?? initialPage) - 1) * (perPage ?? initialPerPage)
    const endIdx = startIdx + (perPage ?? initialPerPage)

    return {
      totalPages: Math.ceil(data.length / (perPage ?? initialPerPage)),
      data: data.slice(startIdx, endIdx),
    }

  }, [currentPage, data, initialPage, initialPerPage, perPage])

  const nonNullableCurrentPage = currentPage ?? initialPage
  const nonNullablePerPage = perPage ?? initialPerPage

  const onNext = () => setCurrentPage(currentPage !== paginationInfo.totalPages ? nonNullableCurrentPage + 1 : currentPage)

  const onPrevious = () => setCurrentPage(nonNullableCurrentPage === 1 ? nonNullableCurrentPage : nonNullableCurrentPage - 1)

  useEffect(() => {
    setCurrentPage(initialPage ?? 1)
  }, [setCurrentPage, perPage, initialPage])

  return {
    data: paginationInfo.data,
    page: nonNullableCurrentPage,
    totalPages: paginationInfo.totalPages,

    onNext,
    onPrevious,

    perPage: nonNullablePerPage,
    setPerPage,
  }
}

// If you want to use React state instead of Effector

// export const usePagination =  <T>({
//   data,
//   initialPage,
//   initialPerPage,
// }: UsePaginationProps<T>) => {
//   const [currentPage, setCurrentPage] = useState(initialPage)
//   const [perPage, setPerPage] = useState(initialPerPage)
//
//   const paginationInfo = useMemo(() => {
//     const startIdx = (currentPage - 1) * perPage
//     const endIdx = startIdx + perPage
//
//     return {
//       totalPages: Math.ceil(data.length / perPage),
//       data: data.slice(startIdx, endIdx),
//     }
//
//   }, [currentPage, data, perPage])
//
//   const onNext = useCallback(() => {
//     setCurrentPage((prev) => prev !== paginationInfo.totalPages ? prev + 1 : prev)
//   }, [paginationInfo.totalPages])
//
//   const onPrevious = useCallback(() => {
//     setCurrentPage(prev => prev === 1 ? prev : prev - 1)
//   }, [])
//
//   return {
//     data: paginationInfo.data,
//     page: currentPage,
//     totalPages: paginationInfo.totalPages,
//
//     onNext,
//     onPrevious,
//
//     perPage,
//     setPerPage,
//   }
// }
