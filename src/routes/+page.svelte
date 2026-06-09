<script>
  import { fade, fly } from 'svelte/transition';
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
  <header class="sticky top-0 z-50 mx-2 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-24 2xl:mx-32 pt-2">
    <NavBar />
  </header>

  <main id="main-content" class="flex-1">
    <section aria-label="Introduction" class="mx-2 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-24 2xl:mx-32 mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
      <div class="md:col-span-2 neo-hero flex flex-col justify-center" in:fly="{{ y: 16, duration: 500, delay: 100 }}">
        <span class="card-eyebrow">Hello, I'm</span>
        <h1 class="font-display font-bold tracking-tight leading-[0.95] mt-2 text-4xl sm:text-5xl md:text-6xl">
          {$t.name}<span class="text-neo-orange">.</span>
        </h1>
        <p class="mt-4 text-base sm:text-lg leading-relaxed text-neo-black/85 dark:text-gray-300">
          Software Engineering Leader with <b class="text-neo-black dark:text-gray-100">18+ years</b> in IT.
        </p>
        <div class="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div class="border-l-2 border-neo-orange pl-3">
            <div class="card-eyebrow">Currently</div>
            <div class="text-sm font-bold mt-0.5 text-neo-black dark:text-gray-100">Team Lead, Tenna</div>
          </div>
          <div class="border-l-2 border-neo-orange pl-3">
            <div class="card-eyebrow">Based in</div>
            <div class="text-sm font-bold mt-0.5 text-neo-black dark:text-gray-100">Jersey City, NJ</div>
          </div>
          <div class="border-l-2 border-neo-orange pl-3">
            <div class="card-eyebrow">Specialty</div>
            <div class="text-sm font-bold mt-0.5 text-neo-black dark:text-gray-100">Full-Stack + Leadership</div>
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

  <footer class="mx-2 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-24 2xl:mx-32 mb-3 sm:mb-4 border-t-2 border-neo-black dark:border-dark-border pt-3 sm:pt-4">
    <div class="flex flex-wrap justify-center items-center w-full gap-2 sm:gap-3 text-xs sm:text-sm text-neo-black/70 dark:text-gray-400">
      <span class="whitespace-nowrap"><b class="text-neo-black dark:text-gray-200">© {new Date().getFullYear()} Kyle Romero</b></span>
      <span aria-hidden="true" class="hidden sm:inline text-neo-orange">/</span>
      <span class="whitespace-nowrap">{$t.footerMessage}</span>
      <a href="https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fkgromero.com%2F" target="_blank" rel="noopener noreferrer" aria-label="View PageSpeed Insights" class="ml-1 hover:text-neo-orange transition-colors"><Fa icon={faChartLine} /></a>
    </div>
  </footer>
</div>
