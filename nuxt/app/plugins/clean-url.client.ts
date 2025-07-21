export default defineNuxtPlugin(() => {
  const router = useRouter();

  router.beforeEach((to, from, next) => {
    if (to.fullPath !== "/" && to.fullPath.endsWith("/")) {
      const cleanedPath = to.fullPath.replace(/\/+$/, "");
      return next({ path: cleanedPath, query: to.query, hash: to.hash });
    }

    next();
  });
});   
