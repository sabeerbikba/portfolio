import { FormEvent, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Input from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Label from "@/components/ui/label";

// icons
import { IoIosSend } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";



const ContactForm = ({ className }: { className?: string }) => {
   // const handleSubmit = async (e: FormEvent) => {
   //    e.preventDefault();
   //    const formData = new FormData(e.target as HTMLFormElement);
   //    const response = await fetch('/api/form', {
   //       method: "POST",
   //       body: formData,
   //    });

   //    if (response.ok) {
   //       // show sucess message
   //    } else {
   //       // show failed message 
   //    }
   // };




   const nameInputRef = useRef<HTMLInputElement | null>(null);
   const emailInputRef = useRef<HTMLInputElement | null>(null);
   const messageInputRef = useRef<HTMLTextAreaElement | null>(null);
   const [status, setStatus] = useState('Send');
   const [sendingFrame, setSendingFrame] = useState(0);
   const sendingFrames: string[] = ['Sending', 'Sending.', 'Sending..', 'Sending...'];

   const clearInputs = () => {
      if (nameInputRef.current && emailInputRef.current && messageInputRef.current) {
         nameInputRef.current.value = '';
         emailInputRef.current.value = '';
         messageInputRef.current.value = '';
      }
   };

   useEffect(() => {
      if (status === 'sending') {
         const interval = setInterval(() => {
            setSendingFrame((sendingFrame + 1) % sendingFrames.length);
         }, 500);

         return () => clearInterval(interval);
      }
   }, [sendingFrame, status]);


   //   const handleClick = async () => {
   //     setStatus('sending...');
   //     try {
   //       const response = await fetch('your-endpoint', { method: 'POST' });
   //       if (!response.ok) throw new Error('Request failed');
   //       setStatus('Sent');
   //     } catch (error) {
   //       setStatus('Retry');
   //     }
   //   };
   // disabled={status === 'sending...'}



   // 4 testing purpose
   const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
   const handleSubmit = async (e: FormEvent) => {
      console.log('click')
      const sucess = true;
      e.preventDefault();

      setStatus('sending');
      await delay(4000);

      if (sucess) {
         setStatus('Sent');
         clearInputs();
      } else {
         setStatus('Retry');
      }
   };


   const animationProps = className
      ? {
         initial: { opacity: 0, x: 50 },
         animate: { opacity: 1, x: 0 },
         transition: { duration: 0.8, delay: 0.4 },
      }
      : {};

   return (
      <motion.div
         {...animationProps}
         className={cn(
            className ? className :
               "max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white",
            "max-lg:w-[80%] max-lg:mx-auto max-sm:w-full"
         )}
      >
         <form className="my-8" onSubmit={handleSubmit}>
            <div className={cn(className && "max-w-xl mx-auto")}>
               <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                  <LabelInputContainer>
                     <Label htmlFor="name">Name</Label>
                     <Input
                        id="name"
                        placeholder="Your name"
                        type="text"
                        ref={nameInputRef}
                        autoComplete="on"
                        minLength={3}
                        maxLength={70}
                        required
                     />
                  </LabelInputContainer>
               </div>
               <LabelInputContainer className="mb-4">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                     id="email"
                     placeholder="you@example.com"
                     type="email"
                     ref={emailInputRef} autoComplete="on"
                     required
                  />
               </LabelInputContainer>
               <LabelInputContainer className="mb-4">
                  <Label htmlFor="message">Message</Label>
                  <Input
                     id="message"
                     elementType="textarea"
                     placeholder="Your message here..."
                     ref={messageInputRef}
                     className="h-40 resize-none"
                     minLength={20}
                     maxLength={600}
                     required
                  />
               </LabelInputContainer>

               <button
                  className="center text-xl gap-1 bg-gradient-to-br relative group/btn from-black to-neutral-600 block w-full text-white rounded-md h-11 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
                  type="submit"
                  disabled={!['Send', 'Retry'].includes(status)}
               >
                  <AnimatePresence mode="wait">
                     {status === 'sending' ? (
                        <motion.span
                           initial={{ y: 10, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           exit={{ y: -10, opacity: 0 }}
                           transition={{ duration: 0.3 }}
                        >
                           {sendingFrames[sendingFrame]}
                           {/* {sendingFrames[frameRef.current]} */}
                        </motion.span>
                     ) : (
                        <motion.span
                           key={status}
                           initial={{ y: 10, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           exit={{ y: -10, opacity: 0 }}
                           transition={{ duration: 0.3 }}
                        >
                           <div className="center gap-1">
                              {status === 'Send' ? <IoIosSend /> : status === 'Sent' ? <FaCheckCircle /> : <MdOutlineError />}
                              {status === 'sending' ? "" : status}
                           </div>
                        </motion.span>
                     )}
                  </AnimatePresence>
                  <BottomGradient />
               </button>
            </div>
         </form>
      </motion.div>
   );
};


{/* <button
                  className="center gap-1 bg-gradient-to-br relative group/btn from-black to-neutral-600 block w-full text-white rounded-md h-11 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
                  type="submit"
                  disabled={status !== 'Send'}
               >
                  {status === 'sending' ? sendingFrames[sendingFrame] : status}
                  {status === 'Send' ? <IoIosSend /> : status === 'sending' ? "" : <FaCheckCircle />}
                  <BottomGradient />
               </button> */}

{/* Sign up &rarr; */ }

{/* {isSubmitting ? (
                  <>
                     <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                     Sending...
                  </>
               ) : (
                  <>
                     <Send className="mr-2 h-5 w-5" />
                     Send Message
                  </>
               )} */}

const BottomGradient = () => {
   return (
      <>
         <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
         <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
      </>
   );
};

const LabelInputContainer = ({
   children,
   className,
}: {
   children: React.ReactNode;
   className?: string;
}) => {
   return (
      <div className={cn("flex flex-col space-y-2 w-full", className)}>
         {children}
      </div>
   );
};

export default ContactForm;
