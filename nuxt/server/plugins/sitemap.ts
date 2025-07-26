export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("sitemap:resolved-urls", async (ctx) => {
    ctx.urls = ctx.urls.map((url) => {
      // Remove trailing slash from URL
      if (url.loc && url.loc !== "/" && url.loc.endsWith("/")) {
        url.loc = url.loc.slice(0, -1);
      }
      console.log(url);
      return url;
    });
  });
});
