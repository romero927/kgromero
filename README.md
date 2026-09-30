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

- Main page code: `src/routes/+page.svelte`; site copy lives in `src/lib/i18n.js`; supporting documents are served from `static/docs/`.

## Built by:
- Kyle Romero
- Jersey City, NJ 07311
- 281-857-9006
- kgromero@gmail.com

