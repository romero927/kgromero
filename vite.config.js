import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		// three.js (~740 kB) is its own lazy-loaded chunk, only fetched when the travel globe opens
		chunkSizeWarningLimit: 800
	}
});
