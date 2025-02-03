const config = {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
  ],
  theme: {
    extend: {
      colors: {
        'neo-orange': '#FF9664',
        'neo-black': '#1A1A1A',
        'neo-cream': '#FFF5E9',
        // Add dark mode specific colors
        'dark-bg': '#1C1E21',      // Main background
        'dark-card': '#25272A',    // Card background
        'dark-hover': '#2D2F33',   // Hover states
        'dark-border': '#393B3F'   // Border colors
      },
      boxShadow: {
        'neo': '4px 4px 0 0 #1A1A1A',
        'neo-dark': '4px 4px 0 0 #FF9664'
      }
    }
  },
  plugins: [require('flowbite/plugin')],
  darkMode: 'class'
};

module.exports = config;