<script>
  import { Card, Hr } from 'flowbite-svelte';
  import { t } from '$lib/i18n';
  import { lazyLoad } from '$lib/utils';
  import Fa from 'svelte-fa';
  import { faPhone, faEnvelope, faLink, faChartLine, faTerminal, faWalkieTalkie, faComments, faQrcode } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
  
  let showQRModal = false;
  
  function handleEscape(e) {
    if (e.key === 'Escape') {
      showQRModal = false;
    }
  }
  </script>
  
  <svelte:window on:keydown={handleEscape}/>
  
  <div class="neo-card items-center flex flex-col max-w-full h-full bg-white" padding="xs">
    <b class="pt-1 pb-1">{$t.contactInfo.title}</b>
    <Hr classHr="border w-full m-2" />
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
        <span class="font-normal leading-tight">
          <a href="https://www.linkedin.com/in/kyleromero/" target="_blank">{$t.contactInfo.linkedin}</a>
        </span>
      </li>
      <li class="flex space-x-2 block transition-all duration-200 origin-left hover:scale-105 cursor-default group">
        <Fa icon={faGithub} class="group-hover:text-neo-orange" />
        <a href="https://github.com/romero927" target="_blank">{$t.contactInfo.github}</a>
      </li>
      <Hr classHr="border w-full m-1" />
      <li class="flex space-x-2 block transition-all duration-200 origin-left hover:scale-105 cursor-default group">
        <Fa icon={faLink} class="group-hover:text-neo-orange"/>
        <span class="font-normal leading-tight">
          <a href="https://linktr.ee/kgromero" target="_blank">{$t.contactInfo.linktree}</a>
        </span>
      </li>
      <Hr classHr="border w-full m-1" />
      <button 
        class="neo-button p-2 flex items-center w-full justify-center" 
        on:click={() => showQRModal = true}
        aria-label="Show QR Code"
      >
        <Fa icon={faQrcode} class="m-2" />Contact QR Code
      </button>
      <Hr classHr="border w-full m-1" />
      <div class="text-base "><b>{$t.aboutMe.openTo}</b></div>
    </ul>
  </div>
  
  {#if showQRModal}
  <div 
    class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"
    role="dialog"
    aria-modal="true"
    aria-label="QR Code Modal"
  >
    <button
      class="absolute inset-0 w-full h-full cursor-default"
      on:click={() => showQRModal = false}
      aria-label="Close modal"></button>
    <div 
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg max-w-sm w-full mx-4"
    >
    <button 
        class="absolute top-2 right-2 neo-button"
        on:click={() => showQRModal = false}
      >
        X
      </button>
      
      <img
        alt="vCard (Scan on Phone to add to Contacts)"
        title="vCard (Scan on Phone to add to Contacts)"
        src="/images/QR.webp"
        class="w-full max-w-[200px] mx-auto"
      />
      <h3 class="text-lg font-bold mb-4 text-center">Scan (or long press) QR to Add Contact to Phone</h3>
    </div>
  </div>
  {/if}
