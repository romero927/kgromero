<script>
  import { t } from '$lib/i18n';
  import Timeline from './Timeline.svelte';
</script>

<div class="neo-card max-w-full" role="region" aria-label="Experience">
  <h2 class="card-title mb-4">{$t.experience.title}</h2>

  <div class="w-full">
    <Timeline items={$t.experience.timeline} />
  </div>
</div>
