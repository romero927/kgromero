<script>
  import { theme } from '$lib/store';
  import { Moon, Sun } from 'lucide-svelte';

  const toggleTheme = () => {
    $theme = $theme === 'dark' ? 'light' : 'dark';
  };
</script>

<button 
  on:click={toggleTheme} 
  class="neo-button p-2 flex items-center justify-center"
  aria-label="Toggle theme"
>
  {#if $theme === 'dark'}
    <Sun size={20} />
  {:else}
    <Moon size={20} />
  {/if}
</button>