<script>
  import { Terminal } from 'lucide-svelte';
  let { onClick } = $props();
</script>

<button
  onclick={onClick}
  class="neo-button px-2 flex items-center justify-center"
>
  <Terminal size={20} />
</button>
