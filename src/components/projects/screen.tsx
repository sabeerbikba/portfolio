import {
  useContext,
  useState,
  useEffect,
  createContext,
} from "react";

import { FloatingDock } from "../ui/floating-dock";
import About from "./about";
import Github from "./github";
import Website from "./website";
import ExternalLink from "@/components/ui/link";
import { projects } from "@/data/projects";

import type {
  RepoDataType,
  GithubBranchesType,
  GitHubContributorType,
  GitHubFileContentType,
  GitHubLanguagesType,
  GitHubRepositoryType,
  GithubTagsType,
  ScreenContextType
} from "@/types/projects";

const ScreenContext = createContext<ScreenContextType | null>(null);

const useScreen = () => {
  const context = useContext(ScreenContext);
  if (context === null) {
    throw new Error('useScreen must be used within a ScreenProvider');
  }
  return context;
};

const Screen = () => {
  const [previewProject, setPreviewProject] = useState<number>(1); // 1 - 2
  const [previewApp, setPreviewApp] = useState<number>(3); // 3 - 5
  const [data, setData] = useState<RepoDataType[]>([]);
  const isDataAvilable: boolean = data.length !== 0;
  const previewProjectIndex = previewProject - 1;

  const setScreen = (value: number, view: "project" | "app") => {
    const handlers = {
      project: setPreviewProject,
      app: setPreviewApp,
    };

    handlers[view](value);
  };

  useEffect(() => {
    /**    // / GitHub API Endpoints: / // 
      
      1. repoDetails: /repos/{owner}/{repo} (https://docs.github.com/en/rest/repos/repos#get-a-repository)
      2. languages: /repos/{owner}/{repo}/languages (https://docs.github.com/en/rest/repos/repos#list-repository-languages)
      3. contributors: /repos/{owner}/{repo}/contributors (https://docs.github.com/en/rest/repos/repos#list-repository-contributors)
      4. branches: /repos/{owner}/{repo}/branches (https://docs.github.com/en/rest/branches/branches#list-branches)
      5. tags: /repos/{owner}/{repo}/tags (https://docs.github.com/en/rest/repos/repos#list-repository-tags)
      6. license: /contents/LICENSE (https://docs.github.com/en/rest/repos/contents#get-repository-content)
      7. readme: /contents/README.md (https://docs.github.com/en/rest/repos/contents#get-repository-content)
    */

    (async () => {
      const fetchPromises = projects.map(project => {
        const baseUrl = `https://api.github.com/repos/${project.repo}`;
        return Promise.all([
          fetch(baseUrl).then(res => res.json() as Promise<GitHubRepositoryType>), // repoDetails
          fetch(`${baseUrl}/languages`).then(res => res.json() as Promise<GitHubLanguagesType>), // languages
          fetch(`${baseUrl}/contributors`).then(res => res.json() as Promise<GitHubContributorType>), // contributors
          fetch(`${baseUrl}/branches`).then(res => res.json() as Promise<GithubBranchesType>), // branches
          fetch(`${baseUrl}/tags`).then(res => res.json() as Promise<GithubTagsType>), // tags
          fetch(`${baseUrl}/contents/LICENSE`) // license
            .then(async res => {
              const data = await res.json();
              return data.message === "Not Found" ? null : (data as GitHubFileContentType);
            }),
          fetch(`${baseUrl}/contents/README.md`) // readme
            .then(async res => {
              const data = await res.json();
              return data.message === "Not Found" ? null : (data as GitHubFileContentType);
            })
        ]);
      });

      try {
        const results = await Promise.all(fetchPromises);
        const formattedData = results.map(([
          repoDetails,
          languages,
          contributors,
          branches,
          tags,
          license,
          readme
        ]) => ({
          repoDetails,
          languages,
          contributors,
          branches,
          tags,
          license,
          readme,
        }));
        setData(formattedData);

      } catch (error) {
        console.error('Error fetching data from GitHub API:', error);
      }
    })();
  }, []);

  return (
    <>
      <ScreenContext.Provider value={{ previewProject, previewApp, setScreen }}>
        <FloatingDock />
      </ScreenContext.Provider>
      <div className="overflow-scroll h-full w-full">
        <Website
          tab={previewProjectIndex}
          data={projects}
          hidden={previewApp !== 3}
        />
        <About number={[previewProject, previewApp]} />
        <div
          hidden={previewApp !== 5}
          className="bg-[#0d1117] h-full"
        >
          {isDataAvilable ? (
            <Github data={data[previewProjectIndex]} />
          ) : (
            <div className="center">
              <FallbackGithubUI link={projects[previewProjectIndex].repo} />
            </div>
          )}
        </div>
      </div>
    </>
  )
};

const FallbackGithubUI = ({ link }: { link: string }) => (
  // TODO:
  <ExternalLink href={link}>
    open in new Tag
  </ExternalLink>
);

export { Screen as default, ScreenContext, useScreen };
