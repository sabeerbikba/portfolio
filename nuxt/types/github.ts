import type { Endpoints } from "@octokit/types";

type GitHubRepositoryType =
  Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"];
type GitHubContributorType =
  Endpoints["GET /repos/{owner}/{repo}/contributors"]["response"]["data"];
type GitHubLanguagesType =
  Endpoints["GET /repos/{owner}/{repo}/languages"]["response"]["data"];
type GithubBranchesType =
  Endpoints["GET /repos/{owner}/{repo}/branches"]["response"]["data"];
type GithubTagsType =
  Endpoints["GET /repos/{owner}/{repo}/tags"]["response"]["data"];
type GitHubFileContentType =
  Endpoints["GET /repos/{owner}/{repo}/contents/{path}"]["response"]["data"];

type NullableGitHubFileContent = GitHubFileContentType | null;

type ProjectDataType = {
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
