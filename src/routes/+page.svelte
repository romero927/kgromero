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
  } from "flowbite-svelte";

  import { ChevronDownOutline } from "flowbite-svelte-icons";
  import { DarkMode } from "flowbite-svelte";
  import { Timeline, TimelineItem, Button } from "flowbite-svelte";
  import { Card } from "flowbite-svelte";
  import { Footer, FooterCopyright } from "flowbite-svelte";
  import { Listgroup, ListgroupItem } from 'flowbite-svelte';
  let links = [
    { name: 'Hacker News (YCombinator)', href: 'https://news.ycombinator.com/', attrs: {target: '_blank'}},
    { name: 'Dev.to', href: 'https://dev.to/', attrs: {target: '_blank'} },
    { name: 'Paul Graham\'s Articles', href: 'https://www.paulgraham.com/articles.html', attrs: {target: '_blank'} },
    { name: 'Scott Hanselman\'s Blog', href: 'https://www.hanselman.com/blog/', attrs: {target: '_blank'}},
    { name: 'CIO.com', href: 'https://www.cio.com', attrs: {target: '_blank'}},
    { name: 'Pluralsight', href: 'https://www.pluralsight.com', attrs: {target: '_blank'} }
  ];

  import Fa from "svelte-fa";
  import {
    faPhone,
    faEnvelope,
    faLink
  } from "@fortawesome/free-solid-svg-icons/index.js";

  import {
    faGithub,
    faLinkedin,
    faKeybase,
    faGoodreads,
    faInstagram,
    faFacebook,
    faReddit,
    faTwitter
  } from "@fortawesome/free-brands-svg-icons/index.js";

  import { Heading, P, A, Mark, Secondary, Hr } from "flowbite-svelte";

  let startDate = new Date("July 15, 2007");

  let diff = Math.abs(new Date() - startDate);
  let yearsExperience = Math.floor(diff / 31536000000);

  let startDateMgr = new Date("October 16, 2017");

  let diffMgr = Math.abs(new Date() - startDateMgr);
  let yearsExperienceMgr = Math.round(diffMgr / 31536000000);

  import QR from "$lib/assets/QR.png";
  import Profile from "$lib/assets/kgromero.png";
  import ResumeDocX from "$lib/assets/kgromero.docx";
  import ResumePDF from "$lib/assets/kgromero.pdf";
  import ResumeTXT from "$lib/assets/kgromero.txt";
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
  import logo from "$lib/assets/logo.png";
</script>
<html class="dark" lang="en"></html>
<div class="min-h-screen dark:bg-gray-900">
  <br class="hidden md:block"/>
  <Navbar class="sm:container sm:mx-auto border xs:rounded-none sm:rounded-lg dark:border-white/10 px-2 py-0 mb-2 mx-2bg-white bg-gray-100 dark:bg-gray-800 text-black/60 dark:text-gray-400 ">
      <NavBrand>
        <img class="w-11 mr-2" alt="logo" src={logo} />
      </NavBrand>
      <NavHamburger />
      <NavUl>
        <NavLi class="my-2 cursor-pointer text-black/60 dark:text-gray-400">
          Resume<ChevronDownOutline
            class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline"
          />
        </NavLi>
        <Dropdown class="w-44 z-20">
          <DropdownItem href={ResumePDF} target="_blank"
            >Resume - PDF</DropdownItem
          >
          <DropdownDivider />
          <DropdownItem href={ResumeDocX} target="_blank"
            >Resume - DOCX</DropdownItem
          >
          <DropdownDivider />
          <DropdownItem href={ResumeTXT} target="_blank"
            >Resume - TXT</DropdownItem
          >
          <DropdownDivider />
        </Dropdown>
        <NavLi class="my-2 cursor-pointer text-black/60 dark:text-gray-400">
          Portfolio<ChevronDownOutline
            class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline"
          />
        </NavLi>
        <Dropdown class="w-60 z-20 text-center">
          <NavLi class="my-2 align-center cursor-pointer">
            Raymour & Flanigan<ChevronDownOutline
              class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline"
            />
          </NavLi>
          <Dropdown class="w-44 z-20 bg-gray-150 dark:bg-gray-500">
            <DropdownItem href={OrgStructure} target="_blank"
              >Matrix Organization Structure</DropdownItem
            ><DropdownDivider />
            <DropdownItem href={SDLC} target="_blank"
              >SDLC Item Flows</DropdownItem
            ><DropdownDivider />
            <DropdownItem href={Release} target="_blank"
              >Release Process</DropdownItem
            >
          </Dropdown>
          <DropdownDivider />
          <NavLi class="my-2 cursor-pointer">
            MEARS Group<ChevronDownOutline
              class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline"
            />
          </NavLi>
          <Dropdown class="w-44 z-20 bg-gray-150 dark:bg-gray-500">
            <DropdownItem href={Path} target="_blank"
              >Developer Progression</DropdownItem
            ><DropdownDivider />
            <DropdownItem href={Landscape} target="_blank"
              >IT Landscape</DropdownItem
            ><DropdownDivider />
            <DropdownItem href={Process} target="_blank"
              >Development Process</DropdownItem
            ><DropdownDivider />
            <DropdownItem href={Electron} target="_blank"
              >Electron Architecture</DropdownItem
            >
          </Dropdown>
          <DropdownDivider />
          <NavLi class="my-2 cursor-pointer">
            Worldwide Machinery<ChevronDownOutline
              class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline"
            />
          </NavLi>
          <Dropdown class="w-44 z-20 bg-gray-150 dark:bg-gray-500">
            <DropdownItem href={Workflow} target="_blank"
              >Team Workflow</DropdownItem
            ><DropdownDivider />
            <DropdownItem href={WWMMobile} target="_blank"
              >Mobile Architecture</DropdownItem
            ><DropdownDivider />
            <DropdownItem href={WWMLandscape} target="_blank"
              >App Landscape</DropdownItem
            >
          </Dropdown>
          <DropdownDivider />
          <NavLi class="my-2 cursor-pointer">
            HP<ChevronDownOutline
              class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline"
            />
          </NavLi>
          <Dropdown class="w-44 z-20 bg-gray-150 dark:bg-gray-500">
            <DropdownItem href={SIOverview} target="_blank"
              >Sudden Impact Overview</DropdownItem
            ><DropdownDivider />
            <DropdownItem href={SIAL} target="_blank"
              >Sudden Impact Architecture</DropdownItem
            >
          </Dropdown>
          <DropdownDivider />
          <NavLi class="my-2 cursor-pointer">
            X-Fab<ChevronDownOutline
              class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline"
            />
          </NavLi>
          <Dropdown class="w-44 z-20 bg-gray-150 dark:bg-gray-500">
            <DropdownItem href={Internship} target="_blank"
              >Internship Projects Overview</DropdownItem
            ><DropdownDivider />
            <DropdownItem href={PlasmaTraceSystem} target="_blank"
              >Plasma Trace</DropdownItem
            ><DropdownDivider />
            <DropdownItem href={ChemicalTracking} target="_blank"
              >Chemical Tracking</DropdownItem
            ><DropdownDivider />
            <DropdownItem href={MaskToolingManual} target="_blank"
              >Mask Tooling Manual</DropdownItem
            ><DropdownDivider />
            <DropdownItem href={DeviceMTM} target="_blank"
              >Device MTM</DropdownItem
            ><DropdownDivider />
            <DropdownItem href={MiscProjects} target="_blank"
              >Misc. Projects</DropdownItem
            ><DropdownDivider />
            <DropdownItem href={OtherInformationAboutMe} target="_blank"
              >Other Information</DropdownItem
            >
          </Dropdown>
          <DropdownDivider />
          <NavLi class="my-2 cursor-pointer">
            Texas Tech<ChevronDownOutline
              class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline"
            />
          </NavLi>
          <Dropdown class="w-44 z-20 bg-gray-150 dark:bg-gray-500">
            <DropdownItem href={Lab1Project1} target="_blank"
              >Lab 1 Project 1 PPT</DropdownItem
            ><DropdownDivider />
            <DropdownItem href={Lab1Project2Presentation} target="_blank"
              >Lab 1 Project 2 PPT</DropdownItem
            ><DropdownDivider />
            <DropdownItem href={Lab1Project2} target="_blank"
              >Lab 1 Project 2 DOC</DropdownItem
            ><DropdownDivider />
            <DropdownItem href={Lab2TrialVideo} target="_blank"
              >Lab 1 Project 2 Trial Video</DropdownItem
            ><DropdownDivider />
            <DropdownItem href={Lab2FinalPresentation} target="_blank"
              >Lab 2 PPT</DropdownItem
            ><DropdownDivider />
            <DropdownItem href={Lab2FinalReport} target="_blank"
              >Lab 2 DOC</DropdownItem
            ><DropdownDivider />
            <DropdownItem href={Lab3FinalPresentation} target="_blank"
              >Lab 3 PPT</DropdownItem
            ><DropdownDivider />
            <DropdownItem href={Lab3FinalReport} target="_blank"
              >Lab 3 DOC</DropdownItem
            ><DropdownDivider />
            <DropdownItem href={ProjectLabVFinalReport} target="_blank"
              >Lab 4/5 DOC</DropdownItem
            ><DropdownDivider />
            <DropdownItem
              href={MicroprocessorArchitectureFinalProjectR}
              target="_blank"
              >Microprocessor Architecture Final Project</DropdownItem
            ><DropdownDivider />
            <DropdownItem href={TrellisDesignforLHUCA} target="_blank"
              >Misc. Engineering Project DOC</DropdownItem
            ><DropdownDivider />
            <DropdownItem href={Transcript_Kromero} target="_blank"
              >Transcript</DropdownItem
            >
          </Dropdown>
          <DropdownDivider />
          <NavLi class="my-2 cursor-pointer">
            Other<ChevronDownOutline
              class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline"
            />
          </NavLi>
          <Dropdown class="w-44 z-20 bg-gray-150 dark:bg-gray-500">
            <DropdownItem href={Sentiment} target="_blank"
              >Twitter Sentiment Analysis</DropdownItem
            ><DropdownDivider />
            <DropdownItem href={RPi} target="_blank"
              >RPi LED Display</DropdownItem
            >
          </Dropdown>
        </Dropdown>
        <NavLi href="https://kgromero-react.netlify.app/" class="my-2 text-black/60 dark:text-gray-400">Old Site (React)</NavLi>
        <DarkMode />
      </NavUl>
    <!-- </NavContainer> -->
  </Navbar>
  <div
    class="container mx-auto rounded-lg text-center border dark:border-white/10 py-2  bg-gray-50 dark:bg-gray-800"
  >
    <Heading color="text-black/60 mb-2 dark:text-gray-400">Kyle Romero</Heading>
    <P class="text-center text-black/60 dark:text-gray-400"
      >Director of Software Development with {yearsExperience} years experience in
      IT based out of Jersey City, NJ.</P
    >
  </div>
  <div class="container mx-auto my-2 lg:grid grid-cols-4">
    <Card class="text-center items-center max-w-full bg-gray-50" padding="xs">
      <b class="pt-1 pb-3">About Me</b>
      <hr class="border w-full" /><br/>
      <img class="w-1/2 rounded-full" alt="Kyle Romero" src={Profile} /><br/>
      <hr class="border w-full" /><br/>
      IT Leader with 10 years as a full-stack developer and 6 years in software development management. Looking for
      the next opportunity to lead a development organization to success, maximize business value, and provide a great
      user experience. Adherent to servant leadership and continuous improvement. Skilled at bridging the communication gap between technical and non-technical personnel.
      Texas born Cajun living in the NYC Metro Area.
    </Card>
    <Card class="items-center text-center mx-auto max-w-full bg-gray-50" padding="xs">
      <b class="pt-1 pb-3">Contact Info</b>
      <hr class="border w-full" /><br/>
      <img
        alt="vCard (Scan on Phone to add to Contacts)"
        title="vCard (Scan on Phone to add to Contacts)"
        src={QR}
        class="justify-center w-60"
      />
      <br/>
      <hr class="border w-60" />
      <ul class="my-4 space-y-4">
        <li class="flex space-x-2">
          <Fa icon={faPhone} />
          <span
            class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"
            ><a href="tel://+12818579006">(281) 857-9006</a></span
          >
        </li>
        <li class="flex space-x-2">
          <Fa icon={faEnvelope} />
          <span
            class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"
            ><a href="mailto:kgromero@gmail.com" target="_top"
              >kgromero@gmail.com</a
            ></span
          >
        </li>
        <hr class="border w-60 border-gray-200 dark:border-gray-700" />
        <li class="flex space-x-2">
          <Fa icon={faLinkedin} />
          <span
            class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"
            ><a href="https://www.linkedin.com/in/kyleromero/" target="_blank">LinkedIn</a
            ></span
          >
        </li>
        <li class="flex space-x-2">
          <Fa icon={faGithub} />
          <a href="https://github.com/romero927" target="_blank">Github</a>
        </li>
        <hr class="border w-60 border-gray-200 dark:border-gray-700" />
        <li class="flex space-x-2">
          <Fa icon={faLink} />
          <span
            class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"
          >
            <a href="https://linktr.ee/kgromero" target="_blank">Linktree</a></span
          >
        </li>
        <hr class="border w-60 border-gray-200 dark:border-gray-700" />
      </ul>
    </Card>
    <Card class="items-center mx-auto max-w-full bg-gray-50" padding="xs">
      <b class="pt-1 pb-3">Experience</b>
      <hr class="border w-full" /><br/>
      <Timeline class="text-xs p-0 m-0 ml-3 mr-3">
        <TimelineItem date="Mar 2023 - May 2024" classLi="mb-5"
          ><br /><b>Director of Software Development, Raymour & Flanigan</b
          ></TimelineItem
        >
        <TimelineItem date="Apr 2021 - Mar 2023" classLi="mb-5"
          ><br /><b>Director of Operations Technology, MEARS Group</b
          ></TimelineItem
        >
        <TimelineItem date="Mar 2020 - Apr 2021" classLi="mb-5"
          ><br /><b>Senior Manager of Operations Technology, MEARS Group</b
          ></TimelineItem
        >
        <TimelineItem date="Oct 2017 - Mar 2020" classLi="mb-5"
          ><br /><b>Manager of Operations Technology, MEARS Group</b
          ></TimelineItem
        >
        <TimelineItem date="Apr 2016 — Oct 2017" classLi="mb-5"
          ><br /><b
            >Team Lead / Senior Software Developer, Worldwide Machinery</b
          ></TimelineItem
        >
        <TimelineItem date="Dec 2013 — Feb 2016" classLi="mb-5"
          ><br /><b>Technical Lead (IT Developer / Engineer III), HP</b
          ></TimelineItem
        >
        <TimelineItem date="Dec 2011 - Dec 2013" classLi="mb-5"
          ><br /><b>Senior Developer (IT Developer / Engineer II), HP</b
          ></TimelineItem
        > 
        <TimelineItem date="July 2007 — Dec 2011" classLi="mb-5"
          ><br /><b>Software / Systems Engineer, X-Fab, Texas</b></TimelineItem
        >
        <TimelineItem date="May 2007 — July 2007" classLi="mb-5"
          ><br /><b>Software Development Intern, X-Fab, Texas</b></TimelineItem
        >
        <TimelineItem date="May 2005 — Dec 2009" classLi="mb-5"
          ><br /><b
            >Bachelor of Science in Computer Engineering, Texas Tech University</b
          ></TimelineItem
        >
      </Timeline>
    </Card>
    <Card class="items-center mx-auto max-w-full bg-gray-50" padding="xs">
      <b class="pt-1 pb-3">Interests</b>
      <hr class="border w-full" /><br/>
      <ul class="space-y-4">
        <li >
          <b>Want To Learn:</b> Django, Vue, Phoenix, Java, Spring Boot, Rust, Scala, GoLang, K8s, Blockchain, GraphQL, PostgreSQL, MongoDB, RabbitMQ, LLMs
        </li>
        <Hr />
        <li >
         <b>Current Project:</b> Raspberry Pi and RTL-SDR.
        </li>
        <Hr />
        <li >
          <b>Other Interests:</b> Spin Class, PC Gaming, Reading (SFF), Nature / National Parks,
          Broadway, Theme Parks, Travel
        </li>
        <Hr />
        <li>
          <div class="text-center pb-5"><b>Favorite Blogs and Tech Resources</b></div>
          <Listgroup active items={links} let:item class="w-48 text-center w-full">
            {item.name}
          </Listgroup>
        </li>
      </ul>
    </Card>
  </div>
  <Footer>
    <FooterCopyright
      href="/"
      by="Kyle Romero"
      year={2024}
      copyrightMessage="- Site built in SvelteKit, utilizing TailwindCSS, FontAwesome, and Flowbite. Hosted on Netlify."
    />
  </Footer>
</div>
