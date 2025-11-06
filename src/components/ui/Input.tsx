import type { InputHTMLAttributes } from 'react'
import classNames from 'classnames'

type Props = InputHTMLAttributes<HTMLInputElement>

export const Input = ({
  className,
  ...props
}: Props) => {
  return (
    <input
      className={classNames(
        'px-2 py-1 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/40 ',
        className,
      )}
      {...props}
    />
  )
}
