// TODO: need to add social-media links

type QuickLinkType = {
  label: string;
  href: string;
};

type ProjectLinkType = {
  website: string;
  name: string;
  icon?: string;
  description?: string;
};

type RepositoryOverviewTabType = "README" | "MIT License";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

// type GithubNavBtnsType = "project" | "app";

export type {
  QuickLinkType,
  ProjectLinkType,
  RepositoryOverviewTabType,
  HeadingLevel,
};
