import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

import unocss from "unocss/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [unocss({ injectReset: true })],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [[rehypeKatex, { throwOnError: false }]],
  },
});
