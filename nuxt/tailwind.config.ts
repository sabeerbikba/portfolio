import type { Config } from "tailwindcss";
import svgToDataUri from "mini-svg-data-uri";
// @ts-ignore
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";
import languagesColor from "./theme/languages-color";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/error/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        xs: "475px",
        // 'sm': '640px',
        // 'md': '768px',
        // 'lg': '1024px',
        // 'xl': '1280px',
        // '2xl': '1536px',
        "3xl": "1920px",
      },
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        wiggle: "wiggle 1.5s ease-in-out infinite",
        "scale-up4": "scale-up4 1s linear infinite",
        spinner: "spinner-fade 1s linear infinite",
        loader: "loader_79178 2s linear infinite",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(5px)" },
        },
        "scale-up4": {
          "20%": { transform: "scaleY(1.5)", backgroundColor: "#fff" },
          "40%": { transform: "scaleY(1)" },
        },
        "spinner-fade": {
          "0%": { backgroundColor: "#69717d" },
          "100%": { backgroundColor: "transparent" },
        },
        loader_79178: {
          "0%": {
            border: "1em solid black",
            transform: "scale(0)",
            opacity: "1",
          },
          "100%": {
            border: "0 solid gray",
            transform: "scale(1)",
            opacity: "0",
          },
        },
      },
    },
  },

  plugins: [
    ({ addComponents }: any) => {
      addComponents({
        ".center": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        ".wh-full": {
          width: "100%",
          height: "100%",
        },
      });
    },
    // ({ addBase, theme }: any) => {
    //   const allColors = flattenColorPalette(theme("colors"));
    //   const newVars = Object.fromEntries(
    //     Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
    //   );

    //   addBase({
    //     ":root": newVars,
    //   });
    // },
    ({ matchUtilities, theme }: any) => {
      matchUtilities(
        {
          "bg-dot": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
    ({ addComponents }: any) => {
      const components = Object.entries(languagesColor).map(
        ([language, color]) => {
          return {
            [`[data-language="${language}"]`]: {
              backgroundColor: color,
            },
          };
        }
      );

      addComponents(components);
    },
  ],
};

export default config;
