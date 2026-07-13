// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// ojdh.github.io is a GitHub *user* page → served from the domain root.
// No `base` path needed.
export default defineConfig({
  site: 'https://ojdh.github.io',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
