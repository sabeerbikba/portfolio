import { FormEvent } from "react";
import { motion } from "framer-motion";
import Input from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Label from "@/components/ui/label";

const ContactForm = ({ className }: { className?: string }) => {
   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const response = await fetch('/api/form', {
         method: "POST",
         body: formData,
      });

      if (response.ok) {
         // show sucess message
      } else {
         // show failed message 
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
                     <Input id="name" placeholder="Your name" type="text" autoComplete="on" required />
                  </LabelInputContainer>
               </div>
               <LabelInputContainer className="mb-4">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" placeholder="you@example.com" type="email" autoComplete="on" required />
               </LabelInputContainer>
               <LabelInputContainer className="mb-4">
                  <Label htmlFor="message">Message</Label>
                  <Input id="message" elementType="textarea" placeholder="Your message here..." className="h-40 resize-none" required />
               </LabelInputContainer>

               <button
                  className="bg-gradient-to-br relative group/btn from-black to-neutral-600 block w-full text-white rounded-md h-11 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
                  type="submit"
               >
                  Sign up &rarr;
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
                  <BottomGradient />
               </button>
               {/* <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" /> */}
            </div>
         </form>
      </motion.div>
   );
};

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
