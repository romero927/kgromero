<script>
  import { Card, Hr } from 'flowbite-svelte';
  import { t } from '$lib/content';
  import { lazyLoad } from '$lib/utils';
</script>

<Card class="items-center max-w-full h-full bg-gray-50" padding="xs">
  <b class="pt-1 pb-3">{$t.aboutMe.title}</b>
  <Hr classHr="border w-full m-1" />
  <br />
  <img 
    class="w-1/2 rounded-full m-1 lazy-image" 
    alt="Kyle Romero" 
    src="/images/kgromero.webp"
  />
  <br />
  <Hr classHr="border w-full m-1" />
  <br />
  {$t.aboutMe.content}
  <br /><br />
  <Hr classHr="border w-full m-1" />
  <br />
  {$t.aboutMe.openTo}
</Card>