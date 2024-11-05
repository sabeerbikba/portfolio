import { useContext, useState, useEffect, createContext } from "react";
import Image from "next/image";
import { FloatingDock } from "../ui/floating-dock";
import About from "./about";
import Github from "./github";
import type {
    RepoDataType,
    GithubBranchesType,
    GitHubContributorType,
    GitHubFileContentType,
    GitHubLanguagesType,
    GitHubRepositoryType,
    GithubTagsType
} from "@/types/project";

// import data from "@/data/dev/fetch-all-github.json";

// Define types for fetched data


type ScreenContextType = {
    previewProject: number;
    previewApp: number;
    setScreen: (value: number, view: "project" | "app") => void;
};

const ScreenContext = createContext<ScreenContextType | null>(null);

const useScreen = () => {
    const context = useContext(ScreenContext);
    if (context === null) {
        throw new Error('useScreen must be used within a ScreenProvider');
    }
    return context;
};

// TODO: project need to be shown based on 

const Screen = () => {
    const [previewProject, setPreviewProject] = useState<number>(1);
    const [previewApp, setPreviewApp] = useState<number>(4);
    const [data, setData] = useState<RepoDataType[]>([]);
    const repos = ["dev.tools", "rickshaw"]; // Specify your repositories here
    const githubProfileName: string = "sabeerbikba";

    const isValidProjectIndex: boolean = previewProject > 0 && previewProject <= data.length;
    const isDataAvilable: boolean = data.length !== 0;


    console.log(data);


    useEffect(() => {
        (async () => {
            const fetchPromises = repos.map(repo => {
                const baseUrl = `https://api.github.com/repos/${githubProfileName}/${repo}`;
                return Promise.all([
                    fetch(baseUrl).then(res => res.json() as Promise<GitHubRepositoryType>), // Main repo details
                    fetch(`${baseUrl}/languages`).then(res => res.json() as Promise<GitHubLanguagesType>), // Languages
                    fetch(`${baseUrl}/contributors`).then(res => res.json() as Promise<GitHubContributorType>), // Contributors
                    fetch(`${baseUrl}/branches`).then(res => res.json() as Promise<GithubBranchesType>), // Branches
                    fetch(`${baseUrl}/tags`).then(res => res.json() as Promise<GithubTagsType>), // Tags
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

                // Transform results into a more usable format
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


    // const [screen, setScreenVal] = useState(1);

    console.log("previewProject previewApp", previewProject, previewApp);

    const setScreen = (value: number, view: "project" | "app") => {
        const handlers = {
            project: setPreviewProject,
            app: setPreviewApp,
        };

        // setScreenVal(value);
        handlers[view](value);
    };


    return (
        <ScreenContext.Provider value={{ previewProject, previewApp, setScreen }}>
            <FloatingDock />
            <div className=" overflow-scroll h-full w-full">
                <About number={[previewProject, previewApp]} />
                {isValidProjectIndex && isDataAvilable && (
                    <Github data={data[previewProject - 1]} hidden={previewApp !== 6} />
                )}
            </div>
        </ScreenContext.Provider>
    )
};

export { Screen as default, ScreenContext, useScreen };
export type { ScreenContextType };
// export default Screen;

/**
 
[
    {
        "repoDetails": {
            "id": 750439019,
            "node_id": "R_kgDOLLrKaw",
            "name": "dev.tools",
            "full_name": "sabeerbikba/dev.tools",
            "private": false,
            "owner": {
                "login": "sabeerbikba",
                "id": 59386700,
                "node_id": "MDQ6VXNlcjU5Mzg2NzAw",
                "avatar_url": "https://avatars.githubusercontent.com/u/59386700?v=4",
                "gravatar_id": "",
                "url": "https://api.github.com/users/sabeerbikba",
                "html_url": "https://github.com/sabeerbikba",
                "followers_url": "https://api.github.com/users/sabeerbikba/followers",
                "following_url": "https://api.github.com/users/sabeerbikba/following{/other_user}",
                "gists_url": "https://api.github.com/users/sabeerbikba/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/sabeerbikba/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/sabeerbikba/subscriptions",
                "organizations_url": "https://api.github.com/users/sabeerbikba/orgs",
                "repos_url": "https://api.github.com/users/sabeerbikba/repos",
                "events_url": "https://api.github.com/users/sabeerbikba/events{/privacy}",
                "received_events_url": "https://api.github.com/users/sabeerbikba/received_events",
                "type": "User",
                "user_view_type": "public",
                "site_admin": false
            },
            "html_url": "https://github.com/sabeerbikba/dev.tools",
            "description": "A collection of useful developer tools built with React.",
            "fork": false,
            "url": "https://api.github.com/repos/sabeerbikba/dev.tools",
            "forks_url": "https://api.github.com/repos/sabeerbikba/dev.tools/forks",
            "keys_url": "https://api.github.com/repos/sabeerbikba/dev.tools/keys{/key_id}",
            "collaborators_url": "https://api.github.com/repos/sabeerbikba/dev.tools/collaborators{/collaborator}",
            "teams_url": "https://api.github.com/repos/sabeerbikba/dev.tools/teams",
            "hooks_url": "https://api.github.com/repos/sabeerbikba/dev.tools/hooks",
            "issue_events_url": "https://api.github.com/repos/sabeerbikba/dev.tools/issues/events{/number}",
            "events_url": "https://api.github.com/repos/sabeerbikba/dev.tools/events",
            "assignees_url": "https://api.github.com/repos/sabeerbikba/dev.tools/assignees{/user}",
            "branches_url": "https://api.github.com/repos/sabeerbikba/dev.tools/branches{/branch}",
            "tags_url": "https://api.github.com/repos/sabeerbikba/dev.tools/tags",
            "blobs_url": "https://api.github.com/repos/sabeerbikba/dev.tools/git/blobs{/sha}",
            "git_tags_url": "https://api.github.com/repos/sabeerbikba/dev.tools/git/tags{/sha}",
            "git_refs_url": "https://api.github.com/repos/sabeerbikba/dev.tools/git/refs{/sha}",
            "trees_url": "https://api.github.com/repos/sabeerbikba/dev.tools/git/trees{/sha}",
            "statuses_url": "https://api.github.com/repos/sabeerbikba/dev.tools/statuses/{sha}",
            "languages_url": "https://api.github.com/repos/sabeerbikba/dev.tools/languages",
            "stargazers_url": "https://api.github.com/repos/sabeerbikba/dev.tools/stargazers",
            "contributors_url": "https://api.github.com/repos/sabeerbikba/dev.tools/contributors",
            "subscribers_url": "https://api.github.com/repos/sabeerbikba/dev.tools/subscribers",
            "subscription_url": "https://api.github.com/repos/sabeerbikba/dev.tools/subscription",
            "commits_url": "https://api.github.com/repos/sabeerbikba/dev.tools/commits{/sha}",
            "git_commits_url": "https://api.github.com/repos/sabeerbikba/dev.tools/git/commits{/sha}",
            "comments_url": "https://api.github.com/repos/sabeerbikba/dev.tools/comments{/number}",
            "issue_comment_url": "https://api.github.com/repos/sabeerbikba/dev.tools/issues/comments{/number}",
            "contents_url": "https://api.github.com/repos/sabeerbikba/dev.tools/contents/{+path}",
            "compare_url": "https://api.github.com/repos/sabeerbikba/dev.tools/compare/{base}...{head}",
            "merges_url": "https://api.github.com/repos/sabeerbikba/dev.tools/merges",
            "archive_url": "https://api.github.com/repos/sabeerbikba/dev.tools/{archive_format}{/ref}",
            "downloads_url": "https://api.github.com/repos/sabeerbikba/dev.tools/downloads",
            "issues_url": "https://api.github.com/repos/sabeerbikba/dev.tools/issues{/number}",
            "pulls_url": "https://api.github.com/repos/sabeerbikba/dev.tools/pulls{/number}",
            "milestones_url": "https://api.github.com/repos/sabeerbikba/dev.tools/milestones{/number}",
            "notifications_url": "https://api.github.com/repos/sabeerbikba/dev.tools/notifications{?since,all,participating}",
            "labels_url": "https://api.github.com/repos/sabeerbikba/dev.tools/labels{/name}",
            "releases_url": "https://api.github.com/repos/sabeerbikba/dev.tools/releases{/id}",
            "deployments_url": "https://api.github.com/repos/sabeerbikba/dev.tools/deployments",
            "created_at": "2024-01-30T16:42:38Z",
            "updated_at": "2024-10-17T11:21:05Z",
            "pushed_at": "2024-09-27T12:48:12Z",
            "git_url": "git://github.com/sabeerbikba/dev.tools.git",
            "ssh_url": "git@github.com:sabeerbikba/dev.tools.git",
            "clone_url": "https://github.com/sabeerbikba/dev.tools.git",
            "svn_url": "https://github.com/sabeerbikba/dev.tools",
            "homepage": "https://devtools-sabeerbikba.vercel.app/",
            "size": 2065,
            "stargazers_count": 32,
            "watchers_count": 32,
            "language": "JavaScript",
            "has_issues": true,
            "has_projects": false,
            "has_downloads": true,
            "has_wiki": true,
            "has_pages": true,
            "has_discussions": false,
            "forks_count": 5,
            "mirror_url": null,
            "archived": false,
            "disabled": false,
            "open_issues_count": 1,
            "license": {
                "key": "mit",
                "name": "MIT License",
                "spdx_id": "MIT",
                "url": "https://api.github.com/licenses/mit",
                "node_id": "MDc6TGljZW5zZTEz"
            },
            "allow_forking": true,
            "is_template": false,
            "web_commit_signoff_required": false,
            "topics": [
                "all-search-engines",
                "color-code-convertor",
                "css-tools",
                "developer-tools",
                "grapesjs-editor",
                "hash-generator",
                "html-preview",
                "lorem-ipsum-generator",
                "markdown-preview",
                "meta-tags-generator",
                "namecase-converter",
                "qrcode-generator",
                "react",
                "react-preview",
                "text-tools",
                "typescript-playground",
                "unit-converter",
                "web-development",
                "word-counter"
            ],
            "visibility": "public",
            "forks": 5,
            "open_issues": 1,
            "watchers": 32,
            "default_branch": "main",
            "temp_clone_token": null,
            "network_count": 5,
            "subscribers_count": 2
        },
        "languages": {
            "JavaScript": 341283,
            "CSS": 78953,
            "HTML": 793
        },
        "contributors": [
            {
                "login": "sabeerbikba",
                "id": 59386700,
                "node_id": "MDQ6VXNlcjU5Mzg2NzAw",
                "avatar_url": "https://avatars.githubusercontent.com/u/59386700?v=4",
                "gravatar_id": "",
                "url": "https://api.github.com/users/sabeerbikba",
                "html_url": "https://github.com/sabeerbikba",
                "followers_url": "https://api.github.com/users/sabeerbikba/followers",
                "following_url": "https://api.github.com/users/sabeerbikba/following{/other_user}",
                "gists_url": "https://api.github.com/users/sabeerbikba/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/sabeerbikba/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/sabeerbikba/subscriptions",
                "organizations_url": "https://api.github.com/users/sabeerbikba/orgs",
                "repos_url": "https://api.github.com/users/sabeerbikba/repos",
                "events_url": "https://api.github.com/users/sabeerbikba/events{/privacy}",
                "received_events_url": "https://api.github.com/users/sabeerbikba/received_events",
                "type": "User",
                "user_view_type": "public",
                "site_admin": false,
                "contributions": 176
            },
            {
                "login": "dependabot[bot]",
                "id": 49699333,
                "node_id": "MDM6Qm90NDk2OTkzMzM=",
                "avatar_url": "https://avatars.githubusercontent.com/in/29110?v=4",
                "gravatar_id": "",
                "url": "https://api.github.com/users/dependabot%5Bbot%5D",
                "html_url": "https://github.com/apps/dependabot",
                "followers_url": "https://api.github.com/users/dependabot%5Bbot%5D/followers",
                "following_url": "https://api.github.com/users/dependabot%5Bbot%5D/following{/other_user}",
                "gists_url": "https://api.github.com/users/dependabot%5Bbot%5D/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/dependabot%5Bbot%5D/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/dependabot%5Bbot%5D/subscriptions",
                "organizations_url": "https://api.github.com/users/dependabot%5Bbot%5D/orgs",
                "repos_url": "https://api.github.com/users/dependabot%5Bbot%5D/repos",
                "events_url": "https://api.github.com/users/dependabot%5Bbot%5D/events{/privacy}",
                "received_events_url": "https://api.github.com/users/dependabot%5Bbot%5D/received_events",
                "type": "Bot",
                "user_view_type": "public",
                "site_admin": false,
                "contributions": 1
            },
            {
                "login": "ibnex",
                "id": 167453229,
                "node_id": "U_kgDOCfsiLQ",
                "avatar_url": "https://avatars.githubusercontent.com/u/167453229?v=4",
                "gravatar_id": "",
                "url": "https://api.github.com/users/ibnex",
                "html_url": "https://github.com/ibnex",
                "followers_url": "https://api.github.com/users/ibnex/followers",
                "following_url": "https://api.github.com/users/ibnex/following{/other_user}",
                "gists_url": "https://api.github.com/users/ibnex/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/ibnex/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/ibnex/subscriptions",
                "organizations_url": "https://api.github.com/users/ibnex/orgs",
                "repos_url": "https://api.github.com/users/ibnex/repos",
                "events_url": "https://api.github.com/users/ibnex/events{/privacy}",
                "received_events_url": "https://api.github.com/users/ibnex/received_events",
                "type": "User",
                "user_view_type": "public",
                "site_admin": false,
                "contributions": 1
            }
        ],
        "license": {
            "name": "LICENSE",
            "path": "LICENSE",
            "sha": "a5ed514a02595b4291af188c0dfd3d6829b479bc",
            "size": 1069,
            "url": "https://api.github.com/repos/sabeerbikba/dev.tools/contents/LICENSE?ref=main",
            "html_url": "https://github.com/sabeerbikba/dev.tools/blob/main/LICENSE",
            "git_url": "https://api.github.com/repos/sabeerbikba/dev.tools/git/blobs/a5ed514a02595b4291af188c0dfd3d6829b479bc",
            "download_url": "https://raw.githubusercontent.com/sabeerbikba/dev.tools/main/LICENSE",
            "type": "file",
            "content": "TUlUIExpY2Vuc2UKCkNvcHlyaWdodCAoYykgMjAyNCBzYWJlZXIgYmlrYmEK\nClBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdl\nLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkKb2YgdGhpcyBzb2Z0\nd2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUg\nIlNvZnR3YXJlIiksIHRvIGRlYWwKaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQg\ncmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhl\nIHJpZ2h0cwp0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gs\nIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsCmNvcGllcyBv\nZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9t\nIHRoZSBTb2Z0d2FyZSBpcwpmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3Qg\ndG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOgoKVGhlIGFib3ZlIGNvcHly\naWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwg\nYmUgaW5jbHVkZWQgaW4gYWxsCmNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0\naW9ucyBvZiB0aGUgU29mdHdhcmUuCgpUSEUgU09GVFdBUkUgSVMgUFJPVklE\nRUQgIkFTIElTIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQ\nUkVTUyBPUgpJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRP\nIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwKRklUTkVTUyBG\nT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4g\nSU4gTk8gRVZFTlQgU0hBTEwgVEhFCkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhP\nTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RI\nRVIKTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFD\nVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwKT1VUIE9GIE9S\nIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBP\nUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUKU09GVFdBUkUuCg==\n",
            "encoding": "base64",
            "_links": {
                "self": "https://api.github.com/repos/sabeerbikba/dev.tools/contents/LICENSE?ref=main",
                "git": "https://api.github.com/repos/sabeerbikba/dev.tools/git/blobs/a5ed514a02595b4291af188c0dfd3d6829b479bc",
                "html": "https://github.com/sabeerbikba/dev.tools/blob/main/LICENSE"
            }
        },
        "readme": {
            "name": "README.md",
            "path": "README.md",
            "sha": "c3223f3fb307dadd6917ae0e0434599cf6251ebd",
            "size": 1562,
            "url": "https://api.github.com/repos/sabeerbikba/dev.tools/contents/README.md?ref=main",
            "html_url": "https://github.com/sabeerbikba/dev.tools/blob/main/README.md",
            "git_url": "https://api.github.com/repos/sabeerbikba/dev.tools/git/blobs/c3223f3fb307dadd6917ae0e0434599cf6251ebd",
            "download_url": "https://raw.githubusercontent.com/sabeerbikba/dev.tools/main/README.md",
            "type": "file",
            "content": "IyBEZXYudG9vbHMgQ29sbGVjdGlvbgoKVGhpcyBwcm9qZWN0IGlzIGEgY29s\nbGVjdGlvbiBvZiB1c2VmdWwgZGV2ZWxvcGVyIHRvb2xzIGJ1aWx0IHdpdGgg\nUmVhY3QuCgojIyBUb29scyBJbmNsdWRlZAoKLSBBbGwgSW4gT25lIFNlYXJj\naEVuZ2luZXMKLSBDU1MgQXV0b3ByZWZpeGVyIChhZGQgdmVuZG9yIHByZWZp\neGVzKQotIENoYXJhY3RlciBhbmQgV29yZHMgQ291bnRlcgotIENvbG9yIENv\nZGUgQ29udmVydGVyCi0gR3JhcGVKUyBFZGl0b3IKLSBIYXNoIEdlbmVyYXRv\ncgotIExpdmUgSFRNTCBQcmV2aWV3Ci0gTGl2ZSBSZWFjdCBQcmV2aWV3Ci0g\nTGl2ZSBNYXJrZG93biBQcmV2aWV3IChnaXRodWIgc3R5bGUpCi0gTG9yZW1J\ncHN1bSBHZW5lcmF0b3IKLSBNZXRhIFRhZ3MgR2VuZXJhdG9yCi0gTmFtZUNh\nc2UgQ29udmVydGVyIChlLmcuLCBjYW1lbENhc2UgdG8gVVBQRVJDQVNFKQot\nIFFSIENvZGUgR2VuZXJhdG9yCi0gVHlwZXNjcmlwdCBQbGF5Z3JvdW5kCi0g\nVW5pdCBDb252ZXJ0ZXIgKGUuZy4sIHB4IHRvIGVtKQotIFdlYnNpdGUgTGlu\na3MgZm9yIERldmVsb3BlcnMKCiMjIEluc3RhbGxhdGlvbiBhbmQgVXNhZ2UK\nCmBgYGJhc2gKIyAxLiBDbG9uZSB0aGUgcmVwb3NpdG9yeSBmcm9tIEdpdEh1\nYgpnaXQgY2xvbmUgaHR0cHM6Ly9naXRodWIuY29tL3NhYmVlcmJpa2JhL2Rl\ndi50b29scy5naXQKCiAjIDIuIENoYW5nZSBkaXJlY3RvcnkgdG8gdGhlIGNs\nb25lZCByZXBvc2l0b3J5CmNkIGRldi50b29scwoKIyAzLiBJbnN0YWxsIGRl\ncGVuZGVuY2llcyB1c2luZyBucG0KbnBtIGluc3RhbGwKCiMgNC4gUnVuIHRo\nZSBkZXZlbG9wbWVudCBzZXJ2ZXIKbnBtIHJ1biBkZXYKYGBgCgojIyMjIyBJ\ndCB3aWxsIGF1dG9tYXRpY2FsbHkgb3BlbiBhIHdlYiBicm93c2VyLiBJZiBp\ndCBkb2Vzbid0IG9wZW4sIHBsZWFzZSBvcGVuIHlvdXIgd2ViIGJyb3dzZXIg\nYW5kIG5hdmlnYXRlIHRvIDxodHRwOi8vbG9jYWxob3N0OjMwMDQ+CgojIyBG\nZWVsIEZyZWUgdG8gQ29udHJpYnV0ZQoKV2Ugd2VsY29tZSBjb250cmlidXRp\nb25zIGZyb20gZXZlcnlvbmUhIFdoZXRoZXIgeW91J3JlIGEgZGV2ZWxvcGVy\nLCBkZXNpZ25lciwgb3IganVzdCBwYXNzaW9uYXRlIGFib3V0IHRoZSBwcm9q\nZWN0LCB0aGVyZSBhcmUgbWFueSB3YXlzIHRvIGNvbnRyaWJ1dGUuCgpJZiB5\nb3UncmUgaW50ZXJlc3RlZCBpbiBjb250cmlidXRpbmcsIHRha2UgYSBsb29r\nIGF0IG91ciBbdGFzay5tZF0odGFzay5tZCkgZmlsZSBmb3IgYSBsaXN0IG9m\nIHRhc2tzIGFuZCBtaWxlc3RvbmVzLiBGZWVsIGZyZWUgdG8gcGljayB1cCBh\nbnkgdGFzayB5b3UncmUgaW50ZXJlc3RlZCBpbiBvciBzdWdnZXN0IG5ldyBv\nbmVzIQoKKipMZXQncyBjcmVhdGUgYSBiZXR0ZXIgcGxhY2UgZm9yIGRldmVs\nb3BlcnMgdG9nZXRoZXIhKioKCiMjIyAqKkxpY2Vuc2UqKgoKVGhlIHByb2pl\nY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIFtNSVQgTGljZW5zZV0oTElDRU5T\nRSkuIFlvdSBjYW4gY2hlY2sgb3V0IHRoZSBsaWNlbnNlIGZvciBtb3JlIGRl\ndGFpbHMuCgoqKkhhcHB5IGNvbnRyaWJ1dGluZyEqKgo=\n",
            "encoding": "base64",
            "_links": {
                "self": "https://api.github.com/repos/sabeerbikba/dev.tools/contents/README.md?ref=main",
                "git": "https://api.github.com/repos/sabeerbikba/dev.tools/git/blobs/c3223f3fb307dadd6917ae0e0434599cf6251ebd",
                "html": "https://github.com/sabeerbikba/dev.tools/blob/main/README.md"
            }
        }
    },
    {
        "repoDetails": {
            "id": 778881855,
            "node_id": "R_kgDOLmzLPw",
            "name": "rickshaw",
            "full_name": "sabeerbikba/rickshaw",
            "private": false,
            "owner": {
                "login": "sabeerbikba",
                "id": 59386700,
                "node_id": "MDQ6VXNlcjU5Mzg2NzAw",
                "avatar_url": "https://avatars.githubusercontent.com/u/59386700?v=4",
                "gravatar_id": "",
                "url": "https://api.github.com/users/sabeerbikba",
                "html_url": "https://github.com/sabeerbikba",
                "followers_url": "https://api.github.com/users/sabeerbikba/followers",
                "following_url": "https://api.github.com/users/sabeerbikba/following{/other_user}",
                "gists_url": "https://api.github.com/users/sabeerbikba/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/sabeerbikba/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/sabeerbikba/subscriptions",
                "organizations_url": "https://api.github.com/users/sabeerbikba/orgs",
                "repos_url": "https://api.github.com/users/sabeerbikba/repos",
                "events_url": "https://api.github.com/users/sabeerbikba/events{/privacy}",
                "received_events_url": "https://api.github.com/users/sabeerbikba/received_events",
                "type": "User",
                "user_view_type": "public",
                "site_admin": false
            },
            "html_url": "https://github.com/sabeerbikba/rickshaw",
            "description": "Rickshaw Tours website (under development)",
            "fork": false,
            "url": "https://api.github.com/repos/sabeerbikba/rickshaw",
            "forks_url": "https://api.github.com/repos/sabeerbikba/rickshaw/forks",
            "keys_url": "https://api.github.com/repos/sabeerbikba/rickshaw/keys{/key_id}",
            "collaborators_url": "https://api.github.com/repos/sabeerbikba/rickshaw/collaborators{/collaborator}",
            "teams_url": "https://api.github.com/repos/sabeerbikba/rickshaw/teams",
            "hooks_url": "https://api.github.com/repos/sabeerbikba/rickshaw/hooks",
            "issue_events_url": "https://api.github.com/repos/sabeerbikba/rickshaw/issues/events{/number}",
            "events_url": "https://api.github.com/repos/sabeerbikba/rickshaw/events",
            "assignees_url": "https://api.github.com/repos/sabeerbikba/rickshaw/assignees{/user}",
            "branches_url": "https://api.github.com/repos/sabeerbikba/rickshaw/branches{/branch}",
            "tags_url": "https://api.github.com/repos/sabeerbikba/rickshaw/tags",
            "blobs_url": "https://api.github.com/repos/sabeerbikba/rickshaw/git/blobs{/sha}",
            "git_tags_url": "https://api.github.com/repos/sabeerbikba/rickshaw/git/tags{/sha}",
            "git_refs_url": "https://api.github.com/repos/sabeerbikba/rickshaw/git/refs{/sha}",
            "trees_url": "https://api.github.com/repos/sabeerbikba/rickshaw/git/trees{/sha}",
            "statuses_url": "https://api.github.com/repos/sabeerbikba/rickshaw/statuses/{sha}",
            "languages_url": "https://api.github.com/repos/sabeerbikba/rickshaw/languages",
            "stargazers_url": "https://api.github.com/repos/sabeerbikba/rickshaw/stargazers",
            "contributors_url": "https://api.github.com/repos/sabeerbikba/rickshaw/contributors",
            "subscribers_url": "https://api.github.com/repos/sabeerbikba/rickshaw/subscribers",
            "subscription_url": "https://api.github.com/repos/sabeerbikba/rickshaw/subscription",
            "commits_url": "https://api.github.com/repos/sabeerbikba/rickshaw/commits{/sha}",
            "git_commits_url": "https://api.github.com/repos/sabeerbikba/rickshaw/git/commits{/sha}",
            "comments_url": "https://api.github.com/repos/sabeerbikba/rickshaw/comments{/number}",
            "issue_comment_url": "https://api.github.com/repos/sabeerbikba/rickshaw/issues/comments{/number}",
            "contents_url": "https://api.github.com/repos/sabeerbikba/rickshaw/contents/{+path}",
            "compare_url": "https://api.github.com/repos/sabeerbikba/rickshaw/compare/{base}...{head}",
            "merges_url": "https://api.github.com/repos/sabeerbikba/rickshaw/merges",
            "archive_url": "https://api.github.com/repos/sabeerbikba/rickshaw/{archive_format}{/ref}",
            "downloads_url": "https://api.github.com/repos/sabeerbikba/rickshaw/downloads",
            "issues_url": "https://api.github.com/repos/sabeerbikba/rickshaw/issues{/number}",
            "pulls_url": "https://api.github.com/repos/sabeerbikba/rickshaw/pulls{/number}",
            "milestones_url": "https://api.github.com/repos/sabeerbikba/rickshaw/milestones{/number}",
            "notifications_url": "https://api.github.com/repos/sabeerbikba/rickshaw/notifications{?since,all,participating}",
            "labels_url": "https://api.github.com/repos/sabeerbikba/rickshaw/labels{/name}",
            "releases_url": "https://api.github.com/repos/sabeerbikba/rickshaw/releases{/id}",
            "deployments_url": "https://api.github.com/repos/sabeerbikba/rickshaw/deployments",
            "created_at": "2024-03-28T15:39:44Z",
            "updated_at": "2024-11-01T10:12:20Z",
            "pushed_at": "2024-11-01T10:12:16Z",
            "git_url": "git://github.com/sabeerbikba/rickshaw.git",
            "ssh_url": "git@github.com:sabeerbikba/rickshaw.git",
            "clone_url": "https://github.com/sabeerbikba/rickshaw.git",
            "svn_url": "https://github.com/sabeerbikba/rickshaw",
            "homepage": "https://rickshaw-sabeerbikba.vercel.app",
            "size": 59594,
            "stargazers_count": 4,
            "watchers_count": 4,
            "language": "TypeScript",
            "has_issues": false,
            "has_projects": false,
            "has_downloads": true,
            "has_wiki": false,
            "has_pages": false,
            "has_discussions": false,
            "forks_count": 0,
            "mirror_url": null,
            "archived": false,
            "disabled": false,
            "open_issues_count": 0,
            "license": {
                "key": "mit",
                "name": "MIT License",
                "spdx_id": "MIT",
                "url": "https://api.github.com/licenses/mit",
                "node_id": "MDc6TGljZW5zZTEz"
            },
            "allow_forking": true,
            "is_template": false,
            "web_commit_signoff_required": false,
            "topics": [],
            "visibility": "public",
            "forks": 0,
            "open_issues": 0,
            "watchers": 4,
            "default_branch": "nextjs-back-end",
            "temp_clone_token": null,
            "network_count": 0,
            "subscribers_count": 1
        },
        "languages": {
            "TypeScript": 218000,
            "CSS": 80866,
            "JavaScript": 2927
        },
        "contributors": [
            {
                "login": "sabeerbikba",
                "id": 59386700,
                "node_id": "MDQ6VXNlcjU5Mzg2NzAw",
                "avatar_url": "https://avatars.githubusercontent.com/u/59386700?v=4",
                "gravatar_id": "",
                "url": "https://api.github.com/users/sabeerbikba",
                "html_url": "https://github.com/sabeerbikba",
                "followers_url": "https://api.github.com/users/sabeerbikba/followers",
                "following_url": "https://api.github.com/users/sabeerbikba/following{/other_user}",
                "gists_url": "https://api.github.com/users/sabeerbikba/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/sabeerbikba/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/sabeerbikba/subscriptions",
                "organizations_url": "https://api.github.com/users/sabeerbikba/orgs",
                "repos_url": "https://api.github.com/users/sabeerbikba/repos",
                "events_url": "https://api.github.com/users/sabeerbikba/events{/privacy}",
                "received_events_url": "https://api.github.com/users/sabeerbikba/received_events",
                "type": "User",
                "user_view_type": "public",
                "site_admin": false,
                "contributions": 103
            }
        ],
        "license": {
            "name": "LICENSE",
            "path": "LICENSE",
            "sha": "a5ed514a02595b4291af188c0dfd3d6829b479bc",
            "size": 1069,
            "url": "https://api.github.com/repos/sabeerbikba/rickshaw/contents/LICENSE?ref=nextjs-back-end",
            "html_url": "https://github.com/sabeerbikba/rickshaw/blob/nextjs-back-end/LICENSE",
            "git_url": "https://api.github.com/repos/sabeerbikba/rickshaw/git/blobs/a5ed514a02595b4291af188c0dfd3d6829b479bc",
            "download_url": "https://raw.githubusercontent.com/sabeerbikba/rickshaw/nextjs-back-end/LICENSE",
            "type": "file",
            "content": "TUlUIExpY2Vuc2UKCkNvcHlyaWdodCAoYykgMjAyNCBzYWJlZXIgYmlrYmEK\nClBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdl\nLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkKb2YgdGhpcyBzb2Z0\nd2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUg\nIlNvZnR3YXJlIiksIHRvIGRlYWwKaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQg\ncmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhl\nIHJpZ2h0cwp0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gs\nIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsCmNvcGllcyBv\nZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9t\nIHRoZSBTb2Z0d2FyZSBpcwpmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3Qg\ndG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOgoKVGhlIGFib3ZlIGNvcHly\naWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwg\nYmUgaW5jbHVkZWQgaW4gYWxsCmNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0\naW9ucyBvZiB0aGUgU29mdHdhcmUuCgpUSEUgU09GVFdBUkUgSVMgUFJPVklE\nRUQgIkFTIElTIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQ\nUkVTUyBPUgpJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRP\nIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwKRklUTkVTUyBG\nT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4g\nSU4gTk8gRVZFTlQgU0hBTEwgVEhFCkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhP\nTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RI\nRVIKTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFD\nVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwKT1VUIE9GIE9S\nIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBP\nUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUKU09GVFdBUkUuCg==\n",
            "encoding": "base64",
            "_links": {
                "self": "https://api.github.com/repos/sabeerbikba/rickshaw/contents/LICENSE?ref=nextjs-back-end",
                "git": "https://api.github.com/repos/sabeerbikba/rickshaw/git/blobs/a5ed514a02595b4291af188c0dfd3d6829b479bc",
                "html": "https://github.com/sabeerbikba/rickshaw/blob/nextjs-back-end/LICENSE"
            }
        },
        "readme": {
            "message": "Not Found",
            "documentation_url": "https://docs.github.com/rest/repos/contents#get-repository-content",
            "status": "404"
        }
    }
]

 */