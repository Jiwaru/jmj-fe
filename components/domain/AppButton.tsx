import { cva, type VariantProps } from "class-variance-authority"

import { Button as ShadcnButton } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const appButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold",
  {
    variants: {
      variant: {
        primary:
          "bg-brand text-white hover:bg-brand-hover active:bg-brand-active",
        dark: "bg-text text-white hover:bg-text/90 active:bg-text-active",
        outline: "border border-text bg-transparent text-text hover:bg-text/5",
        dashed:
          "bg-brand/10 hover:bg-brand/15 border-2 border-dashed border-brand text-brand",
        link: "bg-transparent hover:bg-transparent text-brand underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-auto w-full self-stretch p-4 text-md",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

interface AppButtonProps
  extends Omit<React.ComponentProps<typeof ShadcnButton>, "variant" | "size">,
    VariantProps<typeof appButtonVariants> {}

function AppButton({ className, variant, size, ...props }: AppButtonProps) {
  return (
    <ShadcnButton
      className={cn(appButtonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { AppButton, appButtonVariants }
