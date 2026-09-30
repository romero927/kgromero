<script>
  import { t } from '$lib/i18n';
  import Modal from './Modal.svelte';

  let { showModal = $bindable(false) } = $props();
</script>

<Modal bind:open={showModal} title={$t.skills.allSkills.title} size="max-w-4xl" bodyClass="p-4 sm:p-6 neo-scroll">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
    {#each $t.skills.allSkills.categories as category}
      <div class="relative group break-words">
        <div class="flex items-start">
          <!-- Bullet dot -->
          <div class="flex-shrink-0 mt-[6px] mr-2 sm:mr-3 h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full border-2 border-neo-black
                      dark:border-neo-accent bg-neo-cream dark:bg-dark-card transition-transform duration-200
                      group-hover:scale-125 sm:group-hover:scale-150 group-hover:bg-neo-accent" aria-hidden="true">
          </div>

          <div class="flex-1 min-w-0">
            <div class="mb-1 sm:mb-2">
              <strong class="neo-highlight inline-block text-sm sm:text-base">
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
</Modal>
