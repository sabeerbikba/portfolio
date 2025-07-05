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
type FileContentType =
  | Endpoints["GET /repos/{owner}/{repo}/contents/{path}"]["response"]["data"]
  | undefined;

type NullableFileContent = FileContentType | null | undefined;

type ProjectDataType = {
  repoDetails: GitHubRepositoryType;
  languages: GitHubLanguagesType;
  contributors: GitHubContributorType;
  branches: GithubBranchesType;
  tags: GithubTagsType;
  readme: NullableFileContent;
  license: NullableFileContent;
};

export type {
  GitHubRepositoryType,
  GitHubContributorType,
  GitHubLanguagesType,
  GithubBranchesType,
  GithubTagsType,
  NullableFileContent,
  ProjectDataType,
};
