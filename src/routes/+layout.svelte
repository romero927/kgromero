<script>
  import "../app.css";
  import { theme } from '$lib/store';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { seoData } from '$lib/seoData';

  $: title = $page.data.title || seoData.defaultTitle;
  $: description = $page.data.description || seoData.defaultDescription;
  $: image = $page.data.image || seoData.defaultImage;
  $: structuredData = $page.data.structuredData || seoData.defaultStructuredData;

  // Initialize theme on mount
  onMount(() => {
    // Theme class is already set in store.js, no need to set it again
    // This is just to ensure hydration matches the server render
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        theme.set(savedTheme);
      }
    }
  });
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="theme-color" content={$theme === 'dark' ? '#1a1a1a' : '#fff5e9'}>
  <meta name="description" content={description} />
  <link rel="canonical" href={$page.url.href} />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image} />
  <meta property="og:url" content={$page.url.href} />
  <meta property="og:type" content="website" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />

  <script type="application/ld+json">
    {JSON.stringify(structuredData)}
  </script>
</svelte:head>

<div class={$theme}>
  <slot></slot>
</div>