import React from "react";
import Input from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Label from "@/components/ui/label";

const ContactForm = () => {
   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("Form submitted");
   };
   return (
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
         <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Welcome to Aceternity
         </h2>
         <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Login to aceternity if you can because we don&apos;t have a login flow
            yet
         </p>
         <form className="my-8" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
               <LabelInputContainer>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="sabeer bikba" type="text" required />
               </LabelInputContainer>
            </div>
            <LabelInputContainer className="mb-4">
               <Label htmlFor="email">Email Address</Label>
               <Input id="email" placeholder="sabeerbikba02@gmail.com" type="email" required />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
               <Label htmlFor="subject">Subject</Label>
               <Input id="subject" type="text" />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
               <Label htmlFor="message">Message</Label>
               <Input id="message" elementType="textarea" required className="max-h-44" />
            </LabelInputContainer>

            <button
               className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
               type="submit"
            >
               Sign up &rarr;
               <BottomGradient />
            </button>
            {/* <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" /> */}
         </form>
      </div>
   );
}

const BottomGradient = () => {
   return (
      <>
         <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
         <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
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