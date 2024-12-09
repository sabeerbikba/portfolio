"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const FlipWords = ({
   words,
   duration = 3000,
   ariaLabel = "Rotating words describing design qualities",

}: {
   words: string[];
   duration?: number;
   ariaLabel?: string;
}) => {
   const [currentWord, setCurrentWord] = useState(words[0]);
   const [isAnimating, setIsAnimating] = useState<boolean>(false);

   const startAnimation = useCallback(() => {
      const word = words[words.indexOf(currentWord) + 1] || words[0];
      setCurrentWord(word);
      setIsAnimating(true);
   }, [currentWord, words]);

   useEffect(() => {
      if (!isAnimating)
         setTimeout(() => {
            startAnimation();
         }, duration);
   }, [isAnimating, duration, startAnimation]);

   return (
      <AnimatePresence
         onExitComplete={() => {
            setIsAnimating(false);
         }}
      >
         <motion.div
            key={currentWord}
            role="text"
            aria-label={ariaLabel}
            className="z-10 inline-block relative text-left text-neutral-900 px-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
            exit={{
               opacity: 0, y: -40, x: 40, filter: "blur(8px)", scale: 2, position: "absolute"
            }}
         >
            {currentWord.split(" ").map((word, wordIndex) => (
               <motion.span
                  key={word + wordIndex}
                  initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                     delay: wordIndex * 0.3,
                     duration: 0.3,
                  }}
                  className="inline-block whitespace-nowrap"
               >
                  {word.split("").map((letter, letterIndex) => (
                     <motion.span
                        key={word + letterIndex}
                        initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{
                           delay: wordIndex * 0.3 + letterIndex * 0.05,
                           duration: 0.2,
                        }}
                        className="inline-block"
                     >
                        {letter}
                     </motion.span>
                  ))}
                  <span className="inline-block">&nbsp;</span>
               </motion.span>
            ))}
         </motion.div>
      </AnimatePresence >
   );
};

export default FlipWords;