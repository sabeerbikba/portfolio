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
import { ReactNode, useEffect, useRef, useState } from "react";

// TODO:s
// when hover out need to show bottom dot 
// give better variable names
// if smaller screen comes desktop dock instantly close also applied fro mobile dock 

const links = [
   {
      title: "Home",
      icon: <img src="/images/Vector.png" width={"100%"} height={"100%"} />,
      href: "#",
   },
   {
      title: "Products",
      icon: <img src="/images/location.png" width={"100%"} height={"100%"} />,
      href: "#",
   },
   {
      title: "Components",
      icon: <img src="/images/add.png" width={"100%"} height={"100%"} />,
      href: "#",
   },

];

const links2 = [
   {
      title: "Aceternity UI",
      icon: <img src="/images/chromium.png" width={"100%"} height={"100%"} />,
      href: "#",
   },
   {
      title: "Changelog",
      icon: <img src="/images/about.png" width={"100%"} height={"100%"} />,
      href: "#",
   },
   {
      title: "GitHub",
      icon: <img src="/images/github.png" width={"100%"} height={"100%"} />,
      href: "#",
   },
];

export const FloatingDock = ({
   desktopClassName,
   mobileClassName,
}: {
   desktopClassName?: string;
   mobileClassName?: string;
}) => {
   const [previewProject, setPreviewProject] = useState<number>(1);
   const [previewApp, setPreviewApp] = useState<number>(4);

   // console.log("project ", previewProject);
   // console.log("app ", previewApp);



   // const setScreen = (value: number, view: "project" | "app") => {
   //    switch (view) {
   //       case "project": {
   //          setPreviewProject(value);
   //          return;
   //       }
   //       case "app": {
   //          setPreviewApp(value);
   //          return;
   //       }
   //    }
   // };

   const setScreen = (value: number, view: "project" | "app") => {
      const handlers = {
         project: setPreviewProject,
         app: setPreviewApp,
      };

      handlers[view](value);
   };


   return (
      <>
         <FloatingDockDesktop
            // items={links}
            className={desktopClassName}
            previewProjectNum={previewProject}
            previewAppNum={previewApp}
            screen={setScreen}
         />
         <FloatingDockMobile
            // items={links}
            className={mobileClassName}
            previewProjectNum={previewProject}
            previewAppNum={previewApp}
            screen={setScreen}
         />
      </>
   );
};


const FloatingDockMobile = ({
   // items,
   className,
   previewProjectNum,
   previewAppNum,
   screen,
}: {
   // items: { title: string; icon: React.ReactNode; href: string, separator?: boolean }[];
   className?: string;
   previewProjectNum: number;
   previewAppNum: number;
   screen: (value: number, view: "project" | "app") => void;
}) => {
   const [open, setOpen] = useState(false);
   const [showContent, setShowContent] = useState(true); console.log(showContent);
   // console.log('floagingDockMobile component rendered');

   return (
      <div className={cn("relative block md:hidden", className)}
         style={{ position: "relative", bottom: "300px", right: "15px" }}
      >
         <AnimatePresence>
            {/* {open && <div style={{ width: '200px', height: '200px', position: 'absolute', top: '-75px', right: '-12px', borderRadius: "60px 160px 160px 60px", background: "linear-gradient(90deg, rg33,33,33,1) 0%, rgba(33,33,33,.1) 100%)" }}></div>} */}
            {open && (
               <div
                  className="
                  flex pl-1
      w-[190px] h-[200px] absolute 
      top-[-75px] right-[-12px] 
      rounded-[50px_160px_160px_50px] 
            bg-[linear-gradient(90deg,_rgba(255,255,255,0.3)_0%,_rgba(255,255,255,0.01)_100%)]
             text-white
    "
               >
                  <div className="w-1/3 h-full py-[9px] border-white">
                     {links.map((item, id) => {
                        const view = id + 1;

                        return (
                           <button
                              key={item.title}
                              // {...item}
                              onClick={() => screen(view, "project")}
                              className={cn(
                                 view === previewProjectNum && "outline outline-1 outline-white",
                                 "max-w-ful p-2"
                              )}
                           >{item.icon}</button>
                        )
                     })}
                  </div>
                  <div className="w-1/3 h-full py-[9px] border-white">
                     {links2.map((item, id) => {
                        const view = id + 4;

                        return (
                           <button
                              key={item.title}
                              // {...item}
                              onClick={() => screen(view, "app")}
                              className={cn(
                                 view === previewAppNum && "outline outline-1 outline-white",
                                 "max-w-full p-2"
                              )}
                           >{item.icon}</button>
                        )
                     })}
                  </div>
                  {/* taken place open close button [assistive touch] */}
                  <div className="w-1/3 h-full border-white" />
               </div>
            )}
            {/* {open && (
               <motion.div
                  layoutId="nav"
                  className="absolute bottom-full mb-2 inset-x-0 flex flex-col gap-2"
               >


                  {links.map((item, idx) => (
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
                        transition={{ delay: (links.length - 1 - idx) * 0.05 }}
                     >
                        <Link
                           href={item.href}
                           key={item.title}
                           className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-900 center"
                        >
                           <div
                              className="h-4 w-4"
                           >{item.icon}</div>
                        </Link>
                     </motion.div>
                  ))}


                  {links2.map((item, idx) => (
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
                        transition={{ delay: (links.length - 1 - idx) * 0.05 }}
                     >
                        <Link
                           href={item.href}
                           key={item.title}
                           className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-900 center"
                        >
                           <div
                              className="h-4 w-4"
                           >{item.icon}</div>
                        </Link>
                     </motion.div>
                  ))}
               </motion.div>
            )}*/}
         </AnimatePresence>
         <motion.button
            onClick={() => {
               console.log('clicked!!');
               setOpen(!open);
               setShowContent(false);
               setTimeout(() => {
                  setShowContent(true);
               }, 350);
            }}
            className={cn(
               "h-10 w-10 center",
               // !open ? "rounded-lg opacity-55 " : "rounded-full bg-gray-400 p-2.5",
               !open && 'mix-blend-exclusion',
            )}
            initial={false}
            animate={{
               borderRadius: open ? "50%" : "0.5rem",
               opacity: open ? 1 : 0.55,
               backgroundColor: open ? "#9CA3AF" : "#323232",
               padding: open ? "0.625rem" : "0rem",
            }}
            transition={{ duration: 0.3, ease: "backIn" }}
         >
            {/* <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400" /> */}
            {showContent &&
               <>
                  {!open ? (
                     <RingSpan wh={30} bgColor="#525F65">
                        <RingSpan wh={20} bgColor="#91969C">
                           <RingSpan wh={12} bgColor="#FCFFFF" />
                        </RingSpan>
                     </RingSpan>
                  ) : (
                     <div className="relative w-7 h-7 left-[7px]">
                        <div className="absolute inset-0 rotate-45 w-1 rounded-sm bg-gray-700" />
                        <div className="absolute inset-0 -rotate-45 w-1 rounded-sm bg-gray-700" />
                     </div>
                  )}
               </>
            }
         </motion.button>

      </div>
   );
}





// const FloatingDockMobile = ({
//    // items,
//    className,
//    previewProjectNum,
//    previewAppNum,
// }: {
//    // items: { title: string; icon: React.ReactNode; href: string, separator?: boolean }[];
//    className?: string;
//    previewProjectNum: number;
//    previewAppNum: number;
// }) => {
//    const [open, setOpen] = useState(false);

//    console.log('floagingDockMobile component rendered');

//    return (
//       <div className={cn("relative block md:hidden", className)}
//          style={{ position: "relative", top: "-100px", left: "-50px" }}
//       >
//          <AnimatePresence>
//             {open && (
//                <motion.div
//                   layoutId="nav"
//                   className="absolute bottom-full mb-2 inset-x-0 flex flex-col gap-2"
//                >


//                   {links.map((item, idx) => (
//                      <motion.div
//                         key={item.title}
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{
//                            opacity: 1,
//                            y: 0,
//                         }}
//                         exit={{
//                            opacity: 0,
//                            y: 10,
//                            transition: {
//                               delay: idx * 0.05,
//                            },
//                         }}
//                         transition={{ delay: (links.length - 1 - idx) * 0.05 }}
//                      >
//                         <Link
//                            href={item.href}
//                            key={item.title}
//                            className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-900 center"
//                         >
//                            <div
//                               className="h-4 w-4"
//                            >{item.icon}</div>
//                         </Link>
//                      </motion.div>
//                   ))}


//                   {links2.map((item, idx) => (
//                      <motion.div
//                         key={item.title}
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{
//                            opacity: 1,
//                            y: 0,
//                         }}
//                         exit={{
//                            opacity: 0,
//                            y: 10,
//                            transition: {
//                               delay: idx * 0.05,
//                            },
//                         }}
//                         transition={{ delay: (links.length - 1 - idx) * 0.05 }}
//                      >
//                         <Link
//                            href={item.href}
//                            key={item.title}
//                            className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-900 center"
//                         >
//                            <div
//                               className="h-4 w-4"
//                            >{item.icon}</div>
//                         </Link>
//                      </motion.div>
//                   ))}
//                </motion.div>
//             )}
//          </AnimatePresence>
//          <button
//             onClick={() => {
//                console.log('clicked!!');
//                setOpen(!open);
//             }}
//             className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-800 center"
//          >
//             <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />

//          </button>
//       </div>
//    );
// };


const FloatingDockDesktop = ({
   className,
   previewProjectNum,
   previewAppNum,
   screen
}: {
   // items: { title: string; icon: React.ReactNode; href: string, separator?: boolean }[];
   className?: string;
   previewProjectNum: number;
   previewAppNum: number;
   screen: (value: number, view: "project" | "app") => void;
}) => {
   let mouseX = useMotionValue(Infinity);
   const inViewRef = useRef(null);
   const inView = useInView(inViewRef, { once: false });
   const [isHovered, setIsHovered] = useState<boolean>(false); // false
   const [isVisible, setIsVisible] = useState<boolean>(false); // false 
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
         onMouseMove={(e) => mouseX.set(e.pageX)}
         animate={{
            height: isVisible ? "55px" : '5px',
            width: isVisible ? "auto" : "120px",
            y: isVisible ? -58 : 0,
         }}
         className={cn(
            "mx-auto hidden md:flex gap-2 items-end rounded-2xl bg-gray-50 dark:bg-neutral-900 px-4",
            // isVisible ? "pb-2" : "pb-1",
            className
         )}
      >
         {isVisible && (
            <>
               {links.map((item, id) => {
                  const view = id + 1;

                  return (
                     <IconContainer
                        mouseX={mouseX}
                        key={item.title}
                        {...item}
                        dotVisible={view === previewProjectNum}
                        onClick={() => screen(view, "project")}
                        isHoverd={isHovered}
                     />
                  )
               })}
               <div className="border-x-[1.9px] border-gray-700 rounded-2xl h-8" />
               {links2.map((item, id) => {
                  const view = id + 4;

                  return (
                     <IconContainer
                        mouseX={mouseX}
                        key={item.title}
                        {...item}
                        dotVisible={view === previewAppNum}
                        onClick={() => screen(view, "app")}
                        isHoverd={isHovered}
                     />
                  )
               })}
            </>
         )}

      </motion.div>
   );
};

const IconContainer = ({
   mouseX,
   title,
   icon,
   // href,
   dotVisible,
   // view,
   onClick,
   isHoverd,
}: {
   mouseX: MotionValue;
   title: string;
   icon: ReactNode;
   // href: string;
   dotVisible: boolean;
   // view: number;
   onClick: () => void;
   isHoverd: boolean
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
   const isHoverdOnDock = !isHoverd && dotVisible;

   return (
      // <Link href={href}>
      <motion.div
         ref={ref}
         style={{ width, height }}
         onMouseEnter={() => setHovered(true)}
         onMouseLeave={() => setHovered(false)}
         className="aspect-square rounded-xl bg-transparent dark:bg-neutral-800"
         onClick={onClick}
         role="button"
      >
         <AnimatePresence>
            {hovered && (
               <motion.div
                  initial={{ opacity: 0, y: 10, x: "-50%" }}
                  animate={{ opacity: 1, y: -12, x: "-50%" }}
                  exit={{ opacity: 0, y: 2, x: "-50%" }}
                  className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
               >
                  {title}
               </motion.div>
            )}
         </AnimatePresence>
         <motion.div
            animate={{ y: isHoverdOnDock ? -3 : 0 }}
            style={{ width: widthIcon, height: heightIcon }}
            className={cn(
               "!w-full !h-full rounded-2xl",
               isHoverdOnDock && 'shadow-[0_5px_12px_9px_rgba(0,0,0,0.3)] bg-[rgba(0,0,0,0.3)]',
            )}
         >
            {icon}
         </motion.div>

         {isHoverdOnDock && (
            <div className="center mt-0.5">
               <motion.span animate={{ backgroundColor: "rgb(255,255,255)", }} className="h-1 w-1 rounded-2xl" />
            </div>
         )}

      </motion.div>
      // </Link>
   );
}

const RingSpan = ({ wh, bgColor = "transparent", children, }: { wh: number, bgColor: string, children?: ReactNode }) =>
   <span style={{ width: `${wh}px`, height: `${wh}px`, backgroundColor: bgColor }} className={`rounded-full center`}>
      {children}
   </span>;
