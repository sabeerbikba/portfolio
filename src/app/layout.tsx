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
}: Readonly<{
  children: ReactNode;
}>) => (
  <html lang="en">
    <body>
      <main>


        <nav>
          {/* <FloatingNav navItems={navItems} /> */}
        </nav>

        {/* Radial gradient for the container to give a faded look */}
        <div className="w-full h-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative ">
          <div className="absolute pointer-events-none inset-0 dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <div className="relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 pb-8">
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
      <footer>
        {/* nspiration URL: https://ui.aceternity.com/ */}
        <div className="border-t border-neutral-100 dark:border-white/[0.1] px-8 py-20 bg-white dark:bg-brand">
          <div className="max-w-7xl mx-auto text-sm text-neutral-500 flex sm:flex-row flex-col justify-between items-start ">
            <div>
              <div className="mr-4  md:flex mb-4">
                <Link className="center space-x-2 text-2xl font-bold text-center text-neutral-600 dark:text-gray-100 selection:bg-emerald-500 mr-10 py-0" href="/tabs">
                  <div className="relative h-8 w-8 md:h-6 md:w-6 bg-black border border-slate-800  text-white   center rounded-md text-sm antialiased">
                    <div className="absolute h-10 w-full bg-white/[0.2] -top-10 inset-x-0 rounded-full blur-xl"></div>
                    <div className="text-sm  text-emerald-500 relative z-20"><img alt="Logo" loading="lazy" width="50" height="50" decoding="async" data-nimg="1" className="block dark:hidden" srcSet="/_next/image?url=%2Flogo.png&amp;w=64&amp;q=75 1x, /_next/image?url=%2Flogo.png&amp;w=128&amp;q=75 2x" src="/_next/image?url=%2Flogo.png&amp;w=128&amp;q=75" style={{ color: "transparent" }} />
                      <img alt="Logo" loading="lazy" width="50" height="50" decoding="async" data-nimg="1" className="hidden dark:block" srcSet="/_next/image?url=%2Flogo-dark.png&amp;w=64&amp;q=75 1x, /_next/image?url=%2Flogo-dark.png&amp;w=128&amp;q=75 2x" src="/_next/image?url=%2Flogo-dark.png&amp;w=128&amp;q=75" style={{ color: "transparent" }} /></div>
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-black dark:text-white font-sans"> Aceternity UI</h1>
                  </div>
                </Link>
              </div>
              <div>A product by <a target="__blank" className="dark:text-sky-500 text-neutral-600 font-medium" href="https://aceternity.com">Aceternity</a></div>
              <div className="mt-2">Building in public at <a className="dark:text-sky-500 font-medium text-neutral-600" target="__blank" href="https://twitter.com/mannupaaji">@mannupaaji</a></div>
            </div>
            <div className="grid grid-cols-3 gap-10 items-start mt-10 md:mt-0">
              <div className="flex justify-center space-y-4 flex-col mt-4"><a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/pricing">Pricing</a><a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/components">Components</a><a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/templates">Templates</a><a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/categories">Categories</a><a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/blog">Blog</a><a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/tools/box-shadows">Box Shadows</a></div>
              <div className="flex justify-center space-y-4 flex-col mt-4"><a target="__blank" className="transition-colors hover:text-foreground/80 text-foreground/60" href="https://twitter.com/aceternitylabs">Twitter</a><a target="__blank" className="transition-colors hover:text-foreground/80 text-foreground/60" href="https://discord.gg/ftZbQvCdN7">Discord</a></div>
              <div className="flex justify-center space-y-4 flex-col mt-4"><a target="__blank" className="transition-colors hover:text-foreground/80 text-foreground/60" href="https://pro.aceternity.com">Aceternity UI Pro</a><a target="__blank" className="transition-colors hover:text-foreground/80 text-foreground/60" href="https://aceternity.com">Aceternity</a></div>
            </div>
          </div>
        </div>
      </footer>
      {/* <footer>
          <div className="border-t border-neutral-100 dark:border-white/[0.1] px-8 py-20 bg-white dark:bg-brand">
            <div className="max-w-7xl mx-auto text-sm text-neutral-500 flex sm:flex-row flex-col justify-between items-start ">
              <div>
                <div className="mr-4  md:flex mb-4">
                  <a className="center space-x-2 text-2xl font-bold text-center text-neutral-600 dark:text-gray-100 selection:bg-emerald-500 mr-10 py-0" href="/"><div className="relative h-8 w-8 md:h-6 md:w-6 bg-black border border-slate-800  text-white   center rounded-md text-sm antialiased"><div className="absolute h-10 w-full bg-white/[0.2] -top-10 inset-x-0 rounded-full blur-xl"></div><div className="text-sm  text-emerald-500 relative z-20"><img alt="Logo" loading="lazy" width="50" height="50" decoding="async" data-nimg="1" className="block dark:hidden" srcset="/_next/image?url=%2Flogo.png&amp;w=64&amp;q=75 1x, /_next/image?url=%2Flogo.png&amp;w=128&amp;q=75 2x" src="/_next/image?url=%2Flogo.png&amp;w=128&amp;q=75" style="color: transparent;" /><img alt="Logo" loading="lazy" width="50" height="50" decoding="async" data-nimg="1" className="hidden dark:block" srcset="/_next/image?url=%2Flogo-dark.png&amp;w=64&amp;q=75 1x, /_next/image?url=%2Flogo-dark.png&amp;w=128&amp;q=75 2x" src="/_next/image?url=%2Flogo-dark.png&amp;w=128&amp;q=75" style="color: transparent;" /></div></div><div className="flex flex-col"><h1 className="text-black dark:text-white font-sans"> Aceternity UI</h1></div></a></div><div>A product by <a target="__blank" className="dark:text-sky-500 text-neutral-600 font-medium" href="https://aceternity.com">Aceternity</a></div><div className="mt-2">Building in public at <a className="dark:text-sky-500 font-medium text-neutral-600" target="__blank" href="https://twitter.com/mannupaaji">@mannupaaji</a></div></div><div className="grid grid-cols-3 gap-10 items-start mt-10 md:mt-0"><div className="flex justify-center space-y-4 flex-col mt-4"><a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/pricing">Pricing</a><a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/components">Components</a><a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/templates">Templates</a><a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/categories">Categories</a><a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/blog">Blog</a><a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/tools/box-shadows">Box Shadows</a></div><div className="flex justify-center space-y-4 flex-col mt-4"><a target="__blank" className="transition-colors hover:text-foreground/80 text-foreground/60" href="https://twitter.com/aceternitylabs">Twitter</a><a target="__blank" className="transition-colors hover:text-foreground/80 text-foreground/60" href="https://discord.gg/ftZbQvCdN7">Discord</a></div><div className="flex justify-center space-y-4 flex-col mt-4"><a target="__blank" className="transition-colors hover:text-foreground/80 text-foreground/60" href="https://pro.aceternity.com">Aceternity UI Pro</a><a target="__blank" className="transition-colors hover:text-foreground/80 text-foreground/60" href="https://aceternity.com">Aceternity</a></div></div></div></div>
        </footer> */}
    </body>
  </html >
);

export default RootLayout;