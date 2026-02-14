// @ts-check
import { defineConfig } from 'astro/config';

import vercel from '@astrojs/vercel';

import UnoCSS from 'unocss/astro'


// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  output: 'static',
  integrations: [
    UnoCSS({
      // injectReset: true // or a path to the reset file
    }),
  ],
  vite: {
    // @ts-ignore
    plugins: [],
  },
});