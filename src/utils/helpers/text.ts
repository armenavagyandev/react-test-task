export const formatFieldName = (field: string) => {
  let result = field.replace(/_/g, ' ')

  result = result.replace(/([a-z])([A-Z])/g, '$1 $2')

  result = result.replace(/\b\w/g, (char) => char.toUpperCase())

  return result
}
