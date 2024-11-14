import {
    useContext,
    useState,
    useEffect,
    createContext,
} from "react";

import { projects } from "@/data/projects";
import About from "./about";
import Github from "./github";
import Website from "./website";
import { FloatingDock } from "../ui/floating-dock";

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
        (async () => {
            const fetchPromises = projects.map(project => {
                const baseUrl = `https://api.github.com/repos/${project.repo}`;
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

    return (
        <ScreenContext.Provider value={{ previewProject, previewApp, setScreen }}>
            <FloatingDock />
            <div className="overflow-scroll h-full w-full">
                <Website
                    tab={previewProjectIndex}
                    tabsLinks={projects.map(item => item.website)}
                    hidden={previewApp !== 3}
                />
                <About number={[previewProject, previewApp]} />
                {isDataAvilable && (
                    <Github
                        data={data[previewProjectIndex]}
                        hidden={previewApp !== 5}
                    />
                )}
            </div>
        </ScreenContext.Provider>
    )
};

export { Screen as default, ScreenContext, useScreen };
