import type { SelectHTMLAttributes } from 'react'
import classNames from 'classnames'

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  options: (string | number)[]
}

export const Select = ({
  options,
  className = '',
  ...props
}: Props) => {
  return (
    <select
      {...props}
      className={classNames(
        'px-5 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/40',
        className,
      )}
    >
      {
        options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))
      }
    </select>
  )
}
