import { describe, it, expect } from 'vitest'
import { formatFieldName } from './text'

describe('formatFieldName helper', () => {
  it('should replace underscores with spaces and capitalize first letter of each word', () => {
    expect(formatFieldName('first_name')).toBe('First Name')
    expect(formatFieldName('last_name')).toBe('Last Name')
  })

  it('should separate camel case text and capitalize first letter of each word', () => {
    expect(formatFieldName('userName')).toBe('User Name')
    expect(formatFieldName('accountID')).toBe('Account ID')
  })

  it('should capitalize single word', () => {
    expect(formatFieldName('username')).toBe('Username')
  })

  it('should return already formatted text', () => {
    expect(formatFieldName('User Name')).toBe('User Name')
  })

  it('should receive empty string and return it', () => {
    expect(formatFieldName('')).toBe('')
  })
})
