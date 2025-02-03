<script>
    import { Terminal } from 'lucide-svelte';
    export let onClick;
  </script>
  
  <button
    on:click={onClick}
    class="neo-button"
  >
  <Terminal class="mr-2 pb-1" size={20} />
  </button>