<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { Footer, FooterCopyright } from 'flowbite-svelte';
  import NavBar from '$lib/components/NavBar.svelte'; 
  import AboutMe from '$lib/components/AboutMe.svelte';
  import ContactInfo from '$lib/components/ContactInfo.svelte';
  import Experience from '$lib/components/Experience.svelte';
  import Skills from '$lib/components/Skills.svelte';
  import Other from '$lib/components/Other.svelte';
  import { locale, t } from '$lib/i18n';
  import { Heading, P, A, Mark, Secondary, Hr } from "flowbite-svelte";

  let yearsExperience;

  onMount(() => {
    const startDate = new Date("July 15, 2007");
    const diff = Math.abs(new Date() - startDate);
    yearsExperience = Math.floor(diff / 31536000000);
  });

</script>

<div class="min-h-screen dark:bg-gray-900">
  <NavBar />
  
  <div class="container mx-auto rounded-lg text-center border dark:border-white/10 py-2 bg-gray-50 dark:bg-gray-800">
    <Heading class="text-black/60 mb-2 dark:text-gray-400">{$t.name}</Heading>
    <P class="text-center text-black/60 dark:text-gray-400">
      {$t.description(yearsExperience)}
    </P>
  </div>
  
  <div class="container mx-auto my-2 lg:grid grid-cols-5">
    {#each ['AboutMe', 'ContactInfo', 'Experience', 'Skills', 'Other'] as component}
      <div in:fade="{{ duration: 300, delay: 300 }}">
        <svelte:component this={{
          AboutMe,
          ContactInfo,
          Experience,
          Skills,
          Other
        }[component]} />
      </div>
    {/each}
  </div>

  <Footer>
    <FooterCopyright
      href="/"
      by="Kyle Romero"
      year={2024}
      copyrightMessage={$t.footerMessage}
    />
  </Footer>
</div>