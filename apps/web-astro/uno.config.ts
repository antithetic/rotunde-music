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
    presetWind4({
      preflights: {
        reset: true,
      },
    }),
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
      provider: 'fontshare',
      fonts: {
        display: 'Space Grotesk',

        // sans: 'Roboto',
        // mono: ['Fira Code', 'Fira Mono:400,700'],
      },
    }),
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],

  theme: {
    colors: {
      primary: '#d46211', // Copper
      'background-light': '#d46211', // Overriding background to be the Copper color
      'background-dark': '#221810',
      copper: '#B85C38',
      'copper-dark': '#8E4427',
      'brut-black': '#0D0D0D',
    },
    borderRadius: {
      DEFAULT: '0.125rem',
      lg: '0.25rem',
      xl: '0.5rem',
      full: '0.75rem',
    },
    fontFamily: {
      display: ['Space Grotesk', 'sans-serif'],
      'serif-elegant': ['Georgia', 'serif'],
      'mono-raw': ['Courier New', 'monospace'],
    },
  },
})
