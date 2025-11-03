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
      class="neo-card bg-white dark:bg-dark-card max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col rounded-lg"
      on:click|stopPropagation
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <!-- Modal Header -->
      <div class="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 id="modal-title" class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white pr-2">
          {$t.skills.allSkills.title}
        </h2>
        <button
          on:click={closeModal}
          class="text-gray-500 hover:text-neo-orange dark:text-gray-400 dark:hover:text-neo-orange 
                 text-2xl sm:text-3xl font-bold transition-colors duration-200 leading-none p-2 min-w-[44px] min-h-[44px] 
                 flex items-center justify-center flex-shrink-0"
          aria-label="Close modal"
        >
          ×
        </button>
      </div>
      
      <!-- Modal Body -->
      <div class="overflow-y-auto p-4 sm:p-6 flex-1">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {#each $t.skills.allSkills.categories as category}
            <div class="relative group break-words">
              <div class="flex items-start">
                <!-- Bullet dot -->
                <div class="flex-shrink-0 mt-[6px] mr-2 sm:mr-3 h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full border border-neo-white 
                            dark:border-gray-500 bg-dark-card transition-transform duration-200 
                            group-hover:scale-125 sm:group-hover:scale-150 group-hover:bg-neo-orange" aria-hidden="true">
                </div>
                
                <div class="flex-1 min-w-0">
                  <div class="mb-1 sm:mb-2">
                    <strong class="group-hover:text-neo-orange text-sm sm:text-base transition-colors duration-200 block">
                      {category.name}
                    </strong>
                  </div>
                  <div class="text-xs sm:text-sm text-gray-700 dark:text-gray-300 break-words leading-relaxed">
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
