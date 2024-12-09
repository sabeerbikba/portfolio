import type { LabelHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const Label = ({
  children,
  className,
  ...rest
}: {
  children: string | ReactNode,
  className?: string,
} & LabelHTMLAttributes<HTMLLabelElement>) => (
  <label
    className={cn(
      "text-sm md:text-base font-medium text-black leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-left px-2",
      className,
    )}
    {...rest}
  >
    {children}
  </label>
);

export default Label;
