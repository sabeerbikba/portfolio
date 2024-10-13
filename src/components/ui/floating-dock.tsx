/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/

import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
   AnimatePresence,
   MotionValue,
   motion,
   useInView,
   useMotionValue,
   useSpring,
   useTransform,
} from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export const FloatingDock = ({
   items,
   desktopClassName,
   mobileClassName,
   dockWidth,
   dockHeight,
}: {
   items: { title: string; icon: React.ReactNode; href: string }[];
   desktopClassName?: string;
   mobileClassName?: string;
   dockWidth?: string;
   dockHeight?: string;
}) => {
   return (
      <>
         <FloatingDockDesktop items={items} className={desktopClassName} dockWidth={dockWidth} dockHeight={dockHeight} />
         <FloatingDockMobile items={items} className={mobileClassName} />
      </>
   );
};

const FloatingDockMobile = ({
   items,
   className,
}: {
   items: { title: string; icon: React.ReactNode; href: string, separator?: boolean }[];
   className?: string;
}) => {
   const [open, setOpen] = useState(false);
   return (
      <div className={cn("relative block md:hidden", className)}>
         <AnimatePresence>
            {open && (
               <motion.div
                  layoutId="nav"
                  className="absolute bottom-full mb-2 inset-x-0 flex flex-col gap-2"
               >
                  {items.map((item, idx) => (
                     <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                           opacity: 1,
                           y: 0,
                        }}
                        exit={{
                           opacity: 0,
                           y: 10,
                           transition: {
                              delay: idx * 0.05,
                           },
                        }}
                        transition={{ delay: (items.length - 1 - idx) * 0.05 }}
                     >
                        <Link
                           href={item.href}
                           key={item.title}
                           className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-900 flex items-center justify-center"
                        >
                           <div className="h-4 w-4">{item.icon}</div>
                        </Link>
                     </motion.div>
                  ))}
               </motion.div>
            )}
         </AnimatePresence>
         <button
            onClick={() => setOpen(!open)}
            className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-800 flex items-center justify-center"
         >
            <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
         </button>
      </div>
   );
};


const FloatingDockDesktop = ({
   items,
   className,
   dockWidth,
   dockHeight,
}: {
   items: { title: string; icon: React.ReactNode; href: string, separator?: boolean }[];
   className?: string;
   dockWidth?: string;
   dockHeight?: string;
}) => {
   let mouseX = useMotionValue(Infinity);
   const inViewRef = useRef(null);
   const inView = useInView(inViewRef, { once: false });
   const [isHovered, setIsHovered] = useState(false);
   const [isVisible, setIsVisible] = useState(false);
   const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

   useEffect(() => {
      if (isHovered) {
         setIsVisible(true);
         if (timer) {
            clearTimeout(timer);
            setTimer(null);
         }
      } else {
         delay()
      }
      return () => {
         if (timer) {
            clearTimeout(timer);
         }
      };
   }, [isHovered]);

   useEffect(() => {
      console.log("inView: ", inView)
      if (inView) {
         setIsVisible(true);
         delay();
      }
   }, [inView]);

   function delay() {
      const newTimer = setTimeout(() => {
         setIsVisible(false);
      }, 5000);
      setTimer(newTimer);
   }

   return (
      <motion.div
         ref={inViewRef}
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => {
            setIsHovered(false);
            mouseX.set(Infinity);
         }}
         onMouseMove={(e) => {
            mouseX.set(e.pageX);
         }}
         animate={{
            height: isVisible ? "55px" : 0,
            width: isVisible ? "auto" : "120px",
            y: isVisible ? -58 : 0,
         }}
         className={cn(
            "mx-auto hidden md:flex gap-4 items-end rounded-2xl bg-gray-50 dark:bg-neutral-900 px-4",
            isVisible ? "pb-2" : "pb-1",
            className
         )}
      >
         {isVisible && items.map((item) => {
            const { separator } = item;
            return separator ? (
               <div className="border-x-[1.9px] border-black rounded-2xl h-8" />
            ) : (
               <IconContainer mouseX={mouseX} key={item.title} {...item} />
            )
         })}
      </motion.div>
   );
};

const IconContainer = ({
   mouseX,
   title,
   icon,
   href,
}: {
   mouseX: MotionValue;
   title: string;
   icon: React.ReactNode;
   href: string;
}) => {
   let ref = useRef<HTMLDivElement>(null);

   let distance = useTransform(mouseX, (val) => {
      let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

      return val - bounds.x - bounds.width / 2;
   });

   let widthTransform = useTransform(distance, [-150, 0, 150], [35, 70, 35]);
   let heightTransform = useTransform(distance, [-150, 0, 150], [35, 70, 35]);

   let widthTransformIcon = useTransform(distance, [-150, 0, 150], [12, 24, 12]);
   let heightTransformIcon = useTransform(distance, [-150, 0, 150], [12, 24, 12]);

   let width = useSpring(widthTransform, {
      mass: 0.1,
      stiffness: 150,
      damping: 12,
   });
   let height = useSpring(heightTransform, {
      mass: 0.1,
      stiffness: 150,
      damping: 12,
   });

   let widthIcon = useSpring(widthTransformIcon, {
      mass: 0.1,
      stiffness: 150,
      damping: 12,
   });
   let heightIcon = useSpring(heightTransformIcon, {
      mass: 0.1,
      stiffness: 150,
      damping: 12,
   });

   const [hovered, setHovered] = useState(false);

   return (
      <Link href={href}>
         <motion.div
            ref={ref}
            style={{ width, height }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="aspect-square rounded-xl bg-gray-200 dark:bg-neutral-800 flex items-center justify-center relative "
         >
            <AnimatePresence>
               {hovered && (
                  <motion.div
                     initial={{ opacity: 0, y: 10, x: "-50%" }}
                     animate={{ opacity: 1, y: 0, x: "-50%" }}
                     exit={{ opacity: 0, y: 2, x: "-50%" }}
                     className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
                  >
                     {title}
                  </motion.div>
               )}
            </AnimatePresence>
            <motion.div
               style={{ width: widthIcon, height: heightIcon }}
               className="flex items-center justify-center"
            >
               {icon}
            </motion.div>
         </motion.div>
      </Link>
   );
}
