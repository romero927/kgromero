<script>
  import { t } from '$lib/i18n';
  import AllSkillsModal from './AllSkillsModal.svelte';
  import { ArrowRight } from 'lucide-svelte';

  let showModal = $state(false);

  function openModal() {
    showModal = true;
  }
</script>

<div class="neo-card max-w-full" role="region" aria-label="Skills">
  <h2 class="card-title mb-4">{$t.skills.title}</h2>

  <ul class="relative pl-6 space-y-5 text-xs w-full">
    <!-- Vertical line -->
    <div class="absolute left-[7px] top-2 bottom-2 w-[2px] bg-neo-black/15 dark:bg-gray-700" aria-hidden="true"></div>

    {#each $t.skills.companies as company}
      <li class="relative block group break-words">
        <!-- Bullet dot -->
        <div class="absolute left-[-22px] top-[5px] h-3 w-3 rounded-full border-2 border-neo-black
                    dark:border-neo-orange bg-neo-cream dark:bg-dark-card transition-all duration-200
                    group-hover:bg-neo-orange group-hover:scale-110" aria-hidden="true"></div>

        <div class="transition-transform duration-200 origin-left group-hover:translate-x-0.5">
          <a
            href={company.url}
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm font-bold text-neo-black dark:text-gray-100 group-hover:text-neo-orange dark:group-hover:text-neo-orange transition-colors"
            aria-label={`Visit ${company.name} website`}
          >
            {company.name}
          </a>
          {#if company.client && company.client_url}
            <div class="mt-0.5 text-[11px]">
              <span class="text-neo-black/55 dark:text-gray-400">Client: </span>
              <a
                href={company.client_url}
                target="_blank"
                rel="noopener noreferrer"
                class="hover:underline text-neo-black/70 dark:text-gray-400"
                aria-label={`Visit ${company.client} website`}
              >
                {company.client}
              </a>
            </div>
          {/if}
          <div class="mt-1 text-[11px] leading-relaxed text-neo-black/70 dark:text-gray-400 break-words">
            {company.techStack}
          </div>
        </div>
      </li>
    {/each}
  </ul>

  <div class="mt-auto pt-6 w-full">
    <button
      onclick={openModal}
      class="neo-cta"
      aria-label="View all skills"
    >
      <span>View All Skills</span>
      <ArrowRight size={16} class="neo-cta-arrow" aria-hidden="true" />
    </button>
  </div>
</div>

<AllSkillsModal bind:showModal />
