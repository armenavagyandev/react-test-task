import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RowItem } from './RowItem'
import { faker } from '@faker-js/faker'

describe('RowItem Component', () => {
  it('should render without children and className', () => {
    render(<table><tbody><tr><RowItem /></tr></tbody></table>)
    const td = screen.getByRole('cell')

    expect(td).toBeInTheDocument()
    expect(td).toHaveClass('p-3', 'text-left', 'border-b', 'border-b-gray-300')
    expect(td).toBeEmptyDOMElement()
  })

  it('should render with children', () => {
    const children = faker.lorem.word(5)

    render(<table><tbody><tr><RowItem>{children}</RowItem></tr></tbody></table>)
    const td = screen.getByText(children)

    expect(td).toBeInTheDocument()
  })

  it('should render with additional className', () => {
    const className = 'bg-white'

    render(<table><tbody><tr><RowItem className={className}></RowItem></tr></tbody></table>)
    const td = screen.getByRole('cell')

    expect(td).toBeInTheDocument()
    expect(td).toHaveClass(className)
  })
})
