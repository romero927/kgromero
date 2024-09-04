import { writable } from 'svelte/store';

export const appState = writable({
  // Add any global state here
  // For example:
  // darkMode: false,
  // currentSection: 'about',
});