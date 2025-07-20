// export default () => {
//   const { baseUrl } = useRuntimeConfig().public;
//   const route = useRoute();
//   const trimSlash = (str: string) => str.replace(/\/+$/, "");
//   const url = computed(() => trimSlash(baseUrl) + trimSlash(route.fullPath));
//   return url;
// };

export default () => {
  const route = useRoute();
  const { baseUrl } = useRuntimeConfig().public;

  const normalize = (url: string) =>
    url
      .replace(/#.*$/, "") // remove hash
      .replace(/\/+$/, ""); // remove trailing slash(es)

  const canonical = computed(
    () => normalize(baseUrl) + normalize(route.fullPath)
  );

  return canonical;
};
