<script module>
  let nextId = 0;
</script>

<script>
  import { fade, scale } from 'svelte/transition';
  import { X } from '@lucide/svelte';
  import { portal } from '$lib/utils.js';

  /**
   * Shared dialog used by every popup on the site. Portals to <body> (the sticky
   * header's backdrop-filter would otherwise trap fixed positioning), closes on
   * Escape / backdrop click, traps Tab focus, locks page scroll, and returns
   * focus to whatever opened it. Put `data-autofocus` on an element inside to
   * focus it on open instead of the first focusable element.
   */
  let {
    open = $bindable(false),
    title,
    theme = 'neo',
    size = 'max-w-lg',
    bodyClass = 'p-4 sm:p-6',
    headerActions,
    children
  } = $props();

  const titleId = `modal-title-${nextId++}`;
  const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

  const themes = {
    neo: {
      panel: 'bg-white text-neo-black border-2 border-neo-black shadow-neo-lg dark:bg-dark-card dark:text-gray-200 dark:border-dark-border dark:shadow-neo-lg-dark',
      header: 'border-b-2 border-neo-black/10 dark:border-dark-border',
      title: 'card-title',
      close: 'neo-button-ghost h-9 w-9 p-0'
    },
    night: {
      panel: 'bg-[#121212] text-gray-100 border-2 border-dark-border shadow-neo-lg-dark',
      header: 'border-b-2 border-dark-border',
      title: 'card-title !text-neo-accent',
      close: 'neo-button-ghost h-9 w-9 p-0 !text-gray-200 !border-dark-border !shadow-neo-dark'
    },
    terminal: {
      panel: 'bg-black/90 text-green-500 font-mono rounded-lg shadow-lg',
      header: 'border-b border-green-900',
      title: 'text-lg sm:text-xl font-bold text-green-500',
      close: 'h-9 w-9 text-green-500 hover:text-green-400 focus-visible:ring-2 focus-visible:ring-green-500 rounded'
    }
  };
  let styles = $derived(themes[theme] ?? themes.neo);

  let panel = $state();

  function close() {
    open = false;
  }

  $effect(() => {
    if (!open || !panel) return;
    const previouslyFocused = /** @type {HTMLElement | null} */ (document.activeElement);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const initial = panel.querySelector('[data-autofocus]') ?? panel.querySelector(FOCUSABLE) ?? panel;
    initial.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  });

  function handleKeydown(e) {
    if (!open || !panel) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
      return;
    }
    if (e.key !== 'Tab') return;
    const items = [...panel.querySelectorAll(FOCUSABLE)];
    if (items.length === 0) {
      e.preventDefault();
      return;
    }
    const first = items[0];
    const last = items[items.length - 1];
    if (!panel.contains(document.activeElement)) {
      e.preventDefault();
      first.focus();
    } else if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
  <div use:portal class="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4">
    <!-- Keyboard users close with Escape; the backdrop is a pointer-only affordance -->
    <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
    <div
      class="absolute inset-0 bg-black/50 backdrop-blur-sm"
      onclick={close}
      transition:fade={{ duration: 150 }}
    ></div>
    <div
      bind:this={panel}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      tabindex="-1"
      class="relative flex w-full {size} max-h-[90svh] flex-col outline-none {styles.panel}"
      transition:scale={{ start: 0.96, duration: 150 }}
    >
      <div class="flex flex-shrink-0 items-center justify-between gap-3 px-4 py-3 sm:px-6 {styles.header}">
        <h2 id={titleId} class={styles.title}>{title}</h2>
        <div class="flex items-center gap-2">
          {@render headerActions?.()}
          <button type="button" onclick={close} class="{styles.close} flex items-center justify-center" aria-label="Close dialog">
            <X size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div class="min-h-0 flex-1 overflow-y-auto {bodyClass}">
        {@render children?.()}
      </div>
    </div>
  </div>
{/if}
