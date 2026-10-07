import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center border border-transparent text-sm font-medium whitespace-nowrap transition-colors outline-none select-none focus-visible:border-[#B08D57] active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'border border-[#B08D57] bg-transparent text-[#4B1424] hover:bg-[#4B1424] hover:text-[#F6EFE3]',
        outline:
          'border border-[#B08D57] bg-transparent text-[#4B1424] hover:bg-[#4B1424] hover:text-[#F6EFE3]',
        secondary:
          'border border-[#B08D57]/40 bg-[#F6EFE3] text-[#4B1424] hover:bg-[#4B1424] hover:text-[#F6EFE3]',
        ghost:
          'hover:bg-[#4B1424]/10 text-[#4B1424]',
        destructive:
          'bg-[#4B1424] text-[#F6EFE3] hover:bg-[#4B1424]/90',
        link: 'text-[#4B1424] underline-offset-4 hover:underline',
      },
      size: {
        default:
          'h-9 gap-1.5 px-4 text-xs font-sans uppercase tracking-[0.2em]',
        xs: 'h-6 gap-1 px-2 text-[10px] font-sans uppercase tracking-[0.15em]',
        sm: 'h-8 gap-1 px-3 text-[11px] font-sans uppercase tracking-[0.18em]',
        lg: 'h-10 gap-2 px-6 text-xs font-sans uppercase tracking-[0.25em]',
        icon: 'size-8',
        'icon-xs': 'size-6',
        'icon-sm': 'size-7',
        'icon-lg': 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
