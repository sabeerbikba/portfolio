// Docs: https://nuxt.com/modules/icon

import type { NuxtIconName } from "~/types/icons";

type TypeSocialMedia = {
  icon: NuxtIconName;
  href: `/${Lowercase<string>}` | `https://${Lowercase<string>}`;
  label: string;
};

const socialMedia: TypeSocialMedia[] = [
  {
    icon: "mdi:instagram",
    href: "https://www.instagram.com/uniquebeast__/",
    label: "Instagram",
  },
  {
    icon: "mdi:linkedin",
    href: "https://www.linkedin.com/in/sabeer-bikba-70a574252/",
    label: "LinkedIn",
  },
  {
    icon: "mdi:whatsapp",
    href: "https://wa.me/918618718358/",
    label: "WhatsApp",
  },
  {
    icon: "mdi:github",
    href: "https://github.com/sabeerbikba/",
    label: "GitHub",
  },
  {
    icon: "mdi:stack-overflow",
    href: "https://stackoverflow.com/users/20352034/sabeer-bikba",
    label: "Stack Overflow",
  },
  {
    icon: "mdi:twitter",
    href: "https://twitter.com/sb28187",
    label: "X (Twitter)",
  },
];

export default socialMedia;
