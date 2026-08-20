// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://promitiearepas.com',
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
});
