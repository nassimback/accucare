# AccuCare

React and Vite client design showcase.

- Default homepage and Design 2: `/` and `/design-2/`
- Design 4: `/design-4/`
- Design selector: `/designs.html`

Homepage links are placeholders for visual review. The three colour palette options remain interactive.

## Local development

Run `npm ci`, then `npm run dev`.

## Deployment

Push to `main` to build and deploy to GitHub Pages through `.github/workflows/pages.yml`.
The deployment uses `VITE_BASE_PATH=/accucare/`; local development uses `/`.

Images are stored locally; sources for replacement client images are recorded in `public/images/client/sources.json`.
