"use client";
import {
  useState,
  forwardRef,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";

import type { MouseEvent, Ref } from "react";

import { cn } from "@/lib/utils";

type InputProps = {
  elementType?: "input";
} & InputHTMLAttributes<HTMLInputElement>;

type TextareaProps = {
  elementType?: "textarea";
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

type Props = InputProps | TextareaProps;

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(
  ({ className, elementType = "input", ...props }, ref) => {
    const radius = 100;
    const [visible, setVisible] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    return (
      <motion.div
        style={{
          background: useMotionTemplate`
                  radial-gradient(
                     ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
                     var(--gray-500),
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
              `flex h-10 w-full border-none bg-gray-50 text-black shadow-input rounded-md px-3 py-2 text-sm 
                     file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400
                     focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400
                     disabled:cursor-not-allowed disabled:opacity-50
                     group-hover/input:shadow-none transition duration-400 isolate`,
              className,
            )}

            ref={ref as Ref<HTMLTextAreaElement>}
            {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            className={cn(
              `flex h-10 w-full border-none bg-gray-50 text-black shadow-input rounded-md px-3 py-2 text-sm 
                     file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 
                     focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400
                     disabled:cursor-not-allowed disabled:opacity-50
                     group-hover/input:shadow-none transition duration-400 isolate`,
              className,
            )}
            ref={ref as Ref<HTMLInputElement>}
            {...(props as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
      </motion.div>
    );
  }
);
Input.displayName = "Input";

export default Input;
