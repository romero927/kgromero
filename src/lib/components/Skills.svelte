<script>
    import { Card, Hr } from 'flowbite-svelte';
    import { t } from '$lib/content';
  </script>
  
  <Card class="items-center mx-auto max-w-full h-full bg-gray-50" padding="xs">
    <b class="pt-1 pb-3">{$t.skills.title}</b>
    <Hr classHr="border w-full m-1" />
    <br />
    <ul class="space-y-2.5 text-xs p-0 m-0 ml-3 mr-3">
      {#each Object.entries($t.skills.categories) as [category, skills]}
        <li>
          <b>{category}: </b>{skills}
        </li>
      {/each}
    </ul>
  </Card>
  