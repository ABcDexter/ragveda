import React from 'react'
import { cn } from '../../lib/utils'

const variants = {
  default: 'bg-primary/10 text-primary border-primary/20',
  secondary: 'bg-secondary text-secondary-foreground border-border',
  outline: 'border border-border text-foreground'
}

const Badge = ({ className, variant = 'default', ...props }) => (
  <span
    className={cn(
      'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
      variants[variant],
      className
    )}
    {...props}
  />
)

export default Badge
