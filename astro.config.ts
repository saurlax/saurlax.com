import { defineConfig } from "astro/config";
import { rehypeShiki } from "@astrojs/markdown-remark";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import rehypeMermaid from "rehype-mermaid";
import pagefind from "astro-pagefind";
import unocss from "unocss/astro";
import sitemap from "@astrojs/sitemap";

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
