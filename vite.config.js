import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	assetsInclude: ['**/*.docx','**/*.txt','**/*.png','**/*.webm','**/*.md','**/*.jpeg', '**/*.pdf']
});
