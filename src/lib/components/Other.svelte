<script>
    import { t } from '$lib/i18n';
    import { ArrowUpRight, ChevronLeft, ChevronRight, Link } from '@lucide/svelte';
    import TravelGlobe from './TravelGlobe.svelte';
    import Modal from './Modal.svelte';

    let showFamily = $state(false);
    let index = $state(0);

    const images = [
      { alt: "My Family", src: "/images/family.webp", title: "My Family" },
      { alt: "Wife and I", src: "/images/wife-and-me.webp", title: "Wife And I" },
      { alt: "Ashley", src: "/images/wife.webp", title: "Ashley" },
      { alt: "Charlotte and Ollie", src: "/images/dogs.webp", title: "Charlotte and Ollie" },
    ];

    const step = (delta) => (index = (index + delta + images.length) % images.length);

    function galleryKeydown(e) {
      if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'ArrowRight') step(1);
    }
  </script>

  <div class="neo-card max-w-full" role="region" aria-label="Other Information">
    <h2 class="card-title mb-4">{$t.other.title}</h2>

    <div class="space-y-5 text-sm">
      <div>
        <h3 class="card-eyebrow mb-2">{$t.other.recentProjects}</h3>
        <ul class="space-y-1.5">
          {#each $t.other.projects as project}
            <li class="wrap-break-word group">
              {#if project.link}
                <a href={project.link} target="_blank" rel="noopener noreferrer" class="inline-flex items-center" aria-label={`View ${project.name} project`}>
                  <Link size="1em" class="shrink-0 mr-2 text-neo-black/55 dark:text-gray-400 group-hover:text-neo-accent transition-colors text-xs" aria-hidden="true"/>
                  <span class="neo-highlight wrap-break-word">{project.name}</span>
                </a>
              {:else}
                <span class="wrap-break-word">{project.name}</span>
              {/if}
            </li>
          {/each}
        </ul>
      </div>

      <div>
        <h3 class="card-eyebrow mb-2">{$t.other.interests}</h3>
        <p class="wrap-break-word leading-relaxed">
          <button class="neo-highlight underline underline-offset-2 decoration-dotted" onclick={() => { index = 0; showFamily = true; }} aria-label="View family photos">
            {$t.other.family}
          </button>, {$t.other.interestList}, <TravelGlobe />Travel
        </p>
        <Modal bind:open={showFamily} title={$t.other.family} size="max-w-2xl">
          <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
          <div class="flex flex-col items-center" role="group" aria-roledescription="carousel" aria-label="Family photos" onkeydown={galleryKeydown}>
            <div class="relative w-full flex items-center justify-center bg-neo-cream dark:bg-dark-bg border-2 border-neo-black dark:border-dark-border h-[55svh]">
              <img src={images[index].src} alt={images[index].alt} class="max-h-full max-w-full object-contain" />
              <button type="button" class="neo-button-ghost absolute left-2 h-9 w-9 p-0 flex items-center justify-center bg-white/80 dark:bg-dark-card/80" onclick={() => step(-1)} aria-label="Previous photo">
                <ChevronLeft size={18} aria-hidden="true" />
              </button>
              <button type="button" class="neo-button-ghost absolute right-2 h-9 w-9 p-0 flex items-center justify-center bg-white/80 dark:bg-dark-card/80" onclick={() => step(1)} aria-label="Next photo">
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </div>
            <p class="card-eyebrow mt-3" aria-live="polite">{images[index].title} · {index + 1}/{images.length}</p>
            <div class="mt-3 flex gap-2">
              {#each images as image, i}
                <button
                  type="button"
                  class="h-14 w-14 sm:h-16 sm:w-16 border-2 overflow-hidden transition-opacity {i === index ? 'border-neo-accent opacity-100' : 'border-neo-black/20 dark:border-dark-border opacity-60 hover:opacity-100'}"
                  onclick={() => (index = i)}
                  aria-label={`Show ${image.title}`}
                  aria-current={i === index}
                >
                  <img src={image.src} alt="" class="h-full w-full object-cover" loading="lazy" />
                </button>
              {/each}
            </div>
          </div>
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
              <ArrowUpRight size={14} class="shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
            </a>
          {/each}
        </div>
      </div>
    </div>
  </div>
