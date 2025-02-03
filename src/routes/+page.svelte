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

  let yearsExperience;

  onMount(() => {
    const startDate = new Date("July 15, 2007");
    const diff = Math.abs(new Date() - startDate);
    yearsExperience = Math.floor(diff / 31536000000);
  });
</script>

<div class="min-h-screen bg-neo-cream dark:bg-gray-900">
  <NavBar />

  <div class="container mx-auto neo-bold-card my-4 text-center">
    <h1 class="text-2xl font-bold mb-2">{$t.name}</h1>
    <p>
      {$t.description(yearsExperience)}
    </p>
  </div>

 <div class="container mx-auto my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
  {#each ['AboutMe', 'ContactInfo', 'Experience', 'Skills', 'Other'] as component}
    <div class="h-full" in:fade="{{ duration: 300, delay: 300 }}">
      <svelte:component this={{ AboutMe, ContactInfo, Experience, Skills, Other }[component]} />
    </div>
  {/each}
</div>

  <footer class="container mx-auto neo-bold-card p-0">
    <p class="text-center">
      <b>© {new Date().getFullYear()} Kyle Romero </b> {$t.footerMessage}
    </p>
  </footer>
</div>