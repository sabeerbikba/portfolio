"use client";
import React, {
   useState,
   forwardRef,
   InputHTMLAttributes,
   TextareaHTMLAttributes,
} from "react";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Separate prop types for <input> and <textarea>
type InputProps = {
   elementType?: "input";
} & InputHTMLAttributes<HTMLInputElement>;

type TextareaProps = {
   elementType: "textarea";
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

// Union type for component props, allowing either input or textarea props based on elementType
type Props = InputProps | TextareaProps;

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(
   ({ className, elementType = "input", ...props }, ref) => {
      const radius = 100;
      const [visible, setVisible] = useState(false);

      let mouseX = useMotionValue(0);
      let mouseY = useMotionValue(0);

      function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
         let { left, top } = currentTarget.getBoundingClientRect();
         mouseX.set(clientX - left);
         mouseY.set(clientY - top);
      }

      // Determine which component to render based on elementType
      const InputComponent = elementType === "textarea" ? "textarea" : "input";

      return (
         <motion.div
            style={{
               background: useMotionTemplate`
                  radial-gradient(
                     ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
                     var(--blue-500),
                     transparent 80%
                  )
               `,
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            className="p-[2px] rounded-lg transition duration-300 group/input"
         >
            {elementType === "textarea" ? (
               <textarea
                  className={cn(
                     className,
                     `flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm 
                     file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
                     focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
                     disabled:cursor-not-allowed disabled:opacity-50
                     dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
                     group-hover/input:shadow-none transition duration-400`
                  )}
                  ref={ref as React.Ref<HTMLTextAreaElement>}
                  {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
               />
            ) : (
               <input
                  className={cn(
                     className,
                     `flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm 
                     file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
                     focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
                     disabled:cursor-not-allowed disabled:opacity-50
                     dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
                     group-hover/input:shadow-none transition duration-400`
                  )}
                  ref={ref as React.Ref<HTMLInputElement>}
                  {...(props as InputHTMLAttributes<HTMLInputElement>)}
               />
            )}
         </motion.div>
      );
   }
);
Input.displayName = "Input";

export default Input;
