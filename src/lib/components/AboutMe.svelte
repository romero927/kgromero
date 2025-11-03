<script>
  import { Card, Hr } from 'flowbite-svelte';
  import { t } from '$lib/i18n';


</script>

<div class="neo-bold-card items-center flex flex-col max-w-full h-full bg-white rounded-lg" padding="xs" role="region" aria-label="About Me">
    <div class="lg:flex lg:space-x-2">
      <p class="text-sm text-pretty break-words leading-relaxed">{$t.aboutMe.content}</p>
    </div>
</div>
