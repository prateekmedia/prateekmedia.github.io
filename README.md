# Prateek Sunal — Portfolio

A React portfolio with three interchangeable presentations of the same profile:

- `hacker`: an animated terminal response
- `normie`: an editorial profile
- `resume`: a compact résumé with experience, projects, talks, and highlights

## Development

```sh
npm install
npm run dev
```

Use `npm run lint` for static checks and `npm run build` for a production build.

## Deployment

Production deploys via GitHub Actions (`.github/workflows/deploy.yml`) on pushes to `main`. The workflow runs `npm run build` and publishes the `dist/` output to GitHub Pages.

After the first workflow run, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions** (replacing the legacy “Deploy from a branch” flow). Custom domain `prateek.sunal.in` is included in the build via `public/CNAME`.

Static blog posts live under `public/blog/` with shared `public/blog.js` and `public/style.css`.

## Structure

- `src/config`: app-level mode configuration
- `src/data`: shared profile and résumé content
- `src/features`: mode-specific components and styles
- `src/components`: shared interface components
- `src/styles`: global Tailwind theme and document styles
