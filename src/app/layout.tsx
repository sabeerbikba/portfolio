// import { createContext, ReactNode, useContext } from "react";
import { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";
// import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Link from "next/link";

// export const metadata: Metadata = {
//   title: "sabeer bikba portfolio",
//   description: "//TODO: add descreption ",
// };

// const navItems = [
//   {
//     name: "Home",
//     link: "/",
//     icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
//   },
//   {
//     name: "About",
//     link: "/about",
//     icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
//   },
//   {
//     name: "Contact",
//     link: "/contact",
//     icon: (
//       <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
//     ),
//   },
// ];



const RootLayout = ({
  children,
  // modal,
}: Readonly<{
  children: ReactNode;
  // modal: ReactNode;
}>): JSX.Element => {
  return (
    <html lang="en">
      <body>
        <main>


          <nav>
            {/* <FloatingNav navItems={navItems} /> */}
          </nav>

          {/* Radial gradient for the container to give a faded look */}
          <div className="w-full h-full bg-white bg-dot-black/[0.2] relative ">
            <div className="absolute pointer-events-none inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
            <div className="relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500">

              {children}

            </div>
          </div>
          {/* Radial gradient for the container to give a faded look */}
          {/* <div className="h-[50rem] w-full h-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative">
          <div className="absolute pointer-events-none inset-0 dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <div className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
            {children}
          </div>
        </div> */}
          {/* Radial gradient for the container to give a faded look */}
          {/* <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative">
          <div className="absolute pointer-events-none inset-0 dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <div className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
          {children}
          </div>
          </div> */}
        </main>
        {/* {modal} */}
      </body>
    </html >
  );
};

// const useModal = () => {
//   const context = useContext(ModalContext);
//   if (!context) {
//     throw new Error("useModal must be used within a ModalProvider");
//   }
//   return context;
// }


export {
  RootLayout as default,
  // useModal,
  // ModalContext
};