import { defineConfig } from "astro/config";

import pagefind from "astro-pagefind";
import unocss from "unocss/astro";
import sitemap from "@astrojs/sitemap";

import { rehypeShiki } from "@astrojs/markdown-remark";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeMermaid from "rehype-mermaid";

// https://astro.build/config
export default defineConfig({
  site: "https://saurlax.com",
  integrations: [unocss({ injectReset: true }), pagefind(), sitemap()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      rehypeMermaid,
      rehypeShiki,
      [rehypeKatex, { throwOnError: false, strict: false }],
    ],
    syntaxHighlight: false,
  },
});
