import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const H1 = (
   {
      children,
      className,
      ...rest
   }: {
      children: ReactNode | string;
      className?: string;
   } & HTMLAttributes<HTMLHeadingElement>) => (
   <h1
      className={cn(
         "font-extrabold text-2xl xs:text-3xl sm:text-4xl md:text-5xl max-xs:px-3 mb-[2px] xs:mb-1 sm:mb-2 md:mb-3 text-black text-center",
         className,
      )}
      {...rest}
   >
      {children}
   </h1>
);

export default H1;
