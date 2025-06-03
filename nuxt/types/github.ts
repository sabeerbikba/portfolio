import type { Endpoints } from "@octokit/types";

type GitHubRepositoryType =
  | Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"]
  | undefined;
type GitHubContributorType =
  | Endpoints["GET /repos/{owner}/{repo}/contributors"]["response"]["data"]
  | undefined;
type GitHubLanguagesType =
  | Endpoints["GET /repos/{owner}/{repo}/languages"]["response"]["data"]
  | undefined;
type GithubBranchesType =
  | Endpoints["GET /repos/{owner}/{repo}/branches"]["response"]["data"]
  | undefined;
type GithubTagsType =
  | Endpoints["GET /repos/{owner}/{repo}/tags"]["response"]["data"]
  | undefined;
type GitHubFileContentType =
  | Endpoints["GET /repos/{owner}/{repo}/contents/{path}"]["response"]["data"]
  | undefined;

type NullableGitHubFileContent = GitHubFileContentType | null;

type ProjectDataType = {
  // projectIndex: number,
  repoDetails: GitHubRepositoryType;
  languages: GitHubLanguagesType;
  contributors: GitHubContributorType;
  branches: GithubBranchesType;
  tags: GithubTagsType;
  readme: NullableGitHubFileContent;
  license: NullableGitHubFileContent;
};

type PreviewTabOption = "README" | "MIT license";

type ScreenContextType = {
  previewProject: number;
  previewApp: number;
  setScreen: (value: number, view: "project" | "app") => void;
};

export type {
  GitHubRepositoryType,
  GitHubContributorType,
  GitHubLanguagesType,
  GithubBranchesType,
  GithubTagsType,
  GitHubFileContentType,
  NullableGitHubFileContent,
  ProjectDataType,
  PreviewTabOption,
  ScreenContextType,
};
