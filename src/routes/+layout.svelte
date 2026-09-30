<script>
  import "../app.css";
  import { theme } from '$lib/store';
  import { page } from '$app/state';
  import { seoData } from '$lib/seoData';

  let { children } = $props();

  let title = $derived(page.data.title || seoData.defaultTitle);
  let description = $derived(page.data.description || seoData.defaultDescription);
  let image = $derived(page.data.image || seoData.defaultImage);
  let structuredData = $derived(page.data.structuredData || seoData.defaultStructuredData);
  // Pages are prerendered, so page.url.origin is a build-time placeholder; always point at the real site
  let canonicalUrl = $derived(seoData.siteUrl + page.url.pathname);
  // Svelte doesn't interpolate inside <script> tags, so emit the JSON-LD tag as raw HTML.
  // Escape "<" so the payload can never close the tag early.
  let jsonLd = $derived(
    `<script type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, '\\u003c')}<` + `/script>`
  );
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="theme-color" content={$theme === 'dark' ? '#212121' : '#F5F5F4'}>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonicalUrl} />

  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content={title} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:type" content="website" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />

  {@html jsonLd}
</svelte:head>

{@render children?.()}
