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
        'neo-cream': '#F5F5F4',
        // Add dark mode specific colors
        'dark-bg': '#212121',      // Main background
        'dark-card': '#25272A',    // Card background
        'dark-hover': '#2D2F33',   // Hover states
        'dark-border': '#393B3F'   // Border colors
      },
      boxShadow: {
        'neo': '4px 4px 0 0 #1A1A1A',
        'neo-dark': '4px 4px 0 0 #FD9745',
        'neo-lg': '6px 6px 0 0 #1A1A1A',
        'neo-lg-dark': '6px 6px 0 0 #FD9745'
      },
      fontFamily: {
        display: ['"Space Grotesk"', '"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif']
      }
    }
  },
  plugins: [require('flowbite/plugin')],
  darkMode: 'class'
};

module.exports = config;