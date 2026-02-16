import React from 'react'
import { cn } from '../../lib/utils'

const variants = {
  default: 'bg-primary text-primary-foreground shadow-soft hover:opacity-90',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  outline: 'border border-input bg-background hover:bg-muted/60',
  ghost: 'bg-transparent hover:bg-muted/60'
}

const sizes = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-6 text-base'
}

const Button = React.forwardRef(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
)

Button.displayName = 'Button'

export default Button
