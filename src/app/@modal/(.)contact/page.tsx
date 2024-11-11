"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ContactForm from "@/components/contact-form";

const Modal = () => {
   const router = useRouter();
   const dialogPreviewDiv = useRef<HTMLDivElement>(null);
   const [dialogOpen, setDialogOpen] = useState(true);
   // const overlay = useRef<HTMLDivElement>(null);
   // const wrapper = useRef<HTMLDivElement>(null);
   // const tempImgRef = useRef<HTMLImageElement>(null);
   // const imgPreviewLoadingErrorRef = useRef<HTMLDivElement>(null);
   // const [state, dispatch] = useReducer(reducer, initialState);






   const onDismiss = useCallback(() => {
      router.back();
      setDialogOpen(false);
   }, [router]);

   // const onClick = useCallback(
   //    (e: MouseEvent<HTMLDivElement>) => {
   //       if (e.target === overlay.current || e.target === wrapper.current) {
   //          onDismiss();
   //       }
   //    },
   //    [onDismiss]
   // );

   const onKeyDown = useCallback(
      (e: KeyboardEvent) => {
         if (e.key === "Escape") onDismiss();
      },
      [onDismiss]
   );

   // const handleImageError = () => {
   //    console.log("image Error!!");
   //    UPDATE_VALUE('isError', true);
   // };

   useEffect(() => {
      const handleClickOutside: EventListener = (e: Event) => {
         if (
            dialogPreviewDiv.current &&
            !dialogPreviewDiv.current.contains(e.target as Node)
         ) {
            onDismiss();
         }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [onDismiss]);

   // useEffect(() => {
   //    const interval = setInterval(() => {
   //       UPDATE_VALUE('moonLoadingFrame', (moonLoadingFrame + 1) % moonLoadingFrames.length);
   //       UPDATE_VALUE('imageLoadingFrame', (imageLoadingFrame + 1) % imageLoadingFrames.length);
   //    }, 500);

   //    return () => clearInterval(interval);
   // }, [moonLoadingFrame, imageLoadingFrame]);

   useEffect(() => {
      document.addEventListener("keydown", onKeyDown);
      return () => document.removeEventListener("keydown", onKeyDown);
   }, [onKeyDown]);

   // useEffect(() => {
   //    const img = tempImgRef.current;
   //    const handleLoad = () => UPDATE_VALUE('isLoaded', true);


   //    if (img && img.complete) {
   //       handleLoad();
   //    } else {
   //       img?.addEventListener('load', handleLoad);
   //    }

   //    return () => {
   //       if (img) {
   //          img.removeEventListener('load', handleLoad);
   //       }
   //    };
   // }, []);

   return (
      <dialog open={dialogOpen} className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-30">
         <div ref={dialogPreviewDiv} className="bg-white/10 rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
               onClick={onDismiss}
               className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
               Close modal
            </button>
            <ContactForm />
         </div>
      </dialog>
   );
}

export default Modal;