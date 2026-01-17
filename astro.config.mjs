// @ts-check
import sitemap from 'astro-sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://spellbeeme.com',
  integrations: [sitemap()],
  // Optimize for SEO and performance
  output: 'static',
});
