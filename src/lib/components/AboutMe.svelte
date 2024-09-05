<script>
  import { Card, Hr } from 'flowbite-svelte';
  import { t } from '$lib/i18n';
  import { lazyLoad } from '$lib/utils';
  import Fa from 'svelte-fa';
  import { faChartLine } from '@fortawesome/free-solid-svg-icons';
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
  <div class="text-base">{$t.aboutMe.content}</div>
  <br />
  <Hr classHr="border w-full m-1" />
  <br />
  <div class="text-base ">{$t.aboutMe.openTo}</div>
  <br />
  <Hr classHr="border w-full m-1" />
  <br />
  <div class="text-base flex w-full">
    <Fa icon={faChartLine} />
    <span class="leading-tight ml-2 text-gray-500 dark:text-gray-400">
      <a href="https://pagespeed.web.dev/analysis/https-kgromero-com/tm28614li4?form_factor=desktop" target="_blank">Site PageSpeed</a>
    </span>
  </div>
</Card>