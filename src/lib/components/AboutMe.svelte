<script>
  import { Card, Hr } from 'flowbite-svelte';
  import { t } from '$lib/i18n';
  import { lazyLoad } from '$lib/utils';
  import Fa from 'svelte-fa';
  import { faChartLine } from '@fortawesome/free-solid-svg-icons';
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
  <div class="text-base flex w-full block transition-all duration-200 origin-left hover:scale-105 cursor-default group">
    <Fa icon={faChartLine} class="group-hover:text-neo-orange" />
    <span class="leading-tight ml-2 ">
      <a href="https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fkgromero.com%2F" target="_blank">Site PageSpeed</a>
    </span>
  </div>
</div>