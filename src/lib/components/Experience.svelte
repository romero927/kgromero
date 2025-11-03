<script>
  import { t } from '$lib/i18n';
  import Timeline from './Timeline.svelte';
  import { Hr } from 'flowbite-svelte';
</script>

<div class="neo-card items-center flex flex-col max-w-full h-full bg-white dark:bg-dark-card" padding="xs" role="region" aria-label="Experience">
  <h2 class="pt-1 pb-1 text-base font-bold">{$t.experience.title}</h2>
<Hr classHr="border dark:border-gray-700 w-full m-2" />
  
  <div class="w-full px-4">
    <Timeline items={$t.experience.timeline} />
  </div>
</div>
