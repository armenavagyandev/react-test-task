export const SortDirection = {
  ASC: 'asc',
  DESC: 'desc',
} as const

export type SortDirectionType = typeof SortDirection[keyof typeof SortDirection]
