# ojdh.github.io

Personal portfolio, blog, and photography site for Ojaswi Dhoubhadel. Built with
[Astro](https://astro.build) and deployed to GitHub Pages.

## Stack

- **Astro 5** — static site generation, near-zero client JS
- **Tailwind CSS 4** — styling (`src/styles/global.css` holds the design tokens)
- **Content collections** — typed Markdown for the blog and projects
- **PhotoSwipe** — lightbox for the photography gallery
- **astro:assets** — automatic image optimization

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # production build → dist/
npm run preview  # preview the built site
```

## Editing content

| What | Where |
|---|---|
| Identity, tagline, social links | `src/data/site.ts` |
| Résumé content | `src/data/resume.ts` (PDF: `public/resume.pdf`) |
| About copy | `src/pages/about.astro` |
| Blog posts | `src/content/blog/*.md` |
| Projects | `src/content/projects/*.md` |
| Photos | drop images into `src/assets/photos/` |
| Colors / fonts | `src/styles/global.css` (`@theme` block) |

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site
and publishes it to GitHub Pages.

**One-time setup:** in the repo, go to **Settings → Pages → Build and deployment**
and set **Source** to **GitHub Actions**.

## License

[MIT](LICENSE).
