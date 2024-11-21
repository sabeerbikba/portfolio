// import { createContext, ReactNode, useContext } from "react";
import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import "./globals.css";
// import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Link from "next/link";
import Head from "next/head";
import Script from "next/script";
import { CreativeWork, WithContext, WebPage } from "schema-dts";
import { projects } from "@/data/projects";
import { boxIconString } from "@/data/icons";


// export const metadata: Metadata = {
//   title: "sabeer bikba portfolio",
//   description: "//TODO: add descreption ",
// };

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export const metadata: Metadata = {
  icons: {
    icon: [
      {
        url: boxIconString,
        type: "image/svg+xml",
      }
    ]
  },
};

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
//   {me
//     name: "Contact",
//     link: "/contact",
//     icon: (
//       <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
//     ),
//   },
// ];


const jsonLd: WithContext<CreativeWork> = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "Featured Works",
  description: "Explore my featured projects and creations. See live previews, project details, and GitHub repo visuals.",
  creator: {
    "@type": "Person",
    name: "Sabeer Bikba",
  },
  workExample: projects.map((project) => ({
    "@type": "WebPage",
    name: project.title,
    url: project.website,
    image: project.image,
    about: project.about,
  })) as WebPage[], // Ensure proper typing
};

const RootLayout = ({
  children,
  // modal,
}: Readonly<{
  children: ReactNode;
  // modal: ReactNode;
}>): JSX.Element => {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
    </html>
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