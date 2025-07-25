interface SEOContent {
  title: string;
  description: string;
  keywords: string;
}

interface SEOMetaMapType {
  index: SEOContent;
  contact: SEOContent;
}

const name = "Sabeer Bikba";
const about = "web developer specialized in React, Vue & Nuxt.js";
// Using a static image instead of dynamic generation
// For explanation, see: `~~/docs/og-img.md`
const ogImg = "/images/og.jpg"; 

const seoMetaMap: SEOMetaMapType = {
  index: {
    title: `${name} Portfolio – ${about}`,
    description:
      "Explore my web development portfolio showcasing websites and applications I’ve built using React, Vue, and Nuxt.js. Passionate about creating high-performance, modern, and scalable digital solutions.",
    keywords:
      "web development, React, Vue, Nuxt.js, JavaScript, f  ront-end development, web developer portfolio",
  },
  contact: {
    title: `Contact – ${name} | ${about}`,
    description: `Get in touch with ${name}, a ${about}. I'm available for freelance projects, collaborations, and consultations.`,
    keywords:
      "contact, web developer, React, Vue, Nuxt.js, freelance developer, consultation, collaboration",
  },
};

export default seoMetaMap;
export { name, about, ogImg };
