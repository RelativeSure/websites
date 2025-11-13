import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  site: "https://rasmusj.dk",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    starlight({
      title: "Rasmus Brøgger Jørgensen",
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 },
      lastUpdated: true,
      logo: {
        src: "./src/assets/favicon.svg",
      },
      editLink: {
        baseUrl: "https://github.com/RelativeSure/websites/edit/master/starlight/",
      },
      components: {
        ThemeSelect: "./src/components/starlight/ThemeSelect.astro",
      },
      expressiveCode: {
        themes: ["material-theme-ocean", "material-theme-lighter"],
      },
      pagefind: {
        ranking: {
          pageLength: 0.5,
          termFrequency: 0.8,
        },
      },
      customCss: [
        // Path to your Tailwind base styles:
        // "./src/tailwind.css",
        // Relative path to your custom CSS file
        "./src/styles/global.css",
      ],
      social: [
        { icon: "github", label: "GitHub", href: "https://github.com/RelativeSure" },
        { icon: "mastodon", label: "Mastodon", href: "https://infosec.exchange/@relativesure" },
        { icon: "x.com", label: "X", href: "https://x.com/RelativeSure" },
        { icon: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/rasmusbroeggerjoergensen/" },
      ],
      sidebar: [
        {
          label: "Bookmarks",
          collapsed: true,
          autogenerate: {
            directory: "bookmarks",
          },
        },
        {
          label: "Good Stuff",
          autogenerate: {
            directory: "goodstuff",
          },
        },
        {
          label: "Linux",
          autogenerate: {
            directory: "linux",
          },
        },
        {
          label: "Projects",
          autogenerate: {
            directory: "projects",
          },
        },
        {
          label: "Website",
          autogenerate: {
            directory: "website",
          },
        },
        {
          label: "Windows",
          autogenerate: {
            directory: "windows",
          },
        },
      ],
    }),
    mdx(),
    react(),
    robotsTxt(),
  ],
});
