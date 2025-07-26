export default () => {
  const route = useRoute();
  const { baseUrl } = useRuntimeConfig().public;

  const normalize = (url: string) => {
    if (url === "/") return url;

    return url.replace(/#.*$/, "").replace(/\/+$/, "");
  };

  const canonical = computed(
    () => normalize(baseUrl) + normalize(route.fullPath)
  );

  return canonical;
};
