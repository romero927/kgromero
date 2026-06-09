<script>
  import { Terminal } from 'lucide-svelte';
  let { onClick, class: className = '' } = $props();
</script>

<button
  onclick={onClick}
  class="neo-button-ghost flex items-center justify-center {className}"
  aria-label="Open resume terminal"
>
  <Terminal size={20} />
</button>
