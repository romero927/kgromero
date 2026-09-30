<script>
  import TerminalButton from './TerminalButton.svelte';
  import ResumeShellModal from './ResumeShellModal.svelte';

  let { class: className = '' } = $props();
  let isModalOpen = $state(false);
</script>

<TerminalButton onClick={() => (isModalOpen = true)} class={className}/>
<ResumeShellModal bind:open={isModalOpen} />
