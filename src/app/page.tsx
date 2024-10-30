"use client";
// import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { FlipWords } from "@/components/ui/flip-words";
import SponsorPack from "@/components/ui/sponsor-pack";
import ContainerScroll from "@/components/ui/container-scroll-animation";
import Image from "next/image";
import { FloatingDock } from "@/components/ui/floating-dock";

// TODO: need to remove "use client"; from top using trick like using childredn

const Home = () => (
  <>
    <div className="flex flex-col items-center justify-end h-[25rem] bg-gradient-to-b from-white-400 via-gray-100 to-white-400">
      {/* <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  "> */}
      <p className="text-xs sm:text-base md:text-xl lg:text:3xl xl:text-5xl font-bold dark:text-white text-black">
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
        <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
          Let's build
          {/* Need to use &ampos something to ignore build error  */}
          <FlipWords words={["better", "cute", "beautiful", "modern"]} /> <br />
          websites with Aceternity UI
        </div>
      </div>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
          Join now
        </button>
        {/* <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
            Signup
          </button> */}
      </div>
    </div>

    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Scroll Animations
              </span>
            </h1>
          </>
        }
      />
      {/* <Image
          src={`/images/dev.tools.png`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        /> */}
      {/* TODO:s */}
      {/* logso opacity need to bee 100% */}
      {/* instead of using opacigty need to use backgroundColor opacity */}

      {/* <FloatingDock /> */}
      {/* </ContainerScroll> */}
    </div>

    {/* <div className="h-[40rem] flex justify-center items-center px-4">
        <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
          Build
          <FlipWords words={["better", "cute", "beautiful", "modern"]} /> <br />
          websites with Aceternity UI
        </div>
      </div> */}



    {/* Rename it */}
    <div className="max-w-[1000px] mx-auto">
      <SponsorPack />
    </div>

    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto molestias suscipit aliquam sint. Nemo alias molestiae amet, deserunt voluptatum eum aliquam laudantium voluptas harum dicta obcaecati unde dignissimos autem quas reprehenderit ullam eligendi similique neque? Saepe et error at pariatur quisquam laudantium, quaerat commodi explicabo aut dolor in distinctio odit minus blanditiis quod exercitationem cupiditate maxime nobis? Dolore minus ad quos a sequi, sit mollitia perferendis repellendus alias recusandae, officia illo quaerat delectus quisquam dolorem accusamus corrupti fugiat quam porro aspernatur animi. Ipsam eius exercitationem architecto quaerat aspernatur temporibus consectetur assumenda culpa deserunt quos quod excepturi sint, placeat possimus et esse quisquam inventore consequuntur sunt laborum dolor asperiores! Necessitatibus in voluptates commodi iste officiis laborum eum sapiente molestias nesciunt rem! Esse alias cupiditate ipsum aut explicabo, saepe quia eos unde. Repellendus architecto consequuntur consequatur neque quaerat, quam tempore quod quos soluta commodi laborum officia nobis culpa suscipit veniam amet sunt quia nam esse, maiores, inventore quae porro fugit iusto. Eum, ducimus amet nulla iure autem ipsam quaerat exercitationem. Est porro delectus itaque atque facilis cupiditate officia, omnis libero culpa! Hic assumenda ullam perferendis blanditiis laboriosam perspiciatis dignissimos necessitatibus asperiores temporibus a voluptate soluta distinctio optio, alias nihil voluptates! Numquam neque veniam nisi libero earum! Laudantium, necessitatibus. Quaerat ipsa vitae quo explicabo accusantium iure error impedit, tenetur corporis, quam labore harum nobis, officiis praesentium. Culpa, qui dolorum tenetur a fugiat iste vero, ducimus adipisci blanditiis ipsum, ratione ab expedita odio delectus quas error eos eum possimus cum sequi. Maxime consequatur debitis quam sapiente, repellendus dolorum aut iure qui ea reprehenderit dolor corporis praesentium officiis, laudantium harum eveniet atque rem voluptatum perspiciatis temporibus sunt ipsam nam. Quis nemo esse praesentium excepturi voluptatem quibusdam labore magnam quia expedita, est porro voluptas vitae veniam libero odio, repellendus commodi voluptates explicabo fugiat doloremque! Ipsum vero laborum similique, optio corrupti deserunt culpa? Eos voluptatum repudiandae, a fugiat quas quidem fugit saepe similique ex debitis, dolore repellendus aspernatur, tempora ducimus libero quod aperiam ipsum! Vero temporibus ea at nihil, quod quidem dignissimos velit ratione expedita atque itaque veritatis minima voluptatibus voluptatum officiis sed veniam iure ipsum? Reiciendis hic labore quod cupiditate facilis tenetur. Praesentium soluta, ratione veritatis eligendi enim ipsam illum. A aliquam maxime quis eos quas odit asperiores magnam temporibus. Nam in praesentium rem iusto vel quaerat libero maiores quo ad natus obcaecati perspiciatis, sed totam harum labore ullam a et accusamus possimus vero, optio beatae. Ab, laudantium magni. Blanditiis labore nesciunt odit voluptate eveniet? Voluptate quis vitae iure recusandae sunt perspiciatis, delectus quasi placeat, dicta velit earum quibusdam vel inventore beatae tempora porro illo odio optio accusamus molestias nam quod cum expedita. Unde laboriosam facilis modi similique eos accusantium provident obcaecati fugit, eligendi, quos ex voluptates autem. Dignissimos nisi porro, aut quos vitae fugiat, quis consequuntur cupiditate iure placeat officia aliquid corporis perferendis officiis natus, at voluptatibus ducimus qui? Aut architecto tempore rem accusantium ab neque quia. Natus iusto aut commodi consequuntur nihil reiciendis! Provident perferendis similique nostrum eum. Dolore soluta omnis esse non velit?
    </div>
  </>
);

export default Home;