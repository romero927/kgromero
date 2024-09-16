<!-- src/lib/components/Navbar.svelte -->
<script>
  import {
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    NavHamburger,
    Dropdown,
    DropdownItem,
    DropdownDivider,
    DarkMode
  } from "flowbite-svelte";
  import { ChevronDownOutline } from "flowbite-svelte-icons";
  import Fa from "svelte-fa";
  import { faCode } from "@fortawesome/free-solid-svg-icons";

  import ResumeShellWrapper from './ResumeShellWrapper.svelte';

  // Import your logo
  import logo from "$lib/assets/logo.webp";

  // Import your document assets
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
</script>

<Navbar class="container mx-auto border rounded-lg border-gray/10 dark:border-white/10 py-0 mb-2 bg-gray-50 dark:bg-gray-800 text-black/60 dark:text-gray-400">
  <NavBrand>
    <img class="w-11 mr-2" alt="logo" src={logo} />
  </NavBrand>
  <NavHamburger />
  <NavUl ulClass="border-none flex flex-col p-4 mt-4 bg-gray-50 dark:bg-gray-800 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:text-sm md:font-medium">
    <DropdownDivider divClass="my-1 h-px bg-gray-100 dark:bg-gray-600 lg:display-none" />
    <NavLi class="my-2 cursor-pointer text-black/60 dark:text-gray-400">
      Resume<ChevronDownOutline class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline" />
    </NavLi>
    <Dropdown class="z-20 pl-5 pr-5 w-full">
      <DropdownItem href="/Kyle_Romero-Resume.pdf" target="_blank">Resume - PDF</DropdownItem>
      <DropdownDivider />
      <DropdownItem href="/Kyle_Romero-Resume.docx" target="_blank">Resume - DOCX</DropdownItem>
      <DropdownDivider />
      <DropdownItem href="/Kyle_Romero-Resume.md" target="_blank">Resume - MD</DropdownItem>
      <DropdownDivider />
      <DropdownItem href=/Kyle_Romero-Coverletter.pdf target="_blank">Cover Letter</DropdownItem>
    </Dropdown>
    <NavLi class="my-2 cursor-pointer text-black/60 dark:text-gray-400">
      Supporting Documents<ChevronDownOutline class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline" />
    </NavLi>
    <Dropdown class="w-60 z-20 pl-5 pr-5 w-full">
      <NavLi class="my-2 align-center cursor-pointer">
        Raymour & Flanigan<ChevronDownOutline class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline" />
      </NavLi>
      <Dropdown class="w-44 z-20 bg-gray-150 dark:bg-gray-500 rounded-md overflow-y-auto h-full max-h-48">
        <DropdownItem href={OrgStructure} target="_blank">Matrix Organization Structure</DropdownItem>
        <DropdownDivider />
        <DropdownItem href={SDLC} target="_blank">SDLC Item Flows</DropdownItem>
        <DropdownDivider />
        <DropdownItem href={Release} target="_blank">Release Process</DropdownItem>
      </Dropdown>
      <DropdownDivider />
      <NavLi class="my-2 cursor-pointer">
        MEARS Group<ChevronDownOutline class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline" />
      </NavLi>
      <Dropdown class="w-44 z-20 bg-gray-150 dark:bg-gray-500 rounded-md overflow-y-auto h-full max-h-48">
        <DropdownItem href={Path} target="_blank">Developer Progression</DropdownItem>
        <DropdownDivider />
        <DropdownItem href={Landscape} target="_blank">IT Landscape</DropdownItem>
        <DropdownDivider />
        <DropdownItem href={Process} target="_blank">Development Process</DropdownItem>
        <DropdownDivider />
        <DropdownItem href={Electron} target="_blank">Electron Architecture</DropdownItem>
      </Dropdown>
      <DropdownDivider />
      <NavLi class="my-2 cursor-pointer">
        Worldwide Machinery<ChevronDownOutline class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline" />
      </NavLi>
      <Dropdown class="w-44 z-20 bg-gray-150 dark:bg-gray-500 rounded-md overflow-y-auto h-full max-h-48">
        <DropdownItem href={Workflow} target="_blank">Team Workflow</DropdownItem>
        <DropdownDivider />
        <DropdownItem href={WWMMobile} target="_blank">Mobile Architecture</DropdownItem>
        <DropdownDivider />
        <DropdownItem href={WWMLandscape} target="_blank">App Landscape</DropdownItem>
      </Dropdown>
      <DropdownDivider />
      <NavLi class="my-2 cursor-pointer">
        HP<ChevronDownOutline class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline" />
      </NavLi>
      <Dropdown class="w-44 z-20 bg-gray-150 dark:bg-gray-500 rounded-md overflow-y-auto h-full max-h-48">
        <DropdownItem href={SIOverview} target="_blank">Sudden Impact Overview</DropdownItem>
        <DropdownDivider />
        <DropdownItem href={SIAL} target="_blank">Sudden Impact Architecture</DropdownItem>
        <DropdownDivider />
        <DropdownItem href={CSM} target="_blank">Certified Scrum Master Certificate</DropdownItem>
      </Dropdown>
      <DropdownDivider />
      <NavLi class="my-2 cursor-pointer">
        X-Fab<ChevronDownOutline class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline" />
      </NavLi>
      <Dropdown class="w-44 z-20 bg-gray-150 dark:bg-gray-500 rounded-md overflow-y-auto h-full max-h-48">
        <DropdownItem href={Internship} target="_blank">Internship Projects Overview</DropdownItem>
        <DropdownDivider />
        <DropdownItem href={PlasmaTraceSystem} target="_blank">Plasma Trace</DropdownItem>
        <DropdownDivider />
        <DropdownItem href={ChemicalTracking} target="_blank">Chemical Tracking</DropdownItem>
        <DropdownDivider />
        <DropdownItem href={MaskToolingManual} target="_blank">Mask Tooling Manual</DropdownItem>
        <DropdownDivider />
        <DropdownItem href={DeviceMTM} target="_blank">Device MTM</DropdownItem>
        <DropdownDivider />
        <DropdownItem href={MiscProjects} target="_blank">Misc. Projects</DropdownItem>
        <DropdownDivider />
        <DropdownItem href={OtherInformationAboutMe} target="_blank">Other Information</DropdownItem>
      </Dropdown>
      <DropdownDivider />
      <NavLi class="my-2 cursor-pointer">
        Texas Tech<ChevronDownOutline class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline" />
      </NavLi>
      <Dropdown class="w-44 z-20 bg-gray-150 dark:bg-gray-500 rounded-md overflow-y-auto h-full max-h-48">
        <DropdownItem href={Lab1Project1} target="_blank">Lab 1 Project 1 PPT</DropdownItem>
        <DropdownDivider />
        <DropdownItem href={Lab1Project2Presentation} target="_blank">Lab 1 Project 2 PPT</DropdownItem>
        <DropdownDivider />
        <DropdownItem href={Lab1Project2} target="_blank">Lab 1 Project 2 DOC</DropdownItem>
        <DropdownDivider />
        <DropdownItem href={Lab2TrialVideo} target="_blank">Lab 1 Project 2 Trial Video</DropdownItem>
        <DropdownDivider />
        <DropdownItem href={Lab2FinalPresentation} target="_blank">Lab 2 PPT</DropdownItem>
        <DropdownDivider />
        <DropdownItem href={Lab2FinalReport} target="_blank">Lab 2 DOC</DropdownItem>
        <DropdownDivider />
        <DropdownItem href={Lab3FinalPresentation} target="_blank">Lab 3 PPT</DropdownItem>
        <DropdownDivider />
        <DropdownItem href={Lab3FinalReport} target="_blank">Lab 3 DOC</DropdownItem>
        <DropdownDivider />
        <DropdownItem href={ProjectLabVFinalReport} target="_blank">Lab 4/5 DOC</DropdownItem>
        <DropdownDivider />
        <DropdownItem href={MicroprocessorArchitectureFinalProjectR} target="_blank">Microprocessor Architecture Final Project</DropdownItem>
        <DropdownDivider />
        <DropdownItem href={TrellisDesignforLHUCA} target="_blank">Misc. Engineering Project DOC</DropdownItem>
        <DropdownDivider />
        <DropdownItem href={Transcript_Kromero} target="_blank">Transcript</DropdownItem>
      </Dropdown>
      <DropdownDivider />
      <NavLi class="my-2 cursor-pointer">
        Other<ChevronDownOutline class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline" />
      </NavLi>
      <Dropdown class="w-44 z-20 bg-gray-150 dark:bg-gray-500 rounded-md overflow-y-auto h-full max-h-48">
        <DropdownItem href={Sentiment} target="_blank">Twitter Sentiment Analysis</DropdownItem>
        <DropdownDivider />
        <DropdownItem href={RTL} target="_blank">RTL-SDR</DropdownItem>
        <DropdownDivider />
        <DropdownItem href={RedditListener} target="_blank">RedditListener</DropdownItem>
        <DropdownDivider />
        <DropdownItem href={RPi} target="_blank">RPi LED Display</DropdownItem>
        <DropdownDivider />
        <DropdownItem href="https://kgromero-react.netlify.app/" target="_blank">Old Site (React)</DropdownItem>
      </Dropdown>
    </Dropdown>
    <DropdownDivider divClass="my-1 h-px bg-gray-100 dark:bg-gray-600 lg:display-none" />
    <NavLi href={BusinessCard} class="my-2 cursor-pointer text-black/60 dark:text-gray-400" target="_blank">Business Card</NavLi>
    <NavLi href="https://github.com/romero927/kgromero" target="_blank" class="sm:my-2 md:my-0 cursor-pointer">
      <div class="rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-50 hover:text-red-500 dark:hover:bg-gray-700 dark:hover:text-white sm:ml-0 sm:pl-0 sm:pt-1 sm:pb-1 sm:mb-1 md:p-3">
        <Fa class="p-0 m-0" icon={faCode} />
      </div>
    </NavLi>
    <DropdownDivider divClass="my-1 h-px bg-gray-100 dark:bg-gray-600 lg:display-none" />
    <ResumeShellWrapper />      
    <DropdownDivider divClass="my-1 h-px bg-gray-100 dark:bg-gray-600 lg:display-none" />
    <DarkMode btnClass="text-gray-500 sm:my-2 md:my-0 dark:text-gray-400 hover:text-red-500 hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-white focus:outline-none rounded-lg sm:rounded-md text-sm p-2.5" />
    <DropdownDivider divClass="my-1 h-px bg-gray-100 dark:bg-gray-600 lg:display-none" />
  </NavUl>
</Navbar>