import { motion } from "framer-motion";
import Link from "next/link";
import { TiArrowRight } from "react-icons/ti";
import Heading from "./ui/heading";

const CTASection = () => (
  <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white shadow-inner">
    <div className="max-w-3xl mx-auto text-center">
      <Heading as="h2" className="text-xl xs:text-2xl sm:text-3xl md:text-4xl">
        Ready to start your next project?
      </Heading>
      <p className="mt-4 text-gray-600 text-base xs:text-lg sm:text-xl md:text-2xl">
        Let&apos;s connect and bring your ideas to reality. Get in touch today!
      </p>
      <motion.div
        className="mt-8"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        tabIndex={-1}
      >
        <Link href="/contact" className="inline-flex items-center justify-center text-base font-medium rounded-3xl text-white bg-black hover:bg-black/90 px-7 py-2 md:py-3 md:text-lg md:px-8">
          {/* <button className="inline-flex items-center justify-center text-base font-medium rounded-3xl text-white bg-black hover:bg-black/90 px-7 py-2 md:py-3 md:text-lg md:px-8"> */}
          Contact Me
          <motion.span
            className="ml-2"
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            {/* <ArrowRight className="w-5 h-5" /> */}
            <TiArrowRight className="w-5 h-5" />
          </motion.span>
          {/* </button> */}
        </Link>
      </motion.div>
    </div>
  </section>
);

export default CTASection;
