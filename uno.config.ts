import { defineConfig, presetIcons, presetTypography, presetUno } from "unocss";

export default defineConfig({
  presets: [presetUno(), presetTypography(), presetIcons()],
  preflights: [{ getCSS: () => '[class^="i-"] { display: inline-block; }' }],
});
