<script>
  import { t } from '$lib/i18n';
  import { ArrowRight, Link, Mail, Phone, QrCode } from '@lucide/svelte';
  import BrandIcon from './BrandIcon.svelte';
  import Modal from './Modal.svelte';
  
  let showQRModal = $state(false);
  </script>
  
  <div class="neo-card max-w-full" role="region" aria-label="Contact Information">
    <h2 class="card-title mb-4">{$t.contactInfo.title}</h2>

    <ul class="space-y-3 text-sm w-full">
      <li class="flex items-start space-x-3 group">
        <Phone size="1em" class="group-hover:text-neo-accent transition-colors flex-shrink-0 mt-1 text-neo-black/55 dark:text-gray-400" aria-hidden="true" />
        <a href="tel:+12818579006" class="neo-highlight break-all leading-tight" aria-label="Phone number">{$t.contactInfo.phone}</a>
      </li>
      <li class="flex items-start space-x-3 group">
        <Mail size="1em" class="group-hover:text-neo-accent transition-colors flex-shrink-0 mt-1 text-neo-black/55 dark:text-gray-400" aria-hidden="true" />
        <a href="mailto:kgromero@gmail.com" target="_top" class="neo-highlight break-all leading-tight" aria-label="Email address">{$t.contactInfo.email}</a>
      </li>
      <li class="flex items-start space-x-3 group">
        <BrandIcon name="linkedin" class="group-hover:text-neo-accent transition-colors flex-shrink-0 mt-1 text-neo-black/55 dark:text-gray-400" aria-hidden="true"/>
        <a href="https://www.linkedin.com/in/kyleromero/" target="_blank" rel="noopener noreferrer" class="neo-highlight break-all leading-tight" aria-label="LinkedIn profile">LinkedIn</a>
      </li>
      <li class="flex items-start space-x-3 group">
        <BrandIcon name="github" class="group-hover:text-neo-accent transition-colors flex-shrink-0 mt-1 text-neo-black/55 dark:text-gray-400" aria-hidden="true" />
        <a href="https://github.com/romero927" target="_blank" rel="noopener noreferrer" class="neo-highlight break-all leading-tight" aria-label="GitHub profile">GitHub</a>
      </li>
      <li class="flex items-start space-x-3 group">
        <Link size="1em" class="group-hover:text-neo-accent transition-colors flex-shrink-0 mt-1 text-neo-black/55 dark:text-gray-400" aria-hidden="true"/>
        <a href="https://linktr.ee/kgromero" target="_blank" rel="noopener noreferrer" class="neo-highlight break-all leading-tight" aria-label="Linktree profile">{$t.contactInfo.linktree}</a>
      </li>
    </ul>

    <div class="mt-auto pt-5">
      <button
        class="neo-cta"
        onclick={() => showQRModal = true}
        aria-label="Show contact QR code"
      >
        <span class="flex items-center gap-2">
          <QrCode size="1em" aria-hidden="true" />
          Contact QR Code
        </span>
        <ArrowRight size={16} class="neo-cta-arrow" aria-hidden="true" />
      </button>
    </div>
  </div>
  
  <Modal bind:open={showQRModal} title="Contact QR Code" size="max-w-sm">
    <img
      alt="QR code to add Kyle Romero's contact information to your phone"
      src="/images/QR.webp"
      class="w-full max-w-[220px] mx-auto bg-white p-2 border-2 border-neo-black dark:border-dark-border"
    />
    <p class="mt-4 text-sm text-center">Scan (or long press) the QR code to add my contact to your phone.</p>
  </Modal>
