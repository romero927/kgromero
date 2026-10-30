<script module>
  // three.js and the card code are only fetched when the card is first wanted.
  // Shared across instances (desktop + mobile buttons).
  let modulesPromise;
  function loadModules() {
    modulesPromise ??= Promise.all([
      import('$lib/businessCard/faces.js'),
      import('$lib/businessCard/scene.js')
    ]).catch((err) => {
      modulesPromise = undefined; // allow a retry
      throw err;
    });
    return modulesPromise;
  }
</script>

<script>
  import { untrack } from 'svelte';
  import { Download, IdCard, RefreshCw } from '@lucide/svelte';
  import Modal from './Modal.svelte';
  import { t } from '$lib/i18n';
  import { seoData } from '$lib/seoData';
  import logo from '$lib/assets/logo.svg';

  let { class: className = '' } = $props();

  let open = $state(false);
  let container = $state();
  let status = $state('loading'); // loading | ready | fallback | error
  let showingBack = $state(false);
  let exporting = $state(false);
  let fallbackImages = $state([]);

  // Everything on the card comes from the site's own data.
  let card = $derived({
    name: $t.name,
    title: seoData.defaultStructuredData.jobTitle,
    role: $t.experience.timeline[0]?.title ?? '',
    phone: $t.contactInfo.phone,
    email: $t.contactInfo.email,
    website: seoData.siteUrl,
    location: $t.contactInfo.location
  });

  let scene;
  let assets;
  let faceCache; // drawn faces, reused when the card is reopened
  let session = 0; // ignores a slow load that finishes after the modal closed

  $effect(() => {
    if (!open || !container) return;
    const id = ++session;
    untrack(() => build(id));
    return () => {
      session++;
      scene?.dispose();
      scene = undefined;
      status = 'loading';
      showingBack = false;
      fallbackImages = [];
    };
  });

  async function build(id) {
    try {
      const [faces, { createCardScene }] = await loadModules();
      assets ??= await faces.loadAssets(logo);
      if (id !== session) return;
      const data = $state.snapshot(card);
      // Texture just big enough for how wide the card shows on this screen
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const needed = (container.clientWidth * 0.9 * dpr) / faces.CARD_W;
      const scale = Math.min(2, Math.max(1, Math.ceil(needed * 4) / 4));
      const key = JSON.stringify(data) + scale;
      if (faceCache?.key !== key) {
        faceCache = {
          key,
          front: faces.renderFace('front', data, assets, scale),
          back: faces.renderFace('back', data, assets, scale)
        };
      }
      const { front, back } = faceCache;
      try {
        scene = createCardScene(container, {
          front,
          back,
          reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
          onFaceChange: (isBack) => (showingBack = isBack)
        });
        status = 'ready';
      } catch (err) {
        // No WebGL: show the flat faces instead
        console.warn('Business card: WebGL unavailable, showing flat card', err);
        fallbackImages = [front.toDataURL('image/png'), back.toDataURL('image/png')];
        status = 'fallback';
      }
    } catch (err) {
      console.error('Business card failed to load', err);
      if (id === session) status = 'error';
    }
  }

  async function downloadPng() {
    if (exporting) return;
    exporting = true;
    try {
      const [faces] = await loadModules();
      assets ??= await faces.loadAssets(logo);
      const blob = await faces.exportPrintPng($state.snapshot(card), assets);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${card.name.replace(/\s+/g, '_')}-BusinessCard.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      // Some mobile browsers read the file after click() returns, so free it later
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch (err) {
      console.error('Business card export failed', err);
    } finally {
      exporting = false;
    }
  }
</script>

<button
  type="button"
  class={className}
  onclick={() => (open = true)}
  onpointerenter={() => loadModules().catch(() => {})}
  onfocus={() => loadModules().catch(() => {})}
  aria-haspopup="dialog"
>
  Business Card
</button>

<Modal bind:open title="Business Card" size="max-w-3xl" bodyClass="p-0 flex flex-col">
  {#snippet headerStart()}
    <IdCard size={20} aria-hidden="true" class="shrink-0 hidden sm:block" />
  {/snippet}
  {#snippet headerActions()}
    <!-- On phones, tapping the card flips it, so this button is hidden there -->
    {#if status === 'ready'}
      <button
        type="button"
        class="neo-button-ghost h-9 px-3 py-0 hidden sm:flex items-center justify-center gap-1.5"
        onclick={() => scene?.flip()}
        aria-label={showingBack ? 'Show front of card' : 'Show back of card'}
      >
        <RefreshCw size={16} aria-hidden="true" />
        Flip
      </button>
    {/if}
    <button
      type="button"
      class="neo-button-ghost h-9 w-9 px-0 sm:w-auto sm:px-3 py-0 flex items-center justify-center gap-1.5"
      onclick={downloadPng}
      disabled={exporting}
      aria-label="Download printable PNG"
      title="Printable PNG: 3.5 × 2 in at 300 DPI, with bleed and crop marks"
    >
      <Download size={16} aria-hidden="true" />
      <span class="hidden sm:inline">{exporting ? 'Saving…' : 'PNG'}</span>
    </button>
  {/snippet}

  <div class="relative w-full aspect-[7/5] sm:aspect-[16/10] bg-neo-cream dark:bg-dark-bg">
    <div bind:this={container} class="absolute inset-0"></div>

    {#if status === 'loading'}
      <div class="absolute inset-0 flex items-center justify-center text-sm text-neo-black/60 dark:text-gray-400">
        Loading card…
      </div>
    {:else if status === 'fallback'}
      <div class="absolute inset-0 overflow-y-auto p-4 flex flex-col items-center gap-4">
        {#each fallbackImages as src}
          <img {src} alt="" class="w-full max-w-md rounded-lg shadow-neo dark:shadow-neo-dark" />
        {/each}
      </div>
    {:else if status === 'error'}
      <div class="absolute inset-0 flex items-center justify-center p-4 text-sm text-center">
        The card couldn't load. Check your connection and try again.
      </div>
    {/if}
  </div>

  {#if status === 'ready'}
    <p class="px-4 py-2 text-xs text-center text-neo-black/60 dark:text-gray-400 border-t-2 border-neo-black/10 dark:border-dark-border">
      Drag to turn · tap to flip · back has a QR code to save the contact
    </p>
  {/if}

  <!-- Card text for screen readers; the canvas itself is decorative -->
  <div class="sr-only">
    <p>{card.name}, {card.title}{card.role ? `, ${card.role}` : ''}.</p>
    <p>Phone {card.phone}. Email {card.email}. Website {card.website}. Based in {card.location}.</p>
  </div>
</Modal>
