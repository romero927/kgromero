<script>
  import { fade, scale } from 'svelte/transition';
  import { portal } from '$lib/utils.js';
  import logoCrt from '$lib/assets/logo-crt.svg';

  // ↑ ↑ ↓ ↓ ← → ← → B A
  const SEQUENCE = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];

  let open = $state(false);
  /** @type {string[]} */
  let recent = [];
  // Bumped on every open. A new URL fragment makes the browser load a fresh
  // copy of the SVG, so its one-shot animation plays again instead of
  // showing the finished frame.
  let plays = $state(0);
  let overlay = $state();

  function handleKeydown(e) {
    if (open) {
      if (e.key === 'Escape') {
        e.preventDefault();
        open = false;
      }
      return;
    }
    if (e.repeat) return;
    // Don't fire while someone is typing (e.g. in the resume terminal)
    const el = /** @type {HTMLElement | null} */ (e.target);
    if (el?.closest?.('input, textarea, select, [contenteditable="true"]')) return;

    // Compare the last few keys pressed against the code
    recent = [...recent, e.key.toLowerCase()].slice(-SEQUENCE.length);
    if (recent.join() === SEQUENCE.join()) {
      recent = [];
      plays++;
      open = true;
    }
  }

  // Lock page scroll and move focus to the overlay while it's showing
  $effect(() => {
    if (!open || !overlay) return;
    const previouslyFocused = /** @type {HTMLElement | null} */ (document.activeElement);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    overlay.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  });
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
  <!-- Keyboard users close with Escape; clicking anywhere is the pointer equivalent -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div
    use:portal
    bind:this={overlay}
    role="dialog"
    aria-modal="true"
    aria-label="Easter egg: animated logo. Press Escape to close."
    tabindex="-1"
    class="frost fixed inset-0 z-60 flex items-center justify-center outline-hidden cursor-pointer"
    onclick={() => (open = false)}
    transition:fade={{ duration: 200 }}
  >
    {#key plays}
      <img
        src="{logoCrt}#play-{plays}"
        alt="Kyle Romero animated logo"
        width="512"
        height="512"
        class="relative size-[min(92vw,92svh)] select-none drop-shadow-2xl"
        draggable="false"
        transition:scale={{ start: 0.9, duration: 250 }}
      />
    {/key}
  </div>
{/if}

<style>
  /* Frosted glass: heavy blur, a milky tint, and a faint grain so it reads as glass */
  .frost {
    background-color: rgb(255 255 255 / 0.35);
    -webkit-backdrop-filter: blur(24px) saturate(160%);
    backdrop-filter: blur(24px) saturate(160%);
  }
  :global(.dark) .frost {
    background-color: rgb(24 24 24 / 0.45);
  }
  .frost::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.12;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }
</style>
