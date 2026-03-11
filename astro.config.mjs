// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://rezvanjoshaghani.github.io',
  output: 'static',
  integrations: [sitemap()],
});
