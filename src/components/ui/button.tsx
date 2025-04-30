import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        accent:
          'bg-accent-point text-accent-point-foreground shadow-sm hover:bg-accent-point/80 active:bg-accent-point/60',
        accentOutline:
          'border border-accent-point text-accent-point shadow-sm hover:bg-accent-point/10 active:bg-accent-point/20',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        md: 'h-10 rounded-md px-4 text-base',
        lg: 'h-12 rounded-md px-6 text-lg',
        xl: 'h-14 rounded-md px-8 text-xl',
        icon: 'h-9 w-9',
      },
      width: {
        auto: 'w-auto',
        full: 'w-full',
        fixedSm: 'w-32',
        fixedMd: 'w-40',
        fixedLg: 'w-52',
        fixedXl: 'w-60',
      },
      shadow: {
        none: '',
        default: 'shadow-sm shadow-accent-point',
      },
      rounded: {
        default: '',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      width: 'auto',
      shadow: 'none',
      rounded: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
