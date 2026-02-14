import {
  defineConfig,
  presetWind4,
  presetIcons,
  presetAttributify,
  presetTypography,
  presetWebFonts,
  transformerVariantGroup,
  transformerDirectives,
} from 'unocss'

export default defineConfig({
  // ...UnoCSS options

  presets: [
    presetWind4(),
    presetIcons({
      /* options */
    }),
    presetAttributify({
      /* options */
    }),
    presetTypography({
      /* options */
    }),
    presetWebFonts({
      /* options */
    }),
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],
})
