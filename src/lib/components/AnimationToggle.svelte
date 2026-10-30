<script>
  import { animations } from '$lib/store';
  import { Pause, Play } from '@lucide/svelte';

  let { class: className = '' } = $props();
</script>

<!-- Hidden on phones and tablets, where the animation is always off -->
<button
  onclick={() => ($animations = !$animations)}
  class="neo-button-ghost flex items-center justify-center touch:hidden {className}"
  aria-label={$animations ? 'Turn off background animation' : 'Turn on background animation'}
  aria-pressed={!$animations}
  title={$animations ? 'Turn off background animation' : 'Turn on background animation'}
>
  {#if $animations}
    <Pause size={20} />
  {:else}
    <Play size={20} />
  {/if}
</button>
