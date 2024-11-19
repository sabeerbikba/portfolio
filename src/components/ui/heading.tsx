import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const Heading = ({
   children,
   as: Tag = "h1",
   className,
   ...rest
}: {
   children: ReactNode | string;
   as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
   className?: string;
} & HTMLAttributes<HTMLHeadingElement>) => (
   <Tag
      className={cn(
         "font-semibold text-2xl xs:text-3xl sm:text-4xl md:text-5xl max-xs:px-3 mb-[2px] xs:mb-1 sm:mb-2 md:mb-3 text-black text-center",
         className,
      )}
      {...rest}
   >
      {children}
   </Tag>
);

export default Heading;
