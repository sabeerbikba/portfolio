"use client";
import { useState, useEffect, useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import Screen from "../projects/screen";

// Source URL: https://ui.aceternity.com/components/container-scroll-animation

const ContainerScroll = ({ titleComponent }: { titleComponent: string | React.ReactNode }) => {
   const containerRef = useRef<any>(null);
   const { scrollYProgress } = useScroll({
      target: containerRef,
   });
   const [isMobile, setIsMobile] = useState(false);

   useEffect(() => {
      const checkMobile = () => {
         setIsMobile(window.innerWidth <= 768);
      };
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => {
         window.removeEventListener("resize", checkMobile);
      };
   }, []);

   const scaleDimensions = () => {
      return isMobile ? [0.7, 0.9] : [1.05, 1];
   };

   const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
   const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
   const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

   return (
      <div
         className="h-[60rem] md:h-[80rem] center relative px-2 md:px-20"
         ref={containerRef}
      >
         <div
            className="w-full relative"
            style={{
               perspective: "1000px",
            }}
         >
            <Header translate={translate} titleComponent={titleComponent} />
            <Card rotate={rotate} translate={translate} scale={scale} />
         </div>
      </div>
   );
};

const Header = ({ translate, titleComponent }: any) => (
   <motion.div
      style={{
         translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center"
   >
      {titleComponent}
   </motion.div>
);

const Card = ({
   rotate,
   scale,
}: {
   rotate: MotionValue<number>;
   scale: MotionValue<number>;
   translate: MotionValue<number>;
}) => (
   <motion.div
      style={{
         rotateX: rotate,
         scale,
         boxShadow:
            "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl"
   >
      <div className=" h-full w-full rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl">
         <Screen />
      </div>
   </motion.div>
);

export default ContainerScroll;
