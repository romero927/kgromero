import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    // Pages are prerendered to static HTML; the /api endpoints run as Netlify functions
    // so they can send CORS headers.
    adapter: adapter(),
    prerender: {
      entries: ['*']
    }
  }
};

export default config;
