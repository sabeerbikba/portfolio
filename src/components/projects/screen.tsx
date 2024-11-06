import { useContext, useState, useEffect, createContext } from "react";

import { FloatingDock } from "../ui/floating-dock";
import About from "./about";
import Github from "./github";
import Website from "./website";

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


// TODO: project need to be shown based on 

const githubProfileName: string = "sabeerbikba";
const tabsLinks = [
    "https://devtools-sabeerbikba.vercel.app/",
    "http://honnavarrickshawservice.vercel.app/",
];
const repos = ["dev.tools", "rickshaw"];

const Screen = () => {
    const [previewProject, setPreviewProject] = useState<number>(1); // 1 - 3
    const [previewApp, setPreviewApp] = useState<number>(4); // 4 - 6
    const [data, setData] = useState<RepoDataType[]>([]);
    const isValidProjectIndex: boolean = previewProject > 0 && previewProject <= data.length;
    const isDataAvilable: boolean = data.length !== 0;
    const safePreviewProject = Math.min(Math.max(previewProject, 0), tabsLinks.length) - 1;

    useEffect(() => {
        (async () => {
            const fetchPromises = repos.map(repo => {
                const baseUrl = `https://api.github.com/repos/${githubProfileName}/${repo}`;
                return Promise.all([
                    fetch(baseUrl).then(res => res.json() as Promise<GitHubRepositoryType>),
                    fetch(`${baseUrl}/languages`).then(res => res.json() as Promise<GitHubLanguagesType>),
                    fetch(`${baseUrl}/contributors`).then(res => res.json() as Promise<GitHubContributorType>),
                    fetch(`${baseUrl}/branches`).then(res => res.json() as Promise<GithubBranchesType>),
                    fetch(`${baseUrl}/tags`).then(res => res.json() as Promise<GithubTagsType>),
                    fetch(`${baseUrl}/contents/LICENSE`)
                        .then(async res => {
                            const data = await res.json();
                            return data.message === "Not Found" ? null : (data as GitHubFileContentType);
                        }), // License
                    fetch(`${baseUrl}/contents/README.md`)
                        .then(async res => {
                            const data = await res.json();
                            return data.message === "Not Found" ? null : (data as GitHubFileContentType);
                        }) // README
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

    const setScreen = (value: number, view: "project" | "app") => {
        const handlers = {
            project: setPreviewProject,
            app: setPreviewApp,
        };

        handlers[view](value);
    };

    return (
        <ScreenContext.Provider value={{ previewProject, previewApp, setScreen }}>
            <FloatingDock />
            <div className=" overflow-scroll h-full w-full">
                <Website
                    tab={safePreviewProject}
                    tabsLinks={tabsLinks}
                    hidden={previewApp !== 4 || previewProject === 3}
                />
                <About number={[previewProject, previewApp]} />
                {isValidProjectIndex && isDataAvilable && (
                    <Github
                        data={data[previewProject - 1]}
                        hidden={previewApp !== 6 || previewProject === 3}
                    />
                )}
            </div>
        </ScreenContext.Provider>
    )
};

export { Screen as default, ScreenContext, useScreen };
