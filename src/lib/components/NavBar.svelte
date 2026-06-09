<script>
  import { Code2 } from 'lucide-svelte';
  import ResumeShellWrapper from './ResumeShellWrapper.svelte';
  import ThemeToggle from './ThemeToggle.svelte';
  
  // Import your document assets
  import logo from "$lib/assets/logo.webp";


  import BusinessCard from "$lib/assets/kgromero_businesscard.png";
  
  // Import your other document assets
  import OrgStructure from "$lib/assets/OrgStructure.png";
  import SDLC from "$lib/assets/SDLC Items Flows.png";
  import Release from "$lib/assets/Release Process.png";
  import Path from "$lib/assets/Development Path.pdf";
  import Landscape from "$lib/assets/IT Landscape.png";
  import Process from "$lib/assets/Development Process.png";
  import Electron from "$lib/assets/Electron Architecture.png";
  import Workflow from "$lib/assets/Workflow.pdf";
  import WWMMobile from "$lib/assets/WWMMobile.png";
  import WWMLandscape from "$lib/assets/WWMLandscape.png";
  import SIOverview from "$lib/assets/SIOverview.pdf";
  import SIAL from "$lib/assets/SIAL.png";
  import CSM from "$lib/assets/CSM.pdf";
  import Internship from "$lib/assets/Internship.pdf";
  import PlasmaTraceSystem from "$lib/assets/PlasmaTraceSystem.pdf";
  import ChemicalTracking from "$lib/assets/ChemicalTracking.pdf";
  import MaskToolingManual from "$lib/assets/MaskToolingManual.pdf";
  import DeviceMTM from "$lib/assets/DeviceMTM.pdf";
  import MiscProjects from "$lib/assets/MiscProjects.pdf";
  import OtherInformationAboutMe from "$lib/assets/OtherInformationAboutMe.pdf";
  import Lab1Project1 from "$lib/assets/Lab1Project1.pdf";
  import Lab1Project2Presentation from "$lib/assets/Lab1Project2Presentation.pdf";
  import Lab1Project2 from "$lib/assets/Lab1Project2.pdf";
  import Lab2FinalPresentation from "$lib/assets/Lab2FinalPresentation.pdf";
  import Lab2FinalReport from "$lib/assets/Lab2FinalReport.pdf";
  import Lab2TrialVideo from "$lib/assets/Lab2TrialVideo.webm";
  import Lab3FinalPresentation from "$lib/assets/Lab3FinalPresentation.pdf";
  import Lab3FinalReport from "$lib/assets/Lab3FinalReport.pdf";
  import ProjectLabVFinalReport from "$lib/assets/ProjectLabVFinalReport.pdf";
  import MicroprocessorArchitectureFinalProjectR from "$lib/assets/MicroprocessorArchitectureFinalProject.pdf";
  import TrellisDesignforLHUCA from "$lib/assets/TrellisDesignforLHUCA.pdf";
  import Transcript_Kromero from "$lib/assets/Transcript_Kromero.pdf";
  import Sentiment from "$lib/assets/Twitter Sentiment Analysis.png";
  import RPi from "$lib/assets/RPi LED Display.webm";
  import RTL from "$lib/assets/RTL-SDR.pdf";
  import RedditListener from "$lib/assets/KyleRomero_RedditListener_Walkthrough.pdf";
  import Other from './Other.svelte';
  import AISetup from "$lib/assets/AI_Setup.png";
  
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
            {@const docSections = [
              { key: 'raymour', label: 'Raymour & Flanigan', items: [
                { href: OrgStructure, name: 'Matrix Organization Structure' },
                { href: SDLC, name: 'SDLC Item Flows' },
                { href: Release, name: 'Release Process' }
              ]},
              { key: 'mears', label: 'MEARS Group', items: [
                { href: Path, name: 'Developer Progression' },
                { href: Landscape, name: 'IT Landscape' },
                { href: Process, name: 'Development Process' },
                { href: Electron, name: 'Electron Architecture' }
              ]},
              { key: 'worldwide', label: 'Worldwide Machinery', items: [
                { href: Workflow, name: 'Team Workflow' },
                { href: WWMMobile, name: 'Mobile Architecture' },
                { href: WWMLandscape, name: 'App Landscape' }
              ]},
              { key: 'hp', label: 'HP', items: [
                { href: SIOverview, name: 'Sudden Impact Overview' },
                { href: SIAL, name: 'Sudden Impact Architecture' },
                { href: CSM, name: 'Certified Scrum Master Certificate' }
              ]},
              { key: 'xfab', label: 'X-Fab', items: [
                { href: Internship, name: 'Internship Projects Overview' },
                { href: PlasmaTraceSystem, name: 'Plasma Trace' },
                { href: ChemicalTracking, name: 'Chemical Tracking' },
                { href: MaskToolingManual, name: 'Mask Tooling Manual' },
                { href: DeviceMTM, name: 'Device MTM' },
                { href: MiscProjects, name: 'Misc. Projects' },
                { href: OtherInformationAboutMe, name: 'Other Information' }
              ]},
              { key: 'texastech', label: 'Texas Tech', items: [
                { href: Lab1Project1, name: 'Lab 1 Project 1 PPT' },
                { href: Lab1Project2Presentation, name: 'Lab 1 Project 2 PPT' },
                { href: Lab1Project2, name: 'Lab 1 Project 2 DOC' },
                { href: Lab2TrialVideo, name: 'Lab 1 Project 2 Trial Video' },
                { href: Lab2FinalPresentation, name: 'Lab 2 PPT' },
                { href: Lab2FinalReport, name: 'Lab 2 DOC' },
                { href: Lab3FinalPresentation, name: 'Lab 3 PPT' },
                { href: Lab3FinalReport, name: 'Lab 3 DOC' },
                { href: ProjectLabVFinalReport, name: 'Lab 4/5 DOC' },
                { href: MicroprocessorArchitectureFinalProjectR, name: 'Microprocessor Architecture Final Project' },
                { href: TrellisDesignforLHUCA, name: 'Misc. Engineering Project DOC' },
                { href: Transcript_Kromero, name: 'Transcript' }
              ]},
              { key: 'other', label: 'Other', items: [
                { href: AISetup, name: 'AI Development Process' },
                { href: Sentiment, name: 'Twitter Sentiment Analysis' },
                { href: RTL, name: 'RTL-SDR' },
                { href: RedditListener, name: 'RedditListener' },
                { href: RPi, name: 'RPi LED Display' },
                { href: 'https://kgromero-react.netlify.app/', name: 'Old Site (React)' }
              ]}
            ]}
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
        <a href={BusinessCard} target="_blank" class="neo-button-ghost flex items-center justify-center h-8 py-0" aria-label="View business card">
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

        <!-- <div class="flex-shrink-0">
          <img 
            class="w-full max-w-[55px] mx-auto rounded-full m-1 lazy-image" 
            alt="Kyle Romero" 
            src="/images/kgromero.webp"
            width="96"
            height="96"
          />
        </div> -->
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
      <div class="lg:hidden p-4 space-y-4 overflow-y-scroll max-h-[calc(100svh-4rem)]" style="-webkit-overflow-scrolling: touch;">
        <!-- Top Mobile Actions -->
        <div class="flex flex-wrap gap-2">
          <a href="/api-docs" class="neo-button-ghost block text-center">
            API Docs
          </a>
          <a href={BusinessCard} target="_blank" class="neo-button-ghost block text-center">
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
          <ResumeShellWrapper class="p-2" aria-label="Open resume in terminal">
            <Terminal size={18} class="mr-2" aria-hidden="true" />
            <span class="sr-only">Open Resume Terminal</span>
          </ResumeShellWrapper>
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
        <!-- Raymour & Flanigan -->
        <div class="border-b border-neo-black pb-4 last:border-b-0 last:pb-0">
          <button
            class="w-full text-left mb-2 flex items-center justify-between"
            onclick={(e) => toggleDropdown('raymourMobile', e)}
            aria-expanded={activeDropdown === 'raymourMobile'}
            aria-label="Raymour & Flanigan documents"
          >
            Raymour & Flanigan
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
          {#if activeDropdown === 'raymourMobile'}
            <div class="ml-4 space-y-2 border-l-2 border-neo-black pl-4">
              <a href={OrgStructure} target="_blank" class="block hover:underline">Matrix Organization Structure</a>
              <a href={SDLC} target="_blank" class="block hover:underline">SDLC Item Flows</a>
              <a href={Release} target="_blank" class="block hover:underline">Release Process</a>
            </div>
          {/if}
        </div>

        <!-- MEARS Group -->
        <div class="border-b border-neo-black pb-4 last:border-b-0 last:pb-0">
          <button
            class="w-full text-left mb-2 flex items-center justify-between"
            onclick={(e) => toggleDropdown('mearsMobile', e)}
            aria-expanded={activeDropdown === 'mearsMobile'}
            aria-label="MEARS Group documents"
          >
            MEARS Group
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
          {#if activeDropdown === 'mearsMobile'}
            <div class="ml-4 space-y-2 border-l-2 border-neo-black pl-4">
              <a href={Path} target="_blank" class="block hover:underline">Developer Progression</a>
              <a href={Landscape} target="_blank" class="block hover:underline">IT Landscape</a>
              <a href={Process} target="_blank" class="block hover:underline">Development Process</a>
              <a href={Electron} target="_blank" class="block hover:underline">Electron Architecture</a>
            </div>
          {/if}
        </div>

        <!-- Worldwide Machinery -->
        <div class="border-b border-neo-black pb-4 last:border-b-0 last:pb-0">
          <button
            class="w-full text-left mb-2 flex items-center justify-between"
            onclick={(e) => toggleDropdown('worldwideMobile', e)}
            aria-expanded={activeDropdown === 'worldwideMobile'}
            aria-label="Worldwide Machinery documents"
          >
            Worldwide Machinery
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
          {#if activeDropdown === 'worldwideMobile'}
            <div class="ml-4 space-y-2 border-l-2 border-neo-black pl-4">
              <a href={Workflow} target="_blank" class="block hover:underline">Team Workflow</a>
              <a href={WWMMobile} target="_blank" class="block hover:underline">Mobile Architecture</a>
              <a href={WWMLandscape} target="_blank" class="block hover:underline">App Landscape</a>
            </div>
          {/if}
        </div>

        <!-- HP -->
        <div class="border-b border-neo-black pb-4 last:border-b-0 last:pb-0">
          <button
            class="w-full text-left mb-2 flex items-center justify-between"
            onclick={(e) => toggleDropdown('hpMobile', e)}
            aria-expanded={activeDropdown === 'hpMobile'}
            aria-label="HP documents"
          >
            HP
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
          {#if activeDropdown === 'hpMobile'}
            <div class="ml-4 space-y-2 border-l-2 border-neo-black pl-4">
              <a href={SIOverview} target="_blank" class="block hover:underline">Sudden Impact Overview</a>
              <a href={SIAL} target="_blank" class="block hover:underline">Sudden Impact Architecture</a>
              <a href={CSM} target="_blank" class="block hover:underline">Certified Scrum Master Certificate</a>
            </div>
          {/if}
        </div>

        <!-- X-Fab -->
        <div class="border-b border-neo-black pb-4 last:border-b-0 last:pb-0">
          <button
            class="w-full text-left mb-2 flex items-center justify-between"
            onclick={(e) => toggleDropdown('xfabMobile', e)}
            aria-expanded={activeDropdown === 'xfabMobile'}
            aria-label="X-Fab documents"
          >
            X-Fab
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
          {#if activeDropdown === 'xfabMobile'}
            <div class="ml-4 space-y-2 border-l-2 border-neo-black pl-4">
              <a href={Internship} target="_blank" class="block hover:underline">Internship Projects Overview</a>
              <a href={PlasmaTraceSystem} target="_blank" class="block hover:underline">Plasma Trace</a>
              <a href={ChemicalTracking} target="_blank" class="block hover:underline">Chemical Tracking</a>
              <a href={MaskToolingManual} target="_blank" class="block hover:underline">Mask Tooling Manual</a>
              <a href={DeviceMTM} target="_blank" class="block hover:underline">Device MTM</a>
              <a href={MiscProjects} target="_blank" class="block hover:underline">Misc. Projects</a>
              <a href={OtherInformationAboutMe} target="_blank" class="block hover:underline">Other Information</a>
            </div>
          {/if}
        </div>

        <!-- Texas Tech -->
        <div class="border-b border-neo-black pb-4 last:border-b-0 last:pb-0">
          <button
            class="w-full text-left mb-2 flex items-center justify-between"
            onclick={(e) => toggleDropdown('texastechMobile', e)}
            aria-expanded={activeDropdown === 'texastechMobile'}
            aria-label="Texas Tech documents"
          >
            Texas Tech
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
          {#if activeDropdown === 'texastechMobile'}
            <div class="ml-4 space-y-2 border-l-2 border-neo-black pl-4">
              <a href={Lab1Project1} target="_blank" class="block hover:underline">Lab 1 Project 1 PPT</a>
              <a href={Lab1Project2Presentation} target="_blank" class="block hover:underline">Lab 1 Project 2 PPT</a>
              <a href={Lab1Project2} target="_blank" class="block hover:underline">Lab 1 Project 2 DOC</a>
              <a href={Lab2TrialVideo} target="_blank" class="block hover:underline">Lab 1 Project 2 Trial Video</a>
              <a href={Lab2FinalPresentation} target="_blank" class="block hover:underline">Lab 2 PPT</a>
              <a href={Lab2FinalReport} target="_blank" class="block hover:underline">Lab 2 DOC</a>
              <a href={Lab3FinalPresentation} target="_blank" class="block hover:underline">Lab 3 PPT</a>
              <a href={Lab3FinalReport} target="_blank" class="block hover:underline">Lab 3 DOC</a>
              <a href={ProjectLabVFinalReport} target="_blank" class="block hover:underline">Lab 4/5 DOC</a>
              <a href={MicroprocessorArchitectureFinalProjectR} target="_blank" class="block hover:underline">Microprocessor Architecture Final Project</a>
              <a href={TrellisDesignforLHUCA} target="_blank" class="block hover:underline">Misc. Engineering Project DOC</a>
              <a href={Transcript_Kromero} target="_blank" class="block hover:underline">Transcript</a>
            </div>
          {/if}
        </div>

        <!-- Other -->
        <div class="border-b border-neo-black pb-4 last:border-b-0 last:pb-0">
          <button
            class="w-full text-left mb-2 flex items-center justify-between"
            onclick={(e) => toggleDropdown('otherMobile', e)}
            aria-expanded={activeDropdown === 'otherMobile'}
            aria-label="Other documents"
          >
            Other
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
          {#if activeDropdown === 'otherMobile'}
            <div class="ml-4 space-y-2 border-l-2 border-neo-black pl-4">
              <a href={AISetup} target="_blank" class="block hover:underline">AI Development Process</a>
              <a href={Sentiment} target="_blank" class="block hover:underline">Twitter Sentiment Analysis</a>
              <hr/>
              <a href={RTL} target="_blank" class="block hover:underline">RTL-SDR</a>
              <hr/>
              <a href={RedditListener} target="_blank" class="block hover:underline">RedditListener</a>
              <hr/>
              <a href={RPi} target="_blank" class="block hover:underline">RPi LED Display</a>
              <hr/>
              <a href="https://kgromero-react.netlify.app/" target="_blank" class="block hover:underline">Old Site (React)</a>
            </div>
          {/if}
        </div>
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
  
    .neo-card {
      scrollbar-width: thin;
      scrollbar-color: #1A1A1A #FF9664;
    }
  
    .neo-card::-webkit-scrollbar {
      width: 8px;
    }
  
    .neo-card::-webkit-scrollbar-track {
      background: #FF9664;
    }
  
    .neo-card::-webkit-scrollbar-thumb {
      background-color: #1A1A1A;
      border: 2px solid #FF9664;
      border-radius: 4px;
    }
  </style>
