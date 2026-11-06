# Source Code for https://kgromero.com

- Hosted in GitHub at: https://github.com/romero927/kgromero

- Developed using [SvelteKit](https://kit.svelte.dev/) (Svelte 5), [TailwindCSS](https://tailwindcss.com/), [Lucide](https://lucide.dev/) icons, and [three.js](https://threejs.org/) for the travel globe.

- Deployed and hosted via [Netlify](https://www.netlify.com/) (`@sveltejs/adapter-netlify`, see `netlify.toml`). Pages are prerendered; `/api/*` runs as Netlify functions.

- Requires Node 22 (`nvm use` picks it up from `.nvmrc`).

- NPM commands:
  -  `npm run dev` - start the dev server
  -  `npm run build` - production build
  -  `npm run preview` - preview the production build
  -  `npm run check` - svelte-check (types + a11y); runs before every Netlify build
  -  `npm run format` - prettier

- MCP server: `https://kgromero.com/mcp` is proxied (`src/routes/mcp/+server.js`) to the Python server at [romero927/kgromero-mcp](https://github.com/romero927/kgromero-mcp), hosted on Fly.io. It reads `/api/resume` and `/api/site.json`. Setup instructions are on `/api-docs#mcp`.

- Main page code: `src/routes/+page.svelte`; site copy lives in `src/lib/i18n.js`; supporting documents are served from `static/docs/`.

- Cover letter source: `coverletter/Kyle_Romero-Coverletter.html`. To rebuild the PDF after editing:
  ```
  google-chrome --headless=new --no-pdf-header-footer --print-to-pdf=static/Kyle_Romero-Coverletter.pdf coverletter/Kyle_Romero-Coverletter.html
  ```

- Resume source: `resume/Kyle_Romero-Resume.html` (fonts are bundled in `resume/`). To rebuild the PDF after editing (must stay one page):
  ```
  google-chrome --headless=new --no-pdf-header-footer --print-to-pdf=static/Kyle_Romero-Resume.pdf resume/Kyle_Romero-Resume.html
  ```
  Then rebuild the Word version from the same HTML, so it matches the PDF (needs ImageMagick for the contact icons):
  ```
  python3 resume/build_docx.py
  ```
  Also keep `static/kgromero.md` and `static/kgromero.json` in sync.

## Built by:
- Kyle Romero
- Jersey City, NJ 07311
- 281-857-9006
- kgromero@gmail.com

