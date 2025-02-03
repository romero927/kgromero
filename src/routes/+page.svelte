<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import NavBar from '$lib/components/NavBar.svelte';
  import AboutMe from '$lib/components/AboutMe.svelte';
  import ContactInfo from '$lib/components/ContactInfo.svelte';
  import Experience from '$lib/components/Experience.svelte';
  import Skills from '$lib/components/Skills.svelte';
  import Other from '$lib/components/Other.svelte';
  import { t } from '$lib/i18n';
  import { faChartLine } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa';
</script>

<div class="min-h-screen bg-neo-cream dark:bg-gray-900">
  <NavBar />

  <div class="container mx-auto neo-bold-card my-4 text-center">
    <h1 class="text-2xl font-bold mb-2">{$t.name}</h1>
    <p>
      {$t.description}
    </p>
  </div>

 <div class="container mx-auto my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
  {#each ['AboutMe', 'ContactInfo', 'Experience', 'Skills', 'Other'] as component}
    <div class="h-full" in:fade="{{ duration: 300, delay: 300 }}">
      <svelte:component this={{ AboutMe, ContactInfo, Experience, Skills, Other }[component]} />
    </div>
  {/each}
</div>

<footer class="container mx-auto neo-bold-card p-0" >
  <div class="text-center justify-center items-center flex w-full gap-2">
    <b>© {new Date().getFullYear()} Kyle Romero </b> {$t.footerMessage}
    <a href="https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fkgromero.com%2F" target="_blank" class="ml-2"><Fa icon={faChartLine} /></a>
  </div>
</footer>
</div>