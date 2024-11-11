"use client";
import Link from "next/link";
import { motion } from "framer-motion";

import ContactForm from "@/components/contact-form";

// Icons
import {
   FaGithub,
   FaTwitter,
   FaLinkedin,
   FaInstagram,
   FaPhoneAlt,
   FaStackOverflow,
   FaWhatsapp,
} from 'react-icons/fa';
import { IoMdMail, IoIosArrowBack } from 'react-icons/io';
import { FaLocationDot } from "react-icons/fa6";


const Contact = () => (
   // <div className="min-h-screen text-white py-12 px-4 sm:px-6 lg:px-8">
   <div className="min-h-screen w-full overflow-x-hidden text-white py-12 px-4 sm:px-6 lg:px-8 lg:py-28 lg:table">
      <div className="max-w-7xl mx-auto lg:table-cell lg:align-middle lg:text-center">
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 max-lg:mb-0"
         >
            <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl text-black mb-2">Get in Touch</h1>
            <h2 className="text-2xl font-extrabold sm:text-3xl md:text-4xl text-black/70">Let's Create Something Amazing</h2>
            <p className="mt-3 max-w-md mx-auto text-xl text-gray-600 sm:text-2xl md:mt-5 md:max-w-3xl">
               Have a project in mind or just want to say hello? Feel free to reach out!
            </p>
         </motion.div>
         <div className="mt-10 max-lg:mt-2">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

               <div>
                  <ContactForm className="p-8 rounded-lg shadow-lg grid grid-cols-1 gap-y-6 bg-[#00000008] border border-[#8080804f] max-lg:w-[80%] max-lg:mx-auto max-sm:w-full max-w-2xl ml-auto" />
               </div>


               {/* <Form /> */}
               <div>
                  <motion.div
                     initial={{ opacity: 0, x: 50 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.8, delay: 0.4 }}
                     className="p-8 rounded-lg shadow-lg bg-[#00000008] border border-[#8080804f] max-lg:w-[80%] max-lg:mx-auto max-sm:w-full h-full w-full max-w-2xl mr-auto table"
                  >
                     <div className="table-cell align-middle text-center">
                        <div className="mb-6">
                           <h1 className="text-4xl font-bold text-black text-start pl-6 center">Sabeer Bikba</h1>
                           <h2 className="text-[22px] pt-2 font-base text-gray-600 text-start pl-6 center">Full-Stack Developer & UI/UX Enthusiast</h2>
                        </div>

                        <div className="space-y-4 mb-8">
                           {[
                              { icon: IoMdMail, text: 'sabeerbikba02@gmail.com', href: "mailto:sabeerbikba02@gmail.com" },
                              { icon: FaPhoneAlt, text: '+91 861 871 8358', href: "tel:+918618718358" },
                              { icon: FaLocationDot, text: 'India, Karnataka', href: "https://www.google.com/maps/place/Karnataka" },
                           ].map((item, index) => (
                              <div key={index} className="center space-x-3">
                                 <a href={item.href} target="__blank" className="text-xl text-gray-600 center">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 center">
                                       <item.icon className="h-6 w-6 text-gray-600" />
                                    </div>
                                    {item.text}
                                 </a>
                              </div>
                           ))}
                        </div>

                        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-0.5 w-full" />
                        <div className="flex justify-center space-x-4">
                           {[
                              { icon: FaInstagram, href: 'https://www.instagram.com/uniquebeast__/', label: 'Instagram' },
                              { icon: FaLinkedin, href: 'https://www.linkedin.com/in/sabeer-bikba-70a574252/', label: 'LinkedIn' },
                              { icon: FaWhatsapp, href: "https://wa.me/918618718358/", label: "WhatsApp" },
                              { icon: FaGithub, href: 'https://github.com/sabeerbikba/', label: 'GitHub' },
                              { icon: FaStackOverflow, href: 'https://stackoverflow.com/users/20352034/sabeer-bikba', label: 'Stack Overflow' },
                              { icon: FaTwitter, href: 'https://x.com/Sb28187', label: 'X (Twitter)' },
                           ].map(link => (
                              <a
                                 key={link.label}
                                 href={link.href}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                                 aria-label={link.label}
                              >
                                 <link.icon className="h-5 w-5 text-gray-600" />
                              </a>
                           ))}
                        </div>

                     </div>
                  </motion.div>
               </div>

            </div>
         </div>
      </div >
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.8, delay: 0.4 }}
         className="fixed top-5 left-5 border-2 lg:border-[3px] border-black text-black rounded-full shadow-2xl hover:shadow-none shadow-gray-300"
         role="button"
         // TODO:
         aria-describedby="Back to home page"
      >
         <Link href="/">
            {/* &#8592; */}
            <IoIosArrowBack className="md:h-9 md:w-9 lg:h-12 lg:w-12 h-[30px] w-[30px] relative right-0.5" />
         </Link>
      </motion.div>
   </div >
);

// TODO: need to remove this component 

const Old = () => (
   <>
      <h2 className="text-2xl font-bold mb-6 text-black">Contact Information</h2>
      <div className="space-y-6 text-gray-600">
         <div className="flex items-center">
            {/* <Mail className="h-6 w-6 text-blue-400 mr-4" /> */}
            <span>jane.doe@example.com</span>
         </div>
         <div className="flex items-center">
            {/* <Phone className="h-6 w-6 text-blue-400 mr-4" /> */}
            <span>+1 (555) 123-4567</span>
         </div>
         <div className="flex items-center">
            {/* <MapPin className="h-6 w-6 text-blue-400 mr-4" /> */}
            <span>San Francisco, CA</span>
         </div>
      </div>
      <div className="mt-8">
         <h3 className="text-xl font-semibold mb-4">Connect with me</h3>
         <div className="flex space-x-4">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
               <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
               </svg>
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
               <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
               </svg>
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
               <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
               </svg>
            </a>
         </div>
      </div>
   </>
);

const Form = () => (
   <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
   >
      <form
         // onSubmit={handleSubmit}
         className="grid grid-cols-1 gap-y-6"
      >
         <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
               Name
            </label>
            <div className="mt-1">
               <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  required
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="John Doe"
               />
            </div>
         </div>
         <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
               Email
            </label>
            <div className="mt-1">
               <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  required
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="john@example.com"
               />
            </div>
         </div>
         <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300">
               Message
            </label>
            <div className="mt-1">
               <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Your message here..."
               />
            </div>
         </div>
         <div>
            <button
               type="submit"
               // disabled={isSubmitting}
               className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
               {true ? (
                  <>
                     {/* <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" /> */}
                     Sending...
                  </>
               ) : (
                  <>
                     {/* <Send className="mr-2 h-5 w-5" /> */}
                     Send Message
                  </>
               )}
            </button>
         </div>
      </form>
   </motion.div>
);


{/* <h3 className="text-2xl font-semibold mb-8 text-black">Contact Information</h3>
                     <div className="space-y-6 mb-12">
                        <div className="flex items-center space-x-4">
                           <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                              <Mail className="h-5 w-5 text-black" />
                           </div>
                           <span className="text-gray-600">contact@example.com</span>
                        </div>
                        <div className="flex items-center space-x-4">
                           <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                              <Phone className="h-5 w-5 text-black" />
                           </div>
                           <span className="text-gray-600">+1 (555) 123-4567</span>
                        </div>
                        <div className="flex items-center space-x-4">
                           <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                              <MapPin className="h-5 w-5 text-black" />
                           </div>
                           <span className="text-gray-600">San Francisco, CA</span>
                        </div>
                     </div>

                     <h3 className="text-2xl font-semibold mb-6 text-black">Connect with me</h3>
                     <div className="flex space-x-4">
                        {[Github, Twitter, Linkedin].map((Icon, index) => (
                           <a
                              key={index}
                              href="#"
                              className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors"
                           >
                              <Icon className="h-5 w-5 text-black" />
                           </a>
                        ))}
                     </div> */}

export default Contact;