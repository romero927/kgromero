<script>
    import { Card, Hr, Button, Modal, Carousel, Thumbnails, Listgroup } from 'flowbite-svelte';
    import { t } from '$lib/i18n';
    import { lazyLoad } from '$lib/utils';
    import Fa from 'svelte-fa';
    import { faLink, faComments } from '@fortawesome/free-solid-svg-icons';
    import ResumeShellWrapper from './ResumeShellWrapper.svelte';
  
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
  
  <Card class="items-center mx-auto max-w-full h-full bg-gray-50" padding="xs">
    <b class="pt-1 pb-3">{$t.other.title}</b>
    <Hr classHr="border w-full m-1" />
    <br />
    <ul class="space-y-4 text-sm">
      <li>
        <b>{$t.other.recentProjects}: </b> 
        <ul class="ml-5 list-disc">
          <li><ResumeShellWrapper />(Claude 3.5 Sonnet) Terminal</li>
          <li class="flex space-x-2">
            <Fa icon={faComments} />
            <span class="font-normal leading-tight text-gray-500 dark:text-gray-400">
              <a href="https://kgromero-chat-room.fly.dev/" target="_blank">Chat (Phoenix + Fly.io)</a>
            </span>
          </li>
          {#each $t.other.projects as project}
            <li>
              {#if project.link}
                <a href={project.link} target="_blank">
                  <Fa icon={faLink} pull="left" class="mr-1 mt-1"/>
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
        <Modal title={$t.other.family} bind:open={clickOutsideModal} autoclose outsideclose {size}>
          <Carousel {images} {forward} let:Indicators let:Controls bind:index imgClass="object-contain h-full w-fit rounded-sm" />
          <Thumbnails {images} {forward} bind:index />
        </Modal>
      </li>
      <Hr />
      <li>
        <div class="text-center pb-5">
          <b>{$t.other.favoriteBlogs}</b>
        </div>
        <Listgroup active items={$t.other.blogs} let:item class="w-48 text-center w-full bg-gray-50">
          {item.name}
        </Listgroup>
      </li>
    </ul>
  </Card>