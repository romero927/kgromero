<script>
  import TerminalButton from './TerminalButton.svelte';
  import ResumeShellModal from './ResumeShellModal.svelte';

  let { class: className = '' } = $props();
  let isModalOpen = $state(false);

  function openModal() {
    isModalOpen = true;
  }

  function closeModal() {
    isModalOpen = false;
  }
</script>

<TerminalButton onClick={openModal} class={className}/>
<ResumeShellModal isOpen={isModalOpen} onClose={closeModal} />