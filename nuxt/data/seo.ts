interface SEOContent {
  title: string;
  description: string;
  keywords: string;
  // canonical: string;
}

interface SEOMetaMapType {
  index: SEOContent;
  contact: SEOContent;
}

// const { baseUrl } = useRuntimeConfig().public;

const seoMetaMap: SEOMetaMapType = {
  index: {
    title:
      "Sabeer Bikba Portfolio – Web Developer Specialized in React, Vue & Nuxt.js",
    description:
      "Explore my web development portfolio showcasing websites and applications I’ve built using React, Vue, and Nuxt.js. Passionate about creating high-performance, modern, and scalable digital solutions.",
    keywords:
      "web development, React, Vue, Nuxt.js, JavaScript, front-end development, web developer portfolio",
    // canonical: baseUrl,
  },
  contact: {
    title:
      "Contact – Sabeer Bikba | Web Developer Specialized in React, Vue & Nuxt.js",
    description:
      "Get in touch with Sabeer Bikba, a web developer specialized in React, Vue, and Nuxt.js. I'm available for freelance projects, collaborations, and consultations.",
    keywords:
      "contact, web developer, React, Vue, Nuxt.js, freelance developer, consultation, collaboration",
    // canonical: baseUrl + "/contact",
  },
};

export default seoMetaMap;
