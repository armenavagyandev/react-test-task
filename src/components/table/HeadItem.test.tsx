import { describe, it, vi, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { HeadItem } from './HeadItem'
import { SortDirection } from '@/constants/sort-direction.ts'

describe('HeadItem', () => {
  it('should render without props', () => {
    render(
      <table>
        <thead>
          <tr><HeadItem /></tr>
        </thead>
      </table>,
    )

    expect(screen.getByRole('columnheader')).toBeInTheDocument()
  })

  it('should render with children', () => {
    const children = faker.word.words(5)

    render(
      <table>
        <thead>
          <tr>
            <HeadItem>{children}</HeadItem>
          </tr>
        </thead>
      </table>,
    )

    expect(screen.getByText(children)).toBeInTheDocument()
  })

  it('should render as button when sortable is true', () => {
    render(
      <table>
        <thead>
          <tr>
            <HeadItem sortable sortableField="name"></HeadItem>
          </tr>
        </thead>
      </table>,
    )
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('should render as div when sortable is false', () => {
    const text = faker.word.words(5)

    render(
      <table>
        <thead>
          <tr>
            <HeadItem>{text}</HeadItem>
          </tr>
        </thead>
      </table>,
    )
    const div = screen.getByText(text).closest('div')

    expect(div).toBeInTheDocument()
  })

  it('should call setSort with correct values when clicked', () => {
    const setSort = vi.fn()
    const sort = { field: 'name', direction: SortDirection.ASC }

    render(
      <table>
        <thead>
          <tr>
            <HeadItem sortable sortableField="name" sort={sort} setSort={setSort}></HeadItem>
          </tr>
        </thead>
      </table>,
    )

    fireEvent.click(screen.getByRole('button'))
    expect(setSort).toHaveBeenCalledWith({
      field: 'name',
      direction: SortDirection.DESC,
    })
  })
})
