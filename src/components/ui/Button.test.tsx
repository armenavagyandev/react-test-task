import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { Button } from './Button'

describe('Button Component', () => {
  it('should render with text as children', () => {
    const children = faker.lorem.words(2)

    render(<Button>{children}</Button>)

    expect(screen.getByText(children)).toBeInTheDocument()
  })

  it('should render with react node as children', () => {
    const childrenText = faker.lorem.word()
    const childNode = <span data-testid="child-node">{childrenText}</span>

    render(<Button>{childNode}</Button>)
    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
    expect(screen.getByTestId('child-node')).toHaveTextContent(childrenText)
  })

  it('should render with new className', () => {
    render(<Button className="text-left"></Button>)
    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
    expect(button).toHaveClass(
      'text-left',
    )
  })
})
