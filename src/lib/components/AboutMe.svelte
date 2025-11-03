<script>
  import { Card, Hr } from 'flowbite-svelte';
  import { t } from '$lib/i18n';


</script>

<div class="neo-bold-card items-center flex flex-col max-w-full h-full bg-white rounded-lg" padding="xs" role="region" aria-label="About Me">
    <div class="lg:flex lg:space-x-2">
      <div class="flex-shrink-0">
        <img 
          class="w-full max-w-[55px] mx-auto rounded-full m-1 lazy-image" 
          alt="Kyle Romero profile photo" 
          src="/images/kgromero.webp"
        />
      </div>
      <p class="text-sm text-pretty break-words leading-relaxed">{$t.aboutMe.content}</p>
    </div>
</div>
