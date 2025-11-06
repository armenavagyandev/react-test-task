import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { Select } from './Select'

describe('Select Component', () => {
  it('should render with value', () => {
    const value = faker.lorem.word(5)

    render(<Select value={value} options={[value]} />)
    const select = screen.getByDisplayValue(value)

    expect(select).toBeInTheDocument()
  })

  it('should render with multiple options', () => {
    const options = ['Option 1', 'Option 2', 'Option 3']

    render(<Select options={options}/>)
    const select = screen.getByRole('combobox')

    expect(select).toBeInTheDocument()
    options.forEach((optionText) => {
      expect(screen.getByText(optionText)).toBeInTheDocument()
    })
  })
})
