import { defineConfig } from "astro/config";

import pagefind from "astro-pagefind";
import unocss from "unocss/astro";
import sitemap from "@astrojs/sitemap";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// https://astro.build/config
export default defineConfig({
  site: "https://saurlax.com",
  integrations: [unocss({ injectReset: true }), pagefind(), sitemap()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [[rehypeKatex, { throwOnError: false, strict: false }]],
  },
});
