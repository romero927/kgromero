<script>
  import { Hr } from 'flowbite-svelte';
  import { t } from '$lib/i18n';
  
  export let showModal = false;
  
  function closeModal() {
    showModal = false;
  }
  
  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  }
</script>

<svelte:window on:keydown={handleKeyDown} />

{#if showModal}
  <!-- Modal Backdrop -->
  <div 
    class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    on:click={closeModal}
    role="presentation"
  >
    <!-- Modal Content -->
    <div 
      class="neo-card bg-white dark:bg-dark-card max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      on:click|stopPropagation
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <!-- Modal Header -->
      <div class="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 id="modal-title" class="text-2xl font-bold text-gray-900 dark:text-white">
          {$t.skills.allSkills.title}
        </h2>
        <button
          on:click={closeModal}
          class="text-gray-500 hover:text-neo-orange dark:text-gray-400 dark:hover:text-neo-orange 
                 text-3xl font-bold transition-colors duration-200 leading-none px-2"
          aria-label="Close modal"
        >
          ×
        </button>
      </div>
      
      <!-- Modal Body -->
      <div class="overflow-y-auto p-6 flex-1">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          {#each $t.skills.allSkills.categories as category}
            <div class="relative group break-words">
              <div class="flex items-start">
                <!-- Bullet dot -->
                <div class="flex-shrink-0 mt-[6px] mr-3 h-3 w-3 rounded-full border border-neo-white 
                            dark:border-gray-500 bg-dark-card transition-transform duration-200 
                            group-hover:scale-150 group-hover:bg-neo-orange" aria-hidden="true">
                </div>
                
                <div class="flex-1 min-w-0">
                  <div class="mb-2">
                    <strong class="group-hover:text-neo-orange text-base transition-colors duration-200">
                      {category.name}
                    </strong>
                  </div>
                  <div class="text-sm text-gray-700 dark:text-gray-300 break-words">
                    {category.skills}
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Custom scrollbar for modal */
  .overflow-y-auto {
    scrollbar-width: thin;
    scrollbar-color: #ff6b35 transparent;
  }
  
  .overflow-y-auto::-webkit-scrollbar {
    width: 8px;
  }
  
  .overflow-y-auto::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .overflow-y-auto::-webkit-scrollbar-thumb {
    background-color: #ff6b35;
    border-radius: 4px;
  }
  
  .overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background-color: #e55a2b;
  }
</style>
