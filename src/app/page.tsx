"use client";
// import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { FlipWords } from "@/components/ui/flip-words";
// import SponsorPack from "@/components/ui/sponsor-pack";
// const SponsorPack = lazy(() => import('@/components/ui/sponsor-pack'));
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
import Image from "next/image";
import { FloatingDock } from "@/components/ui/floating-dock";
import Link from "next/link";
import tools from "@/data/tools";
import H1 from "@/components/ui/h1";

// TODO: need to remove "use client"; from top using trick like using childredn

const Home = () => {

  {/* </p> */ }
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
      <div className="flex flex-col items-center justify-end h-[25rem] bg-gradient-to-b from-white-400 via-gray-100 to-white-400">
        <p className="text-xs sm:text-base md:text-xl lg:text-3xl xl:text-5xl font-bold text-black">
          Let&apos;s Build Something Amazing
        </p>
        <div className="py-8">
          <div className="text-4xl mx-auto font-normal text-neutral-600">
            Designing
            <FlipWords words={["functional", "beautiful", "impactful", "responsive"]} /> <br />
            solutions for your business
          </div>
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
          <button className="w-40 h-10 rounded-xl bg-black border border-transparent text-white text-sm">
            Let&apos;s Chat
          </button>
        </div>
      </div>

      <ContainerScroll
        titleComponent={
          <h1 className="text-4xl font-semibold text-black">
            {/* Scroll Through My Work */}
            {/* Explore My Creations */}
            Browse My Creations
            <br />
            <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
              {/* Project Showcase */}
              {/* Featured Projects */}
              Featured Works
            </span>
          </h1>
        }
      />

      <div>
        <div className="mb-4 text-center">
          {/* <h1 className="font-extrabold text-2xl xs:text-3xl sm:text-4xl md:text-5xl max-xs:px-3 mb-[2px] xs:mb-1 sm:mb-2 md:mb-3 text-black">Development Tools & Expertise</h1> */}
          <H1>Development Tools & Expertise</H1>

          {/* <hassName="font-extrabold text-lg xs:text-xl sm:text-2xl md:text-3xl max-xs:px-3 text-black/70">Tools and tech that drive my development</h2> */}
          <h2 className="font-bold text-xg xs:text-2xl sm:text-3xl md:text-4xl max-xs:px-3 text-black/70">Core Skills & Technologies</h2>
        </div>
        <div className="max-w-[1000px] mx-auto aspect-square text-2xl max-xs:-mt-4 max-sm:-mt-3 max-md:-mt-2">
          {/* Rename it */}
          <SponsorPack tools={tools} />
        </div>
      </div>

      <section
        aria-labelledby="about-heading"
        className="about-section py-12 px-4 bg-gray-100"
      >
        {/* <h2 id="about-heading" className="text-3xl font-bold text-black text-center"> */}
        {/* About Me */}
        {/* </h2> */}
        <H1>About Me</H1>
        {[
          "Hi, I’m Sabeer Bikba, a <strong>full-stack developer</strong> with a passion for creating dynamic <strong>React front-end applications</strong>. I specialize in building intuitive and responsive user interfaces that provide smooth experiences across devices.",
          "While my expertise spans both front-end and back-end development, I’m particularly focused on delivering high-quality, interactive React apps. I’m also exploring <strong>mobile development with React Native</strong> to create seamless cross-platform mobile experiences.",
          "I’m always eager to take on new challenges and push the boundaries of web and mobile development. Let’s connect and turn your ideas into reality!",
        ].map((paragraph, key) => (
          <p
            className="mt-4 text-gray-600 text-xl font-semibold indent-6"
            key={key}
            dangerouslySetInnerHTML={{
              __html: paragraph
            }} />
        ))}
      </section>


      <div>
        {/* another call to action */}
      </div>

      <footer>
        {/* ispiration URL: https://ui.aceternity.com/ */}
        <div className="border-t border-neutral-100 px-8 py-20 bg-white">
          <div className="max-w-7xl mx-auto text-sm text-neutral-500 flex sm:flex-row flex-col justify-between items-start ">
            <div>
              <div className="mr-4  md:flex mb-4">
                <Link className="center space-x-2 text-2xl font-bold text-center text-neutral-600 selection:bg-emerald-500 mr-10 py-0" href="/contact">
                  <div className="relative h-8 w-8 md:h-6 md:w-6 bg-black border border-slate-800  text-white   center rounded-md text-sm antialiased">
                    <div className="absolute h-10 w-full bg-white/[0.2] -top-10 inset-x-0 rounded-full blur-xl"></div>
                    <div className="text-sm  text-emerald-500 relative z-20">
                      <img alt="Logo" loading="lazy" width="50" height="50" decoding="async" data-nimg="1" className="hidden" srcSet="/_next/image?url=%2Flogo-dark.png&amp;w=64&amp;q=75 1x, /_next/image?url=%2Flogo-dark.png&amp;w=128&amp;q=75 2x" src="/_next/image?url=%2Flogo-dark.png&amp;w=128&amp;q=75" style={{ color: "transparent" }} />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-black font-sans"> Aceternity UI</h1>
                  </div>
                </Link>
              </div>
              <div>
                A product by
                <a target="__blank" className="text-neutral-600 font-medium" href="https://aceternity.com">Aceternity</a>
                I</div>
              <div className="mt-2">
                Building in public at{" "}
                <a className="font-medium text-neutral-600" target="__blank" href="https://twitter.com/mannupaaji">@mannupaaji</a></div>
            </div>
            <div className="grid grid-cols-3 gap-10 items-start mt-10 md:mt-0">
              <div className="flex justify-center space-y-4 flex-col mt-4">
                <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/pricing">Pricing</a>
                <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/components">Components</a>
                <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/templates">Templates</a>
                <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/categories">Categories</a>
                <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/blog">Blog</a>
                <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/tools/box-shadows">Box Shadows</a>
              </div>
              <div className="flex justify-center space-y-4 flex-col mt-4">
                <a target="__blank" className="transition-colors hover:text-foreground/80 text-foreground/60" href="https://twitter.com/aceternitylabs">Twitter</a>
                <a target="__blank" className="transition-colors hover:text-foreground/80 text-foreground/60" href="https://discord.gg/ftZbQvCdN7">Discord</a>
              </div>
              <div className="flex justify-center space-y-4 flex-col mt-4">
                <a target="__blank" className="transition-colors hover:text-foreground/80 text-foreground/60" href="https://pro.aceternity.com">Aceternity UIPro</a>
                <a target="__blank" className="transition-colors hover:text-foreground/80 text-foreground/60" href="https://aceternity.com">Aceternity</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;