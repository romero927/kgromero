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

<a href="#main-content" class="skip-link">
  Skip to main content
</a>

<div class="min-h-screen bg-neo-cream dark:bg-gray-900 flex flex-col">
  <header class="sticky top-0 z-50">
    <NavBar />
  </header>

  <main id="main-content" class="flex-grow">
    <div class="mx-2 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-24 2xl:mx-32 neo-bold-card my-2 text-center rounded-lg">
      <h1 class="text-3xl font-bold">{$t.name}</h1>
    </div>

    <section aria-label="About Me" class="mx-2 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-24 2xl:mx-32 my-2 grid grid-cols-1 gap-3">
      {#each ['AboutMe'] as component}
        {@const SvelteComponent = { AboutMe}[component]}
        <div class="h-full" in:fade="{{ duration: 300, delay: 300 }}">
          <SvelteComponent />
        </div>
      {/each}
    </section>

    <section aria-label="Contact, Experience, Skills, and Other Information" class="mx-2 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-24 2xl:mx-32 my-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-2">
      {#each ['ContactInfo', 'Experience', 'Skills', 'Other'] as component}
        {@const SvelteComponent_1 = { ContactInfo, Experience, Skills, Other }[component]}
        <div class="h-full min-w-0" in:fade="{{ duration: 300, delay: 300 }}">
          <SvelteComponent_1 />
        </div>
      {/each}
    </section>
  </main>

  <footer class="sticky bottom-0 z-50 neo-bold-card p-0">
    <div class="text-center justify-center items-center flex w-full gap-2 py-0.5 px-2 text-sm">
      <b>© {new Date().getFullYear()} Kyle Romero </b> {$t.footerMessage}
      <a href="https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fkgromero.com%2F" target="_blank" class="ml-2 mr-2"><Fa icon={faChartLine} /></a>
    </div>
  </footer>
</div>
