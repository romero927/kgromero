<script>
  import { theme } from '$lib/store';
  import { Moon, Sun } from 'lucide-svelte';

  let { class: className = '' } = $props();

  const toggleTheme = () => {
    $theme = $theme === 'dark' ? 'light' : 'dark';
  };
</script>

<button
  onclick={toggleTheme}
  class="neo-button flex items-center justify-center {className}"
  aria-label="Toggle theme"
>
  {#if $theme === 'dark'}
    <Sun size={20} />
  {:else}
    <Moon size={20} />
  {/if}
</button>
