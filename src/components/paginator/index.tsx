import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select.tsx'

type Props = {
  currentPage: number
  totalPages: number
  onNext(): void
  onPrevious(): void
  perPageOptions: number[]
  perPage: number
  onPerPageChange(value: number): void
}

export const Paginator = ({
  currentPage,
  totalPages,
  onNext,
  onPrevious,
  perPageOptions,
  perPage,
  onPerPageChange,
}: Props) => {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center gap-4 p-2">
        <Button
          onClick={onPrevious}
          disabled={currentPage === 1}
        >
          Prev
        </Button>

        <span>Page {currentPage} of {totalPages}</span>

        <Button
          onClick={onNext}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>

      <div className="flex items-center gap-4 p-2">
        <span>Rows per page:</span>

        <Select
          value={perPage}
          onChange={(e) => onPerPageChange(Number(e.target.value))}
          options={perPageOptions}
        />
      </div>
    </div>
  )
}
