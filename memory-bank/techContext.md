# Technical Context: Kyle Romero's Personal Website

## Core Technologies

### Frontend Framework
- **Svelte 5**: Modern, reactive component-based framework
- **SvelteKit 2**: Full-stack framework built on Svelte for routing, server-side rendering, and more

### Styling
- **Tailwind CSS 3**: Utility-first CSS framework
- **PostCSS 8**: Tool for transforming CSS with JavaScript plugins
- **Autoprefixer**: PostCSS plugin to parse CSS and add vendor prefixes
- **Flowbite/Flowbite-Svelte**: UI component library built on top of Tailwind CSS

### Build Tools
- **Vite 5**: Next-generation frontend build tool
- **Node.js**: JavaScript runtime for development environment

### UI Components and Icons
- **FontAwesome**: Icon library (free-brands-icons, free-solid-icons)
- **Svelte-FontAwesome**: Svelte component for FontAwesome icons
- **Flowbite-Svelte-Icons**: Icon components for Flowbite-Svelte
- **Lucide-Svelte**: Another icon library for Svelte

### 3D Visualization
- **Three.js**: JavaScript 3D library (likely used for the TravelGlobe component)

## Development Environment

### Setup Requirements
- Node.js and npm/yarn for package management
- Git for version control
- Modern web browser for testing

### Development Workflow
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Structure
- `/src`: Source code
  - `/lib`: Shared libraries and components
    - `/components`: Svelte components
    - `/assets`: Static assets
  - `/routes`: SvelteKit routes
- `/static`: Static files served directly
- Configuration files in root directory

## Dependencies

### Production Dependencies
```json
{
  "@fortawesome/free-brands-svg-icons": "^6.7.2",
  "@fortawesome/free-solid-svg-icons": "^6.7.2",
  "@fortawesome/svelte-fontawesome": "^0.2.3",
  "flowbite": "^2.5.2",
  "flowbite-svelte": "^0.46.23",
  "flowbite-svelte-icons": "^1.6.2",
  "kgromero": "file:",
  "lucide-svelte": "^0.436.0",
  "svelte-fa": "^4.0.3",
  "tailwindcss": "^3.4.17",
  "three": "^0.168.0"
}
```

### Development Dependencies
```json
{
  "@sveltejs/adapter-auto": "^3.3.1",
  "@sveltejs/kit": "^2.15.3",
  "@sveltejs/vite-plugin-svelte": "^4.0.4",
  "autoprefixer": "^10.4.20",
  "postcss": "^8.5.1",
  "svelte": "^5.18.0",
  "vite": "^5.4.11"
}
```

## Technical Constraints

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design for mobile and desktop

### Performance Considerations
- Static site generation for optimal loading speed
- Image optimization for assets
- Efficient component rendering

### Deployment
- Likely deployed as a static site
- Potential hosting platforms: Vercel, Netlify, GitHub Pages, or similar

## Integration Points
- Resume files in various formats (PDF, Markdown, etc.)
- Potential social media links and integrations
- Contact form or email integration

## Technical Debt and Future Considerations
- Keep dependencies updated to latest stable versions
- Monitor Svelte 5 updates and breaking changes
- Consider adding testing framework
- Evaluate performance optimizations for 3D components
