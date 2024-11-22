import type { AnchorHTMLAttributes, ReactNode } from "react";

const Link = ({
   children,
   ...rest
}: {
   children: ReactNode | string
} & AnchorHTMLAttributes<HTMLAnchorElement>) => (
   <a target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
   </a>
);

export default Link;
