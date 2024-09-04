<script>
    import { Card, Hr, Timeline, TimelineItem } from 'flowbite-svelte';
    import { t } from '$lib/content';
  </script>
  
  <Card class="items-center mx-auto max-w-full h-full bg-gray-50" padding="xs">
    <b class="pt-1 pb-3">{$t.experience.title}</b>
    <Hr classHr="border w-full m-1" />
    <br />
    <Timeline class="text-xs p-0 m-0 ml-3 mr-3">
      {#each $t.experience.timeline as item}
        <TimelineItem date={item.date} classLi="mb-5">
          <br /><b>{item.title}</b>
        </TimelineItem>
      {/each}
    </Timeline>
  </Card>