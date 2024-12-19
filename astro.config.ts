import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import pagefind from "astro-pagefind";
import unocss from "unocss/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [unocss({ injectReset: true }), pagefind()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [[rehypeKatex, { throwOnError: false, strict: false }]],
  },
});
