<script>
  import { t } from '$lib/i18n';
  import { Camera } from '@lucide/svelte';
  import Modal from './Modal.svelte';

  let showPhoto = $state(false);
</script>

<div class="neo-card max-w-full justify-center" role="region" aria-label="About Me">
  <h2 class="card-title mb-4">
    <button
      type="button"
      class="group inline-flex items-center gap-2 text-left uppercase cursor-pointer rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neo-accent"
      onclick={() => (showPhoto = true)}
    >
      <span class="underline-offset-4 decoration-2 decoration-neo-accent group-hover:underline">{$t.aboutMe.title}</span>
      <Camera size="0.9em" class="text-neo-black/35 group-hover:text-neo-accent dark:text-gray-500 transition-colors" aria-hidden="true" />
      <span class="sr-only">(view photo)</span>
    </button>
  </h2>
  <p class="text-sm sm:text-[15px] text-pretty wrap-break-word leading-relaxed text-neo-black/85 dark:text-gray-300">
    {$t.aboutMe.content}
  </p>
</div>

<Modal bind:open={showPhoto} title={$t.name} size="max-w-md">
  <img src="/images/kgromero.webp" alt="Kyle Romero" width="640" height="640" class="w-full h-auto border-2 border-neo-black dark:border-dark-border" />
</Modal>
