"use client";
// import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { FlipWords } from "@/components/ui/flip-words";
import dynamic from 'next/dynamic';
const SponsorPack = dynamic(() => import('@/components/ui/sponsor-pack'), {
  ssr: false,
  loading: () => (
    <div className="center w-full h-full">
      <div className="relative center loader" />
    </div>
  ),
});

import ContainerScroll from "@/components/ui/container-scroll-animation";
import Link from "next/link";
import tools from "@/data/tools";
import Heading from "@/components/ui/heading";
import { cn } from "@/lib/utils";
import CTASection from "@/components/cta-section";
import socialMedia from "@/data/social-media";
import { projects } from "@/data/projects";
import Icon from "@/data/icons";

// TODO: need to remove "use client"; from top using trick like using children

const Home = () => {

  {/* <TypewriterEffectSmooth
          words={[
            {
              text: "Build",
            },
            {
              text: "awesome",
            },
            {
              text: "apps",
            },
            {
              text: "with",
            },
            {
              text: "Aceternity.",
              className: "text-blue-500 dark:text-blue-500",
            },
          ]}
        /> */}


  return (
    <>
      <section
        aria-labelledby="hero-section"
        className="flex flex-col items-center justify-end h-[18rem] xs:h-[22rem] sm:h-[27rem] md:h-[32rem] bg-gradient-to-b from-white-400 via-gray-100 to-white-400"
      >
        <Heading id="hero-section">
          Let&apos;s Build Something Amazing
        </Heading>
        <div className="font-normal text-neutral-600 mx-auto py-4 xs:py-5 sm:py-6 md:py-7 text-[24px] xs:text-[28px] sm:text-[34px] md:text-[40px]">
          Designing
          <FlipWords words={["functional", "beautiful", "impactful", "responsive"]} /> <br />
          solutions for your business
        </div>
        <div
          role="group"
          aria-label="Call to action button"
          className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4"
        >
          <Link
            href="/contact"
            aria-label="Start a conversation with me by visiting the contact page"
            className="border border-transparent font-medium rounded-3xl text-white bg-black hover:bg-black/90 px-7 py-1.5 md:py-2.5 md:text-lg md:px-8"
          >
            Let&apos;s Chat
          </Link>
        </div>
      </section>

      <ContainerScroll
        titleComponent={
          <Heading as="h2" className="md:text-[2.8rem]">
            {/* Explore My Creations */}
            Browse My Creations
            <br />
            <span className="text-5xl xs:text-[3.4rem] sm:text-[4.2rem] md:text-[5rem] font-bold mt-1 leading-none">
              {/* Featured Projects */}
              Featured Works
            </span>
          </Heading>
        }
      />

      <section aria-describedby="tools-section">
        <div className="mb-4 text-center">
          <Heading id="tools-section">Development Tools & Expertise</Heading>
          <h2 className="font-bold text-xg xs:text-2xl sm:text-3xl md:text-4xl max-xs:px-3 text-black/70">
            Core Skills & Technologies
          </h2>
        </div>
        <div className="max-w-[1000px] mx-auto aspect-square text-2xl max-xs:-mt-4 max-sm:-mt-3 max-md:-mt-2">
          {/* Rename it */}
          <SponsorPack tools={tools} />
        </div>
      </section>

      <section
        aria-labelledby="about-heading"
        className="about-section py-12 px-10 mt-9 bg-[rgb(240,240,240)]"
        style={{ background: "linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(240 240 240) 39%, rgb(255, 255, 255) 100%)" }}
      >
        <Heading id="about-heading">About Me</Heading>
        {[
          "Hi, I’m Sabeer Bikba, a <strong class='font-medium'>full-stack developer</strong> with a passion for creating dynamic <strong class='font-medium'>React front-end applications</strong>. I specialize in building intuitive and responsive user interfaces that provide smooth experiences across devices.",
          "While my expertise spans both front-end and back-end development, I’m particularly focused on delivering high-quality, interactive React apps. I’m also exploring <strong class='font-medium'>mobile development with React Native</strong> to create seamless cross-platform mobile experiences.",
          "I’m always eager to take on new challenges and push the boundaries of web and mobile development.",
        ].map((paragraph, key) => (
          <p
            key={key}
            className={cn(
              "mt-4 text-gray-600 font-medium indent-6 tracking-wider text-base xs:text-lg sm:text-xl md:text-2xl",
              key == 0 && "mt-10 max-sm:mt-6"
            )}
            style={{ wordSpacing: "4px" }}
            dangerouslySetInnerHTML={{
              __html: paragraph
            }}
          />
        ))}
      </section>


      <CTASection />

      {/* inspiration URL: https://ui.aceternity.com/ */}
      <footer>
        <div className="border-t border-neutral-300 px-8 py-20 bg-white">
          <div className="max-w-7xl mx-auto text-sm text-neutral-500 flex sm:flex-row flex-col justify-between items-start ">
            <div>
              <div className="mr-4  md:flex mb-4">
                <a className="center space-x-2 text-2xl font-bold text-center text-neutral-600 selection:bg-emerald-500 mr-10 py-0" href="/">
                  {/* <div className="relative h-8 w-8 md:h-6 md:w-6 bg-black border border-slate-800  text-white   center rounded-md text-sm antialiased"> */}
                  {/* <div className="absolute h-10 w-full bg-white/[0.2] -top-10 inset-x-0 rounded-full blur-xl"></div> */}
                  {/* <div className="text-sm  text-emerald-500 relative z-20"> */}
                  {/* <img alt="Logo" loading="lazy" width="50" height="50" decoding="async" data-nimg="1" className="hidden" srcSet="/_next/image?url=%2Flogo-dark.png&amp;w=64&amp;q=75 1x, /_next/image?url=%2Flogo-dark.png&amp;w=128&amp;q=75 2x" src="/_next/image?url=%2Flogo-dark.png&amp;w=128&amp;q=75" style={{ color: "transparent" }} /> */}
                  <Icon />
                  {/* </div> */}
                  {/* </div> */}
                  {/* <div className="flex flex-col">
                    <h1 className="text-black font-sans"> Aceternity UI</h1>
                  </div> */}
                </a>
              </div>
              {/* <div> */}
              Sabeer bikba
              {/* A product by
                <a target="__blank" className="text-neutral-600 font-medium" href="https://aceternity.com">Aceternity</a>
                I */}
              {/* </div> */}
              {/* <div className="mt-2">
                Building in public at{" "}
                <a className="font-medium text-neutral-600" target="__blank" href="https://twitter.com/mannupaaji">@mannupaaji</a>
              </div> */}
              <div className="mt-2 font-medium text-neutral-600">
                Your Vision, My Code, Perfect Synergy
              </div>
            </div>
            <div className="grid grid-cols-3 gap-10 items-start mt-10 md:mt-0">
              <div className="flex justify-center space-y-4 flex-col mt-4">
                {[{
                  href: "/",
                  label: "Home",
                }, {
                  href: "/contact",
                  label: "Contact",
                }, {
                  // TODO: Not added 
                  href: "/my-work",
                  label: "My Work",
                }].map(link => {
                  const { href, label } = link;
                  return (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener"
                      aria-label={`Link to ${label}`}
                      className="transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                      {label}
                    </a>
                  )
                })}
              </div>
              <div className="flex justify-center space-y-4 flex-col mt-4">
                {socialMedia.map(link => {
                  const { label, href } = link;
                  return (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener"
                      aria-label={`Link to ${label}`}
                      className="transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                      {label}
                    </a>
                  )
                })}
              </div>
              <div className="flex justify-center space-y-4 flex-col mt-4">
                {projects.map(project => {
                  const { title, website } = project;
                  return (
                    <a
                      key={title}
                      className="transition-colors hover:text-foreground/80 text-foreground/60"
                      href={website}
                      target="_blank"
                      rel="noopener"
                    // aria-label={`Link to ${label}`}
                    >
                      {title}
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;