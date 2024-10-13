"use client";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { FlipWords } from "@/components/ui/flip-words";
import SponsorPack from "@/components/ui/sponsor-pack";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";
import * as motion from "framer-motion/client";
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";
import { FloatingDock } from "@/components/ui/floating-dock";


export type Sponsor = {
  name: string
  imageUrl: string
  linkUrl: string
  proficiency: number
}

const sponsors: Sponsor[] = [
  // https://img.logo.dev/reactnative.dev
  // https://img.logo.dev/nextjs.org



  {
    name: 'Google',
    linkUrl: 'https://google.com',
    proficiency: 11100,
    imageUrl: 'https://logo.clearbit.com/google.com',
  },
  {
    name: 'Microsoft',
    linkUrl: 'https://microsoft.com',
    proficiency: 1200,
    imageUrl: 'https://logo.clearbit.com/microsoft.com',
  },
  {
    name: 'Apple',
    linkUrl: 'https://apple.com',
    proficiency: 100,
    imageUrl: 'https://logo.clearbit.com/apple.com',
  },
  {
    name: 'Amazon',
    linkUrl: 'https://amazon.com',
    proficiency: 1200,
    imageUrl: 'https://logo.clearbit.com/amazon.com',
  },
  {
    name: 'Netflix',
    linkUrl: 'https://netflix.com',
    proficiency: 900,
    imageUrl: 'https://logo.clearbit.com/netflix.com',
  },
  {
    name: 'Facebook',
    linkUrl: 'https://facebook.com',
    proficiency: 300,
    imageUrl: 'https://logo.clearbit.com/facebook.com',
  },
  {
    name: 'Spotify',
    linkUrl: 'https://spotify.com',
    proficiency: 450,
    imageUrl: 'https://logo.clearbit.com/spotify.com',
  },
  {
    name: 'Slack',
    linkUrl: 'https://slack.com',
    proficiency: 600,
    imageUrl: 'https://logo.clearbit.com/slack.com',
  },
  {
    name: 'GitHub',
    linkUrl: 'https://github.com',
    proficiency: 4400,
    imageUrl: 'https://logo.clearbit.com/github.com',
  },
  {
    name: 'Google',
    linkUrl: 'https://google.com',
    proficiency: 100,
    imageUrl: 'https://logo.clearbit.com/google.com',
  },
  {
    name: 'Google',
    linkUrl: 'https://google.com',
    proficiency: 100,
    imageUrl: 'https://logo.clearbit.com/google.com',
  },
  {
    name: 'Google',
    linkUrl: 'https://google.com',
    proficiency: 100,
    imageUrl: 'https://logo.clearbit.com/google.com',
  },
  {
    name: 'Google',
    linkUrl: 'https://google.com',
    proficiency: 100,
    imageUrl: 'https://logo.clearbit.com/google.com',
  },
  {
    name: 'Google',
    linkUrl: 'https://google.com',
    proficiency: 100,
    imageUrl: 'https://logo.clearbit.com/google.com',
  },
  {
    name: 'Microsoft',
    linkUrl: 'https://microsoft.com',
    proficiency: 1200,
    imageUrl: 'https://logo.clearbit.com/microsoft.com',
  },
  {
    name: 'Apple',
    linkUrl: 'https://apple.com',
    proficiency: 1800,
    imageUrl: 'https://logo.clearbit.com/apple.com',
  },
  {
    name: 'Amazon',
    linkUrl: 'https://amazon.com',
    proficiency: 1600,
    imageUrl: 'https://logo.clearbit.com/amazon.com',
  },
  {
    name: 'Netflix',
    linkUrl: 'https://netflix.com',
    proficiency: 900,
    imageUrl: 'https://logo.clearbit.com/netflix.com',
  },
  {
    name: 'Facebook',
    linkUrl: 'https://facebook.com',
    proficiency: 1100,
    imageUrl: 'https://logo.clearbit.com/facebook.com',
  },
  {
    name: 'Spotify',
    linkUrl: 'https://spotify.com',
    proficiency: 850,
    imageUrl: 'https://logo.clearbit.com/spotify.com',
  },
  {
    name: 'Slack',
    linkUrl: 'https://slack.com',
    proficiency: 1300,
    imageUrl: 'https://logo.clearbit.com/slack.com',
  },
  {
    name: 'GitHub',
    linkUrl: 'https://github.com',
    proficiency: 1400,
    imageUrl: 'https://logo.clearbit.com/github.com',
  },
];

const links = [
  {
    title: "Home",
    icon: (
      <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#",
  },

  {
    title: "Products",
    icon: (
      <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#",
  },
  {
    title: "Components",
    icon: (
      <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#",
  },
  {
    separator: true,
  },
  {
    title: "Aceternity UI",
    icon: (
      <Image
        src="/images/logo-dark.png"
        width={20}
        height={20}
        alt="Aceternity Logo"
      />
    ),
    href: "#",
  },
  {
    title: "Changelog",
    icon: (
      <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#",
  },
  {
    title: "GitHub",
    icon: (
      <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#",
  },
];


export default function TypewriterEffectSmoothDemo() {
  return (
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
        >
          <Image
            src={`/images/dev.tools.png`}
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
          {/* TODO:s */}
          {/* logso opacity need to bee 100% */}
          {/* instead of using opacigty need to use backgroundColor opacity */}

          {/* <motion.div
            className="h-[50px]"
            animate={{ y: -50 }}
          // for hide and unhide the dock
          >

            <motion.div
              className="bg-white opacity-30 h-[40px] w-[70%] m-auto rounded-lg p-0.5 flex containt-center space-between wrap"
            >

              <Icon />
              <Icon color="blue" />
              <Icon color="yellow" />

            </motion.div>
          </motion.div> */}


          {/* <motion.div
            className="h-[50px] flex items-center"
            animate={{ y: -70 }}
          // for hide and unhide the dock
          > */}
          <div className="flex items-center">
            <FloatingDock
              desktopClassName="bg-[rgba(255,255,255,0.4)] w-auto m-auto rounded-lg px-2.5 relative bottom-[12px] flex items-center"
              items={links}
            />
          </div>

        </ContainerScroll>
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
        <SponsorPack sponsors={sponsors} />
      </div>

      <div>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel blanditiis saepe quos minus repudiandae recusandae fuga, odio ullam ipsum aliquid quibusdam pariatur temporibus eligendi laboriosam sed, velit magnam quae. Accusamus impedit neque, quae nulla quasi eos debitis ipsum autem quidem! Enim dignissimos explicabo hic, similique quibusdam quisquam asperiores atque porro dolore nisi eligendi, doloremque, sequi consequuntur totam odio amet labore! Id, doloremque magni eveniet, porro esse illum tempore eos temporibus, consequuntur autem consectetur. Consequuntur ex nam distinctio quam itaque? Vero harum tempora cum ea? Sit delectus doloremque culpa non voluptate ipsam, beatae pariatur, corporis dolorem quis quos, est unde debitis! Atque aut illum maxime itaque veniam sint, aliquid dolorum? Reprehenderit est excepturi quas dolores optio sed voluptates corporis hic minima! Fuga iusto ipsum debitis qui, distinctio recusandae laborum et perspiciatis neque autem esse, repudiandae, corrupti cumque. Culpa reprehenderit magni nobis facere dignissimos mollitia aliquid, beatae, veniam aliquam pariatur dolor iusto nulla inventore quia voluptatem. Assumenda voluptatem officia veniam harum numquam deserunt vero, ad provident, laudantium beatae maiores quos dolorem? Dignissimos unde recusandae rerum cupiditate dolorem odit voluptas laudantium consectetur eaque nostrum fugit quia, voluptatem veniam sint, aspernatur consequuntur necessitatibus nemo? Sequi incidunt ut excepturi commodi placeat consequuntur voluptas dicta illum deleniti error atque reiciendis quisquam magni at, nisi dolorum molestiae asperiores exercitationem, id quod. Officia placeat similique deserunt optio asperiores, magnam dolorum laboriosam! Eos nisi dolorum necessitatibus quibusdam. A recusandae nisi illum praesentium delectus vero ad, consectetur asperiores non saepe optio. Itaque laborum enim, laboriosam magnam dicta labore! Odio nihil voluptate, maiores voluptatum quos provident officia minima rem esse! Possimus amet corrupti ut quidem mollitia porro nisi doloribus culpa. Maxime sint reprehenderit sapiente. Ex dolore itaque voluptatum enim excepturi velit iste sunt ipsa quo minima fuga ratione dolor, a amet laudantium temporibus quaerat nostrum doloribus, distinctio similique sint commodi necessitatibus! Quo beatae sunt cum dolorem deleniti nam quod cupiditate itaque, blanditiis quas adipisci reiciendis illo quidem asperiores nulla similique quis aspernatur quasi possimus? Saepe id necessitatibus dolorem fugiat veniam laboriosam aspernatur, architecto eaque molestiae rerum. Aliquid inventore vero, consequatur provident itaque excepturi, tenetur quasi omnis voluptatibus deleniti ad modi assumenda beatae at porro. Fuga iste quisquam ipsa quidem delectus qui impedit voluptas, ipsam praesentium? Quas aperiam, laboriosam doloribus provident deserunt ipsam molestiae non laborum ex, qui quia at neque. Modi, doloremque eius. Temporibus, consequatur sequi optio iusto libero reprehenderit saepe repellendus assumenda excepturi fugiat. Adipisci repellendus iste ad beatae officia? Ab quas fugit possimus! Ipsum recusandae cumque excepturi. Hic aut totam qui, amet eum quidem, repudiandae, aperiam explicabo fugiat alias animi minus! Minus quaerat eum repellat rem, iure aliquid voluptatem delectus, nam quas vel harum reprehenderit doloremque non reiciendis cupiditate omnis repudiandae ad deserunt dolores, a magni amet porro? Odio quos eveniet magnam consectetur veniam rerum obcaecati sint nulla, non explicabo iusto ea blanditiis nobis et cupiditate itaque deserunt cum vero adipisci animi. Officia, eum. Incidunt ex nulla voluptatum eaque nesciunt! Qui odio illum in autem esse explicabo sapiente quod, fugit exercitationem ipsa, dolor amet dolorum minima? Fugit tempora eveniet, praesentium in sequi, similique eum odio voluptatibus, quibusdam molestiae minima adipisci? Aliquid animi ipsam totam necessitatibus temporibus sequi itaque alias nulla, expedita quisquam quos, voluptate inventore amet ab minus. Nihil nobis consectetur iure eaque sunt dignissimos at aperiam! Id voluptates, enim neque tenetur natus ratione, voluptatum cumque optio ipsum, repellat mollitia. Quaerat voluptate error, sunt repellat, officiis ab fuga inventore tempora voluptates ipsum ullam veniam, illo repudiandae quam cum dolor? Corrupti quos eligendi eos odio soluta sequi voluptates quisquam repellat aperiam ratione praesentium minima perferendis doloribus ullam quis rerum, delectus iste illum reprehenderit, sunt facilis, magni dolorem eveniet! Soluta unde non eligendi earum impedit itaque perferendis voluptate, ullam qui cupiditate rerum doloribus temporibus labore incidunt officiis. Tenetur culpa officiis tempora sed exercitationem dolorum labore inventore! Et ea quia asperiores id eos perspiciatis tenetur, aspernatur, sed, nemo reiciendis quam quo voluptate assumenda quod! Impedit temporibus error, tenetur hic tempore corrupti veritatis culpa eligendi quidem assumenda sunt maiores sit autem reprehenderit numquam blanditiis, eum harum cupiditate sed modi! Aperiam, officia consequuntur blanditiis sint totam sed obcaecati harum porro temporibus nesciunt quasi! Consectetur cumque ipsam, sit magni placeat asperiores est aspernatur cum fugit nobis rerum quas veniam, architecto molestiae deserunt velit sapiente harum. Voluptatum autem odit libero, qui delectus ipsum. Autem omnis, eligendi ducimus nobis dolorum temporibus architecto aliquid tempore mollitia reiciendis earum laudantium doloremque culpa! Placeat dolorum hic, expedita nemo commodi possimus quis et saepe sunt ducimus odio modi, labore praesentium delectus alias, necessitatibus sapiente nisi rem eveniet velit voluptas esse ab veniam id. Qui tenetur optio ullam eaque doloremque omnis, unde neque voluptatem error a obcaecati voluptate vitae officia repellendus illum, vero hic consequuntur laborum voluptates reprehenderit perferendis doloribus sint quam quas? Rem laudantium odio eum quidem labore optio voluptas ad, voluptatum iusto iste harum velit provident explicabo esse eveniet numquam maxime asperiores quas dicta, laboriosam dolorem accusantium! Rem obcaecati sit earum, rerum molestias nisi repellat odio neque, optio aperiam maxime voluptates natus excepturi perferendis itaque? Quia a eos repellat cum eaque quaerat. Ad praesentium fugit, quis deleniti nobis sit harum dolore, iure aliquam dolores alias necessitatibus voluptatem ducimus similique consequuntur reiciendis, delectus error? Vel ipsum earum repudiandae at minus nobis quo maxime, delectus id rerum dolorem, totam est nisi dolorum commodi reprehenderit exercitationem cumque. Exercitationem eligendi dolores excepturi adipisci nobis! Dicta dolore sequi assumenda, ad quia facere libero atque officiis fuga, repellendus labore, dolorum quibusdam ullam! Rerum optio enim omnis assumenda dolorem asperiores, perferendis esse consequatur ab recusandae architecto eum nostrum sequi hic neque laudantium. Explicabo quo quidem aperiam ducimus voluptas! Veritatis labore earum praesentium quod in dicta rem sint alias esse ipsam molestiae possimus numquam amet, deserunt aliquid. Aperiam, atque illo! Eveniet, suscipit, aliquam velit modi quae dolorum sed et mollitia officiis eos atque beatae pariatur. Numquam odit minima corrupti impedit mollitia. Quam, cum doloremque quisquam repellat accusamus accusantium laboriosam eligendi sit maxime. Alias suscipit similique vel labore quisquam numquam perspiciatis nihil sapiente, quis officiis ab quo sunt exercitationem soluta facere voluptatem nostrum ullam at ducimus? Nobis eveniet, obcaecati ullam accusantium et sequi aliquam, asperiores hic aliquid error repellat libero voluptatibus perferendis laborum iusto saepe. Optio deleniti recusandae hic eaque, ipsam delectus saepe quas numquam, perferendis a illum expedita corporis facilis est dolorem explicabo quod voluptatem modi officiis illo rem quisquam ducimus eveniet! Excepturi, iure minima aperiam omnis quisquam, quas optio voluptates eligendi dolorem laudantium ullam incidunt corporis assumenda, sint numquam saepe error officiis dicta facere. Ea, repellendus distinctio perferendis expedita deleniti adipisci est velit. Tempore ut odit eveniet provident? Molestias odio aut iusto impedit iure dolor consequatur tempore id vel cumque a soluta est et, nihil, nam ad maiores odit laboriosam itaque saepe similique, perspiciatis voluptatem reiciendis? Nostrum nesciunt ex ad temporibus inventore deserunt cumque architecto totam, tempore soluta ullam error repudiandae consequuntur! Ipsa iusto ipsam dolor inventore vero alias excepturi quod repudiandae? Repellendus reiciendis modi sunt voluptas, veritatis consequatur accusantium nostrum quis tempora quam earum odit, esse voluptatum? Ea eveniet accusantium voluptas quo alias ipsum harum soluta dolor, ratione similique dolorem expedita dolorum officia autem ullam tenetur nulla maxime, facere id amet tempore voluptates sit illo! Quia eveniet aspernatur consectetur facilis maxime excepturi autem soluta laboriosam, sunt, harum ab accusamus doloribus. Molestias necessitatibus, quas nemo obcaecati eaque consequuntur expedita autem commodi consequatur earum. Blanditiis molestiae nostrum recusandae itaque doloremque dignissimos rerum, vero, at iure consequuntur ullam soluta quaerat exercitationem perferendis reprehenderit quisquam fugiat nesciunt a voluptatum officiis provident pariatur alias rem ratione! Magnam tempora recusandae voluptatum voluptates optio consectetur exercitationem soluta enim dolorem id atque dolor, maxime quaerat officiis quos nisi illum minus doloremque unde porro quod ratione pariatur consequuntur odio! Quam expedita sunt optio repellat nam, ipsam animi nobis sint. Possimus libero quibusdam cupiditate ut maxime doloribus nihil aliquam, qui dolore excepturi quo repellat veritatis laboriosam eos deleniti ipsum sequi! Aspernatur consequatur laboriosam expedita ducimus. Placeat, reprehenderit eligendi! Impedit, possimus voluptates. Quos, voluptatibus? Et autem aliquid illo voluptates ipsum dolore. Culpa rem quod natus inventore unde ratione doloremque, quidem officiis tempora, aliquam illo voluptates minus id fugiat possimus earum temporibus magnam! Sunt labore ullam autem voluptas dolore reprehenderit excepturi dolor officiis exercitationem sed. Nostrum eveniet aliquam consequatur, quaerat, dignissimos nulla voluptas non fugit cum voluptatum, ipsum perferendis officiis. Numquam fugit iusto ab exercitationem dolorem assumenda necessitatibus nemo, excepturi incidunt ratione corrupti eaque distinctio amet, repellendus rerum quos aspernatur quia quis quaerat placeat ut fuga deleniti. Eligendi totam vero possimus cupiditate, dignissimos placeat quis, reprehenderit molestias illum, dolore ab! Optio iusto incidunt eaque aperiam atque harum pariatur delectus sequi, dignissimos aut ab, beatae illo aliquam dolor at deserunt quibusdam ad? Obcaecati unde dolorum minus est ex placeat, cupiditate ut at et soluta, accusamus eaque autem consequatur beatae rerum. Quo quibusdam dicta, distinctio iure quis quisquam, aperiam debitis aut, ipsam ut maiores quae. Vitae, odio iure laborum, aperiam aspernatur corporis voluptatem cumque necessitatibus architecto nesciunt quasi suscipit fugit reprehenderit delectus at optio et magni quod rerum libero est exercitationem. Voluptate deleniti esse quaerat impedit fugit maxime commodi ullam, quam laborum suscipit. A accusamus accusantium exercitationem nulla provident obcaecati consequuntur atque numquam ex eius doloremque qui dolorum sit odit excepturi eum laborum quas vero eligendi unde nihil aliquid molestiae, eveniet animi. Sint asperiores excepturi nesciunt temporibus consectetur eius libero esse nemo, ad aliquam aliquid, veritatis sunt consequatur adipisci, cumque explicabo. Labore consequatur consectetur quis natus ut sint autem repudiandae ab, eveniet nemo voluptatibus quibusdam quia nostrum a beatae impedit eos modi animi incidunt aut soluta recusandae numquam voluptatum. Mollitia doloremque repudiandae distinctio, beatae deserunt reiciendis iure tempore itaque quasi ipsum libero, facere sequi pariatur quos in maxime illo quaerat eligendi ab hic. Vel molestiae, debitis deleniti nostrum iure assumenda distinctio culpa sequi voluptatem natus atque tempore sunt maxime ipsam magni quibusdam incidunt praesentium labore excepturi esse cum. Vero doloribus corporis perspiciatis optio consectetur error, cupiditate, enim eaque ratione qui corrupti tempore fugit voluptatem consequuntur omnis ab nostrum quod obcaecati unde nam distinctio! Minus reprehenderit, quam sequi vitae commodi illo quidem officiis atque rem beatae? Rerum perspiciatis repellat quisquam unde deserunt, neque amet magni quae voluptates, accusantium in dolorem perferendis explicabo nulla itaque modi dolore harum veritatis ipsam? Doloremque facilis explicabo accusantium, necessitatibus debitis quia doloribus, quibusdam ut, quo officiis ullam voluptatum tenetur illum repellendus ipsa laborum quis itaque et expedita quos perferendis cumque quaerat! Neque minus possimus earum minima at? Mollitia modi ea consequuntur eaque consequatur voluptas. Nisi placeat molestias, architecto soluta nihil fugit perferendis unde aut esse recusandae porro adipisci ex facilis, perspiciatis iure totam dicta maiores autem officia, molestiae similique repudiandae distinctio ut. Neque ipsam iure, culpa doloremque quis in voluptatibus quaerat voluptatem nisi error perferendis dolores modi nulla fugiat eos cupiditate, sint dicta! Possimus aliquid neque velit veritatis ut voluptate a rerum. Magnam omnis assumenda voluptatum dolore iure, quas quidem, saepe dignissimos ut consequatur debitis recusandae voluptate fugit asperiores consectetur corporis odit corrupti. Minus obcaecati ipsum deserunt eius nesciunt corporis laborum inventore quos rem at modi nostrum saepe alias expedita cupiditate maxime, eveniet quaerat quidem laboriosam! Quam optio, facere, nihil aut, cupiditate cumque atque deleniti cum possimus eveniet inventore nobis maxime ducimus et animi accusantium. Nam alias itaque quibusdam a, quos explicabo tempora! Molestiae sunt totam dolore perspiciatis ipsam placeat aperiam, iusto libero perferendis iure dolores explicabo velit maxime, numquam exercitationem obcaecati quod voluptatem cumque vitae. Accusantium quo culpa eum cumque praesentium voluptates debitis qui tenetur, optio minima cum id asperiores, architecto fugiat dicta consectetur! Ipsa autem aut, delectus vitae inventore eligendi aspernatur assumenda quod dolores sit itaque deleniti quis laboriosam incidunt odio alias quibusdam? Eveniet quibusdam, dolorum, illum, at perferendis ipsum culpa repellat praesentium aspernatur totam cumque incidunt est corporis iusto ab quidem qui optio ducimus voluptate? Magni harum nisi amet, facere sit eaque iure expedita! Nulla commodi amet provident consectetur ipsa expedita quisquam odit eveniet nisi dicta! Repellendus laboriosam aliquam aperiam provident qui modi, quo maiores ipsa quisquam necessitatibus pariatur sunt eum beatae libero eveniet et explicabo nulla nam eaque, quam dolores, cumque commodi id. Illum perferendis, ex, quos consectetur laborum eius commodi ipsa placeat rerum labore tempore repellat accusamus nesciunt, dolor voluptates quo molestias. Tempora recusandae, repudiandae dolorum omnis hic, a velit eaque id modi minima suscipit dolores! Necessitatibus exercitationem quaerat magnam dignissimos molestiae assumenda quia, nostrum sunt at sint! Sequi dolores nemo nobis, necessitatibus tempora similique. Perspiciatis culpa et quidem itaque? Sequi voluptatem cupiditate molestiae nesciunt minima aliquid dolorum officiis hic vitae. Vero, nostrum debitis placeat reiciendis saepe est. Aspernatur consectetur quae nihil explicabo, sunt deleniti ab. Ipsam, vel molestiae. Animi amet sapiente ad voluptate deserunt odio omnis, id excepturi esse magnam, ipsa commodi perspiciatis cumque facilis dolores beatae cupiditate deleniti nesciunt nostrum numquam nihil! Id velit eaque ad natus est officiis minima recusandae nulla hic dolorem quasi delectus eligendi sit, debitis, totam cum a earum necessitatibus enim ea aliquam blanditiis officia. Voluptatum, soluta? Vitae, id eligendi numquam facilis aspernatur recusandae itaque. Impedit, enim. Omnis enim perferendis dicta id, sint ratione, possimus eius incidunt repudiandae, quaerat vel minus ad debitis quod accusantium deserunt? Officiis similique voluptas perferendis culpa architecto ut pariatur commodi assumenda. Praesentium velit voluptatem unde et maiores esse architecto laudantium. Obcaecati, est. Rem, magni quo inventore nam totam eveniet? Rerum, doloremque voluptatem nam suscipit ea praesentium adipisci veniam repellendus, nisi nihil deleniti fugiat corrupti atque excepturi sunt, temporibus beatae! Quasi hic velit dolore tenetur? Nam sed doloribus minima quisquam voluptatum sint laborum atque ducimus dolores error nihil laudantium, ex rem modi sunt qui! Aliquid eum suscipit, nobis ea dicta consectetur natus enim tenetur fuga animi dolorem quod facilis libero? Quos, necessitatibus dicta! Error, consectetur laborum at provident, eveniet quam dolorem in, nulla quis deserunt eum. Atque reprehenderit distinctio soluta officiis natus, error saepe. Modi alias voluptatum sapiente vel maxime illum, dolores nemo velit asperiores. Sunt praesentium vero provident explicabo, accusamus officia tempore sit exercitationem, ducimus nihil harum veniam quos cumque? Accusantium molestiae mollitia architecto quo porro autem optio eum consequuntur quae repellendus. Laboriosam pariatur vero impedit. Libero suscipit doloremque iure qui adipisci harum assumenda quas. Aperiam excepturi sed vitae cupiditate id minima? Asperiores blanditiis explicabo adipisci nobis, repellat incidunt quisquam illo, voluptatibus et dolores expedita qui praesentium. Sed, atque minima. Eligendi alias mollitia nam accusamus iste voluptatem obcaecati ea commodi reiciendis, doloremque ad accusantium repudiandae quas quisquam omnis totam deserunt laudantium ullam amet vitae, velit ipsum architecto. Vel voluptates laborum excepturi tenetur at quisquam ea nemo incidunt omnis rerum quaerat animi laboriosam impedit cupiditate numquam, asperiores dicta architecto praesentium voluptate possimus quas ad. Provident, odit ea illum obcaecati magni distinctio eaque ut, natus dolorum tenetur blanditiis officiis necessitatibus. Voluptate architecto libero aliquam doloremque quidem fuga vero mollitia necessitatibus nemo voluptates eveniet provident autem a iusto perspiciatis, facere praesentium dolores enim neque officia blanditiis, laboriosam fugiat laborum iure! Saepe laboriosam nostrum suscipit, cumque explicabo, consequatur nesciunt dolor iste amet nulla a esse nemo eaque voluptatem maxime temporibus rem ut enim est quaerat laborum. Et animi magnam accusamus iure fugiat cupiditate ad adipisci, neque sint minus maiores quos eos temporibus omnis quibusdam beatae? Accusantium hic dolor sed ea qui repellendus odio quaerat id minima voluptate alias autem iste, ullam explicabo temporibus eaque excepturi. Perspiciatis sint tenetur odio quibusdam exercitationem magni, nihil rerum in hic pariatur cupiditate dolore laudantium, possimus perferendis aperiam quaerat ex inventore molestias nam consequuntur provident iusto fugiat? Accusamus, fugit eaque aut voluptatum deserunt, iusto quasi voluptatibus at libero asperiores distinctio iste necessitatibus eveniet nesciunt quis officia minima ex illum. Perferendis repellat dolor quibusdam, unde illo eum quo sunt amet consectetur, cumque dolorem debitis non aspernatur illum quidem earum, a nostrum ratione consequuntur maxime deleniti facilis? Exercitationem eveniet consequatur sapiente corrupti temporibus dolor, dicta, omnis quam tempora a atque similique officia sed quidem ipsum blanditiis numquam assumenda labore esse, laboriosam nihil voluptatibus consectetur odio in! Tempore repudiandae dolore iusto quibusdam inventore, tenetur enim distinctio nemo voluptatibus sit sunt alias impedit numquam libero! Nobis mollitia eveniet quidem at odit doloremque, id aut pariatur distinctio alias omnis repudiandae vero non quo laboriosam inventore aliquam atque neque ab ex dolor enim necessitatibus eligendi! Iure omnis perspiciatis error veritatis ullam eveniet illo esse similique ducimus blanditiis accusantium in cupiditate fugit rem cumque, officia ad reprehenderit qui quos amet suscipit praesentium fuga? Delectus, fugiat voluptas, ullam incidunt, velit architecto nihil non nulla maiores ad nostrum consectetur nam quae. Possimus rerum unde sunt dolores ratione exercitationem in iste, quidem rem, voluptatum voluptatibus totam. Totam impedit odio ipsam distinctio, non voluptas facilis possimus recusandae rerum rem nemo repellat natus dolor quia nesciunt magnam laborum quis libero. Fugiat, culpa. Consectetur quos enim hic tenetur mollitia tempore quisquam at dolor ratione sequi nulla eos iure omnis nisi beatae excepturi voluptas modi obcaecati, repudiandae totam dolores quaerat quod nihil? Velit corrupti blanditiis vitae quo placeat optio dignissimos, reprehenderit ratione laboriosam dicta qui quas numquam ea accusantium fuga. Obcaecati voluptas repellat ad suscipit accusantium debitis adipisci reiciendis optio, ex veniam esse ipsum dolorem quam aperiam labore voluptatum non corrupti odio beatae! At labore facere cumque animi, sed beatae! Ipsam omnis est fuga enim eum sequi tempore, consequuntur impedit neque esse eveniet veniam magnam! Repellendus facere vel quaerat amet non et voluptate nihil! Amet veritatis et sequi voluptas repellat ad aliquid aliquam quasi aspernatur, consectetur corrupti voluptatem doloribus nulla sint iste optio facilis tempora maxime impedit. Tempora dignissimos eum quibusdam maiores aut, facere temporibus deleniti a explicabo nihil laborum quis debitis beatae provident ad earum reprehenderit iusto sint eaque. Repudiandae vero ut quibusdam laborum atque eos magni error totam! Quis repellat vero ducimus velit officiis similique ab possimus ut necessitatibus, pariatur sequi ea sit magni reiciendis, modi nulla, voluptatibus dolore voluptas molestias quidem? Eligendi nam veritatis, minima sed nesciunt consectetur eaque provident soluta voluptas exercitationem nihil accusamus sapiente molestiae doloribus nulla. Sed repellendus quasi odio sequi iure totam pariatur amet voluptatem adipisci fugiat cum aspernatur eius libero soluta, sint autem perferendis eligendi deserunt! Necessitatibus at consequatur, aut placeat reprehenderit iusto culpa veniam repudiandae omnis. Doloribus deleniti nam officia totam assumenda voluptates ipsa. Eum dolorem ad vero accusantium exercitationem perspiciatis qui consectetur perferendis quidem est mollitia asperiores totam minus recusandae eius modi dolores obcaecati reprehenderit itaque, maxime, aperiam temporibus minima! Dolorem distinctio error, modi, adipisci eius nulla vel aut ullam exercitationem similique suscipit? Aliquam iusto aliquid corrupti, cumque non a ipsa laudantium dolor repellendus provident accusantium unde animi id! Cum maiores eius ab. Error possimus unde nemo deserunt hic, blanditiis non quas voluptate tenetur, aperiam cumque nulla impedit. Debitis ad, facilis explicabo cum quasi suscipit, quis est, commodi velit nulla modi perferendis ea ut voluptates quas doloribus optio esse neque. Autem adipisci veniam vitae molestias, error cupiditate modi placeat doloremque, itaque deleniti consectetur in nobis nihil officiis explicabo, ratione atque temporibus corporis! Labore maiores numquam porro eaque minima ex fugit, inventore quibusdam molestias autem esse qui id sunt vel quo hic dignissimos, est, sit veritatis unde quia nulla quasi. Eligendi unde modi eius adipisci aperiam qui, corporis provident, repellat iste reprehenderit voluptates nam excepturi. Hic, sequi voluptate. Quidem optio quam dolores aut. Culpa fuga inventore quasi iusto at suscipit quia illum perferendis, nulla, nobis vero quae eaque. Veritatis quidem odit aut quos saepe consequuntur voluptates quisquam repellendus. Autem odio, id non placeat magni aspernatur modi debitis tenetur, sunt, ipsam quod voluptatem sint. Ipsam sint eos architecto. Aspernatur voluptate veritatis repellat inventore quo maxime labore itaque, saepe molestias tempore ipsa, reiciendis commodi reprehenderit quis dolorem. Rerum commodi animi ratione atque aspernatur. Quibusdam dicta a, tenetur perspiciatis illum dolores porro, magni nemo aperiam similique labore officiis dolorum voluptas repudiandae aliquid vel eveniet sapiente incidunt nesciunt consequuntur corrupti ipsa. Amet dignissimos nisi ducimus quaerat minus odit similique hic nulla eius, facere dicta inventore porro omnis aliquid quos expedita nesciunt consequatur saepe exercitationem reprehenderit neque earum provident quidem! Quisquam enim alias dignissimos cumque minima dicta qui accusantium facilis, minus perspiciatis consequuntur rerum reprehenderit adipisci, fuga earum repudiandae laboriosam corrupti distinctio ad tenetur amet architecto aliquam repellendus mollitia! Quo, aliquam perferendis? Voluptas architecto minus dolor totam tempora debitis consequuntur, asperiores et placeat praesentium, fugiat dolores voluptates maiores quisquam adipisci sit tempore, unde tenetur sint quod? Totam veritatis a earum quis possimus amet sequi iste voluptate laudantium alias quisquam voluptates odit vitae dolore, libero molestias pariatur tenetur dignissimos. Alias quos, corrupti nam dignissimos ullam earum? Ducimus labore saepe modi minima, voluptate dolorum eius accusantium explicabo unde ipsum hic temporibus nam error iure ipsa consectetur magni officiis quibusdam sequi, incidunt aliquid ipsam rem, suscipit sapiente? Rem impedit iure modi ad omnis id minima ducimus nihil esse, velit at nam illo cupiditate dolorum! Amet corrupti officia voluptatum hic ipsa iure dolorum quas praesentium velit temporibus alias unde, quis facilis, repudiandae suscipit vel veritatis ipsam voluptates eos dignissimos reiciendis? Harum a neque culpa alias ipsum eum consequuntur deleniti iusto debitis voluptas minima recusandae aliquam aut commodi non aperiam cumque inventore quia voluptatem, distinctio quam eius amet? Voluptas tenetur voluptate quasi consequuntur inventore sint hic, autem cumque natus minima maxime ipsam eum minus quisquam, voluptatibus quos provident molestias suscipit odio! Fuga in delectus officiis ut eos assumenda quidem praesentium. Libero ducimus obcaecati harum praesentium sapiente error nisi sint mollitia amet, maiores earum voluptate nihil labore nostrum iusto, tenetur eos excepturi assumenda quod. Obcaecati nemo vero beatae sint laborum enim deleniti, ipsam, ratione voluptate labore similique? Accusantium, totam? Qui cum aspernatur facilis, veniam ea, aut similique delectus fuga sit ex quod vero eaque id maxime quam! Suscipit quas at nulla minima! Quod, mollitia. Molestias deserunt quos facere rem voluptatem praesentium? Facilis, earum repellat, placeat similique quae soluta excepturi quasi error, atque hic sint tempora sit at voluptatum vitae nisi laudantium totam nam aut ducimus eveniet rem mollitia magni maxime. Sapiente maxime officiis deleniti vitae aliquam praesentium sequi illo at nam earum totam eum quia voluptates, iure accusamus, temporibus iste, non quos saepe itaque ad eos expedita nulla veniam? Saepe facilis sit dolor tempora a similique. Nostrum mollitia numquam quo dignissimos aut modi eligendi explicabo aspernatur cumque, tenetur quos, nesciunt, quia laudantium similique assumenda. Quo aliquid explicabo ipsa quas dolore error temporibus eius consequatur magni ducimus distinctio ipsum beatae dignissimos culpa fugit dolor quae deleniti voluptatibus obcaecati, officia incidunt pariatur ad dicta! Tenetur explicabo, eveniet, ipsam laboriosam adipisci architecto harum nemo, quis qui consectetur iusto voluptate. Ducimus, qui! Rerum necessitatibus quidem assumenda placeat officiis magni nulla eaque unde suscipit, minus modi laboriosam amet ipsam iste. Architecto corporis laudantium illum. Accusantium ullam consequuntur omnis iure voluptatibus, amet porro. Officiis corrupti similique atque repellat ex architecto in sit, quas non! Dignissimos, omnis sequi. Sit incidunt doloremque consequatur dolores debitis ipsum, nisi, inventore perferendis molestias repellat illum iure vero odit tenetur eaque magni fuga dolore excepturi eos tempora amet iusto consectetur eius aspernatur? At dolore error odit cupiditate debitis amet, quasi et assumenda aut! Dolores eum harum recusandae? Provident, voluptates laudantium. Ducimus nemo quod maxime eius fugit! Veniam nam atque iste delectus, recusandae commodi est exercitationem facere porro harum eligendi qui tempore veritatis incidunt quos adipisci distinctio aperiam maiores, nemo rem sint! Cum animi cumque enim fugit eos accusantium eveniet consequatur hic, odio minima! Quisquam quae debitis aliquid autem, exercitationem quo molestias hic, officiis ea suscipit adipisci. Vero laudantium placeat impedit rem doloremque ullam aliquam nemo, quod eligendi illo molestiae facilis beatae fugit ad maxime harum sed vel delectus doloribus iste dolore dolor possimus. Voluptatibus ad culpa laudantium repudiandae cumque quae, praesentium eaque eum maxime, totam labore quos rerum maiores tempora quam. Ex odit sequi impedit consectetur amet quia, odio harum id culpa. Porro autem aliquid eos a reprehenderit! Delectus excepturi adipisci magni tempora dolore quo dignissimos, harum, ullam recusandae praesentium molestias! Placeat provident ab ullam, recusandae alias earum quod eum veniam mollitia officiis blanditiis laborum quas quos distinctio odio consequuntur aliquam nulla ducimus! Magnam, enim. Quae illum repellendus atque delectus, ut odio veritatis sequi iste obcaecati omnis non tenetur, recusandae consequuntur eum eligendi illo quis labore accusantium voluptatum. Ipsa fugiat quidem tenetur mollitia! Rerum aliquid sunt quod, consequuntur commodi quasi doloremque enim at tenetur unde, asperiores nam laudantium suscipit molestiae fugiat ab laborum eius odio. Voluptatum aut officiis aspernatur dolorum accusamus iure hic repellat? Quam quas, cum culpa consectetur omnis enim vitae sequi laudantium non ab assumenda optio sed cupiditate quidem dolores. Velit, sunt minus! Quia vero iure sapiente eos tempora! Consequuntur quis ratione suscipit velit, illo necessitatibus neque mollitia. Inventore perferendis illo dignissimos repellat quia voluptatibus harum dicta, nostrum reprehenderit in quibusdam iusto nam, nulla temporibus, ea officia rerum ab provident. Beatae maxime nobis fugit culpa sunt temporibus molestiae laudantium quasi maiores! Eos aliquid atque vero, quo ad facere sunt placeat ipsa magnam ab assumenda sint esse impedit, dicta illo praesentium! Ipsa ipsam nesciunt nihil illo tempore, nemo beatae laborum quasi repellat, explicabo qui quis, asperiores dolores ex! Minima laudantium, quae deserunt, autem ullam odio quia veniam nobis exercitationem architecto ea laborum dolor consequuntur commodi! Officia recusandae assumenda, deleniti dolorem sed, mollitia ab error excepturi possimus quis obcaecati, quia ducimus! Voluptates pariatur libero facere nostrum at eum mollitia harum ducimus magnam, laborum, adipisci sapiente quaerat. Nobis aperiam harum sit esse, maxime ratione delectus vitae voluptatibus soluta vero architecto ipsum facere nulla eius odit, molestiae quo quam distinctio earum placeat tenetur perferendis aut? Minima vel nisi distinctio omnis, deleniti cum aliquam, ex blanditiis necessitatibus facilis vitae odio at nemo tempora minus veniam aliquid molestias aut similique soluta! Voluptas praesentium error quae voluptates, eaque nemo magnam molestiae modi corporis eos a aliquam maiores quis? Ex maxime, accusamus error quisquam modi quas autem repudiandae ullam ad inventore quaerat iste fuga possimus suscipit animi cupiditate fugiat voluptas tenetur quibusdam totam iure, sequi accusantium. Veniam incidunt magni rerum ipsum. Delectus facere quasi ducimus a, unde repellat quam cupiditate dignissimos dolores ipsam omnis? Animi impedit rem quis, autem, quasi aliquid doloremque ab minima dolores dignissimos optio temporibus nesciunt nobis earum est officia, unde iste alias reprehenderit cupiditate enim. Laboriosam enim ducimus doloremque inventore veniam, eligendi porro sint odit vero, quas minus quo repudiandae reiciendis ex quaerat doloribus maxime modi assumenda consequatur sit eaque. Iste ex assumenda ipsa perspiciatis culpa ut tempore fugit. Officia autem, iusto inventore ex deserunt necessitatibus obcaecati laborum hic earum explicabo optio repudiandae odio dolores nostrum delectus molestias voluptatem? Error, placeat illum facere dolores rem possimus! Vitae aut quidem delectus id ipsum. Voluptate quae nihil corrupti eos ipsa aut labore neque architecto, laborum saepe odit eligendi ea cupiditate sit magnam totam error aliquam amet consectetur aliquid in, dicta officia. Incidunt sit harum aperiam nesciunt blanditiis. Consequuntur, laborum dolor rerum repellat quisquam, officia, corporis quis numquam harum rem molestiae unde porro accusantium explicabo sed. Eos numquam illo aperiam? Ab repellendus aliquid assumenda ad alias aliquam itaque nam unde. Quia, eum soluta? Quia deleniti sed totam aliquam veritatis ex reprehenderit. Reprehenderit soluta cupiditate, quis quibusdam dolore reiciendis ad obcaecati ipsa impedit id. Dolorum magni perferendis ipsam cumque, dolorem beatae illum! Reprehenderit, placeat debitis! Beatae voluptate optio modi, repellendus saepe ullam omnis autem perspiciatis officiis distinctio aut atque error illum, quod tenetur libero veritatis asperiores magni provident? Cum consequatur aliquam accusamus, ea, assumenda repellat deleniti harum laboriosam nesciunt eum vel reiciendis tempore velit in officiis. Consectetur eveniet est ea nam blanditiis esse voluptatum corporis minus ut numquam ex voluptate, odit modi expedita dignissimos quae possimus molestiae asperiores consequatur. Hic, dolorum commodi! Est expedita maiores rerum, ad esse, quas dolor harum ipsam repudiandae accusamus doloribus eos dolorum placeat explicabo magnam cupiditate! Nesciunt error suscipit temporibus, maiores, dolores quae quos repudiandae magni aut eum ducimus excepturi? Blanditiis eveniet laboriosam obcaecati, eos qui non expedita, tempore consequatur quis itaque ratione earum animi corporis temporibus debitis est, mollitia vitae! Sed ut magnam ipsa, quos delectus necessitatibus, laboriosam quasi perspiciatis expedita natus velit cumque dolorem! Quas delectus consectetur commodi recusandae architecto dolore adipisci sint eveniet saepe ullam et temporibus similique quam reprehenderit harum culpa eligendi, facilis nobis tenetur magni dicta iure? Saepe ab incidunt placeat libero maxime maiores reprehenderit possimus adipisci ad ex eaque accusantium quaerat omnis sed nesciunt repudiandae tempora obcaecati eius cumque laboriosam blanditiis explicabo, facere dignissimos sit? Necessitatibus facilis similique minus libero nostrum fugiat minima vero tempora architecto nisi, odio accusantium? Illum suscipit minus quae ut quam quisquam ratione, dolore nesciunt, ullam repellat temporibus excepturi corrupti iure doloribus ducimus cumque modi nam expedita tenetur quaerat eum! Corrupti voluptates odio iusto dolor rerum laboriosam neque nesciunt fugiat ratione cupiditate! Laudantium harum qui laborum fugiat suscipit illo possimus doloribus aut recusandae alias totam facere facilis et nemo ullam cupiditate doloremque, ducimus culpa, consectetur natus sunt veniam perspiciatis placeat quibusdam. Voluptatibus ratione laudantium, eveniet veniam similique iusto. Inventore nesciunt beatae cupiditate, molestias eos deserunt vitae a adipisci commodi cum optio dolorem recusandae tempora aliquam voluptate repellat corporis fugiat labore soluta. Dolorum eum ducimus voluptas soluta? Error quasi veritatis non iure maxime ipsam, mollitia dolorem totam aliquid. Adipisci voluptas ex ab, iste aspernatur dolores. Eum possimus, libero provident hic consequatur dignissimos! Veritatis dignissimos sequi facere eius veniam numquam quidem, laudantium ipsam vel minima corrupti iure voluptatibus ducimus ratione quam optio atque esse sed eveniet, odio sint in provident! Beatae doloribus reiciendis, ratione ab vel, voluptatibus enim alias officiis nobis expedita neque praesentium voluptates nulla, repellat consequatur tenetur. Maxime laudantium sed odit nobis ipsam unde. Ratione ullam, vitae aperiam, laboriosam ex sit accusamus pariatur vel magni itaque debitis voluptatibus ad recusandae? Ducimus ipsam enim nobis aspernatur esse optio, a beatae doloribus ipsa explicabo harum reprehenderit officiis eligendi eaque architecto libero deleniti et suscipit expedita minima nihil dicta. Ratione nostrum nesciunt ab eum sed nam aliquam? Officiis, tenetur id. Explicabo, ipsam blanditiis. Iure doloribus cum, optio numquam voluptas, reiciendis sint quas exercitationem perferendis fugit velit laborum dicta nostrum veritatis. Soluta, quidem tempore earum quae, dolorum ut et delectus adipisci facere sapiente, iste deleniti ullam saepe! Vero, possimus ipsum. Facere, dicta deserunt tempora voluptatem nisi ipsum cupiditate provident eum quos similique voluptate expedita, et aliquid tenetur, at distinctio perspiciatis sit. Repellendus modi magnam dolores consequuntur, accusantium non corporis qui aspernatur explicabo veniam obcaecati necessitatibus odio distinctio, repellat nisi omnis assumenda deserunt fugiat dolore. Aspernatur similique dolorum consequatur tempore reiciendis error iusto tempora assumenda voluptatum explicabo, ratione vitae alias? Suscipit aliquid corporis deserunt voluptatibus saepe, tempore perspiciatis necessitatibus vel sit laudantium accusamus ex praesentium. Libero ipsa enim magnam inventore placeat sequi quibusdam sint. Distinctio dolores neque laboriosam nisi doloribus consequatur mollitia reiciendis.
      </div>
    </>
  );
}


const Icon = ({ color = 'red' }: { color?: string }) => (
  <div className="box" style={{ height: '35px', width: '35px', backgroundColor: color, opacity: '1' }}></div>
);
