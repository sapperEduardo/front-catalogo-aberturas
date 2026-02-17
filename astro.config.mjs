import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';

export default defineConfig({
  srcDir: './src',
  outDir: './dist',
  publicDir: './public',
  base: '/',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  },
  output: 'server',
  adapter: netlify()
});
