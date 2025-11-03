<script>
  import { Card, Hr } from 'flowbite-svelte';
  import { t } from '$lib/i18n';
  import { lazyLoad } from '$lib/utils';
  import Fa from 'svelte-fa';
  import { faPhone, faEnvelope, faLink, faChartLine, faTerminal, faWalkieTalkie, faComments, faQrcode } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
  
  let showQRModal = $state(false);
  let modalRef = $state();
  
  function handleEscape(e) {
    if (e.key === 'Escape') {
      showQRModal = false;
    }
  }
  
  // Focus trap for modal
  $effect(() => {
    if (showQRModal && modalRef) {
      const focusableElements = modalRef.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      firstElement?.focus();
      
      const handleTabKey = (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement?.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement?.focus();
            }
          }
        }
      };
      
      document.addEventListener('keydown', handleTabKey);
      return () => document.removeEventListener('keydown', handleTabKey);
    }
  });
  </script>
  
  <svelte:window onkeydown={handleEscape}/>
  
  <div class="neo-card items-center flex flex-col max-w-full h-full bg-white " padding="xs" role="region" aria-label="Contact Information">
    <h2 class="pt-1 pb-1 text-base font-bold">{$t.contactInfo.title}</h2>
    <Hr classHr="border w-full m-2" />
    <ul class="my-4 space-y-4 text-sm mt-5 w-full">
      <li class="flex items-start space-x-2 transition-all duration-200 origin-left hover:scale-105 cursor-default group">
        <Fa icon={faPhone} class="group-hover:text-neo-orange flex-shrink-0 mt-0.5" aria-hidden="true" />
        <span class="font-normal leading-tight min-w-0 break-all">
          <a href="tel://+12818579006" class="break-all" aria-label="Phone number">{$t.contactInfo.phone}</a>
        </span>
      </li>
      <li class="flex items-start space-x-2 transition-all duration-200 origin-left hover:scale-105 cursor-default group">
        <Fa icon={faEnvelope} class="group-hover:text-neo-orange flex-shrink-0 mt-0.5" aria-hidden="true" />
        <span class="font-normal leading-tight min-w-0 break-all">
          <a href="mailto:kgromero@gmail.com" target="_top" class="break-all" aria-label="Email address">{$t.contactInfo.email}</a>
        </span>
      </li>
      <Hr classHr="border w-full m-1" />
      <li class="flex items-start space-x-2 transition-all duration-200 origin-left hover:scale-105 cursor-default group">
        <Fa icon={faLinkedin} class="group-hover:text-neo-orange flex-shrink-0 mt-0.5" aria-hidden="true"/>
        <span class="font-normal leading-tight min-w-0 break-all">
          <a href="https://www.linkedin.com/in/kyleromero/" target="_blank" rel="noopener noreferrer" class="break-all" aria-label="LinkedIn profile">{$t.contactInfo.linkedin}</a>
        </span>
      </li>
      <li class="flex items-start space-x-2 transition-all duration-200 origin-left hover:scale-105 cursor-default group">
        <Fa icon={faGithub} class="group-hover:text-neo-orange flex-shrink-0 mt-0.5" aria-hidden="true" />
        <a href="https://github.com/romero927" target="_blank" rel="noopener noreferrer" class="min-w-0 break-all" aria-label="GitHub profile">{$t.contactInfo.github}</a>
      </li>
      <Hr classHr="border w-full m-1" />
      <li class="flex items-start space-x-2 transition-all duration-200 origin-left hover:scale-105 cursor-default group">
        <Fa icon={faLink} class="group-hover:text-neo-orange flex-shrink-0 mt-0.5" aria-hidden="true"/>
        <span class="font-normal leading-tight min-w-0 break-all">
          <a href="https://linktr.ee/kgromero" target="_blank" rel="noopener noreferrer" class="break-all" aria-label="Linktree profile">{$t.contactInfo.linktree}</a>
        </span>
      </li>
      <Hr classHr="border w-full m-1" />
      <button 
        class="neo-button p-2 flex items-center w-full justify-center text-sm" 
        onclick={() => showQRModal = true}
        aria-label="Show contact QR code"
      >
        <Fa icon={faQrcode} class="mr-2" aria-hidden="true" />Contact QR Code
      </button>
      <Hr classHr="border w-full m-1" />
      <!-- <div class="text-sm break-words"><b>{$t.aboutMe.openTo}</b></div> -->
    </ul>
  </div>
  
  {#if showQRModal}
  <div 
    class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"
    role="dialog"
    aria-modal="true"
    aria-labelledby="qr-modal-title"
    bind:this={modalRef}
  >
    <button
      class="absolute inset-0 w-full h-full cursor-default"
      onclick={() => showQRModal = false}
      aria-label="Close modal"
      tabindex="-1"></button>
    <div 
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg max-w-sm w-full mx-4"
    >
    <button 
        class="absolute top-2 right-2 neo-button"
        onclick={() => showQRModal = false}
        aria-label="Close QR code modal"
      >
        <span aria-hidden="true">X</span>
      </button>
      
      <img
        alt="QR code to add Kyle Romero's contact information to your phone"
        src="/images/QR.webp"
        class="w-full max-w-[200px] mx-auto"
      />
      <h3 id="qr-modal-title" class="text-lg font-bold mb-4 text-center">Scan (or long press) QR to Add Contact to Phone</h3>
    </div>
  </div>
  {/if}
