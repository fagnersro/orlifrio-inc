// Tremor Label [v0.1.0]

import React from "react"
import * as LabelPrimitives from "@radix-ui/react-label"

import { cx } from "@/lib/utils"

interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitives.Root> {
  disabled?: boolean
}

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitives.Root>,
  LabelProps
>(({ className, disabled, ...props }, forwardedRef) => (
  <LabelPrimitives.Root
    ref={forwardedRef}
    className={cx(
      "text-sm font-medium leading-none",
      disabled
        ? "text-gray-400 dark:text-gray-600"
        : "text-gray-900 dark:text-gray-50",
      className,
    )}
    aria-disabled={disabled}
    {...props}
  />
))

Label.displayName = "Label"

export { Label, type LabelProps }
