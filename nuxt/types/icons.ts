type LocalIconsName = {
  home: {
    headerLogoHref: string;
    logoSB: string;
    arrowRight: string;
  };
};

type NuxtIconName = `${"ic" | "mdi"}:${Lowercase<string>}`;

type OcticonsIconName =
  | "book"
  | "eye"
  | "git-branch"
  | "globe"
  | "link"
  | "law"
  | "mark-github"
  | "mark-github-24"
  | "pulse"
  | "repo-forked"
  | "star"
  | "tag";

export type { OcticonsIconName, NuxtIconName, LocalIconsName };
