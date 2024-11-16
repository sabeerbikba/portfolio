import environment from "./environment";

const githubProfileName: string = environment.repoOwner;

type DataType = {
   title: string,
   icon: string,
};

type ProjectType = DataType & {
   repo: string,
   website: string,
};

const projects: ProjectType[] = [
   {
      // 1
      title: "Dev.tools",
      repo: `${githubProfileName}/dev.tools`,
      icon: "/images/Vector.png",
      website: "https://devtools-sabeerbikba.vercel.app/",
   },
   {
      // 2
      title: "Rickshaw",
      repo: `${githubProfileName}/rickshaw`,
      icon: "/images/location.png",
      website: "https://honnavarrickshawservice.vercel.app/",
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
