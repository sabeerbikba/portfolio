import environment from "./environment";

const githubProfileName: string = environment.repoOwner;

type DataType = {
  // TODO: rename title to name
  title: string;
  icon: string;
};

type ProjectType = DataType & {
  repo: string;
  website: string;
  // image: string,
  about: string;
};

//  TODO: Icon better if use svg if possible because when hovering it take time to render a image or try diffrent method
const projects: ProjectType[] = [
  {
    // 1
    title: "Dev.tools",
    repo: `${githubProfileName}/dev.tools`,
    icon: "/images/Vector.png", // Also used in SEO LD+JSON TODO: rename image name
    website: "https://devtools-sabeerbikba.vercel.app/",
    // TODO: need to update
    // image: "https://example.com/thumbnails/devtools-thumbnail.png",
    about: "A collection of useful developer tools built with React.",
  },
  {
    // 2
    title: "Rickshaw",
    repo: `${githubProfileName}/rickshaw`,
    icon: "/images/location.png", // Also used in SEO LD+JSON TODO: rename image name
    website: "https://honnavarrickshawservice.vercel.app/",
    // TODO: need to update
    // image: "https://example.com/thumbnails/rickshaw-thumbnail.png",
    about:
      "An open-source project for tourist contact info, featuring a rickshaw-themed design.",
  },
];

const apps: DataType[] = [
  {
    // 3
    title: "Website",
    icon: "/images/chromium.png",
  },
  {
    // 4
    title: "About",
    icon: "/images/about.png",
  },
  {
    // 6
    title: "GitHub",
    icon: "/images/github.png",
  },
];

export { projects, apps };
export type { DataType, ProjectType };
