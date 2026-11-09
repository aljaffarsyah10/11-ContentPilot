import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border text-sm font-medium whitespace-nowrap transition-all duration-200 outline-none select-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "border-primary/20 bg-gradient-to-b from-slate-900 to-slate-950 text-white shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.15)] hover:from-slate-800 hover:to-slate-900 hover:shadow-[0_4px_12px_rgba(15,23,42,0.15)] dark:from-slate-100 dark:to-slate-200 dark:text-slate-950 dark:hover:from-white dark:hover:to-slate-100 dark:shadow-[0_1px_2px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.5)]",
        gradient:
          "border-indigo-500/30 bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 text-white shadow-[0_1px_2px_rgba(0,0,0,0.1),0_2px_8px_rgba(79,70,229,0.25),inset_0_1px_0_rgba(255,255,255,0.2)] hover:from-indigo-500 hover:via-indigo-600 hover:to-violet-500 hover:shadow-[0_4px_16px_rgba(79,70,229,0.35)] active:to-violet-700",
        outline:
          "border-border/80 bg-gradient-to-b from-card to-card/90 hover:from-accent/80 hover:to-accent text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.6)] dark:from-card/60 dark:to-card/40 dark:shadow-none dark:hover:from-accent/60 dark:hover:to-accent/40",
        secondary:
          "border-border/50 bg-gradient-to-b from-secondary to-secondary/80 text-secondary-foreground hover:from-secondary/90 hover:to-secondary shadow-2xs",
        ghost:
          "border-transparent hover:bg-accent/80 hover:text-foreground text-muted-foreground",
        destructive:
          "border-rose-600/20 bg-gradient-to-b from-rose-600 to-rose-700 text-white shadow-[0_1px_2px_rgba(0,0,0,0.1),0_2px_6px_rgba(225,29,72,0.2)] hover:from-rose-500 hover:to-rose-600 hover:shadow-[0_4px_12px_rgba(225,29,72,0.3)]",
        link: "border-transparent text-primary underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-9 gap-2 px-3.5 py-2",
        xs: "h-7 gap-1 rounded-md px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-md px-2.5 text-xs [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 gap-2 rounded-lg px-4 text-sm font-semibold",
        icon: "size-9",
        "icon-xs": "size-7 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 rounded-md [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg": "size-10 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
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
