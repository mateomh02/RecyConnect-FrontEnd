import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/modules'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-[8px] text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary-900 text-tertiary-50 hover:bg-primary-950',
        secondary: 'text-tertiary-50 bg-secondary hover:bg-secondary-400',
        tertiary:
          'bg-tertiary-50 text-tertiary border border-tertiary-200 hover:bg-tertiary-500 hover:border-tertiary-500',
        destructive: 'bg-inactive hover:bg-inactive-600 text-tertiary-50',
        ghost:
          'bg-transparent text-tertiary hover:bg-tertiary-500 border border-transparent',
        link: 'text-primary underline-offset-4 hover:underline',
        invisible: 'bg-transparent text-tertiary rounded-none'
      },
      size: {
        default: 'h-10 px-3 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-10 px-12',
        icon: 'h-9 w-9'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
