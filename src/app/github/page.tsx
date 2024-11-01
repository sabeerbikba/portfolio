import {
   BookIcon,
   EyeIcon,
   GitBranchIcon,
   GlobeIcon,
   LawIcon,
   LinkIcon,
   MarkGithubIcon,
   PulseIcon,
   RepoForkedIcon,
   StarIcon,
   TagIcon
} from "@primer/octicons-react";
import numeral from 'numeral';
import { useEffect, useRef, useState } from "react";
import { marked } from "marked";
import useLocalStorageState from "@/hooks/useLocalStorageState";
import { cn } from "@/lib/utils";

import githubMarkdownCss from "github-markdown-css/github-markdown-dark.css";

// API response: https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28

const githubBaseURL: string = "https://github.com/";

const font: Record<string, string> = {
   primaryColor: "#f0f6fc",
   secondaryColor: "#9198a1",
};

const fetchAndDecodeContent = async (link: string): Promise<string> => {
   const response = await fetch(link);
   if (!response.ok) {
      throw new Error(`Failed to fetch content: ${response.statusText}`);
   }

   const data = await response.json();

   const content = atob(data.content);
   console.log(content)
   return content;
}

const formatNumber = (num: number) => numeral(num).format('0.[0]a');

const Github = () => (
   <div className="bg-[#0d1117] flex gap-4 flex-wrap" style={{ width: "100vw" }}>
      <InfoCard />
      <RepositoryOverview />
   </div>
);

const InfoCard = ({
   repo = 'sabeerbikba/dev.tools', // need to remove
   description = " A collection of useful developer tools built with React. ", // need to remove
   website = "htt://devtools-sabeerbikba.vercel.app/",// tmp : need to remove

   stars = 999, // default value :: 0 :: 
   forks = 1000, // default value :: 0 :: 
   watchers = 1049, // default value :: 1 :: 
   branch = 1050, // default value :: 1 :: 
   tags = 1999, // default value :: 0 :: 
}: {
   // for now all props optional 
   repo?: string,
   description?: string | null,
   website?: string | null,

   stars?: number,
   forks?: number,
   watchers?: number,
   branch?: number,
   tags?: number,
}) => {
   const [userName, repositoryName] = repo.split("/");

   return (
      <div className="p-4 border-b border-[#3d444d] w-full" style={{ color: font.secondaryColor }}>

         <h2 className="space-y-4 text-2xl font-extrabold ml-1 mb-4" style={{ color: font.primaryColor }}>
            <a href={githubBaseURL + repo} className=" hover:underline">
               <MarkGithubIcon size={32} className="mr-2" />
               <span className="text-xl" style={{ color: font.secondaryColor }}>{userName}/</span>
               {repositoryName}
            </a>
         </h2>

         <div className="space-y-4">
            {description != null && (
               <p className="text-base font-normal">
                  {description}
               </p>
            )}

            <Website link={website} />

            <h3 className="hidden">License</h3>
            <button className="flex items-center gap-2 hover:text-blue-400">
               {/* onClick show mit licnse in bottom using useLocalstrongState */}
               <LawIcon className="fill-current" />
               <span className="text-sm">MIT license</span>
            </button>

            <ul className="flex flex-wrap items-center gap-5 text-sm">
               {[
                  {
                     href: `/${repo}/stargazers`,
                     icon: <StarIcon className="fill-current" />,
                     count: stars,
                     what: "stars"
                  },
                  {
                     href: `/${repo}/forks`,
                     icon: <RepoForkedIcon className="fill-current" />,
                     count: forks,
                     what: "forks"
                  },
                  {
                     href: `/${repo}/watchers`,
                     icon: <EyeIcon className="fill-current" />,
                     count: watchers,
                     what: "watching",
                  },
                  {
                     href: `/${repo}/branches`,
                     icon: <GitBranchIcon className="fill-current" />,
                     count: branch,
                     what: "Branch",
                  },
                  { // not needed i think 
                     href: `/${repo}/tags`,
                     icon: <TagIcon className="fill-current" />,
                     count: tags,
                     what: "Tags",
                  },
                  { // not needed i think 
                     href: `/${repo}/activity`,
                     icon: <PulseIcon className="fill-current" />,
                     count: null,
                     what: "Activity",
                  }
               ].map(link => {
                  const { href, icon, count, what } = link;
                  return (
                     <a
                        href={githubBaseURL + href}
                        key={what}
                        target="_blank"
                        role="listitem"
                        className="inline-flex items-center gap-2 text-current hover:text-blue-400"
                     >
                        {icon}
                        {count != null && (
                           <span className="font-semibold">{formatNumber(count)}</span>
                        )}
                        <span>{what}</span>
                     </a>
                  );
               })}
            </ul>

            <div className="inline-flex items-center gap-1 text-sm">
               <GlobeIcon fill={font.secondaryColor} />
               <span>Public repository</span>
            </div>

         </div>
      </div>
   );
};

// for string method like split need empty string else throw error 
const Website = ({ link = "" }: { link: string | null }) => {
   const [ishoverd, setIsHoverd] = useState<boolean>(false);

   if (!link) return null;

   return (
      <a
         href={link}
         className="text-[#58a6ff] hover:underline inline-flex items-center gap-2"
         onMouseEnter={() => setIsHoverd(true)}
         onMouseLeave={() => setIsHoverd(false)}
      >
         <LinkIcon className={cn(ishoverd ? "text-[#58a6ff]" : "text-[#9198a1]")} />
         {link.split("://")[1]}
      </a>
   );
};

type LocalStorageType = 'README' | 'MIT license';

const RepositoryOverview = ({
   repo = "sabeerbikba/dev.tools",
}: {
   repo?: string,
}) => {
   const [previewTab, setPreviewTab] = // need to move
      useLocalStorageState<LocalStorageType>(`home:projects:RepositoryOverview:${repo}`, 'README');



   return (
      <div className="border border-[#3d444d] rounded-md w-full m-3 mt-0">

         <div className="border-b border-[#3d444d] bg-[#0d1117] bg-[] sticky top-0">
            <h2 className="hidden">Repository files navigation</h2>
            <div className="h-11 px-2 py-1.5 text-[#9198a1]" aria-label="Repository files">
               {[
                  {
                     icon: <BookIcon />,
                     text: "README",
                  }, {
                     icon: <LawIcon />,
                     text: "MIT license"
                  },
               ].map(button => {
                  const { icon, text } = button;
                  const isSelected = previewTab === text;

                  return (
                     <button
                        onClick={() => setPreviewTab(text as LocalStorageType)}
                        className="mx-0.5 px-1.5 py-0.5 repo-overiew-button relative hover:bg-[#656c7633] rounded-md"
                        aria-selected={isSelected}
                        key={text}
                     >
                        {icon}
                        <span
                           className={cn(
                              "m-1.5 text-[#f0f6fc] text-[15px]",
                              isSelected && "font-semibold"
                           )}
                        >{text}</span>
                     </button>
                  )
               })}
            </div>
         </div>
         {previewTab === "README" ? <ReadmeShadowContainer /> : <LicenseDisplay />}
      </div>
   );
};

const ReadmeShadowContainer = ({
   link = "https://api.github.com/repos/sabeerbikba/dev.tools/contents/README.md"
}: {
   link?: string,
}) => {
   const hostRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      if (hostRef.current) {
         const shadowRoot = hostRef.current.attachShadow({ mode: 'open' });

         (async () => {
            try {
               const markdown = await fetchAndDecodeContent(link);
               const htmlContent = marked.parse(markdown);

               shadowRoot.innerHTML = `
          <style>${githubMarkdownCss}</style>
            <article class="markdown-body">${htmlContent}</article>
          `;
            } catch (error) {
               console.error('Error fetching README:', error);
            }
         })();
      }
   }, []);

   return <div className="p-8" ref={hostRef} />
};

const LicenseDisplay = ({
   link = "https://api.github.com/repos/sabeerbikba/dev.tools/contents/LICENSE"
}: {
   link?: string
}) => {
   const [license, setLicense] = useState("");


   useEffect(() => {
      (async () => {
         try {
            const license = await fetchAndDecodeContent(link);
            console.log(license);
            console.log('useEffect running!!');

            setLicense(license);
         } catch (error) {
            console.error('Error fetching License:', error);
         }
      })();
   }, []);

   return (
      <div className="p-8 text-[#dfe5eb] text-xs font-medium">
         <pre>
            {license}
         </pre>
      </div>
   );
};

export default Github;