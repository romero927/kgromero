<script>
  import { Terminal } from 'lucide-svelte';
  let { onClick, class: className = '' } = $props();
</script>

<button
  onclick={onClick}
  class="neo-button flex items-center justify-center {className}"
>
  <Terminal size={20} />
</button>
