import { useMemo } from 'react'
import { Pack, hierarchy } from '@visx/hierarchy'
import { ParentSize } from '@visx/responsive'
import { twMerge } from 'tailwind-merge'
// import { set } from 'date-fns' // not using for now 
// import { Sponsor } from '@/app/page';

// TODO: give better name for varibales : component 

// Source URL: https://github.com/TanStack/tanstack.com/blob/ee943e214df6f132a70120014096ed72775dee4b/app/server/sponsors.ts   

export type Sponsor = {
   name: string
   imageUrl: string
   linkUrl: string
   proficiency: number
}

const sponsorsArray: Sponsor[] = [
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




const SponsorPack = ({ sponsors = sponsorsArray }: { sponsors?: Sponsor[] }) => {
   const pack = useMemo(
      () => ({
         children: sponsors,
         name: 'root',
         radius: 0,
         distance: 0,
      }),
      [sponsors]
   )

   const root = useMemo(
      () =>
         hierarchy(pack)
            .sum((d) => 1 + d?.proficiency)
            .sort(
               (a, b) =>
                  (b.data?.proficiency ?? 0) -
                  (a.data?.proficiency ?? 0)
            ),
      [pack]
   )

   // const [show, setShow] = React.useState(false)

   // React.useEffect(() => {
   //   setShow(true)
   // }, [])

   return (
      <ParentSize>
         {({ width = 800 }) => {
            return width < 10 ? null : (
               <div
                  style={{
                     width,
                     height: width,
                     position: 'relative',
                  }}
               >
                  <style
                     dangerouslySetInnerHTML={{
                        __html: `

              .spon-link {
                transition: all .2s ease;
                transform: translate(-50%, -50%);
                will-change: transform;
              }

              .spon-link:hover {
                z-index: 10;
                transform: translate(-50%, -50%) scale(1.1);
              }

              .spon-link:hover .spon-tooltip {
                opacity: 1;
              }
            `,
                     }}
                  />
                  <Pack root={root} size={[width, width]} padding={width * 0.005}>
                     {(packData: any) => {
                        const circles = packData.descendants().slice(1) // skip first layer
                        return (
                           <div>
                              {[...circles].reverse().map((circle, i) => {
                                 const tooltipX = circle.x > width / 2 ? 'left' : 'right'
                                 const tooltipY = circle.y > width / 2 ? 'top' : 'bottom'

                                 return (
                                    <a
                                       key={`circle-${i}`}
                                       href={
                                          circle.data.linkUrl ||
                                          `https://github.com/${circle.data.login}`
                                       }
                                       className={
                                          `spon-link ` +
                                          `absolute shadow-lg bg-white rounded-full z-0`
                                       }
                                       style={{
                                          left: circle.x,
                                          top: circle.y,
                                          width: circle.r * 2,
                                          height: circle.r * 2,
                                       }}
                                    >
                                       <div
                                          key={`circle-${i}`}
                                          className={`absolute bg-no-repeat bg-center bg-contain rounded-full
                                    w-[95%] h-[95%] dark:w-[100.5%] dark:h-[100.5%]
                                    left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                                    `}
                                          style={{
                                             backgroundImage: `url(${circle.data.imageUrl ||
                                                `https://avatars0.githubusercontent.com/${circle.data.login
                                                }?v=3&s=${Math.round(circle.r * 2)}`
                                                })`,
                                          }}
                                       />
                                       <div
                                          className={twMerge(
                                             `spon-tooltip absolute text-sm
                              bg-gray-800 text-white p-2 pointer-events-none
                              transform opacity-0
                              shadow-xl rounded-lg
                              flex flex-col items-center
                            `,

                                             tooltipX == 'left'
                                                ? `left-1/4 -translate-x-full`
                                                : `right-1/4 translate-x-full`,
                                             tooltipY == 'top'
                                                ? `top-1/4 -translate-y-full`
                                                : `bottom-1/4 translate-y-full`
                                          )}
                                       >
                                          <p className={`whitespace-nowrap font-bold z-20 relative`}>
                                             {circle.data.name}
                                          </p>
                                       </div>
                                    </a>
                                 )
                              })}
                           </div>
                        )
                     }}
                  </Pack>
               </div>
            )
         }}
      </ParentSize>
   )
}

export default SponsorPack;
