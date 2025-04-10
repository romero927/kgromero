import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	assetsInclude: ['**/*.docx','**/*.txt','**/*.png','**/*.webm', '**/*.webp','**/*.md','**/*.jpeg', '**/*.pdf']
});
