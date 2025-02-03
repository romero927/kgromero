<script>
    import { Card, Hr } from 'flowbite-svelte';
    import { t } from '$lib/i18n';
  </script>
  
  <div class="neo-card items-center flex flex-col max-w-full h-full bg-white " padding="xs">
    <b class="pt-1 pb-3">{$t.skills.title}</b>
  <Hr classHr="border w-full m-2" />
    <br />
    <ul class="space-y-2.5 text-xs p-0 m-0 ml-3 mr-3">
      {#each Object.entries($t.skills.categories) as [category, skills]}
        <li class="block transition-all duration-200 origin-left hover:scale-105 cursor-default group">
          <b class="group-hover:text-neo-orange">{category}:</b> {skills}
        </li>
      {/each}
    </ul>
  </div>
  