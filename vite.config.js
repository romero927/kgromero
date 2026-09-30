import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	build: {
		// three.js (~740 kB) is its own lazy-loaded chunk, only fetched when the travel globe opens
		chunkSizeWarningLimit: 800
	}
});
