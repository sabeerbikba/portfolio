import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";

import type { CreativeWork, WithContext, WebPage } from "schema-dts";

import { projects } from "@/data/projects";
import { boxIconString } from "@/data/icons";

import "./globals.css";

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

const jsonLd: WithContext<CreativeWork> = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "Featured Works",
  description: "Explore my featured projects and creations. See live previews, project details, and GitHub repo visuals.",
  creator: {
    "@type": "Person",
    name: "Sabeer Bikba",
  },
  workExample: projects.map(({ title, website, icon, about }) => ({
    "@type": "WebPage",
    name: title,
    url: website,
    image: icon,
    about: about,
  })) as WebPage[],
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
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
        <main className="w-full h-full bg-white bg-dot-black/[0.4] relative ">
          <div className="absolute pointer-events-none inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
          <div className="relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
};

export {
  RootLayout as default,
};
