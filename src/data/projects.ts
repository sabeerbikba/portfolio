import environment from "./environment";

const githubProfileName: string = environment.repoOwner;

type DataType = {
   // TODO: rename title to name
   title: string,
   icon: string,
};

type ProjectType = DataType & {
   repo: string,
   website: string,
   image: string,
   about: string,
};

const projects: ProjectType[] = [
   {
      // 1
      title: "Dev.tools",
      repo: `${githubProfileName}/dev.tools`,
      icon: "/images/Vector.png",
      website: "https://devtools-sabeerbikba.vercel.app/",
      // TODO: need to update
      image: "https://example.com/thumbnails/devtools-thumbnail.png",
      about: "A developer productivity tool for generating boilerplate code and simplifying workflows.",
   },
   {
      // 2
      title: "Rickshaw",
      repo: `${githubProfileName}/rickshaw`,
      icon: "/images/location.png",
      website: "https://honnavarrickshawservice.vercel.app/",
      // TODO: need to update
      image: "https://example.com/thumbnails/rickshaw-thumbnail.png",
      about: "A booking platform for rickshaw services in Honnavar, providing an easy and intuitive user experience.",
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
