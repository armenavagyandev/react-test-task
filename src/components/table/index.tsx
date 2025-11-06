import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Paginator } from '@/components/paginator'
import { RowItem } from '@/components/table/RowItem'
import { HeadItem, type SortType } from '@/components/table/HeadItem'
import { formatFieldName } from '@/utils/helpers/text'
import { usePagination } from '@/utils/hooks/usePagination'
import { useDragAndDrop } from '@/utils/hooks/useDragAndDrop'
import { SortDirection } from '@/constants/sort-direction'

export type TableDataType = Record<string, string | number>

type Props = {
  data: TableDataType[]
  perPageOptions?: number[]
  keyField?: string
  sortable?: boolean
  onDelete(val: string | number, keyField: string): void
  onDragAndDrop(draggingIndex: number, targetIndex: number): void
}

export const Table = ({
  data,
  keyField = 'id',
  sortable = false,
  perPageOptions = [5, 10, 20],
  onDelete,
  onDragAndDrop,
}: Props) => {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortType>()

  const {
    page,
    totalPages,
    data: paginatedData,
    onNext,
    onPrevious,
    perPage,
    setPerPage,
  } = usePagination<TableDataType>({
    data: data
      .filter(row =>
        Object.values(row).some(value => String(value).toLowerCase().includes(search.trim().toLowerCase())),
      )
      .sort((a, b) => {
        const modifier = sort?.direction === SortDirection.ASC ? 1 : -1

        if (!sort) return 0

        const fieldA = a[sort?.field]
        const fieldB = b[sort?.field]

        if (fieldA == null || fieldB == null) return 0

        if (typeof fieldA === 'number' && typeof fieldB === 'number') {
          return (fieldA - fieldB) * modifier
        }

        return String(fieldA).localeCompare(String(fieldB)) * modifier
      }),
    initialPage: 1,
    initialPerPage: perPageOptions[0],
  })

  const {
    onDragStart,
    onDragOver,
    onDrop,
  } = useDragAndDrop()

  return (
    <div className="w-full overflow-auto">
      <div className="w-full p-2 flex items-center justify-end">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="w-full">
        <thead>
          <tr>
            {
              Object.keys(data?.[0]).map((item, index) =>  (
                <HeadItem
                  key={index}
                  sortable={sortable}
                  sortableField={item}
                  sort={sort}
                  setSort={setSort}
                >
                  <span className="whitespace-nowrap">{formatFieldName(item)}</span>
                </HeadItem>
              ))
            }

            <HeadItem>
              Actions
            </HeadItem>
          </tr>
        </thead>

        <tbody>
          {
            paginatedData.map((item) => {
              const realIndex = data.findIndex(i => i[keyField] === item[keyField])

              return (
                <tr
                  key={item[keyField]}
                  draggable
                  onDragStart={() => onDragStart(realIndex)}
                  onDragOver={onDragOver}
                  onDrop={() => onDrop(realIndex, onDragAndDrop)}
                >
                  {
                    Object.values(item).map((value) => (
                      <RowItem key={value}>{value}</RowItem>
                    ))
                  }

                  <RowItem>
                    <div className="flex items-center gap-2">
                      <Button onClick={() => onDelete(item[keyField], keyField)}>
                        Delete
                      </Button>

                      <Button onClick={() => setSort(undefined)}>
                        Reset Sorting
                      </Button>
                    </div>
                  </RowItem>
                </tr>
              )
            })
          }
        </tbody>
      </table>

      <Paginator
        currentPage={page}
        totalPages={totalPages}
        onNext={onNext}
        onPrevious={onPrevious}
        perPageOptions={perPageOptions}
        perPage={perPage}
        onPerPageChange={setPerPage}
      />
    </div>
  )
}
