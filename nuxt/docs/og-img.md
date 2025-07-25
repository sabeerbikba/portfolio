# `og.png` – Static OG Image Strategy for Nuxt

In this project, I **intentionally avoided dynamic OG image generation per route**, even though Nuxt fully supports it. Instead, I’m using a **single, static OG image** (`og.png`) for consistent previews and zero build-time overhead.

---

## 🧠 Why?

Even after trying:

```ts
defineOgImageComponent("Custom"); // in app.vue
```

Nuxt was still generating **multiple images per route**, like:

```
__og-image__/
└── static/
    ├── contact/
    │   └── og.png
    └── og.png
```

This cluttered the output with redundant files and created caching issues — not worth it for a simple portfolio site.

---

## ✅ The Solution

Just point all SEO meta tags to a **single OG image**:

```ts
useSeoMeta({
  ogImage: ogImg,
  twitterImage: ogImg,
});
```

---

## 🛠 How to Generate the OG Image

1. Uncomment the line in `./app/app.vue`:

   ```ts
   defineOgImageComponent("Custom");
   ```

2. Run the build:

   ```bash
   pnpm generate
   ```

   Output image will be available at:
   `./dist/__og-image__/static/og.png`

3. (Optional) **Convert PNG to JPG** for better compression:
   [freeconvert.com/png-to-jpg](https://www.freeconvert.com/png-to-jpg)

4. **Compress the final image** to shrink file size:
   [compressor.io](https://compressor.io/)

---

## 📚 Docs & References

- [nuxt-og-image docs (github)](https://github.com/harlan-zw/nuxt-og-image)
- [Nuxt SEO Meta](https://nuxt.com/docs/getting-started/seo-meta)
- [OG Image Generator (Nuxt SEO)](https://nuxtseo.com/docs/og-image/getting-started/introduction)
- [Code Example](https://stackblitz.com/edit/nuxt-starter-pxs3wk?file=pages%2Findex.vue)
