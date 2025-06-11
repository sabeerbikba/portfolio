// TODO: button.ts or projects.ts which one
const githubProfileName: string = "sabeerbikba";

type DataType = {
  // TODO: rename title to name or project
  title: string;
  icon: string;
};

type ProjectType = DataType & {
  repo: string;
  website: string;
  about: string;
};

//  TODO: Icon better if use svg if possible because when hovering it take time to render a image or try diffrent method
const projects: ProjectType[] = [
  {
    // 1
    title: "Dev.tools",
    repo: `${githubProfileName}/dev.tools`,
    icon: "/images/project-dev-tools-icon.webp",
    website: "https://devtools-sabeerbikba.vercel.app/",
    about: "A collection of useful developer tools built with React.",
  },
  {
    // 2
    title: "Rickshaw",
    repo: `${githubProfileName}/rickshaw`,
    icon: "/images/project-rickshaw-icon.webp",
    website: "https://honnavarrickshawservice.vercel.app/",
    about:
      "An open-source project for tourist contact info, featuring a rickshaw-themed design.",
  },
];

const apps: DataType[] = [
  {
    // 3
    title: "Website",
    icon: "/images/app-website-icon.webp",
  },
  {
    // 4
    title: "About",
    icon: "/images/app-about-icon.webp",
  },
  {
    // 6
    title: "Github",
    icon: "/images/app-github-icon.webp",
  },
];

export { projects, apps };
export type { DataType, ProjectType };
