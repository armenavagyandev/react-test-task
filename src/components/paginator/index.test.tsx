import { describe, expect, vi, it } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Paginator } from './'

describe('Paginator Component', () => {
  const perPageOptions = [5, 10, 20]

  it('should render current page, total pages and buttons', () => {
    const currentPage = 2
    const totalPages = 5
    const perPage = 10

    render(
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        perPageOptions={perPageOptions}
        perPage={perPage}
        onNext={vi.fn()}
        onPrevious={vi.fn()}
        onPerPageChange={vi.fn()}
      />,
    )

    expect(screen.getByText(`Page ${currentPage} of ${totalPages}`)).toBeInTheDocument()
    expect(screen.getByText('Prev')).toBeEnabled()
    expect(screen.getByText('Next')).toBeEnabled()
    expect(screen.getByText('Rows per page:')).toBeInTheDocument()

    const select = screen.getByRole('combobox') as HTMLSelectElement
    expect(select.value).toBe(perPage.toString())

    perPageOptions.forEach((option) => {
      expect(screen.getByRole('option', { name: option.toString() })).toBeInTheDocument()
    })
  })

  it('should disable Prev button on first page and Next button on last page', () => {
    const { rerender } = render(
      <Paginator
        currentPage={1}
        totalPages={5}
        perPageOptions={perPageOptions}
        perPage={10}
        onNext={vi.fn()}
        onPrevious={vi.fn()}
        onPerPageChange={vi.fn()}
      />,
    )

    expect(screen.getByText('Prev')).toBeDisabled()
    expect(screen.getByText('Next')).toBeEnabled()

    rerender(
      <Paginator
        currentPage={5}
        totalPages={5}
        perPageOptions={perPageOptions}
        perPage={10}
        onNext={vi.fn()}
        onPrevious={vi.fn()}
        onPerPageChange={vi.fn()}
      />,
    )

    expect(screen.getByText('Prev')).toBeEnabled()
    expect(screen.getByText('Next')).toBeDisabled()

    rerender(
      <Paginator
        currentPage={3}
        totalPages={5}
        perPageOptions={perPageOptions}
        perPage={10}
        onNext={vi.fn()}
        onPrevious={vi.fn()}
        onPerPageChange={vi.fn()}
      />,
    )
    expect(screen.getByText('Prev')).toBeEnabled()
    expect(screen.getByText('Next')).toBeEnabled()
  })

  it('should call onNext and onPrevious callbacks when buttons clicked', () => {
    const onNext = vi.fn()
    const onPrevious = vi.fn()

    render(
      <Paginator
        currentPage={2}
        totalPages={5}
        perPageOptions={perPageOptions}
        perPage={10}
        onNext={onNext}
        onPrevious={onPrevious}
        onPerPageChange={vi.fn()}
      />,
    )

    fireEvent.click(screen.getByText('Prev'))
    expect(onPrevious).toHaveBeenCalledTimes(1)

    fireEvent.click(screen.getByText('Next'))
    expect(onNext).toHaveBeenCalledTimes(1)
  })

  it('should call onPerPageChange when a new option is selected', () => {
    const onPerPageChange = vi.fn()

    render(
      <Paginator
        currentPage={2}
        totalPages={5}
        perPageOptions={perPageOptions}
        perPage={10}
        onNext={vi.fn()}
        onPrevious={vi.fn()}
        onPerPageChange={onPerPageChange}
      />,
    )

    fireEvent.change(screen.getByRole('combobox'), { target: { value: '20' } })
    expect(onPerPageChange).toHaveBeenCalledWith(20)
  })
})
