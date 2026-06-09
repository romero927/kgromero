<script>
  import { t } from '$lib/i18n';
  import Fa from 'svelte-fa';
  import { faPhone, faEnvelope, faLink, faQrcode } from '@fortawesome/free-solid-svg-icons';
  import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
  import { ArrowRight } from 'lucide-svelte';
  
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
  
  <div class="neo-card max-w-full" role="region" aria-label="Contact Information">
    <h2 class="card-title mb-4">{$t.contactInfo.title}</h2>

    <ul class="space-y-3 text-sm w-full">
      <li class="flex items-start space-x-3 group">
        <Fa icon={faPhone} class="group-hover:text-neo-orange transition-colors flex-shrink-0 mt-1 text-neo-black/55 dark:text-gray-400" aria-hidden="true" />
        <a href="tel:+12818579006" class="break-all leading-tight hover:text-neo-orange transition-colors" aria-label="Phone number">{$t.contactInfo.phone}</a>
      </li>
      <li class="flex items-start space-x-3 group">
        <Fa icon={faEnvelope} class="group-hover:text-neo-orange transition-colors flex-shrink-0 mt-1 text-neo-black/55 dark:text-gray-400" aria-hidden="true" />
        <a href="mailto:kgromero@gmail.com" target="_top" class="break-all leading-tight hover:text-neo-orange transition-colors" aria-label="Email address">{$t.contactInfo.email}</a>
      </li>
      <li class="flex items-start space-x-3 group">
        <Fa icon={faLinkedin} class="group-hover:text-neo-orange transition-colors flex-shrink-0 mt-1 text-neo-black/55 dark:text-gray-400" aria-hidden="true"/>
        <a href="https://www.linkedin.com/in/kyleromero/" target="_blank" rel="noopener noreferrer" class="break-all leading-tight hover:text-neo-orange transition-colors" aria-label="LinkedIn profile">LinkedIn</a>
      </li>
      <li class="flex items-start space-x-3 group">
        <Fa icon={faGithub} class="group-hover:text-neo-orange transition-colors flex-shrink-0 mt-1 text-neo-black/55 dark:text-gray-400" aria-hidden="true" />
        <a href="https://github.com/romero927" target="_blank" rel="noopener noreferrer" class="break-all leading-tight hover:text-neo-orange transition-colors" aria-label="GitHub profile">GitHub</a>
      </li>
      <li class="flex items-start space-x-3 group">
        <Fa icon={faLink} class="group-hover:text-neo-orange transition-colors flex-shrink-0 mt-1 text-neo-black/55 dark:text-gray-400" aria-hidden="true"/>
        <a href="https://linktr.ee/kgromero" target="_blank" rel="noopener noreferrer" class="break-all leading-tight hover:text-neo-orange transition-colors" aria-label="Linktree profile">{$t.contactInfo.linktree}</a>
      </li>
    </ul>

    <div class="mt-auto pt-5">
      <button
        class="neo-cta"
        onclick={() => showQRModal = true}
        aria-label="Show contact QR code"
      >
        <span class="flex items-center gap-2">
          <Fa icon={faQrcode} aria-hidden="true" />
          Contact QR Code
        </span>
        <ArrowRight size={16} class="neo-cta-arrow" aria-hidden="true" />
      </button>
    </div>
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
