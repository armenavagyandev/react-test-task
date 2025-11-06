import { describe, it, vi, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Table, type TableDataType } from './'

const mockData: TableDataType[] = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 },
  { id: 3, name: 'Jon', age: 21 },
]

describe('Table', () => {
  it('should display table when data is set', () => {
    render(
      <Table
        data={mockData}
        onDelete={vi.fn()}
        onDragAndDrop={vi.fn()}
      />,
    )

    const resetButton = screen.getByText('Reset Sorting')
    expect(resetButton).toBeInTheDocument()

    const deleteButtons = screen.getAllByText('Delete')
    expect(deleteButtons).toHaveLength(3)
    deleteButtons.forEach(btn => {
      expect(btn).toBeInTheDocument()
    })

    const nextButton =  screen.getByText('Next')
    const prevButton =  screen.getByText('Prev')
    expect(nextButton).toBeInTheDocument()
    expect(prevButton).toBeInTheDocument()

    const select = screen.getByRole('combobox')
    expect(select).toBeInTheDocument()

    const options = screen.getAllByRole('option')
    const optionValues = options.map(opt => Number(opt.textContent))
    expect(optionValues).toEqual([5, 10, 20])

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()

    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
    expect(screen.getByText('Jon')).toBeInTheDocument()

    expect(screen.getByText('Id')).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Age')).toBeInTheDocument()
    expect(screen.getByText('Actions')).toBeInTheDocument()
  })

  it('should filters rows when search is used', () => {
    render(
      <Table
        data={mockData}
        onDelete={vi.fn()}
        onDragAndDrop={vi.fn()}
      />,
    )
    const input = screen.getByPlaceholderText('Search...')
    fireEvent.change(input, { target: { value: 'Alice' } })

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('30')).toBeInTheDocument()

    expect(screen.queryByText('2')).toBeNull()
    expect(screen.queryByText('Bob')).toBeNull()
    expect(screen.queryByText('25')).toBeNull()

    expect(screen.queryByText('3')).toBeNull()
    expect(screen.queryByText('Jon')).toBeNull()
    expect(screen.queryByText('21')).toBeNull()
  })
})
