import type { PropsWithChildren } from 'react'
import classNames from 'classnames'

type Props = {
  className?: string
}

export const RowItem = ({ children, className }: PropsWithChildren<Props>) => {
  return (
    <td className={classNames('p-3 text-left border-b border-b-gray-300', className)}>
      {children}
    </td>
  )
}
