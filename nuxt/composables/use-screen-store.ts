import { projects } from "~/data/projects";
import response from "~/data/dev/tmp-fetch-all-response";
import type { ProjectDataType } from "~/types/github";

interface State {
  previewProject: number;
  previewApp: number;
  data: ProjectDataType[];
}

export default () => {
  const state = reactive<State>({
    previewProject: 1,
    previewApp: 3,
    data: [],
  });

  const isDataAvailable = computed(() => state.data.length !== 0);
  const previewProjectIndex = computed(() => state.previewProject - 1);
  const setScreen = (value: number, view: "project" | "app") => {
    const handlers = {
      project: (val: number) => (state.previewProject = val),
      app: (val: number) => (state.previewApp = val),
    };
    handlers[view](value);
  };

  // TODO: tmp
  // @ts-ignore
  state.data = response;

  // onMounted(async () => {
  //   const fetchPromises = projects.map((project) => {
  //     const baseUrl = `https://api.github.com/repos/${project.repo}`;
  //     return Promise.all([
  //       fetch(baseUrl).then((res) => res.json()), // repoDetails
  //       fetch(`${baseUrl}/languages`).then((res) => res.json()), // languages
  //       fetch(`${baseUrl}/contributors`).then((res) => res.json()), // contributors
  //       fetch(`${baseUrl}/branches`).then((res) => res.json()), // branches
  //       fetch(`${baseUrl}/tags`).then((res) => res.json()), // tags
  //       fetch(`${baseUrl}/contents/LICENSE`) // license
  //         .then(async (res) => {
  //           const data = await res.json();
  //           return data.message === "Not Found" ? null : data;
  //         }),
  //       fetch(`${baseUrl}/contents/README.md`) // readme
  //         .then(async (res) => {
  //           const data = await res.json();
  //           return data.message === "Not Found" ? null : data;
  //         }),
  //     ]);
  //   });

  //   try {
  //     const results = await Promise.all(fetchPromises);
  //     const formattedData: ProjectDataType[] = results.map(
  //       ([
  //         repoDetails,
  //         languages,
  //         contributors,
  //         branches,
  //         tags,
  //         license,
  //         readme,
  //       ]) => ({
  //         repoDetails,
  //         languages,
  //         contributors,
  //         branches,
  //         tags,
  //         license,
  //         readme,
  //       })
  //     );
  //     state.data = formattedData;
  //   } catch (error) {
  //     console.error("Error fetching data from GitHub API:", error);
  //   }
  // });

  return {
    state,
    isDataAvailable,
    previewProjectIndex,
    setScreen,
  };
};

// import { projects } from "~/data/projects";

// export default () => {
//   const state = reactive({
//     previewProject: 1,
//     previewApp: 3,
//     data: [],
//   });

//   const isDataAvailable = computed(() => state.data.length !== 0);
//   const previewProjectIndex = computed(() => state.previewProject - 1);

//   const setScreen = (value, view) => {
//     const handlers = {
//       project: (val) => (state.previewProject = val),
//       app: (val) => (state.previewApp = val),
//     };
//     handlers[view](value);
//   };

//   onMounted(async () => {
//     const fetchPromises = projects.map((project) => {
//       const baseUrl = `https://api.github.com/repos/${project.repo}`;
//       return Promise.all([
//         fetch(baseUrl).then((res) => res.json()), // repoDetails
//         fetch(`${baseUrl}/languages`).then((res) => res.json()), // languages
//         fetch(`${baseUrl}/contributors`).then((res) => res.json()), // contributors
//         fetch(`${baseUrl}/branches`).then((res) => res.json()), // branches
//         fetch(`${baseUrl}/tags`).then((res) => res.json()), // tags
//         fetch(`${baseUrl}/contents/LICENSE`) // license
//           .then(async (res) => {
//             const data = await res.json();
//             return data.message === "Not Found" ? null : data;
//           }),
//         fetch(`${baseUrl}/contents/README.md`) // readme
//           .then(async (res) => {
//             const data = await res.json();
//             return data.message === "Not Found" ? null : data;
//           }),
//       ]);
//     });

//     try {
//       const results = await Promise.all(fetchPromises);
//       const formattedData = results.map(
//         ([
//           repoDetails,
//           languages,
//           contributors,
//           branches,
//           tags,
//           license,
//           readme,
//         ]) => ({
//           repoDetails,
//           languages,
//           contributors,
//           branches,
//           tags,
//           license,
//           readme,
//         })
//       );
//       state.data = formattedData;
//     } catch (error) {
//       console.error("Error fetching data from GitHub API:", error);
//     }
//   });

//   return {
//     state,
//     isDataAvailable,
//     previewProjectIndex,
//     setScreen,
//   };
// };
