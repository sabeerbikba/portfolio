import { useMemo } from 'react';
import { Pack, hierarchy } from '@visx/hierarchy';
import { ParentSize } from '@visx/responsive';

import type { HierarchyNode } from '@visx/hierarchy/lib/types';
import type { ToolsType } from "@/types/tools";

import { cn } from '@/lib/utils';

// Inspiration URL: https://tanstack.com/query/latest
// Source URL: https://github.com/TanStack/tanstack.com/blob/ee943e214df6f132a70120014096ed72775dee4b/app/components/SponsorPack.tsx   

// TODO: Rename this component with  meaningfull name 

const SponsorPack = ({ tools }: { tools: ToolsType[] }) => {
   const pack = useMemo<ToolsType>(
      () => ({
         children: tools,
         name: 'root',
         radius: 0,
         distance: 0,
      }),
      [tools]
   );

   const root = useMemo(() =>
      hierarchy<ToolsType>(pack)
         .sum((d) => d.proficiency || 1)
         .sort((a, b) => (b.data.proficiency ?? 0) - (a.data.proficiency ?? 0)),
      [pack]
   );

   return (
      <ParentSize>
         {({ width = 800 }) => width < 10 ? null : (
            <div style={{ width, height: width, position: 'relative' }}>
               <Pack root={root} size={[width, width]} padding={width * 0.005}>
                  {(packData: HierarchyNode<ToolsType>) => {
                     const circles = packData.descendants().slice(1) as Array<HierarchyNode<ToolsType> & { x: number; y: number; r: number }>;
                     return (
                        <div>
                           {[...circles].reverse().map((circle, i) => {
                              const tooltipX = circle.x > width / 2 ? 'left' : 'right';
                              const tooltipY = circle.y > width / 2 ? 'top' : 'bottom';

                              return (
                                 <div
                                    key={`circle-${i}`}
                                    // href={circle.data.linkUrl}
                                    // target='__blank'
                                    className="spon-link absolute shadow-lg bg-white rounded-full z-0 border-[0.5px]"
                                    style={{ left: circle.x, top: circle.y, width: circle.r * 2, height: circle.r * 2 }}
                                 >
                                    {typeof circle.data.imageUrl === "string" ? (
                                       <div
                                          key={`circle-${i}`}
                                          className="absolute bg-no-repeat bg-center bg-contain rounded-full w-[95%] h-[95%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                                          style={{ backgroundImage: `url(${circle.data.imageUrl})` }}
                                       />
                                    ) : circle.data.imageUrl}
                                    <div
                                       className={cn(
                                          "spon-tooltip absolute z-50 text-sm bg-gray-800 text-white p-2 pointer-events-none transform opacity-0 shadow-xl rounded-lg flex flex-col items-center",
                                          tooltipX == 'left' ? 'left-1/4 -translate-x-full' : 'right-1/4 translate-x-full',
                                          tooltipY == 'top' ? 'top-1/4 -translate-y-full' : 'bottom-1/4 translate-y-full',
                                       )}
                                    >
                                       <p className={`whitespace-nowrap font-bold z-20 relative`}>
                                          {circle.data.name}
                                       </p>
                                    </div>
                                 </div>
                              )
                           })}
                        </div>
                     );
                  }}
               </Pack>
            </div>
         )}
      </ParentSize>
   );
}

export default SponsorPack;
