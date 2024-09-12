<script>
  import TerminalButton from './TerminalButton.svelte';
  import ResumeShellModal from './ResumeShellModal.svelte';

  let isModalOpen = false;

  function openModal() {
    isModalOpen = true;
  }

  function closeModal() {
    isModalOpen = false;
  }
</script>

<TerminalButton onClick={openModal}/>
<ResumeShellModal isOpen={isModalOpen} onClose={closeModal} />