import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { Input } from './Input'

describe('Input Component', () => {
  it('should render with value', () => {
    const value = faker.lorem.word(5)

    render(<Input value={value} />)
    const input = screen.getByDisplayValue(value)

    expect(input).toBeInTheDocument()
  })

  it('should call onChange when typing', () => {
    const handleChange = vi.fn()

    render(<Input value="" onChange={handleChange} />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'Test' } })

    expect(handleChange).toHaveBeenCalled()
  })

  it('should render with placeholder', () => {
    const placeholder = faker.lorem.word(5)
    render(<Input placeholder={placeholder} />)
    const input = screen.getByPlaceholderText(placeholder)

    expect(input).toBeInTheDocument()
  })
})
