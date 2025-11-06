import type { ButtonHTMLAttributes } from 'react'
import classNames from 'classnames'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({
  className = '',
  children,
  ...props
}: Props) => {
  return (
    <button
      {...props}
      className={classNames(
        'bg-blue-500 text-white hover:opacity-90 cursor-pointer px-5 py-2 rounded-md disabled:pointer-events-none disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500/40',
        className,
      )}
    >
      {children}
    </button>
  )
}
