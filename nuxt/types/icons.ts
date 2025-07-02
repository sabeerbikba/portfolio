type LocalIconsName = {
  home: {
    headerLogoHref: string;
    logoSB: string;
    arrowRight: string;
  };
};

type NuxtIconName = `${"ic" | "mdi"}:${Lowercase<string>}`;

export type { NuxtIconName, LocalIconsName };
