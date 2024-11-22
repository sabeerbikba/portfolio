"use client";
import { useEffect, useRef, useState } from "react";
import numeral from 'numeral';
import { marked } from "marked";
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

import type {
   GithubBranchesType,
   GitHubContributorType,
   GitHubFileContentType,
   GitHubLanguagesType,
   GitHubRepositoryType,
   GithubTagsType,
   PreviewTabOption,
   RepoDataType
} from "@/types/projects";

import { cn } from "@/lib/utils";
import ExternalLink from "@/components/ui/link";
import useLocalStorageState from "@/hooks/useLocalStorageState";
import githubMarkdownCss from "@/css/github-markdown-dark"; // .ts file 

// API response: https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28

const githubBaseURL: string = "https://github.com/";
const formatNumber = (num: number) => numeral(num).format('0.[0]a');

const Github = ({ hidden, data }: { hidden: boolean, data: RepoDataType }) => {
   const {
      repoDetails,
      languages,
      contributors,
      branches,
      tags,
      readme,
      license
   }: RepoDataType = data;
   const isReadmeAvailable = readme !== null;
   const repoName: string = repoDetails.full_name;
   const blobAbsoluteUrl: string =
      `${githubBaseURL + repoName}/blob/${repoDetails.default_branch}/`;

   return Object.keys(data).length > 0 && (
      <div className="bg-[#0d1117] h-full" hidden={hidden}>
         <InfoCard
            repoData={repoDetails}
            branchData={branches}
            tagData={tags}
            hasReadme={isReadmeAvailable}
         />
         <div className="px-4 bg-[#0d1117]">
            {(readme || license) && (
               <RepositoryOverview
                  readmeData={readme}
                  licenseData={license}
                  repoName={repoName}
                  blobAbsoluteUrl={blobAbsoluteUrl}
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
   repoData,
   branchData,
   tagData,
   hasReadme,
}: {
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
   const [userName, repositoryName] = full_name ? full_name.split("/") : ["", ""];

   return (
      <div className="p-4 border-b border-[#3d444d] text-[#9198a1]">
         <h2 className="space-y-4 text-2xl font-extrabold ml-1 mb-4 text-[#f0f6fc]">
            <ExternalLink
               href={githubBaseURL + full_name}
               className=" hover:underline"
            >
               <MarkGithubIcon size={32} className="mr-2" />
               <span className="text-xl text-[#9198a1]">{userName}/</span>
               {repositoryName}
            </ExternalLink>
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
                  <h3 hidden>License</h3>
                  <button
                     className="flex items-center gap-2 hover:text-blue-400"
                     onClick={() => setPreviewTab("MIT license")}
                  >
                     <LawIcon className="fill-current" />
                     <span className="text-sm">MIT license</span>
                  </button>
               </>
            )}
            <ul className="flex flex-wrap items-center gap-5 text-sm">
               {[{
                  href: `${full_name}/stargazers`,
                  icon: <StarIcon className="fill-current" />,
                  count: stargazers_count,
                  what: "stars"
               }, {
                  href: `${full_name}/forks`,
                  icon: <RepoForkedIcon className="fill-current" />,
                  count: forks_count,
                  what: "forks"
               }, {
                  href: `${full_name}/watchers`,
                  icon: <EyeIcon className="fill-current" />,
                  count: subscribers_count,
                  what: "watching",
               }, {
                  href: `${full_name}/branches`,
                  icon: <GitBranchIcon className="fill-current" />,
                  count: branchData.length,
                  what: "Branch",
               }, {
                  href: `${full_name}/tags`,
                  icon: <TagIcon className="fill-current" />,
                  count: tagData.length,
                  what: "Tags",
               }, {
                  href: `${full_name}/activity`,
                  icon: <PulseIcon className="fill-current" />,
                  count: null,
                  what: "Activity",
               }].map(({ href, icon, count, what }) => (
                  <ExternalLink
                     href={githubBaseURL + href}
                     key={what}
                     className="inline-flex items-center gap-2 text-current hover:text-blue-400"
                  >
                     {icon}
                     {count != null && (
                        <span className="font-semibold">{formatNumber(count)}</span>
                     )}
                     <span>{what}</span>
                  </ExternalLink>
               ))}
            </ul>
            <div className="inline-flex items-center gap-1 text-sm">
               <GlobeIcon fill="#9198a1" />
               <span>Public repository</span>
            </div>
         </div>
      </div>
   );
};

const Website = ({ link }: { link: string | null }) => {
   if (!link) return null;
   const [ishoverd, setIsHoverd] = useState<boolean>(false);

   return (
      <ExternalLink
         href={link}
         className="text-[#58a6ff] hover:underline inline-flex items-center gap-2"
         onMouseEnter={() => setIsHoverd(true)}
         onMouseLeave={() => setIsHoverd(false)}
      >
         <LinkIcon className={cn(ishoverd ? "text-[#58a6ff]" : "text-[#9198a1]")} />
         {link.split("://")[1]}
      </ExternalLink>
   );
};

const RepositoryOverview = ({
   readmeData,
   licenseData,
   repoName,
   blobAbsoluteUrl,
}: {
   readmeData: GitHubFileContentType | null,
   licenseData: GitHubFileContentType | null,
   repoName: string,
   blobAbsoluteUrl: string,
}) => {
   const [previewTab, setPreviewTab] = useLocalStorageState<PreviewTabOption>(
      `home:projects:RepositoryOverview:${repoName}`,
      'README'
   );

   const tabs = [
      readmeData ? { icon: <BookIcon />, text: "README" } : null,
      licenseData ? { icon: <LawIcon />, text: "MIT license" } : null,
   ].filter((tab): tab is { icon: JSX.Element; text: string } => tab !== null);

   useEffect(() => {
      if (tabs.length === 1) {
         setPreviewTab(tabs[0].text as PreviewTabOption);
      }
   }, [tabs, setPreviewTab]);

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
               <ReadmeShadowContainer
                  readmeData={readmeData}
                  blobAbsoluteUrl={blobAbsoluteUrl}
               />
            )}
            {previewTab === "MIT license" && licenseData && (
               <LicenseDisplay licenseData={licenseData} />
            )}
         </div>
      </div>
   );
};


const ReadmeShadowContainer = ({
   readmeData,
   blobAbsoluteUrl,
}: {
   readmeData: GitHubFileContentType | null
   blobAbsoluteUrl: string,
}) => {
   if (readmeData === null || typeof readmeData !== "object" || !("content" in readmeData)) return null;
   const hostRef = useRef<HTMLDivElement | null>(null);
   const markdown = atob(readmeData.content!);

   useEffect(() => {
      (async () => {
         if (hostRef.current) {
            const htmlContent = await marked.parse(markdown);
            const shadowRoot = hostRef.current.shadowRoot || hostRef.current.attachShadow({ mode: 'open' });

            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = htmlContent;

            const links = tempDiv.querySelectorAll('a');
            links.forEach(link => {
               const href = link.getAttribute('href');
               if (href) {
                  const absoluteUrl = href.startsWith('http') ?
                     href : blobAbsoluteUrl + href;
                  link.setAttribute('href', absoluteUrl);
                  link.setAttribute('target', '_blank');
                  link.setAttribute('rel', 'noopener noreferrer');
               }
            });

            shadowRoot.innerHTML = `<style>${githubMarkdownCss
               }</style><article class="markdown-body">${tempDiv.innerHTML}</article>`;
         }
      })();
   }, []);

   return <div className="p-8" ref={hostRef} />
};

const LicenseDisplay = ({ licenseData }: { licenseData: GitHubFileContentType | null }) => {
   if (licenseData === null || typeof licenseData !== "object" || !("content" in licenseData)) return null;
   const license = atob(licenseData.content!);

   return (
      <div className="p-8 text-[#dfe5eb] text-xs font-medium overflow-auto w-full">
         <pre className="whitespace-pre-wrap overflow-x-auto w-full" style={{ wordBreak: "break-word" }}>
            {license}
         </pre>
      </div>
   );
};

const Contributors = ({
   contributorData,
   repoName,
}: {
   repoName: string
   contributorData: GitHubContributorType,
}) => (
   <div className="w-full text-[#f0f6fc] border-b border-[#3d444d]">
      <div className="py-4 w-full">
         <h2 className="h-7 mb-3 text-lg font-semibold">
            <ExternalLink
               href={`${githubBaseURL}/${repoName}/graphs/contributors`}
               className="block hover:text-[#4493f8]"
            >
               Contributors
               <span
                  title="3"
                  className="ml-1 rounded-full bg-[#1e242a] inline-block w-5 h-5 !text-[#f0f6fc] text-sm font-thin text-center"
               >
                  {contributorData.length}
               </span>
            </ExternalLink>
         </h2>
         <ul className="list-none">
            {Array.isArray(contributorData) &&
               contributorData.map(({ html_url, login, avatar_url, type }) => (
                  <li className="mb-2 flex" key={login}>
                     <ExternalLink href={html_url} className="mr-2">
                        <img
                           src={avatar_url}
                           alt={"@" + login}
                           height="32"
                           width="32"
                           className={cn(type === "Bot" ? "rounded-md" : "rounded-full")}
                        />
                     </ExternalLink>
                     <span className="text-ellipsis">
                        <ExternalLink href={html_url} className="hover:text-[#4493f8]">
                           <strong className="font-semibold text-[15.2px]">{login}</strong>
                        </ExternalLink>
                     </span>
                  </li>
               ))}
         </ul>
      </div>
   </div>
);

const LanguagesUsed = ({ languageData }: { languageData: GitHubLanguagesType }) => {
   const languagesBytesOnePercentage: number =
      Object.values(languageData).reduce((acc, curr) => acc + curr, 0) / 100;

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
                  const languageUsed: number =
                     parseFloat((bytes / (languagesBytesOnePercentage)).toFixed(1));

                  return (
                     <li className="inline" key={language}>
                        <ExternalLink
                           className="inline-flex items-center flex-nowrap no-underline text-small mr-4"
                           // TODO: is working fine 
                           href={"/sabeerbikba/dev.tools/search?l=" + language.toLowerCase()}
                        >
                           <span className="w-2 h-2 mr-2 block rounded-full" data-language={language} />
                           <span className="color-fg-default text-bold mr-1 font-semibold">{language}</span>
                           <span className="text-[#747b83]">{languageUsed + "%"}</span>
                        </ExternalLink>
                     </li>
                  )
               })}
            </ul>
         </div>
      </div>
   );
};

export default Github;
