<script>
  import { Card, Hr } from 'flowbite-svelte';
  import { t } from '$lib/i18n';


</script>

<div class="neo-card items-center flex flex-col max-w-full h-full bg-white " padding="xs">
  <b class="pt-1 pb-3 ">{$t.aboutMe.title}</b>
<Hr classHr="border w-full m-4" />
  <br />
  <img 
    class="w-1/2 rounded-full m-1 lazy-image" 
    alt="Kyle Romero" 
    src="/images/kgromero.webp"
  />
  <br />
<Hr classHr="border w-full m-4" />
  <br />
  <div class="text-base">{$t.aboutMe.content}</div>
  <br />
<Hr classHr="border w-full m-4" />
  <br />
  <div class="text-base ">{$t.aboutMe.openTo}</div>
  <br />
  <Hr classHr="border w-full m-4" />
  <br />
</div>