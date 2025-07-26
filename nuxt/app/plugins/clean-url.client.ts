export default defineNuxtPlugin(() => {
  const router = useRouter();

  router.beforeEach((to, _, next) => {
    const isHome = to.fullPath === "/";
    const hasTrailingSlash = to.fullPath.endsWith("/") && to.fullPath !== "/";

    if (!isHome && hasTrailingSlash) {
      const cleanedPath = to.fullPath.replace(/\/+$/, "");

      return next({
        path: cleanedPath,
        query: to.query,
        hash: to.hash,
      });
    }

    next();
  });
});
