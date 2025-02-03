<script>
    import { Card, Hr, Button, Modal, Carousel, Thumbnails, Listgroup } from 'flowbite-svelte';
    import { t } from '$lib/i18n';
    import { lazyLoad } from '$lib/utils';
    import Fa from 'svelte-fa';
    import { faLink, faComments } from '@fortawesome/free-solid-svg-icons';
    import ResumeShellWrapper from './ResumeShellWrapper.svelte';
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
  
  <div class="neo-card items-center flex flex-col max-w-full h-full bg-white " padding="xs">
    <b class="pt-1 pb-3">{$t.other.title}</b>
  <Hr classHr="border w-full m-4" />
    <br />
    <ul class="space-y-4 text-sm">
      <li>
        <b>{$t.other.recentProjects}: </b> 
        <ul class="ml-5 list-disc">
          {#each $t.other.projects as project}
            <li class="block transition-all duration-200 origin-left hover:scale-105 cursor-default group">
              {#if project.link}
                <a href={project.link} target="_blank">
                  <Fa icon={faLink} pull="left" class="mr-1 mt-1 group-hover:text-neo-orange"/>
                </a>
              {/if}
              {project.name}
            </li>
          {/each}
        </ul>
      </li>
      <Hr />
      <li>
        <b>{$t.other.wantToLearn}: </b>{$t.other.learningList}
      </li>
      <Hr />
      <li>
        <b>{$t.other.interests}:</b>
        <button on:click={() => { clickOutsideModal = true; }}>
          {$t.other.family}
        </button>
        , {$t.other.interestList}
        , <TravelGlobe />Travel
        <Modal title={$t.other.family} bind:open={clickOutsideModal} autoclose outsideclose {size}>
          <Carousel {images} {forward} let:Indicators let:Controls bind:index imgClass="object-contain h-full w-fit rounded-sm" />
          <Thumbnails {images} {forward} bind:index />
        </Modal>
      </li>
      <Hr />
      <li>
          <div class="flex flex-col gap-2">
            {#each $t.other.blogs as blog}
              <a 
                href={blog.href} 
                target="_blank" 
                class="neo-button text-center text-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
              >
                {blog.name}
              </a>
            {/each}
          </div>
    </ul>
  </div>