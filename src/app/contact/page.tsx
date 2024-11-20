"use client";
import Link from "next/link";
import { motion } from "framer-motion";

// Icons
import { FaPhoneAlt } from 'react-icons/fa';
import { IoMdMail, IoIosArrowBack } from 'react-icons/io';
import { FaLocationDot } from "react-icons/fa6";

import ContactForm from "@/components/contact-form";
import socialMedia from "@/data/social-media";

const Contact = () => (
   <div className="min-h-screen w-full overflow-x-hidden text-white py-12 px-4 sm:px-6 lg:px-8 lg:py-28 lg:table">

      <div className="max-w-7xl mx-auto lg:table-cell lg:align-middle lg:text-center">
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 max-lg:mb-2"
            aria-labelledby="get-in-touch-heading"
         >
            <h1
               id="get-in-touch-heading"
               className="text-4xl font-extrabold sm:text-5xl md:text-6xl text-black mb-2"
            >
               Get in Touch
            </h1>
            <h2 className="text-2xl font-extrabold sm:text-3xl md:text-4xl text-black/70">
               Let&apos;s Create Something Amazing
            </h2>
            <p className="mt-3 max-w-md mx-auto text-xl text-gray-600 sm:text-2xl md:mt-5 md:max-w-3xl">
               Have a project in mind or just want to say hello? Feel free to reach out!
            </p>
         </motion.div>

         <div className="mt-10 max-lg:mt-2">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

               <div>
                  <ContactForm />
               </div>

               <div>
                  <motion.div
                     initial={{ opacity: 0, x: 50 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.8, delay: 0.4 }}
                     className="p-5 md:p-6 lg:p-8 rounded-lg shadow-lg bg-[#00000008] border border-[#8080804f] max-lg:w-[80%] max-lg:mx-auto max-sm:w-full h-full w-full max-w-2xl mr-auto grid grid-cols-1"
                  >
                     <div className="lg:table">
                        <div className="lg:table-cell lg:align-middle lg:text-center">
                           <div className="mb-6 w-full">
                              <h1 className="text-3xl md:text-4xl font-bold text-black text-start lg:pl-6 center">
                                 Sabeer Bikba
                              </h1>
                              {/* <h2 className="text-[22px] pt-2 font-base text-gray-600 text-start lg:pl-6 center"> */}
                              <h2 className="text-lg sm:text-xl md:text-2xl text-center pt-2 font-base text-gray-600 lg:pl-6 center">
                                 Full-Stack Developer & UI/UX Enthusiast
                              </h2>
                           </div>

                           <div className="space-y-4 mb-8">
                              {[{
                                 icon: IoMdMail,
                                 text: 'sabeerbikba02@gmail.com',
                                 href: "mailto:sabeerbikba02@gmail.com",
                                 ariaLabel: 'Email sabeerbikba02@gmail.com'

                              }, {
                                 icon: FaPhoneAlt,
                                 text: '+91 861 871 8358',
                                 href: "tel:+918618718358",
                                 ariaLabel: 'Call +91 861 871 8358'

                              }, {
                                 icon: FaLocationDot,
                                 text: 'India, Karnataka',
                                 href: "https://www.google.com/maps/place/Karnataka",
                                 ariaLabel: 'Location India, Karnataka'
                              }].map((item, index) => (
                                 <div key={index} className="center space-x-3 ml-2">
                                    <a
                                       href={item.href}
                                       target="__blank"
                                       className="pr-2 text-gray-600 center text-base sm:text-lg md:text-xl "
                                       aria-label={item.ariaLabel}
                                    >
                                       <div
                                          className="w-7 sm:w-9 md:w-10 h-7 sm:h-9 md:h-10 mr-2 rounded-full bg-gray-100 center"
                                          aria-hidden="true"
                                          role="presentation"
                                       >
                                          <item.icon className="h-[18px] sm:h-5 md:h-6 w-[18px] sm:w-5 md:w-6 text-gray-600" aria-hidden="true" />
                                       </div>
                                       {item.text}
                                    </a>
                                 </div>
                              ))}
                           </div>

                           <div
                              role="separator"
                              aria-hidden="true"
                              className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-0.5 w-full"
                           />

                           <div className="flex justify-center space-x-4">
                              {socialMedia.map((link) => (
                                 <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener"
                                    aria-label={`Link to ${link.label}`}
                                    className="w-10 h-10 rounded-full max-xs:!ml-[6px] bg-gray-200 center hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                                 >
                                    <link.icon className="h-5 w-5 text-gray-600" aria-hidden="true" />
                                 </a>
                              ))}
                           </div>
                        </div>
                     </div>
                  </motion.div>
               </div>

            </div>
         </div>
      </div>

      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.8, delay: 0.4 }}
         className="bg-[#ffffffcf] fixed top-5 left-5 border-2 lg:border-[3px] border-black text-black rounded-full shadow-2xl hover:shadow-none shadow-gray-300"
      >
         <Link
            href="/"
            aria-label="Back to home page"
            title="Back to home page"
            className="flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
         >
            <IoIosArrowBack
               className="md:h-9 md:w-9 lg:h-12 lg:w-12 h-[30px] w-[30px] relative right-0.5"
               aria-hidden="true"
            />
         </Link>
      </motion.div>

   </div>
);

export default Contact;
