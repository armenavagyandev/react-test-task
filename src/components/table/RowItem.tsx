import type { PropsWithChildren } from 'react'

type Props = {}

export const RowItem = ({ children }: PropsWithChildren<Props>) => {
  return (
    <td className="p-3 text-left border-b border-b-gray-300">
      {children}
    </td>
  )
}
