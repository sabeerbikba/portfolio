import { FormEvent, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Input from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Label from "@/components/ui/label";

// icons
import { IoIosSend } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";



const ContactForm = () => {
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
    if (status === 'Sending') {
      const interval = setInterval(() => {
        setSendingFrame((sendingFrame + 1) % sendingFrames.length);
      }, 500);

      return () => clearInterval(interval);
    }
  }, [sendingFrame, status]);


  //   const handleClick = async () => {
  //     setStatus('Sending...');
  //     try {
  //       const response = await fetch('your-endpoint', { method: 'POST' });
  //       if (!response.ok) throw new Error('Request failed');
  //       setStatus('Sent');
  //     } catch (error) {
  //       setStatus('Retry');
  //     }
  //   };
  // disabled={status === 'Sending...'}



  // 4 testing purpose
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const handleSubmit = async (e: FormEvent) => {
    console.log('click')
    const sucess = true;
    e.preventDefault();

    setStatus('Sending');
    await delay(4000);

    if (sucess) {
      setStatus('Sent');
      clearInputs();
    } else {
      setStatus('Retry');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="p-5 md:p-6 lg:p-8 rounded-lg shadow-lg grid grid-cols-1 gap-y-6 bg-[#00000008] border border-[#8080804f] max-lg:w-[80%] max-lg:mx-auto max-sm:w-full max-w-2xl ml-auto"
      // TODO: role from // thinking emoji // isNeeded
      role="form"
      aria-labelledby="contactFormTitle"
    >
      <h2 id="contactFormTitle" className="sr-only">Contact Us Form</h2>
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="max-w-xl mx-auto">
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
                aria-required="true"
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="you@example.com"
              type="email"
              ref={emailInputRef}
              autoComplete="on"
              required
              aria-required="true"
              aria-describedby="emailDescription"
            />
            <small id="emailDescription" className="sr-only">Please enter a valid email address.</small>
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
              aria-required="true"
              aria-describedby="messageDescription"
            />
            <small id="messageDescription" className="sr-only">Please enter your message. Minimum 20 characters.</small>
          </LabelInputContainer>

          <button
            className="center text-xl gap-1 bg-gradient-to-br relative group/btn from-black to-neutral-600 block w-full text-white rounded-md h-11 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            type="submit"
            disabled={!['Send', 'Retry'].includes(status)}
            aria-busy={status === 'Sending'}
            aria-live="polite"
            aria-pressed={status === 'Sending' ? 'true' : 'false'}
            aria-label={status === 'Send' ? "Send message" : status}
          >
            <AnimatePresence mode="wait">
              {status === 'Sending' ? (
                <motion.span
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {sendingFrames[sendingFrame]}
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
                    {status === 'Send' && <IoIosSend aria-hidden="true" />}
                    {status === 'Sent' && <FaCheckCircle aria-hidden="true" />}
                    {status === 'Retry' && <MdOutlineError aria-hidden="true" />}
                    <span>{status === 'Sending' ? "" : status}</span>
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
}

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
    <div className={cn("flex flex-col space-y-2 w-full", className)} role="group" aria-label="Input field group">
      {children}
    </div>
  );
};

export default ContactForm;
