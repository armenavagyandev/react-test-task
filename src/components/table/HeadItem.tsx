import type { PropsWithChildren } from 'react'
import classNames from 'classnames'
import { SortDirection, type SortDirectionType } from '@/constants/sort-direction'

export type SortType = {
  field: string
  direction: SortDirectionType
}

type Props = {
  sortable?: boolean
  sortableField?: string
  sort?: SortType | null
  setSort?(val: SortType): void
}

export const HeadItem = ({
  children,
  sortable,
  sortableField,
  sort,
  setSort,
}: PropsWithChildren<Props>) => {
  const WrapperTag = sortable ? 'button' : 'div'

  const handleSortClick = () => {
    if (!sortable || !sortableField || !setSort) return
    const direction = (sort?.field === sortableField && sort?.direction === SortDirection.DESC)
      ? SortDirection.ASC
      : SortDirection.DESC

    setSort({
      field: sortableField,
      direction: direction,
    })
  }

  return (
    <th
      className={classNames('p-3 text-left bg-gray-100 font-semibold border-b border-b-gray-300', {
        'hover:bg-gray-200': sortable,
      })}
    >
      <WrapperTag
        className={classNames('w-full flex items-center gap-2', {
          'cursor-pointer': sortable,
        })}
        onClick={handleSortClick}
      >
        {children}

        {
          sortable
            ? (
              <span
                className={classNames({
                  'rotate-90': sort?.field !== sortableField,
                  'rotate-180': sort?.field === sortableField && sort?.direction === SortDirection.DESC,
                })}
              >
                ↑
              </span>
            )
            : null
        }
      </WrapperTag>
    </th>
  )
}
