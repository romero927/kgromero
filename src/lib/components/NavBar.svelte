<script>
  import { Code2 } from '@lucide/svelte';
  import ResumeShellWrapper from './ResumeShellWrapper.svelte';
  import ThemeToggle from './ThemeToggle.svelte';
  
  import logo from "$lib/assets/logo.webp";

  // Shared by the desktop dropdown and the mobile menu
  const docSections = [
    { key: 'raymour', label: 'Raymour & Flanigan', items: [
      { href: '/docs/OrgStructure.png', name: 'Matrix Organization Structure' },
      { href: '/docs/SDLC-Items-Flows.png', name: 'SDLC Item Flows' },
      { href: '/docs/Release-Process.png', name: 'Release Process' }
    ]},
    { key: 'mears', label: 'MEARS Group', items: [
      { href: '/docs/Development-Path.pdf', name: 'Developer Progression' },
      { href: '/docs/IT-Landscape.png', name: 'IT Landscape' },
      { href: '/docs/Development-Process.png', name: 'Development Process' },
      { href: '/docs/Electron-Architecture.png', name: 'Electron Architecture' }
    ]},
    { key: 'worldwide', label: 'Worldwide Machinery', items: [
      { href: '/docs/Workflow.pdf', name: 'Team Workflow' },
      { href: '/docs/WWMMobile.png', name: 'Mobile Architecture' },
      { href: '/docs/WWMLandscape.png', name: 'App Landscape' }
    ]},
    { key: 'hp', label: 'HP', items: [
      { href: '/docs/SIOverview.pdf', name: 'Sudden Impact Overview' },
      { href: '/docs/SIAL.png', name: 'Sudden Impact Architecture' },
      { href: '/docs/CSM.pdf', name: 'Certified Scrum Master Certificate' }
    ]},
    { key: 'xfab', label: 'X-Fab', items: [
      { href: '/docs/Internship.pdf', name: 'Internship Projects Overview' },
      { href: '/docs/PlasmaTraceSystem.pdf', name: 'Plasma Trace' },
      { href: '/docs/ChemicalTracking.pdf', name: 'Chemical Tracking' },
      { href: '/docs/MaskToolingManual.pdf', name: 'Mask Tooling Manual' },
      { href: '/docs/DeviceMTM.pdf', name: 'Device MTM' },
      { href: '/docs/MiscProjects.pdf', name: 'Misc. Projects' },
      { href: '/docs/OtherInformationAboutMe.pdf', name: 'Other Information' }
    ]},
    { key: 'texastech', label: 'Texas Tech', items: [
      { href: '/docs/Lab1Project1.pdf', name: 'Lab 1 Project 1 PPT' },
      { href: '/docs/Lab1Project2Presentation.pdf', name: 'Lab 1 Project 2 PPT' },
      { href: '/docs/Lab1Project2.pdf', name: 'Lab 1 Project 2 DOC' },
      { href: '/docs/Lab2TrialVideo.webm', name: 'Lab 1 Project 2 Trial Video' },
      { href: '/docs/Lab2FinalPresentation.pdf', name: 'Lab 2 PPT' },
      { href: '/docs/Lab2FinalReport.pdf', name: 'Lab 2 DOC' },
      { href: '/docs/Lab3FinalPresentation.pdf', name: 'Lab 3 PPT' },
      { href: '/docs/Lab3FinalReport.pdf', name: 'Lab 3 DOC' },
      { href: '/docs/ProjectLabVFinalReport.pdf', name: 'Lab 4/5 DOC' },
      { href: '/docs/MicroprocessorArchitectureFinalProject.pdf', name: 'Microprocessor Architecture Final Project' },
      { href: '/docs/TrellisDesignforLHUCA.pdf', name: 'Misc. Engineering Project DOC' },
      { href: '/docs/Transcript_Kromero.pdf', name: 'Transcript' }
    ]},
    { key: 'other', label: 'Other', items: [
      { href: '/docs/AI_Setup.png', name: 'AI Development Process' },
      { href: '/docs/Twitter-Sentiment-Analysis.png', name: 'Twitter Sentiment Analysis' },
      { href: '/docs/RTL-SDR.pdf', name: 'RTL-SDR' },
      { href: '/docs/KyleRomero_RedditListener_Walkthrough.pdf', name: 'RedditListener' },
      { href: '/docs/RPi-LED-Display.webm', name: 'RPi LED Display' },
      { href: 'https://kgromero-react.netlify.app/', name: 'Old Site (React)' }
    ]}
  ];

  // State management for mobile menu and dropdowns
  let isOpen = $state(false);
  let activeDropdown = $state(null);
  let activeSubDropdown = $state(null);
  
  // Function to toggle mobile menu
  const toggleMobileMenu = () => {
    isOpen = !isOpen;
    // Close all dropdowns when closing mobile menu
    if (!isOpen) {
      activeDropdown = null;
      activeSubDropdown = null;
    }
  };
  
  // Function to toggle dropdowns
  const toggleDropdown = (dropdownName, event) => {
    event?.stopPropagation();
    if (activeDropdown === dropdownName) {
      activeDropdown = null;
      activeSubDropdown = null;
    } else {
      activeDropdown = dropdownName;
      activeSubDropdown = null;
    }
  };
  
  // Function to toggle sub-dropdowns
  const toggleSubDropdown = (dropdownName, event) => {
    event?.stopPropagation();
    if (activeSubDropdown === dropdownName) {
      activeSubDropdown = null;
    } else {
      activeSubDropdown = dropdownName;
    }
  };
  
  // Click outside handler
  let navRef = $state();
  const handleClickOutside = (event) => {
    if (navRef && !navRef.contains(event.target)) {
      if (activeDropdown !== null || activeSubDropdown !== null) {
        activeDropdown = null;
        activeSubDropdown = null;
      }
    }
  };
  
  // Click inside navbar handler (closes dropdowns when clicking elsewhere in navbar)
  const handleNavbarClick = () => {
    if (activeDropdown !== null || activeSubDropdown !== null) {
      activeDropdown = null;
      activeSubDropdown = null;
    }
  };
  
  // Keyboard handler for accessibility
  const handleNavbarKeydown = (event) => {
    // Close dropdowns on Escape key
    if (event.key === 'Escape' && (activeDropdown !== null || activeSubDropdown !== null)) {
      activeDropdown = null;
      activeSubDropdown = null;
    }
  };
  </script>
  
  <svelte:window onclick={handleClickOutside}/>
  
  <nav bind:this={navRef} class="neo-card-square" aria-label="Main navigation">
    <div class="flex items-center justify-between py-0.5 px-1" onclick={handleNavbarClick} onkeydown={handleNavbarKeydown} role="none">
      <!-- Logo -->
      <div class="flex items-center space-x-4">
        <a href="/">
          <img
            class="w-9 mr-2 cursor-pointer hover:opacity-80 transition-opacity"
            alt="Kyle Romero Logo"
            src={logo}
            width="63"
            height="61"
          />
        </a>
      </div>
  
      <!-- Desktop Navigation -->
      <div class="hidden lg:flex items-center space-x-2 lg:space-x-4">
        <!-- Resume Button -->
        <div class="relative">
        <button class="neo-button-ghost dropdown-trigger flex items-center justify-center h-8 py-0"
            onclick={(e) => toggleDropdown('resume', e)}
            aria-haspopup="true"
            aria-expanded={activeDropdown === 'resume'}
            aria-label="Resume menu"
          >
            Resume
            <svg class="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
          {#if activeDropdown === 'resume'}
            <div class="dropdown-menu absolute z-50 w-52 mt-2" role="menu" aria-label="Resume options" tabindex="0" onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()}>
              <div class="dropdown-panel">
                <a href="/Kyle_Romero-Resume.pdf" target="_blank" class="dropdown-item" role="menuitem">Resume — PDF</a>
                <a href="/Kyle_Romero-Resume.docx" target="_blank" class="dropdown-item" role="menuitem">Resume — DOCX</a>
                <a href="/api/resume?format=json" target="_blank" class="dropdown-item" role="menuitem">Resume — JSON</a>
                <a href="/kgromero.md" target="_blank" class="dropdown-item" role="menuitem">Resume — MD</a>
                <a href="/Kyle_Romero-Coverletter.pdf" target="_blank" class="dropdown-item" role="menuitem">Cover Letter</a>
              </div>
            </div>
          {/if}
        </div>
  
        <!-- Supporting Documents Button -->
        <div class="relative">
          <button
            class="neo-button-ghost dropdown-trigger flex items-center justify-center h-8 py-0"
            onclick={(e) => toggleDropdown('docs', e)}
            aria-haspopup="true"
            aria-expanded={activeDropdown === 'docs'}
            aria-label="Supporting documents menu"
          >
            Supporting Documents
            <svg class="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
          {#if activeDropdown === 'docs'}
            <div class="dropdown-menu absolute z-50 w-72 mt-2 right-0" role="menu" aria-label="Supporting documents" tabindex="0" onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()}>
              <div class="dropdown-panel max-h-[80vh] overflow-y-auto">
                {#each docSections as section}
                  <div class="border-b border-neo-black/10 dark:border-dark-border last:border-b-0">
                    <button
                      class="dropdown-section-title"
                      onclick={(e) => toggleSubDropdown(section.key, e)}
                      aria-expanded={activeSubDropdown === section.key}
                      aria-label="{section.label} documents"
                    >
                      {section.label}
                      <svg class="w-4 h-4 transition-transform duration-200 {activeSubDropdown === section.key ? 'rotate-180' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </button>
                    {#if activeSubDropdown === section.key}
                      <div class="pb-2 bg-neo-cream/50 dark:bg-dark-bg/40">
                        {#each section.items as item}
                          <a href={item.href} target="_blank" class="dropdown-subitem" role="menuitem">{item.name}</a>
                        {/each}
                      </div>
                    {/if}
                  </div>
                {/each}
              </div>
            </div>
          {/if}
        </div>
  
        <!-- API Docs -->
        <a href="/api-docs" class="neo-button-ghost flex items-center justify-center h-8 py-0" aria-label="API documentation">
          API Docs
        </a>

        <!-- Business Card -->
        <a href="/docs/kgromero_businesscard.png" target="_blank" class="neo-button-ghost flex items-center justify-center h-8 py-0" aria-label="View business card">
          Business Card
        </a>

        <!-- Divider between primary actions and utility icons -->
        <div class="h-6 w-px bg-neo-black/20 dark:bg-dark-border mx-1" aria-hidden="true"></div>

        <!-- GitHub -->
        <a
          href="https://github.com/romero927/kgromero"
          target="_blank"
          class="neo-button-ghost flex items-center justify-center h-8 py-0"
          aria-label="View source code on GitHub"
        >
          <Code2 size={20} />
          <span class="sr-only">View Source Code</span>
        </a>

        <ResumeShellWrapper class="h-8 py-0" />

        <!-- Dark Mode Toggle -->
        <ThemeToggle class="h-8 py-0" />
      </div>
  
      <!-- Mobile Menu Button and Theme Toggle -->
      <div class="lg:hidden flex items-center space-x-2">
        <ThemeToggle class="h-9 w-9 p-0" />
        <button
          class="neo-button-ghost h-9 w-9 p-0 flex items-center justify-center"
          onclick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={isOpen}
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {#if !isOpen}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            {:else}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            {/if}
          </svg>
        </button>
      </div>
    </div>
  
    <!-- Mobile Menu -->
    {#if isOpen}
      <div class="lg:hidden p-4 space-y-4 overflow-y-auto neo-scroll max-h-[calc(100svh-4rem)]" style="-webkit-overflow-scrolling: touch;">
        <!-- Top Mobile Actions -->
        <div class="flex flex-wrap gap-2">
          <a href="/api-docs" class="neo-button-ghost block text-center">
            API Docs
          </a>
          <a href="/docs/kgromero_businesscard.png" target="_blank" class="neo-button-ghost block text-center">
            Business Card
          </a>
          <a
            href="https://github.com/romero927/kgromero"
            target="_blank"
            class="neo-button-ghost p-2 flex items-center justify-center"
            aria-label="View source code on GitHub"
          >
            <Code2 size={20} aria-hidden="true" />
            <span class="sr-only">View Source Code</span>
          </a>
          <ResumeShellWrapper class="p-2" />
        </div>

        <!-- Resume Links -->
        <div class="neo-card mb-4 text-sm">
          <h3 class="font-bold mb-2">Resume</h3>
          <div class="space-y-2">
            <a href="/Kyle_Romero-Resume.pdf" target="_blank" class="block hover:underline">Resume - PDF</a>
            <hr/>
            <a href="/Kyle_Romero-Resume.docx" target="_blank" class="block hover:underline">Resume - DOCX</a>
            <hr/>
            <a href="/api/resume?format=json" target="_blank" class="block hover:underline">Resume - JSON</a>
            <hr/>
            <a href="/kgromero.md" target="_blank" class="block hover:underline">Resume - MD</a>
            <hr/>
            <a href="/Kyle_Romero-Coverletter.pdf" target="_blank" class="block hover:underline">Cover Letter</a>
          </div>
        </div>

        <!-- Supporting Documents -->
        <div class="neo-card mb-4 text-sm">
          <h3 class="font-bold mb-4">Supporting Documents</h3>
          <div class="space-y-6">
            {#each docSections as section}
              <div class="border-b border-neo-black dark:border-dark-border pb-4 last:border-b-0 last:pb-0">
                <button
                  class="w-full text-left mb-2 flex items-center justify-between"
                  onclick={(e) => toggleDropdown(`${section.key}Mobile`, e)}
                  aria-expanded={activeDropdown === `${section.key}Mobile`}
                  aria-label="{section.label} documents"
                >
                  {section.label}
                  <svg class="w-4 h-4 transition-transform duration-200 {activeDropdown === `${section.key}Mobile` ? 'rotate-180' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
                {#if activeDropdown === `${section.key}Mobile`}
                  <div class="ml-4 space-y-2 border-l-2 border-neo-black dark:border-neo-accent pl-4">
                    {#each section.items as item}
                      <a href={item.href} target="_blank" class="block hover:underline">{item.name}</a>
                    {/each}
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        </div>
      </div>
    {/if}
  </nav>
  
  <style>
    .dropdown-menu {
      transform-origin: top;
      animation: dropIn 0.2s ease-out;
    }
  
    @keyframes dropIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  </style>
