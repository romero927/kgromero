// src/lib/store.js
import { writable } from 'svelte/store';

// Get initial theme from localStorage or system preference
const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

export const theme = writable(getInitialTheme());

// Update localStorage and document class when theme changes
if (typeof window !== 'undefined') {
  // Add transition class after initial load
  window.addEventListener('load', () => {
    document.documentElement.classList.add('transitioning');
  });

  theme.subscribe(value => {
    localStorage.setItem('theme', value);
    document.documentElement.classList.toggle('dark', value === 'dark');
  });

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const noSavedTheme = !localStorage.getItem('theme');
    if (noSavedTheme) {
      theme.set(e.matches ? 'dark' : 'light');
    }
  });
}