"use client";
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
import type { Endpoints } from "@octokit/types";

import useLocalStorageState from "@/hooks/useLocalStorageState";
import { cn } from "@/lib/utils";

import type {
   GithubBranchesType,
   GitHubContributorType,
   GitHubFileContentType,
   GitHubLanguagesType,
   GitHubRepositoryType,
   GithubTagsType,
   PreviewTabOption,
   RepoDataType
} from "@/types/project";

import githubMarkdownCss from "@/css/github-markdown-dark"; // .ts file 

// import githubResponse from "@/data/github.json";

// console.log(githubResponse);

// console.log(githubMarkdownCss);

// API response: https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28

const githubBaseURL: string = "https://github.com/";

const font: Record<string, string> = {
   primaryColor: "#f0f6fc",
   secondaryColor: "#9198a1",
};

// const fetchAndDecodeContent = async (link: string): Promise<string> => {
//    const response = await fetch(link);
//    if (!response.ok) {
//       throw new Error(`Failed to fetch content: ${response.statusText}`);
//    }

//    const data = await response.json();

//    const content = atob(data.content);
//    console.log(content)
//    return content;
// }

const formatNumber = (num: number) => numeral(num).format('0.[0]a');



const Github = ({ hidden, data }: { hidden: boolean, data: RepoDataType }) => {
   const { repoDetails, languages, contributors, branches, tags, readme, license }: RepoDataType = data;
   const isReadmeAvailable = readme !== null;
   const repoName: string = repoDetails.full_name;

   console.log(data);

   return Object.keys(data).length > 0 && (
      <div className="bg-[#0d1117] h-full" hidden={hidden}>
         <InfoCard
            repoData={repoDetails}
            branchData={branches}
            tagData={tags}
            hasReadme={isReadmeAvailable}
         />
         <div className="px-4 w-full">
            {(readme || license) && (
               <RepositoryOverview
                  readmeData={readme}
                  licenseData={license}
                  repoName={repoName}
               />
            )}
            <Contributors
               contributorData={contributors}
               repoName={repoName}
            />
            <LanguagesUsed
               languageData={languages}
            />
         </div>
      </div>
   );
};

const InfoCard = ({
   // repo = 'sabeerbikba/dev.tools', // need to remove
   // // description = " A collection of useful developer tools built with React. ", // need to remove
   // website = "htt://devtools-sabeerbikba.vercel.app/",// tmp : need to remove

   // stars = 999, // default value :: 0 :: 
   // forks = 1000, // default value :: 0 :: 
   // watchers = 1049, // default value :: 1 :: 
   // branch = 1050, // default value :: 1 :: 
   // tags = 1999, // default value :: 0 :: 


   repoData,
   branchData,
   tagData,
   hasReadme,
}: {
   // // for now all props optional 
   // repo?: string,
   // // description?: string | null,
   // website?: string | null,

   // stars?: number,
   // forks?: number,
   // watchers?: number,
   // branch?: number,
   // tags?: number,

   repoData: GitHubRepositoryType
   branchData: GithubBranchesType,
   tagData: GithubTagsType,
   hasReadme: boolean,
}) => {
   const {
      full_name, description, homepage, stargazers_count, forks_count, subscribers_count
   }: GitHubRepositoryType = repoData;
   const [_, setPreviewTab] = useLocalStorageState<PreviewTabOption>(
      `home:projects:RepositoryOverview:${full_name}`,
      'README'
   );
   const branchesCount: number = branchData.length;
   const tagsCount: number = tagData.length;
   // const [userName, repositoryName] = full_name.split("/");
   const [userName, repositoryName] = full_name ? full_name.split("/") : ["", ""];


   return (
      <div className="p-4 border-b border-[#3d444d] w-full" style={{ color: font.secondaryColor }}>

         <h2 className="space-y-4 text-2xl font-extrabold ml-1 mb-4" style={{ color: font.primaryColor }}>
            <a href={githubBaseURL + full_name} className=" hover:underline">
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

            <Website link={homepage} />

            {hasReadme && (
               <>
                  <h3 className="hidden">License</h3>
                  <button
                     className="flex items-center gap-2 hover:text-blue-400"
                     onClick={() => setPreviewTab("MIT license")}
                  >
                     {/* onClick show mit licnse in bottom using useLocalstrongState */}
                     <LawIcon className="fill-current" />
                     <span className="text-sm">MIT license</span>
                  </button>
               </>
            )}

            <ul className="flex flex-wrap items-center gap-5 text-sm">
               {[
                  {
                     href: `/${full_name}/stargazers`,
                     icon: <StarIcon className="fill-current" />,
                     count: stargazers_count,
                     what: "stars"
                  },
                  {
                     href: `/${full_name}/forks`,
                     icon: <RepoForkedIcon className="fill-current" />,
                     count: forks_count,
                     what: "forks"
                  },
                  {
                     href: `/${full_name}/watchers`,
                     icon: <EyeIcon className="fill-current" />,
                     count: subscribers_count,
                     what: "watching",
                  },
                  {
                     href: `/${full_name}/branches`,
                     icon: <GitBranchIcon className="fill-current" />,
                     count: branchesCount,
                     what: "Branch",
                  },
                  { // not needed i think 
                     href: `/${full_name}/tags`,
                     icon: <TagIcon className="fill-current" />,
                     count: tagsCount,
                     what: "Tags",
                  },
                  { // not needed i think 
                     href: `/${full_name}/activity`,
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
const Website = ({ link }: { link: string | null }) => {
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


// const RepositoryOverview = ({
//    readmeData, licenseData
// }: {
//    readmeData: GitHubFileContentType | null, licenseData: GitHubFileContentType | null
// }) => {
//    const [previewTab, setPreviewTab] = useState('README');

//    return (
//       <div className="border border-[#3d444d] rounded-md w-full mt-4">
//          <div className="border-b border-[#3d444d] bg-[#0d1117] sticky top-0">
//             <h2 className="hidden">Repository files navigation</h2>
//             <div className="h-11 px-2 py-1.5 text-[#9198a1]" aria-label="Repository files">
//                {[
//                   {
//                      icon: <BookIcon />,
//                      text: "README",
//                   }, {
//                      icon: <LawIcon />,
//                      text: "MIT license"
//                   },
//                ].map(button => {
//                   const { icon, text } = button;
//                   const isSelected = previewTab === text;

//                   return (
//                      <button
//                         onClick={() => setPreviewTab(text)}
//                         className="mx-0.5 px-1.5 py-0.5 repo-overiew-button relative hover:bg-[#656c7633] rounded-md"
//                         aria-selected={isSelected}
//                         key={text}
//                      >
//                         {icon}
//                         <span
//                            className={cn(
//                               "m-1.5 text-[#f0f6fc] text-[15px]",
//                               isSelected && "font-semibold"
//                            )}
//                         >{text}</span>
//                      </button>
//                   )
//                })}
//             </div>
//          </div>
//          {previewTab === "README" ? <ReadmeShadowContainer /> : <LicenseDisplay />}
//       </div>
//    );
// };

const RepositoryOverview = ({
   readmeData,
   licenseData,
   repoName,
}: {
   readmeData: GitHubFileContentType | null,
   licenseData: GitHubFileContentType | null
   repoName: string,
}) => {
   const [previewTab, setPreviewTab] = useLocalStorageState<PreviewTabOption>(
      `home:projects:RepositoryOverview:${repoName}`,
      'README'
   );

   // Define available tabs based on the presence of data
   const tabs = [
      readmeData ? { icon: <BookIcon />, text: "README" } : null,
      licenseData ? { icon: <LawIcon />, text: "MIT license" } : null,
   ].filter((tab): tab is { icon: JSX.Element; text: string } => tab !== null);

   // const readmeTab = readmeData ? { icon: <BookIcon />, text: "README" } : null;
   // const licenseTab = licenseData ? { icon: <LawIcon />, text: "MIT license" } : null;

   // // Filter out any null values
   // const tabs = [readmeTab, licenseTab].filter(
   //    (tab): tab is { icon: JSX.Element; text: string } => tab !== null
   // );

   // console.log("readmeTab, licneseTab, tabs");
   // console.log(readmeTab, licenseTab, tabs);

   useEffect(() => {
      if (tabs.length === 1) {
         setPreviewTab(tabs[0].text as PreviewTabOption);
      }
   }, [tabs, setPreviewTab]);

   // if (tabs.length === 1) {
   //    setPreviewTab(tabs[0].text as PreviewTabOption);
   // }

   console.log("tabs");
   console.log(tabs);

   return (
      <div className="border border-[#3d444d] rounded-md w-full mt-4">
         <div className="border-b border-[#3d444d] bg-[#0d1117] sticky top-0">
            <h2 className="hidden">Repository files navigation</h2>
            <div className="h-11 px-2 py-1.5 text-[#9198a1]" aria-label="Repository files">
               {tabs.map(button => {
                  const { icon, text } = button;
                  const isSelected = previewTab === text;

                  return (
                     <button
                        onClick={() => setPreviewTab(text as PreviewTabOption)}
                        className="mx-0.5 px-1.5 py-0.5 repo-overview-button relative hover:bg-[#656c7633] rounded-md"
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
                  );
               })}
            </div>
         </div>
         <div className="p-4">
            {previewTab === "README" && readmeData && (
               <ReadmeShadowContainer readmeData={readmeData} />
            )}
            {previewTab === "MIT license" && licenseData && (
               <LicenseDisplay licenseData={licenseData} />
            )}
         </div>
      </div>
   );
};


const ReadmeShadowContainer = ({
   // link = "https://api.github.com/repos/sabeerbikba/dev.tools/contents/README.md"
   readmeData,
}: {
   // link?: string,
   readmeData: GitHubFileContentType,
}) => {
   const hostRef = useRef<HTMLDivElement | null>(null);
   console.log('ReadmeShadowContainer:readmeData');
   console.log(readmeData);

   if (typeof readmeData !== "object" || !("content" in readmeData)) return null;

   // if (typeof readmeData !== "object" || !("content" in readmeData)) {
   //    return <div>No README content available</div>;
   // }

   const markdown = atob(readmeData.content!);
   const htmlContent = marked.parse(markdown);



   useEffect(() => {
      if (hostRef.current) {
         // const shadowRoot = hostRef.current.attachShadow({ mode: 'open' });
         const shadowRoot = hostRef.current.shadowRoot || hostRef.current.attachShadow({ mode: 'open' });


         // (async () => {
         // try {
         //    const markdown = await fetchAndDecodeContent(link);
         //    const htmlContent = marked.parse(markdown);

         shadowRoot.innerHTML = `
                <style>${githubMarkdownCss}</style>
                  <article class="markdown-body">${htmlContent}</article>
                `;

         //    } catch (error) {
         //       console.error('Error fetching README:', error);
         //    }
         // })();
      }
   }, []);

   return <div className="p-8" ref={hostRef} />
};

const LicenseDisplay = ({
   // link = "https://api.github.com/repos/sabeerbikba/dev.tools/contents/LICENSE"

   licenseData,
}: {
   // link?: string

   licenseData: GitHubFileContentType
}) => {
   // const [license, setLicense] = useState("");

   console.log("LicenseDisplay:licenseData");
   console.log(licenseData);

   if (typeof licenseData !== "object" || !("content" in licenseData)) return null;

   // if (typeof readmeData !== "object" || !("content" in readmeData)) {
   //    return <div>No License content available</div>;
   // }



   const license = atob(licenseData.content!);


   // useEffect(() => {
   //    (async () => {
   //       try {
   //          // const license = await fetchAndDecodeContent(link);
   //          console.log(license);
   //          console.log('useEffect running!!');

   //          setLicense(license);
   //       } catch (error) {
   //          console.error('Error fetching License:', error);
   //       }
   //    })();
   // }, []);

   return (
      <div className="p-8 text-[#dfe5eb] text-xs font-medium">
         <pre>
            {license}
         </pre>
      </div>
   );
};

const Contributors = ({
   // link = "https://api.github.com/repos/sabeerbikba/dev.tools/contributors",

   contributorData,
   repoName,
}: {
   // link?: string,

   repoName: string
   contributorData: GitHubContributorType,
}) => {
   // const [contributors, setContributors] = useState<GitHubContributorType>([]);

   // console.log(contributors);

   // useEffect(() => {
   //    (async () => {
   //       const response = await fetch(link);
   //       const data = await response.json();
   //       setContributors(data);
   //    })();
   // }, []);



   const repo: string = "/" + repoName;
   return (
      <div className="w-full text-[#f0f6fc] border-b border-[#3d444d]">
         <div className="py-4 w-full">

            <h2 className="h-7 mb-3 text-lg font-semibold">
               <a href={repo + "/graphs/contributors"}
                  // className="Link--primary no-underline Link d-flex flex-items-center"
                  className="block hover:text-[#4493f8]"
               >
                  Contributors
                  <span title="3" className="ml-1 rounded-full bg-[#1e242a] inline-block w-5 h-5 !text-[#f0f6fc] text-sm font-thin text-center">
                     {contributorData.length}
                  </span>
               </a>
            </h2>

            <ul className="list-none">
               {Array.isArray(contributorData) && contributorData.map(contributor => {
                  const { html_url, login, avatar_url, type } = contributor;
                  return (
                     <li className="mb-2 flex" key={login}>
                        <a href={html_url} className="mr-2">
                           <img src={avatar_url} alt={"@" + login} height="32" width="32" className={cn(type === "Bot" ? "rounded-md" : "rounded-full")} />
                        </a>
                        <span
                           // className="flex-self-center min-width-0 css-truncate css-truncate-overflow width-fit flex-auto"
                           className="text-ellipsis"
                        >
                           <a href={html_url}
                              className="hover:text-[#4493f8]"
                           //  className="Link--primary no-underline flex-self-center"
                           >
                              <strong
                                 className="font-semibold text-[15.2px]"
                              >{login}</strong>
                           </a>
                        </span>
                     </li>
                  );
               })}
            </ul>

         </div>
      </div>
   );
};



const LanguagesUsed = ({
   // link = "https://api.github.com/repos/sabeerbikba/dev.tools/languages"
   // link = "https://api.github.com/repos/subsurface/subsurface/languages"

   languageData,
}: {
   // link?: string,

   languageData: GitHubLanguagesType,
}) => {
   // const [languages, setLanguages] = useState<GitHubLanguagesType>({});
   const languagesBytesOnePercentage: number = Object.values(languageData).reduce((acc, curr) => acc + curr, 0) / 100;


   // useEffect(() => {
   //    (async () => {
   //       const response = await fetch(link);
   //       const data = await response.json();
   //       setLanguages(data);
   //    })();
   // }, []);

   return (
      <div className="BorderGrid-row">
         <div className="BorderGrid-cell text-[#f0f6fc] py-4">
            <h2 className="h4 mb-3 text-lg font-semibold">Languages</h2>

            <div className="mb-2 rounded-full">
               <span className="flex rounded-full">
                  {Object.entries(languageData).map(([language, bytes]) => {
                     const languageUsed = (bytes / languagesBytesOnePercentage).toFixed(1);
                     return (
                        <span
                           key={language}
                           data-language={language}
                           style={{ width: languageUsed + "%" }}
                           aria-label={language + " " + languageUsed}
                           className="h-2 mx-[.3px]"
                        />
                     );
                  })}
               </span>
            </div>

            <ul className="list-style-none text-sm">
               {Object.entries(languageData).map(([language, bytes]) => {
                  const languageUsed: number = parseFloat((bytes / (languagesBytesOnePercentage)).toFixed(1));
                  return (
                     <li className="inline" key={language}>
                        <a
                           className="inline-flex items-center flex-nowrap no-underline text-small mr-4"
                           href={"/sabeerbikba/dev.tools/search?l=" + language.toLowerCase()}
                        >
                           <span className="w-2 h-2 mr-2 block rounded-full" data-language={language} />
                           <span className="color-fg-default text-bold mr-1 font-semibold">{language}</span>
                           <span className="text-[#747b83]">{languageUsed + "%"}</span>
                        </a>
                     </li>
                  )
               })}
            </ul>

         </div>
      </div>

   );
};

export default Github;
