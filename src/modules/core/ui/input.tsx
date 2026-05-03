import * as React from 'react'
import { cn } from '@/modules'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-[8px] border border-tertiary-200 bg-transparent px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-sm placeholder:text-tertiary-100 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring',
          'disabled:bg-tertiary-400 disabled:opacity-50',
          className
        )}
        ref={ref}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          const key = e.key
          const allowedKeys = [
            'Backspace',
            'Tab',
            'Enter',
            'Escape',
            'ArrowLeft',
            'ArrowUp',
            'ArrowRight',
            'ArrowDown'
          ]
          if (allowedKeys.includes(key)) {
            return
          }
          if (!(key >= '0' && key <= '9')) {
            type === 'number' && e.preventDefault()
          }
        }}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
