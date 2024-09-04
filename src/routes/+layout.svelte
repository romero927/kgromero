<script>
    import "../app.css";
    import { page } from '$app/stores';
    import { seoData } from '$lib/seoData';
  
    $: title = $page.data.title || seoData.defaultTitle;
    $: description = $page.data.description || seoData.defaultDescription;
    $: image = $page.data.image || seoData.defaultImage;
    $: structuredData = $page.data.structuredData || seoData.defaultStructuredData;
  </script>
  
  <svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={$page.url.href} />
    
    <!-- Open Graph tags -->
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:url" content={$page.url.href} />
    <meta property="og:type" content="website" />
    
    <!-- Twitter Card tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
    
    <!-- Structured data -->
    <script type="application/ld+json">
      {JSON.stringify(structuredData)}
    </script>
  </svelte:head>
  
  <slot></slot>
  
  <style>
    /* Your existing styles (if any) */
  </style>