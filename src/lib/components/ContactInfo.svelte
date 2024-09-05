<script>
    import { Card, Hr } from 'flowbite-svelte';
    import { t } from '$lib/i18n';
    import { lazyLoad } from '$lib/utils';
    import Fa from 'svelte-fa';
    import { faPhone, faEnvelope, faLink, faChartLine } from '@fortawesome/free-solid-svg-icons';
    import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
  </script>
  
  <Card class="items-center text-center mx-auto max-w-full h-full bg-gray-50 " padding="xs">
    <b class="pt-1 pb-3">{$t.contactInfo.title}</b>
    <Hr classHr="border w-full m-1" />
    <br />
    <img
      alt="vCard (Scan on Phone to add to Contacts)"
      title="vCard (Scan on Phone to add to Contacts)"
      src="/images/QR.webp"
    />
    <br />
    <Hr classHr="border w-60 m-1" />
    <ul class="my-4 space-y-4 text-base">
      <li class="flex space-x-2">
        <Fa icon={faPhone} />
        <span class="font-normal leading-tight text-gray-500 dark:text-gray-400">
          <a href="tel://+12818579006">{$t.contactInfo.phone}</a>
        </span>
      </li>
      <li class="flex space-x-2">
        <Fa icon={faEnvelope} />
        <span class="font-normal leading-tight text-gray-500 dark:text-gray-400">
          <a href="mailto:kgromero@gmail.com" target="_top">{$t.contactInfo.email}</a>
        </span>
      </li>
      <Hr classHr="border w-60 border-gray-200 dark:border-gray-700" />
      <li class="flex space-x-2">
        <Fa icon={faLinkedin} />
        <span class="font-normal leading-tight text-gray-500 dark:text-gray-400">
          <a href="https://www.linkedin.com/in/kyleromero/" target="_blank">{$t.contactInfo.linkedin}</a>
        </span>
      </li>
      <li class="flex space-x-2">
        <Fa icon={faGithub} />
        <a href="https://github.com/romero927" target="_blank">{$t.contactInfo.github}</a>
      </li>
      <Hr classHr="border w-60 border-gray-200 dark:border-gray-700" />
      <li class="flex space-x-2">
        <Fa icon={faLink} />
        <span class="font-normal leading-tight text-gray-500 dark:text-gray-400">
          <a href="https://linktr.ee/kgromero" target="_blank">{$t.contactInfo.linktree}</a>
        </span>
      </li>
      <Hr classHr="border w-60 border-gray-200 dark:border-gray-700" />
    </ul>
  </Card>