// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { rehypeBlogFigures } from './src/lib/rehype-blog-figures.js';

// Served from the custom domain root (ojdh.ca) via GitHub Pages.
// No `base` path needed.
export default defineConfig({
  site: 'https://ojdh.ca',
  integrations: [sitemap()],
  markdown: {
    rehypePlugins: [rehypeBlogFigures],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
