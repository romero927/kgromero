const config = {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
  ],
  theme: {
    extend: {
      colors: {
        'neo-orange': '#FD9745',
        'neo-black': '#1A1A1A',
        'neo-cream': '#FFF5E9',
        // Add dark mode specific colors
        'dark-bg': '#212121',      // Main background
        'dark-card': '#25272A',    // Card background
        'dark-hover': '#2D2F33',   // Hover states
        'dark-border': '#393B3F'   // Border colors
      },
      boxShadow: {
        'neo': '4px 4px 0 0 #1A1A1A',
        'neo-dark': '4px 4px 0 0 #FD9745'
      }
    }
  },
  plugins: [require('flowbite/plugin')],
  darkMode: 'class'
};

module.exports = config;