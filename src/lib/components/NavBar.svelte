<script>
  import { Terminal } from 'lucide-svelte';
  import Fa from "svelte-fa";
  import { faCode } from "@fortawesome/free-solid-svg-icons";
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
  
  // State management for mobile menu and dropdowns
  let isOpen = false;
  let activeDropdown = null;
  let activeSubDropdown = null;
  
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
  const toggleDropdown = (dropdownName) => {
    if (activeDropdown === dropdownName) {
      activeDropdown = null;
      activeSubDropdown = null;
    } else {
      activeDropdown = dropdownName;
      activeSubDropdown = null;
    }
  };
  
  // Function to toggle sub-dropdowns
  const toggleSubDropdown = (dropdownName) => {
    if (activeSubDropdown === dropdownName) {
      activeSubDropdown = null;
    } else {
      activeSubDropdown = dropdownName;
    }
  };
  
  // Click outside handler
  let navRef;
  const handleClickOutside = (event) => {
    if (navRef && !navRef.contains(event.target)) {
      activeDropdown = null;
      activeSubDropdown = null;
    }
  };
  </script>
  
  <svelte:window on:click={handleClickOutside}/>
  
  <nav bind:this={navRef} class="mx-2 neo-card mb-4">
    <div class="flex items-center justify-between p-1">
      <!-- Logo and Terminal -->
      <div class="flex items-center space-x-4">
        <div>
          <img
            class="w-11 mr-2"
            alt="KR Logo"
            src={logo}
          />
        </div>
      </div>
  
      <!-- Desktop Navigation -->
      <div class="hidden lg:flex items-center space-x-4">
        <!-- Resume Button -->
        <div class="relative">
        <button class="neo-button dropdown-trigger flex items-center justify-center h-10"
            on:click={() => toggleDropdown('resume')}
          >
            Resume
            <svg class="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
          {#if activeDropdown === 'resume'}
            <div class="dropdown-menu absolute z-50 w-48 mt-2">
              <div class="neo-card space-y-2 bg-white">
                <a href="/Kyle_Romero-Resume.pdf" target="_blank" class="block hover:underline p-2">Resume - PDF</a>
                <hr/>
                <!-- <a href="/Kyle_Romero-Resume.docx" target="_blank" class="block hover:underline p-2">Resume - DOCX</a>
                <hr/>
                <a href="/Kyle_Romero-Resume.md" target="_blank" class="block hover:underline p-2">Resume - MD</a>
                <hr/>
                <a href="/Kyle_Romero-Coverletter.pdf" target="_blank" class="block hover:underline p-2">Cover Letter</a> -->
              </div>
            </div>
          {/if}
        </div>
  
        <!-- Supporting Documents Button -->
        <div class="relative">
          <button
            class="neo-button dropdown-trigger flex items-center h-10"
            on:click={() => toggleDropdown('docs')}
          >
            Supporting Documents
            <svg class="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
          {#if activeDropdown === 'docs'}
            <div class="dropdown-menu absolute z-50 w-64 mt-2 right-0">
              <div class="neo-card max-h-[80vh] overflow-y-auto bg-white">
                <div class="space-y-4 p-4">
                  <!-- Raymour & Flanigan -->
                  <div class="hover:bg-neo-orange/10 rounded-lg p-2 transition-colors">
                    <button
                      class="w-full text-left font-bold flex items-center justify-between "
                      on:click={() => toggleSubDropdown('raymour')}
                    >
                      Raymour & Flanigan
                      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </button>
                    {#if activeSubDropdown === 'raymour'}
                      <div class="mt-2 ml-4 space-y-2 border-l-2 border-neo-black pl-4">
                        <a href={OrgStructure} target="_blank" class="block hover:underline">Matrix Organization Structure</a>
                        <hr/>
                        <a href={SDLC} target="_blank" class="block hover:underline">SDLC Item Flows</a>
                        <hr/>
                        <a href={Release} target="_blank" class="block hover:underline">Release Process</a>
                      </div>
                    {/if}
                  </div>
                  <hr/>
                  <!-- MEARS Group -->
                  <div class="hover:bg-neo-orange/10 rounded-lg p-2 transition-colors">
                    <button
                      class="w-full text-left font-bold flex items-center justify-between"
                      on:click={() => toggleSubDropdown('mears')}
                    >
                      MEARS Group
                      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </button>
                    {#if activeSubDropdown === 'mears'}
                      <div class="mt-2 ml-4 space-y-2 border-l-2 border-neo-black pl-4">
                        <a href={Path} target="_blank" class="block hover:underline">Developer Progression</a>
                        <hr/>
                        <a href={Landscape} target="_blank" class="block hover:underline">IT Landscape</a>
                        <hr/>
                        <a href={Process} target="_blank" class="block hover:underline">Development Process</a>
                        <hr/>
                        <a href={Electron} target="_blank" class="block hover:underline">Electron Architecture</a>
                      </div>
                    {/if}
                  </div>
                  <hr/>
                  <!-- Worldwide Machinery -->
                  <div class="hover:bg-neo-orange/10 rounded-lg p-2 transition-colors">
                    <button
                      class="w-full text-left font-bold flex items-center justify-between"
                      on:click={() => toggleSubDropdown('worldwide')}
                    >
                      Worldwide Machinery
                      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </button>
                    {#if activeSubDropdown === 'worldwide'}
                      <div class="mt-2 ml-4 space-y-2 border-l-2 border-neo-black pl-4">
                        <a href={Workflow} target="_blank" class="block hover:underline">Team Workflow</a>
                        <hr/>
                        <a href={WWMMobile} target="_blank" class="block hover:underline">Mobile Architecture</a>
                        <hr/>
                        <a href={WWMLandscape} target="_blank" class="block hover:underline">App Landscape</a>
                      </div>
                    {/if}
                  </div>
                  <hr/>
                  <!-- HP -->
                  <div class="hover:bg-neo-orange/10 rounded-lg p-2 transition-colors">
                    <button
                      class="w-full text-left font-bold flex items-center justify-between"
                      on:click={() => toggleSubDropdown('hp')}
                    >
                      HP
                      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </button>
                    {#if activeSubDropdown === 'hp'}
                      <div class="mt-2 ml-4 space-y-2 border-l-2 border-neo-black pl-4">
                        <a href={SIOverview} target="_blank" class="block hover:underline">Sudden Impact Overview</a>
                        <hr/>
                        <a href={SIAL} target="_blank" class="block hover:underline">Sudden Impact Architecture</a>
                        <hr/>
                        <a href={CSM} target="_blank" class="block hover:underline">Certified Scrum Master Certificate</a>
                      </div>
                    {/if}
                  </div>
                  <hr/>
                  <!-- X-Fab -->
                  <div class="hover:bg-neo-orange/10 rounded-lg p-2 transition-colors">
                    <button
                      class="w-full text-left font-bold flex items-center justify-between"
                      on:click={() => toggleSubDropdown('xfab')}
                    >
                      X-Fab
                      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </button>
                    {#if activeSubDropdown === 'xfab'}
                      <div class="mt-2 ml-4 space-y-2 border-l-2 border-neo-black pl-4">
                        <a href={Internship} target="_blank" class="block hover:underline">Internship Projects Overview</a>
                        <hr/>
                        <a href={PlasmaTraceSystem} target="_blank" class="block hover:underline">Plasma Trace</a>
                        <hr/>
                        <a href={ChemicalTracking} target="_blank" class="block hover:underline">Chemical Tracking</a>
                        <hr/>
                        <a href={MaskToolingManual} target="_blank" class="block hover:underline">Mask Tooling Manual</a>
                        <hr/>
                        <a href={DeviceMTM} target="_blank" class="block hover:underline">Device MTM</a>
                        <hr/>
                        <a href={MiscProjects} target="_blank" class="block hover:underline">Misc. Projects</a>
                        <hr/>
                        <a href={OtherInformationAboutMe} target="_blank" class="block hover:underline">Other Information</a>
                      </div>
                    {/if}
                  </div>
                  <hr/>
                  <!-- Texas Tech -->
                  <div class="hover:bg-neo-orange/10 rounded-lg p-2 transition-colors">
                    <button
                      class="w-full text-left font-bold flex items-center justify-between"
                      on:click={() => toggleSubDropdown('texastech')}
                    >
                      Texas Tech
                      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </button>
                    {#if activeSubDropdown === 'texastech'}
                      <div class="mt-2 ml-4 space-y-2 border-l-2 border-neo-black pl-4">
                        <a href={Lab1Project1} target="_blank" class="block hover:underline">Lab 1 Project 1 PPT</a>
                        <hr/>
                        <a href={Lab1Project2Presentation} target="_blank" class="block hover:underline">Lab 1 Project 2 PPT</a>
                        <hr/>
                        <a href={Lab1Project2} target="_blank" class="block hover:underline">Lab 1 Project 2 DOC</a>
                        <hr/>
                        <a href={Lab2TrialVideo} target="_blank" class="block hover:underline">Lab 1 Project 2 Trial Video</a>
                        <hr/>
                        <a href={Lab2FinalPresentation} target="_blank" class="block hover:underline">Lab 2 PPT</a>
                        <hr/>
                        <a href={Lab2FinalReport} target="_blank" class="block hover:underline">Lab 2 DOC</a>
                        <hr/>
                        <a href={Lab3FinalPresentation} target="_blank" class="block hover:underline">Lab 3 PPT</a>
                        <hr/>
                        <a href={Lab3FinalReport} target="_blank" class="block hover:underline">Lab 3 DOC</a>
                        <hr/>
                        <a href={ProjectLabVFinalReport} target="_blank" class="block hover:underline">Lab 4/5 DOC</a>
                        <hr/>
                        <a href={MicroprocessorArchitectureFinalProjectR} target="_blank" class="block hover:underline">Microprocessor Architecture Final Project</a>
                        <hr/>
                        <a href={TrellisDesignforLHUCA} target="_blank" class="block hover:underline">Misc. Engineering Project DOC</a>
                        <hr/>
                        <a href={Transcript_Kromero} target="_blank" class="block hover:underline">Transcript</a>
                      </div>
                    {/if}
                  </div>
                  <hr/>
                  <!-- Other -->
                  <div class="hover:bg-neo-orange/10 rounded-lg p-2 transition-colors">
                    <button
                      class="w-full text-left font-bold flex items-center justify-between"
                      on:click={() => toggleSubDropdown('other')}
                    >
                      Other
                      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </button>
                    {#if activeSubDropdown === 'other'}
                      <div class="mt-2 ml-4 space-y-2 border-l-2 border-neo-black pl-4">
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
        </div>
  
        <!-- Business Card -->
        <a href={BusinessCard} target="_blank" class="neo-button flex items-center h-10">
          Business Card
        </a>
  
        <!-- GitHub -->
        <a
          href="https://github.com/romero927/kgromero"
          target="_blank"
          class="neo-button flex items-center h-10"
          title="View Source"
        >
          <Fa icon={faCode} />
        </a>
  
        <ResumeShellWrapper class="neo-button flex items-center h-10">
          <Terminal size={20} />
        </ResumeShellWrapper>
  
        <!-- Dark Mode Toggle -->
        <ThemeToggle class="neo-button flex items-center h-10" />
      </div>
  
      <!-- Mobile Menu Button -->
      <button
        class="lg:hidden neo-button"
        on:click={toggleMobileMenu}
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
  
    <!-- Mobile Menu -->
    {#if isOpen}
  <div class="lg:hidden p-4 space-y-4 pl-0">
    <!-- Top Mobile Actions -->
    <div class="flex space-x-3 block">
      <a href={BusinessCard} target="_blank" class="neo-button block text-center">
        Business Card
      </a>
      <a
        href="https://github.com/romero927/kgromero"
        target="_blank"
        class="neo-button p-2 flex items-center justify-center"
      >
        <Fa icon={faCode} class="mr-2 pl-2" />
      </a>
      <ThemeToggle class="mr-2 pl-2"/>
    </div>
  </div>
    <!-- Resume Links -->
    <div class="neo-card mb-4">
      <h3 class="font-bold mb-2">Resume</h3>
      <div class="space-y-2">
        <a href="/Kyle_Romero-Resume.pdf" target="_blank" class="block hover:underline">Resume - PDF</a>
        <hr/>
        <a href="/Kyle_Romero-Resume.docx" target="_blank" class="block hover:underline">Resume - DOCX</a>
        <hr/>
        <a href="/Kyle_Romero-Resume.md" target="_blank" class="block hover:underline">Resume - MD</a>
        <hr/>
        <a href="/Kyle_Romero-Coverletter.pdf" target="_blank" class="block hover:underline">Cover Letter</a>
      </div>
    </div>

    <!-- Supporting Documents -->
    <div class="neo-card mb-4">
      <h3 class="font-bold mb-4">Supporting Documents</h3>
      <div class="space-y-6">
        <!-- Raymour & Flanigan -->
        <div class="border-b border-neo-black pb-4 last:border-b-0 last:pb-0">
          <button
            class="w-full text-left mb-2 flex items-center justify-between"
            on:click={() => toggleDropdown('raymourMobile')}
          >
            Raymour & Flanigan
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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
            on:click={() => toggleDropdown('mearsMobile')}
          >
            MEARS Group
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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
            on:click={() => toggleDropdown('worldwideMobile')}
          >
            Worldwide Machinery
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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
            on:click={() => toggleDropdown('hpMobile')}
          >
            HP
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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
            on:click={() => toggleDropdown('xfabMobile')}
          >
            X-Fab
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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
            on:click={() => toggleDropdown('texastechMobile')}
          >
            Texas Tech
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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
            on:click={() => toggleDropdown('otherMobile')}
          >
            Other
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
          {#if activeDropdown === 'otherMobile'}
            <div class="ml-4 space-y-2 border-l-2 border-neo-black pl-4">
              <a href={Sentiment} target="_blank" class="block hover:underline">Twitter Sentiment Analysis</a>
              <a href={RTL} target="_blank" class="block hover:underline">RTL-SDR</a>
              <a href={RedditListener} target="_blank" class="block hover:underline">RedditListener</a>
              <a href={RPi} target="_blank" class="block hover:underline">RPi LED Display</a>
              <a href="https://kgromero-react.netlify.app/" target="_blank" class="block hover:underline">Old Site (React)</a>
            </div>
          {/if}
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