<script>
  import { Hr } from 'flowbite-svelte';
  import { t } from '$lib/i18n';
</script>

<div class="neo-card items-center flex flex-col max-w-full h-full bg-white" padding="xs" role="region" aria-label="Skills">
  <h2 class="pt-1 pb-1 text-base font-bold">{$t.skills.title}</h2>
  <Hr classHr="border w-full m-2" />
  <br />
  <ul class="relative pl-6 space-y-4 text-xs p-0 m-0 ml-3 mr-3 w-full">
    {#each $t.skills.companies as company}
      <li class="relative block transition-all duration-200 origin-left hover:scale-[1.02] cursor-default group break-words mb-4">
        <!-- Bullet dot -->
        <div class="absolute left-[-22px] top-[6px] h-3 w-3 rounded-full border border-neo-white 
                    dark:border-gray-500 bg-dark-card transition-transform duration-200 
                    group-hover:scale-150 group-hover:bg-neo-orange" aria-hidden="true"></div>
        
        <div class="mb-1">
          <strong class="group-hover:text-neo-orange text-sm">{company.name}</strong>
        </div>
        <div class="break-words">
          <span class="break-words">{company.techStack}</span>
        </div>
      </li>
    {/each}
  </ul>
</div>
