<script>
    import { Card, Hr } from 'flowbite-svelte';
    import { t } from '$lib/i18n';
    import { lazyLoad } from '$lib/utils';
    import Fa from 'svelte-fa';
    import { faPhone, faEnvelope, faLink, faChartLine, faTerminal, faWalkieTalkie, faComments } from '@fortawesome/free-solid-svg-icons';
    import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
  </script>
  
  <div class="neo-card items-center flex flex-col max-w-full h-full bg-white " padding="xs">
    <b class="pt-1 pb-3">{$t.contactInfo.title}</b>
  <Hr classHr="border w-full m-2" />
    <br />
    <img 
        alt="vCard (Scan on Phone to add to Contacts)" 
        title="vCard (Scan on Phone to add to Contacts)" 
        src="/images/QR.webp"
        class="w-full max-w-[200px] mx-auto block transition-all duration-200 origin-left hover:scale-105 cursor-default group" 
      />
    <br />
  <Hr classHr="border w-full m-4" />
    <ul class="my-4 space-y-4 text-base mt-5">
      <li class="flex space-x-2 block transition-all duration-200 origin-left hover:scale-105 cursor-default group">
        <Fa icon={faPhone} class="group-hover:text-neo-orange" />
        <span class="font-normal leading-tight">
          <a href="tel://+12818579006">{$t.contactInfo.phone}</a>
        </span>
      </li>
      <li class="flex space-x-2 block transition-all duration-200 origin-left hover:scale-105 cursor-default group">
        <Fa icon={faEnvelope} class="group-hover:text-neo-orange" />
        <span class="font-normal leading-tight">
          <a href="mailto:kgromero@gmail.com" target="_top">{$t.contactInfo.email}</a>
        </span>
      </li>
    <Hr classHr="border w-full m-1" />
      <li class="flex space-x-2 block transition-all duration-200 origin-left hover:scale-105 cursor-default group">
        <Fa icon={faLinkedin} class="group-hover:text-neo-orange"/>
        <span class="font-normal leading-tight ">
          <a href="https://www.linkedin.com/in/kyleromero/" target="_blank">{$t.contactInfo.linkedin}</a>
        </span>
      </li>
      <li class="flex space-x-2 block transition-all duration-200 origin-left hover:scale-105 cursor-default group">
        <Fa icon={faGithub} class="group-hover:text-neo-orange" />
        <a href="https://github.com/romero927" target="_blank">{$t.contactInfo.github}</a>
      </li>
      <Hr classHr="border w-full m-1 " />
      <li class="flex space-x-2 block transition-all duration-200 origin-left hover:scale-105 cursor-default group">
        <Fa icon={faLink} class="group-hover:text-neo-orange"/>
        <span class="font-normal leading-tight ">
          <a href="https://linktr.ee/kgromero" target="_blank">{$t.contactInfo.linktree}</a>
        </span>
      </li>
    <Hr classHr="border w-full m-1" />
    </ul>
  </div>