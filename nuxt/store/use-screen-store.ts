import { projects } from "~/data/projects";
import response from "~/data/dev/tmp-fetch-all-response";
import type { ProjectDataType } from "~/types/github";
// import defineStore from '@pinia/nuxt';
import { defineStore } from "pinia";
/**
Creates a useStore function that retrieves the store instance

@param id — id of the store (must be unique)

@param storeSetup — function that defines the store

@param options — extra options


Creates a useStore function that retrieves the store instance

@param id — id of the store (must be unique)

@param storeSetup — function that defines the store

@param options — extra options
*/

// interface State {
//   previewProject: number;
//   previewApp: number;
//   // data: ProjectDataType[];
// }

export default defineStore("screen", () => {
  //  const state = reactive<State>({
  //    previewProject: 1,
  //    previewApp: 3,
  //    // data: [],
  //  });

  const previewProject = ref(1);
  const previewApp = ref(3);

  const data: Ref<ProjectDataType[]> = ref([]);

  // const isDataAvailable = computed(() => state.data.length !== 0);
  const isDataAvailable = computed(() => data.value.length !== 0);
  // const previewProjectIndex = computed(() => state.previewProject - 1);
  const previewProjectIndex = useState(
    "previewProjectIndex",
    //     () => state.previewProject - 1
    () => previewProject.value - 1
  );
  const setScreen = (value: number, view: "project" | "app") => {
    const handlers = {
      project: (val: number) => {
        // state.previewProject = val;
        previewProject.value = val;
        previewProjectIndex.value = val - 1;
      },
      // app: (val: number) => (state.previewApp = val),
      app: (val: number) => (previewApp.value = val),
    };
    handlers[view](value);
  };

  // console.log("previewProjectIndex.value", previewProjectIndex.value);

  // TODO: tmp
  // @ts-ignore
  data.value = response;

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
  // // data.value = response;
  //   } catch (error) {
  //     console.error("Error fetching data from GitHub API:", error);
  //   }
  // });

  return {
    //     state,
    previewProject,
    previewApp,

    isDataAvailable,
    // previewProjectIndex,
    setScreen,
    data,
  };
});

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
