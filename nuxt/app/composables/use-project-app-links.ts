/**
_______________________________________________________________________________________________________
|                               |       project buttons        |        apps buttons                  |
|               X               |------------------------------|--------------------------------------|
|                               | dev-tools (0) | rickshaw (1) | website (a) | about (b) | github (c) | 
|-------------------------------|---------------|--------------|-------------|-----------|------------|
|     when this btn opened      | ✅            |              | ✅          |           |            |
| then click btn open this link | null          | 1            | null        | b         | c          |
|-------------------------------|---------------|--------------|-------------|-----------|------------|
|      when this btn opened     | ✅            |              |             | ✅        |            |
| then click btn open this link | b             | 1 b          | null        | b         | c          |
|-------------------------------|---------------|--------------|-------------|-----------|------------|
|      when this btn opened     | ✅            |              |             |           | ✅         |
| then click btn open this link | c             | 1 c          | null        | b         | c          |
|-------------------------------|---------------|--------------|-------------|-----------|------------|
|      when this btn opened     |               | ✅           | ✅          |           |            |
| then click btn open this link | null          | 1            | 1           | 1 b       | 1 c        |
|-------------------------------|---------------|--------------|-------------|-----------|------------|
|      when this btn opened     |               | ✅           |             | ✅        |            |
| then click btn open this link | b             | 1 b          | 1 a         | 1 b       | 1 c        |
|-------------------------------|---------------|--------------|-------------|-----------|------------|
|      when this btn opened     |               | ✅           |             |           | ✅         |
| then click btn open this link | c             | 1c           | 1 a         | 1 b       | 1 c        |
|------------------------------------------------------------------------------------------------------

✅   =  this btn selected or opened
null =  /
null = 0 a

  ┌───────────────┬─────────────┬─────────────┬────────────────────────────────────────┐
  │ projectIndex  │ appIndex    │ state       │ Output URL                             │
  ├───────────────┼─────────────┼─────────────┼────────────────────────────────────────┤
  │ 0             │ 0           │ default      │ /                                     │
  │ 0             │ 1           │ app selected │ /?app=about                           │
  │ 1             │ 0           │ project sel. │ /?project=rickshaw                    │
  │ 1             │ 2           │ both sel.    │ /?project=rickshaw&app=github         │
  │ -             │ -           │ fallback     │ returns "/" if both default indexes   │
  └───────────────┴─────────────┴─────────────┴────────────────────────────────────────┘
 
 - This utility dynamically builds the route path string for a given project/app index.
 - It avoids unnecessary query params when defaults are selected (project 0, app 0).
 - Used for NuxtLink :to="..." props to ensure clean & shareable URLs.

 */
// import { iconsName } from "~/content/projects";

// export default (store: { state: any }) => {
//   const getLinkForProject = (projectIndex: number) => {
//     const isDefaultProject = projectIndex === 0;
//     const currentAppIndex = store.state.previewApp;
//     const isDefaultApp = currentAppIndex === 0;

//     if (isDefaultProject && isDefaultApp) return "/";

//     const projectSlug = useSlugify(iconsName.projects[projectIndex]!);
//     const appSlug =
//       currentAppIndex >= 0
//         ? useSlugify(iconsName.apps[currentAppIndex]!)
//         : null;

//     const query = new URLSearchParams();
//     if (!isDefaultProject) query.set("project", projectSlug);
//     if (!isDefaultApp && appSlug) query.set("app", appSlug);

//     const path = query.toString();
//     return path ? `/?${path}` : "/";
//   };

//   const getLinkForApp = (appIndex: number) => {
//     const isDefaultApp = appIndex === 0;
//     const currentProjectIndex = store.state.previewProject;
//     const isDefaultProject = currentProjectIndex === 0;

//     if (isDefaultApp && isDefaultProject) return "/";

//     const appSlug = useSlugify(iconsName.apps[appIndex]!);
//     const projectSlug =
//       currentProjectIndex >= 0
//         ? useSlugify(iconsName.projects[currentProjectIndex]!)
//         : null;

//     const query = new URLSearchParams();
//     if (!isDefaultProject && projectSlug) query.set("project", projectSlug);
//     if (!isDefaultApp && appSlug) query.set("app", appSlug);

//     const path = query.toString();
//     return path ? `/?${path}` : "/";
//   };

//   return {
//     getLinkForProject,
//     getLinkForApp,
//   };
// };

import { iconsName } from "~/content/projects";
import type { ScreenStoreStateType } from "~~/types/store";

export default (store: { state: ScreenStoreStateType }) => {
  const buildLink = (projectIndex: number, appIndex: number) => {
    const isDefaultProject = projectIndex === 0;
    const isDefaultApp = appIndex === 0;

    if (isDefaultProject && isDefaultApp) return "/";

    const query = new URLSearchParams();
    if (!isDefaultProject) {
      const projectSlug = useSlugify(iconsName.projects[projectIndex]!);
      query.set("project", projectSlug);
    }
    if (!isDefaultApp) {
      const appSlug = useSlugify(iconsName.apps[appIndex]!);
      query.set("app", appSlug);
    }

    const path = query.toString();
    return path ? `/?${path}` : "/";
  };

  const getLinkForProject = (projectIndex: number) => {
    const currentAppIndex = store.state.previewApp;
    return buildLink(projectIndex, currentAppIndex);
  };

  const getLinkForApp = (appIndex: number) => {
    const currentProjectIndex = store.state.previewProject;
    return buildLink(currentProjectIndex, appIndex);
  };

  return {
    getLinkForProject,
    getLinkForApp,
  };
};
