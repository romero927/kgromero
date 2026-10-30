// src/lib/store.js
import { writable } from "svelte/store";

// Get initial theme from localStorage or system preference
const getInitialTheme = () => {
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return "light";
};

export const theme = writable(getInitialTheme());

// Update localStorage and document class when theme changes
if (typeof window !== "undefined") {
  // Add transition class after initial load
  window.addEventListener("load", () => {
    document.documentElement.classList.add("transitioning");
  });

  theme.subscribe((value) => {
    localStorage.setItem("theme", value);
    document.documentElement.classList.toggle("dark", value === "dark");
  });

  // Listen for system theme changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      const noSavedTheme = !localStorage.getItem("theme");
      if (noSavedTheme) {
        theme.set(e.matches ? "dark" : "light");
      }
    });
}

// Phones and tablets (touch is the main input) never get the background
// animation, to save battery. Keep in sync with the check in app.html and the
// `touch` variant in app.css.
const TOUCH_DEVICE = "(hover: none) and (pointer: coarse)";

// Background animation on/off. Off by default; a visitor's choice is saved
// like the theme.
const getInitialAnimations = () => {
  if (typeof window !== "undefined") {
    if (window.matchMedia(TOUCH_DEVICE).matches) return false;
    return localStorage.getItem("animations") === "on";
  }
  return false;
};

export const animations = writable(getInitialAnimations());

if (typeof window !== "undefined") {
  let first = true;
  animations.subscribe((value) => {
    document.documentElement.classList.toggle("animations-off", !value);
    // Only save an explicit choice, not the default.
    if (first) {
      first = false;
      return;
    }
    localStorage.setItem("animations", value ? "on" : "off");
  });
}
