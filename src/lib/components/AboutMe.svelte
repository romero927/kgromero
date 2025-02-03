<script>
  import { Card, Hr } from 'flowbite-svelte';
  import { t } from '$lib/i18n';


</script>

<div class="neo-bold-card items-center flex flex-col max-w-full h-full bg-white " padding="xs">
  <b class="pt-1 pb-3">{$t.aboutMe.title}</b>
  <Hr classHr="border w-full m-2" />
    <div class="lg:flex lg:space-x-2">
      <div class="">
        <img 
          class="w-full max-w-[200px] mx-auto rounded-full m-1 lazy-image" 
          alt="Kyle Romero" 
          src="/images/kgromero.webp"
        />
      </div>
      <div class="text-base">{$t.aboutMe.content}</div>
    </div>
    <br />
    <Hr classHr="border w-full m-2" />
    <br />
    <div class="text-base "><b>{$t.aboutMe.openTo}</b></div>
    <br />
    <Hr classHr="border w-full m-2" />
    <br />
</div>