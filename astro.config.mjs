// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { rehypeBlogFigures } from './src/lib/rehype-blog-figures.js';

// ojdh.github.io is a GitHub *user* page → served from the domain root.
// No `base` path needed.
export default defineConfig({
  site: 'https://ojdh.github.io',
  integrations: [sitemap()],
  markdown: {
    rehypePlugins: [rehypeBlogFigures],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
