<script>
    import { Terminal } from 'lucide-svelte';
  let { onClick } = $props();
  </script>
  
  <button
    onclick={onClick}
    class="neo-button"
  >
  <Terminal class="mr-2 pb-1" size={20} />
  </button>