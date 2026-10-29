<script>
  import { fade, fly } from 'svelte/transition';
  import NavBar from '$lib/components/NavBar.svelte';
  import AboutMe from '$lib/components/AboutMe.svelte';
  import ContactInfo from '$lib/components/ContactInfo.svelte';
  import Experience from '$lib/components/Experience.svelte';
  import Skills from '$lib/components/Skills.svelte';
  import Other from '$lib/components/Other.svelte';
  // The animated background is optional (off by default), so its code is
  // only downloaded the first time animation is turned on.
  let TerrainBackground = $state(null);
  $effect(() => {
    if ($animations && !TerrainBackground) {
      import('$lib/components/TerrainBackground.svelte').then((m) => (TerrainBackground = m.default));
    }
  });
  import { t, yearsExperience } from '$lib/i18n';
  import { animations } from '$lib/store';
  import { ChartLine, Code2 } from '@lucide/svelte';
</script>

<a href="#main-content" class="skip-link">
  Skip to main content
</a>

{#if $animations && TerrainBackground}
  <TerrainBackground />
{/if}

<div class="min-h-screen flex flex-col">
  <header class="site-header sticky top-0 z-50">
    <div class="mx-2 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-24 2xl:mx-32 pt-2 pb-2">
      <NavBar />
    </div>
  </header>

  <main id="main-content" class="flex-1">
    <section aria-label="Introduction" class="mx-2 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-24 2xl:mx-32 mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
      <div class="md:col-span-2 neo-hero flex flex-col justify-center" in:fly="{{ y: 16, duration: 500, delay: 100 }}">
        <span class="card-eyebrow">Software Engineering Leader</span>
        <h1 class="font-display font-bold tracking-tight leading-[0.95] mt-2 text-4xl sm:text-5xl md:text-6xl">
          {$t.name}<span class="text-neo-accent">.</span>
        </h1>
        <p class="mt-4 text-base sm:text-lg leading-relaxed text-neo-black/85 dark:text-gray-300">
          <b class="text-neo-black dark:text-gray-100">{yearsExperience} years</b> building software and leading the teams that ship it.
        </p>
        <div class="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div class="border-l-2 border-neo-accent pl-3">
            <div class="card-eyebrow">Currently</div>
            <div class="text-sm font-bold mt-0.5 text-neo-black dark:text-gray-100">{$t.experience.timeline[0].title}</div>
          </div>
          <div class="border-l-2 border-neo-accent pl-3">
            <div class="card-eyebrow">Based in</div>
            <div class="text-sm font-bold mt-0.5 text-neo-black dark:text-gray-100">Jersey City, NJ</div>
          </div>
          <div class="border-l-2 border-neo-accent pl-3">
            <div class="card-eyebrow">Specialty</div>
            <div class="text-sm font-bold mt-0.5 text-neo-black dark:text-gray-100">Full-Stack Development + Architecture + Leadership</div>
          </div>
        </div>
      </div>
      <div class="min-w-0" in:fade="{{ duration: 300, delay: 300 }}">
        <ContactInfo />
      </div>
    </section>

    <section aria-label="About Me" class="mx-2 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-24 2xl:mx-32 mt-4 sm:mt-6">
      <div class="min-w-0" in:fade="{{ duration: 300, delay: 300 }}">
        <AboutMe />
      </div>
    </section>

    <section aria-label="Experience, Skills, and Other Information" class="mx-2 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-24 2xl:mx-32 mt-4 sm:mt-6 mb-6 sm:mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
      <div class="min-w-0" in:fade="{{ duration: 300, delay: 300 }}">
        <Experience />
      </div>
      <div class="min-w-0" in:fade="{{ duration: 300, delay: 300 }}">
        <Skills />
      </div>
      <div class="min-w-0" in:fade="{{ duration: 300, delay: 300 }}">
        <Other />
      </div>
    </section>
  </main>

  <footer class="site-footer mx-2 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-24 2xl:mx-32 mb-3 sm:mb-4 pt-3 sm:pt-4">
    <div class="flex flex-wrap justify-center items-center w-full gap-2 sm:gap-3 text-xs sm:text-sm text-neo-black/70 dark:text-gray-400">
      <span class="whitespace-nowrap"><b class="text-neo-black dark:text-gray-200">© {new Date().getFullYear()} Kyle Romero</b></span>
      <a href="https://github.com/romero927/kgromero" target="_blank" rel="noopener noreferrer" aria-label="View source code on GitHub" class="ml-1 hover:text-neo-accent transition-colors"><Code2 size="1em" aria-hidden="true" /></a>
      <a href="https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fkgromero.com%2F" target="_blank" rel="noopener noreferrer" aria-label="View PageSpeed Insights" class="ml-1 hover:text-neo-accent transition-colors"><ChartLine size="1em" aria-hidden="true" /></a>
    </div>
  </footer>
</div>
