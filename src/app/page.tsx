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

// TODO: need to remove "use client"; from top using trick like using childredn

const Home = () => {

  return (
    <>
      <div className="flex flex-col items-center justify-end h-[25rem] bg-gradient-to-b from-white-400 via-gray-100 to-white-400">
        {/* <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  "> */}
        <p className="text-xs sm:text-base md:text-xl lg:text:3xl xl:text-5xl font-bold text-black">
          The road to freedom starts from here
        </p>
        {/* </p> */}
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

        <div className="py-8">
          <div className="text-4xl mx-auto font-normal text-neutral-600">
            Let's build
            {/* Need to use &ampos something to ignore build error  */}
            <FlipWords words={["better", "cute", "beautiful", "modern"]} /> <br />
            websites with Aceternity UI
          </div>
        </div>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
          <button className="w-40 h-10 rounded-xl bg-black border border-transparent text-white text-sm">
            Join now
          </button>
          {/* <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
            Signup
          </button> */}
        </div>
      </div>

      <Link href="/contact" >contact</Link>

      {/* <div className="flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-black">
                Unleash the power of <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                  Scroll Animations
                </span>
              </h1>
            </>
          }
        /> */}
      {/* TODO:s */}
      {/* logso opacity need to bee 100% */}
      {/* instead of using opacigty need to use backgroundColor opacity */}
      {/* </div> */}

      {/* <div className="h-[40rem] flex justify-center items-center px-4">
        <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
          Build
          <FlipWords words={["better", "cute", "beautiful", "modern"]} /> <br />
          websites with Aceternity UI
        </div>
      </div> */}



      {/* Rename it */}
      <div className="max-w-[1000px] mx-auto aspect-square">
        <SponsorPack tools={tools} />
      </div>

      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto molestias suscipit aliquam sint. Nemo alias molestiae amet, deserunt voluptatum eum aliquam laudantium voluptas harum dicta obcaecati unde dignissimos autem quas reprehenderit ullam eligendi similique neque? Saepe et error at pariatur quisquam laudantium, quaerat commodi explicabo aut dolor in distinctio odit minus blanditiis quod exercitationem cupiditate maxime nobis? Dolore minus ad quos a sequi, sit mollitia perferendis repellendus alias recusandae, officia illo quaerat delectus quisquam dolorem accusamus corrupti fugiat quam porro aspernatur animi. Ipsam eius exercitationem architecto quaerat aspernatur temporibus consectetur assumenda culpa deserunt quos quod excepturi sint, placeat possimus et esse quisquam inventore consequuntur sunt laborum dolor asperiores! Necessitatibus in voluptates commodi iste officiis laborum eum sapiente molestias nesciunt rem! Esse alias cupiditate ipsum aut explicabo, saepe quia eos unde. Repellendus architecto consequuntur consequatur neque quaerat, quam tempore quod quos soluta commodi laborum officia nobis culpa suscipit veniam amet sunt quia nam esse, maiores, inventore quae porro fugit iusto. Eum, ducimus amet nulla iure autem ipsam quaerat exercitationem. Est porro delectus itaque atque facilis cupiditate officia, omnis libero culpa! Hic assumenda ullam perferendis blanditiis laboriosam perspiciatis dignissimos necessitatibus asperiores temporibus a voluptate soluta distinctio optio, alias nihil voluptates! Numquam neque veniam nisi libero earum! Laudantium, necessitatibus. Quaerat ipsa vitae quo explicabo accusantium iure error impedit, tenetur corporis, quam labore harum nobis, officiis praesentium. Culpa, qui dolorum tenetur a fugiat iste vero, ducimus adipisci blanditiis ipsum, ratione ab expedita odio delectus quas error eos eum possimus cum sequi. Maxime consequatur debitis quam sapiente, repellendus dolorum aut iure qui ea reprehenderit dolor corporis praesentium officiis, laudantium harum eveniet atque rem voluptatum perspiciatis temporibus sunt ipsam nam. Quis nemo esse praesentium excepturi voluptatem quibusdam labore magnam quia expedita, est porro voluptas vitae veniam libero odio, repellendus commodi voluptates explicabo fugiat doloremque! Ipsum vero laborum similique, optio corrupti deserunt culpa? Eos voluptatum repudiandae, a fugiat quas quidem fugit saepe similique ex debitis, dolore repellendus aspernatur, tempora ducimus libero quod aperiam ipsum! Vero temporibus ea at nihil, quod quidem dignissimos velit ratione expedita atque itaque veritatis minima voluptatibus voluptatum officiis sed veniam iure ipsum? Reiciendis hic labore quod cupiditate facilis tenetur. Praesentium soluta, ratione veritatis eligendi enim ipsam illum. A aliquam maxime quis eos quas odit asperiores magnam temporibus. Nam in praesentium rem iusto vel quaerat libero maiores quo ad natus obcaecati perspiciatis, sed totam harum labore ullam a et accusamus possimus vero, optio beatae. Ab, laudantium magni. Blanditiis labore nesciunt odit voluptate eveniet? Voluptate quis vitae iure recusandae sunt perspiciatis, delectus quasi placeat, dicta velit earum quibusdam vel inventore beatae tempora porro illo odio optio accusamus molestias nam quod cum expedita. Unde laboriosam facilis modi similique eos accusantium provident obcaecati fugit, eligendi, quos ex voluptates autem. Dignissimos nisi porro, aut quos vitae fugiat, quis consequuntur cupiditate iure placeat officia aliquid corporis perferendis officiis natus, at voluptatibus ducimus qui? Aut architecto tempore rem accusantium ab neque quia. Natus iusto aut commodi consequuntur nihil reiciendis! Provident perferendis similique nostrum eum. Dolore soluta omnis esse non velit?
      </div>
      <footer>
        {/* nspiration URL: https://ui.aceternity.com/ */}
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
      {/* <footer>
          <div className="border-t border-neutral-100 dark:border-white/[0.1] px-8 py-20 bg-white dark:bg-brand">
            <div className="max-w-7xl mx-auto text-sm text-neutral-500 flex sm:flex-row flex-col justify-between items-start ">
              <div>
                <div className="mr-4  md:flex mb-4">
                  <a className="center space-x-2 text-2xl font-bold text-center text-neutral-600 dark:text-gray-100 selection:bg-emerald-500 mr-10 py-0" href="/"><div className="relative h-8 w-8 md:h-6 md:w-6 bg-black border border-slate-800  text-white   center rounded-md text-sm antialiased"><div className="absolute h-10 w-full bg-white/[0.2] -top-10 inset-x-0 rounded-full blur-xl"></div><div className="text-sm  text-emerald-500 relative z-20"><img alt="Logo" loading="lazy" width="50" height="50" decoding="async" data-nimg="1" className="block dark:hidden" srcset="/_next/image?url=%2Flogo.png&amp;w=64&amp;q=75 1x, /_next/image?url=%2Flogo.png&amp;w=128&amp;q=75 2x" src="/_next/image?url=%2Flogo.png&amp;w=128&amp;q=75" style="color: transparent;" /><img alt="Logo" loading="lazy" width="50" height="50" decoding="async" data-nimg="1" className="hidden dark:block" srcset="/_next/image?url=%2Flogo-dark.png&amp;w=64&amp;q=75 1x, /_next/image?url=%2Flogo-dark.png&amp;w=128&amp;q=75 2x" src="/_next/image?url=%2Flogo-dark.png&amp;w=128&amp;q=75" style="color: transparent;" /></div></div><div className="flex flex-col"><h1 className="text-black dark:text-white font-sans"> Aceternity UI</h1></div></a></div><div>A product by <a target="__blank" className="dark:text-sky-500 text-neutral-600 font-medium" href="https://aceternity.com">Aceternity</a></div><div className="mt-2">Building in public at <a className="dark:text-sky-500 font-medium text-neutral-600" target="__blank" href="https://twitter.com/mannupaaji">@mannupaaji</a></div></div><div className="grid grid-cols-3 gap-10 items-start mt-10 md:mt-0"><div className="flex justify-center space-y-4 flex-col mt-4"><a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/pricing">Pricing</a><a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/components">Components</a><a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/templates">Templates</a><a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/categories">Categories</a><a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/blog">Blog</a><a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/tools/box-shadows">Box Shadows</a></div><div className="flex justify-center space-y-4 flex-col mt-4"><a target="__blank" className="transition-colors hover:text-foreground/80 text-foreground/60" href="https://twitter.com/aceternitylabs">Twitter</a><a target="__blank" className="transition-colors hover:text-foreground/80 text-foreground/60" href="https://discord.gg/ftZbQvCdN7">Discord</a></div><div className="flex justify-center space-y-4 flex-col mt-4"><a target="__blank" className="transition-colors hover:text-foreground/80 text-foreground/60" href="https://pro.aceternity.com">Aceternity UI Pro</a><a target="__blank" className="transition-colors hover:text-foreground/80 text-foreground/60" href="https://aceternity.com">Aceternity</a></div></div></div></div>
        </footer> */}
    </>
  );
}

export default Home;