# System Patterns: Kyle Romero's Personal Website

## Architecture Overview
This project follows a component-based architecture using Svelte as the frontend framework. The application is structured around reusable UI components that compose together to create the complete user experience.

## Key Technical Decisions

### Svelte Framework
- **Component-Based Structure**: Leverages Svelte's component system for modular UI development
- **Reactive State Management**: Uses Svelte's built-in reactivity for managing application state
- **File-Based Routing**: Utilizes SvelteKit's file-based routing system for page navigation

### Styling Approach
- **Utility-First CSS**: Uses Tailwind CSS for styling components
- **PostCSS Processing**: Employs PostCSS for CSS transformations and optimizations
- **Responsive Design**: Implements responsive design patterns for various device sizes

### Build and Deployment
- **Vite Build System**: Uses Vite for fast development and optimized production builds
- **Static Site Generation**: Likely generates static HTML for optimal performance and SEO

## Design Patterns

### Component Patterns
- **Atomic Design**: Components appear to follow atomic design principles:
  - Small, focused components (TerminalButton, ThemeToggle)
  - Composite components (NavBar, Timeline)
  - Page-level components (routes)
- **Container/Presentation Pattern**: Separation between data management and presentation

### State Management
- **Store Pattern**: Uses Svelte stores (src/lib/store.js) for application-wide state management
- **Props Down, Events Up**: Standard component communication pattern in Svelte

### UI Patterns
- **Responsive Layout**: Adapts to different screen sizes
- **Theme Switching**: Supports light/dark mode via ThemeToggle component
- **Modal Pattern**: Uses modal components for certain content (ResumeShellModal)

## Component Relationships

### Core Components
- **NavBar**: Main navigation component
- **AboutMe**: Personal information section
- **Experience**: Professional experience timeline
- **Skills**: Technical skills showcase
- **ContactInfo**: Contact information display
- **Other**: Additional personal information
- **Timeline**: Reusable timeline component for displaying chronological information
- **TravelGlobe**: Interactive globe component for displaying travel information
- **ThemeToggle**: UI control for switching between light/dark themes
- **TerminalButton**: Styled button component with terminal aesthetic
- **ResumeShellWrapper/Modal**: Components for displaying resume in a terminal-like interface

### Page Structure
- **+layout.svelte**: Main layout wrapper that includes common elements across pages
- **+page.svelte**: Main page content

## Data Flow
1. Initial state loaded from store.js
2. User interactions trigger state updates
3. Components reactively update based on state changes
4. Navigation handled through SvelteKit routing

## Technical Debt and Considerations
- Monitor component complexity as the site grows
- Consider performance optimizations for image assets
- Maintain accessibility standards across all components
