import { ReactNode, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import { cn } from "@/lib/utils";
import { projects, apps } from "@/data/projects";
import { useScreen } from "../projects/screen"; // Context

// Source Code URL: https://ui.aceternity.com/components/floating-dock

export const FloatingDock = () => {
  const [isMediumScreen, setIsMediumScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleChange = () => setIsMediumScreen(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    handleChange();

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className="relative">
      <FloatingDockDesktop hidden={!isMediumScreen} />
      <FloatingDockMobile hidden={isMediumScreen} />
    </div>
  );
};


const FloatingDockMobile = ({ hidden }: { hidden: boolean }) => {
  const mobileDockRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [showContent, setShowContent] = useState<boolean>(true);
  const {
    previewProject: previewProjectNum,
    previewApp: previewAppNum,
    setScreen: screen,
  } = useScreen();

  const handleClickOutside = (event: MouseEvent | TouchEvent | null) => {
    if (!event) return;
    if (mobileDockRef.current && !mobileDockRef.current.contains(event.target as Node)) setOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  /** ## Can be added in feature 
   * https://github.com/abhishekkhandait/react-assistivetouch-menu/blob/master/src/assistivetouch.tsx
   * https://www.npmjs.com/package/react-assistivetouch-menu
   */

  return (
    <div
      ref={mobileDockRef}
      className="absolute block md:hidden top-36 right-3 z-10"
      hidden={hidden}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex pl-1 w-[190px] h-[200px] absolute top-[-75px] right-[-12px] rounded-[50px_160px_160px_50px] bg-[linear-gradient(90deg,_rgba(255,255,255,0.3)_0%,_rgba(255,255,255,0.01)_100%)] text-white"
          >
            {/* Column 1 */}
            <div className="w-1/3 h-full py-[9px] border-white">
              {projects.map(({ title, icon }, id) => {
                const view = id + 1;
                return (
                  <button
                    key={title}
                    onClick={() => screen(view, "project")}
                    className="max-w-ful p-2"
                  >
                    <img
                      src={icon}
                      className={cn(
                        "rounded-xl",
                        view === previewProjectNum && "border border-zinc-600 shadow-[0_0_20px_4px_rgba(255,255,255,0.7)]",
                      )}
                      width={"100%"}
                      height={"100%"}
                    />
                  </button>
                );
              })}
            </div>

            {/* Column 2 */}
            <div className="w-1/3 h-full py-[9px] border-white">
              {apps.map(({ title, icon }, id) => {
                const view = id + 1 + projects.length;
                return (
                  <button
                    key={title}
                    onClick={() => screen(view, "app")}
                    className="max-w-full p-2"
                  >
                    <img src={icon}
                      className={cn(
                        "rounded-xl",
                        view === previewAppNum && "border border-zinc-600 shadow-[0_0_20px_4px_rgba(255,255,255,0.7)]",
                      )}
                      width={"100%"} height={"100%"} />
                  </button>
                );
              })}
            </div>

            {/* Column 3: This part for open close dock button */}
            <div className="w-1/3 h-full border-white" />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        onClick={() => {
          setOpen(!open);
          setShowContent(false);
          setTimeout(() => {
            setShowContent(true);
          }, 350);
        }}
        className={cn(
          "h-10 w-10 center",
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

const FloatingDockDesktop = ({ hidden }: { hidden: boolean }) => {
  const inViewRef = useRef(null);
  const mouseX = useMotionValue(Infinity);
  const inView = useInView(inViewRef, { once: false });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const {
    previewProject: previewProjectNum,
    previewApp: previewAppNum,
    setScreen: screen,
  } = useScreen(); // Context

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
  }, [isHovered, timer]);

  useEffect(() => {
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

  // TODO: need to test in dark mode
  // in dark mode it looks like satureated color 
  return (
    <div
      className="w-full flex items-center absolute top-[35.87rem] z-10"
      style={{ display: hidden ? "none" : "flex" }}
      hidden={hidden}
    >
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
        className="mx-auto gap-2 bg-[rgba(255,255,255,0.4)] w-auto m-auto rounded-lg px-2.5 inline-flex items-center "
        style={{ display: hidden ? "none" : "inline-flex" }}
        hidden={hidden}
      >
        {isVisible && (
          <>
            {projects.map((item, id) => {
              const view = id + 1;

              return (
                <IconContainer
                  mouseX={mouseX}
                  key={item.title}
                  {...item}
                  isSelected={view === previewProjectNum}
                  onClick={() => screen(view, "project")}
                  isHoverd={isHovered}
                />
              )
            })}
            <div className="border-x-[1.9px] border-gray-700 rounded-2xl h-8" />
            {apps.map((item, id) => {
              const view = id + 1 + projects.length;
              return (
                <IconContainer
                  mouseX={mouseX}
                  key={item.title}
                  {...item}
                  isSelected={view === previewAppNum}
                  onClick={() => screen(view, "app")}
                  isHoverd={isHovered}
                />
              )
            })}
          </>
        )}
      </motion.div>
    </div>
  );
};

const IconContainer = ({
  mouseX,
  title,
  icon,
  isSelected,
  onClick,
  isHoverd,
}: {
  mouseX: MotionValue;
  title: string;
  icon: string;
  isSelected: boolean;
  onClick: () => void;
  isHoverd: boolean
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const isHoverdOnDock = !isHoverd && isSelected;

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [35, 70, 35]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [35, 70, 35]);
  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [12, 24, 12]);
  const heightTransformIcon = useTransform(distance, [-150, 0, 150], [12, 24, 12]);

  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const widthIcon = useSpring(widthTransformIcon, { mass: 0.1, stiffness: 150, damping: 12 });
  const heightIcon = useSpring(heightTransformIcon, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="aspect-square rounded-xl bg-transparent"
      onClick={onClick}
      role="button"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: -12, x: "-50%" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
            className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
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
        <img src={icon} width={"100%"} height={"100%"} />
      </motion.div>
      {isHoverdOnDock && (
        <div className="center mt-0.5">
          <span
            // animate={{ backgroundColor: "rgb(255,255,255)", }}
            className="h-1 w-1 rounded-2xl bg-slate-500 mix-blend-color "
          />
        </div>
      )}
    </motion.div>
  );
}

const RingSpan = (
  { wh, bgColor = "transparent", children }: { wh: number, bgColor: string, children?: ReactNode }
) => (
  <span
    style={{ width: `${wh}px`, height: `${wh}px`, backgroundColor: bgColor }}
    className={`rounded-full center`}
  >
    {children}
  </span>
);
    