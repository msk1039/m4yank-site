// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import mdx from "@astrojs/mdx";
import icon from "astro-icon";

import sitemap, { ChangeFreqEnum } from "@astrojs/sitemap";

import { getSitePage } from "./src/lib/seo";

const changefreqMap = {
  weekly: ChangeFreqEnum.WEEKLY,
  monthly: ChangeFreqEnum.MONTHLY,
};

// https://astro.build/config
export default defineConfig({
  site: "https://m4yank.com",

  build: {
    // Inline all stylesheets so the critical CSS isn't a render-blocking request.
    inlineStylesheets: "always",
  },

  image: {
    // Generate srcset/sizes for every <Image> and Markdown image. Styling stays
    // with Tailwind (responsiveStyles left off so Astro's styles don't override
    // Tailwind's cascade-layer classes).
    layout: "constrained",
    domains: ["cdn.m4yank.com"],
  },

  redirects: {
    "/resume": "https://cdn.m4yank.com/cv.pdf",
  },

  vite: {
    plugins: [tailwindcss()],
  },

  fonts: [
    {
      provider: fontProviders.local(),
      name: "Inter",
      cssVariable: "--font-inter",
      options: {
        variants: [
          {
            weight: "100 900",
            style: "normal",
            src: ["./src/assets/fonts/InterVariable.subset.woff2"],
            featureSettings: '"cv02", "cv03", "cv04", "cv11", "ss01"',
          },
          {
            weight: "100 900",
            style: "italic",
            src: ["./src/assets/fonts/InterVariable-Italic.subset.woff2"],
            featureSettings: '"cv02", "cv03", "cv04", "cv11", "ss01"',
          },
        ],
      },
    },
    {
      provider: fontProviders.google(),
      name: "Google Sans Code",
      cssVariable: "--font-google-sans-code",
      weights: ["300 800"],
      styles: ["normal", "italic"],
    },
    {
      provider: fontProviders.google(),
      name: "Libre Baskerville",
      cssVariable: "--font-libre-baskerville",
      weights: [400, 700],
      styles: ["normal", "italic"],
    },
  ],

  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "vesper",
      },
      wrap: false,
    },
  },

  integrations: [
    icon(),
    mdx(),
    sitemap({
      serialize(item) {
        const page = getSitePage(new URL(item.url).pathname);
        if (page) {
          item.changefreq = changefreqMap[page.changefreq];
          item.priority = page.priority;
        }
        return item;
      },
      namespaces: {
        news: false,
        video: false,
      },
    }),
  ],
});
