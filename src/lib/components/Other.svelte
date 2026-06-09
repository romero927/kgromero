<script>
    import { Modal, Carousel, Thumbnails } from 'flowbite-svelte';
    import { t } from '$lib/i18n';
    import Fa from 'svelte-fa';
    import { faLink } from '@fortawesome/free-solid-svg-icons';
    import { ArrowUpRight } from 'lucide-svelte';
    import TravelGlobe from './TravelGlobe.svelte';

    let clickOutsideModal = false;
    let size = "sm";
    let index = 0;
    let forward = true;

    const images = [
      { alt: "My Family", src: "/images/family.webp", title: "My Family" },
      { alt: "Wife and I", src: "/images/wife-and-me.webp", title: "Wife And I" },
      { alt: "Ashley", src: "/images/wife.webp", title: "Ashley" },
      { alt: "Charlotte and Ollie", src: "/images/dogs.webp", title: "Charlotte and Ollie" },
    ];
  </script>

  <div class="neo-card max-w-full" role="region" aria-label="Other Information">
    <h2 class="card-title mb-4">{$t.other.title}</h2>

    <div class="space-y-5 text-sm">
      <div>
        <h3 class="card-eyebrow mb-2">{$t.other.recentProjects}</h3>
        <ul class="space-y-1.5">
          {#each $t.other.projects as project}
            <li class="break-words group">
              {#if project.link}
                <a href={project.link} target="_blank" class="inline-flex items-center hover:text-neo-orange transition-colors" aria-label={`View ${project.name} project`}>
                  <Fa icon={faLink} class="mr-2 text-neo-black/55 dark:text-gray-400 group-hover:text-neo-orange transition-colors text-xs" aria-hidden="true"/>
                  <span class="break-words">{project.name}</span>
                </a>
              {:else}
                <span class="break-words">{project.name}</span>
              {/if}
            </li>
          {/each}
        </ul>
      </div>

      <div>
        <h3 class="card-eyebrow mb-2">{$t.other.interests}</h3>
        <p class="break-words leading-relaxed">
          <button class="hover:text-neo-orange transition-colors underline-offset-2 hover:underline" onclick={() => { clickOutsideModal = true; }} aria-label="View family photos">
            {$t.other.family}
          </button>, {$t.other.interestList}, <TravelGlobe />Travel
        </p>
        <Modal title={$t.other.family} bind:open={clickOutsideModal} autoclose outsideclose {size} classBackdrop="z-50 bg-black bg-opacity-50 dark:bg-opacity-50 backdrop-blur-sm">
          <Carousel {images} {forward} let:Indicators let:Controls bind:index imgClass="object-contain h-full w-fit rounded-sm" />
          <Thumbnails {images} {forward} bind:index />
        </Modal>
      </div>

      <div class="-mx-5">
        <h3 class="card-eyebrow mb-2 px-5">{$t.other.favoriteBlogs}</h3>
        <div class="border-t-2 border-neo-black/15 dark:border-dark-border">
          {#each $t.other.blogs as blog}
            <a
              href={blog.href}
              target="_blank"
              rel="noopener noreferrer"
              class="card-link group"
            >
              <span class="truncate pr-2">{blog.name}</span>
              <ArrowUpRight size={14} class="flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
            </a>
          {/each}
        </div>
      </div>
    </div>
  </div>
