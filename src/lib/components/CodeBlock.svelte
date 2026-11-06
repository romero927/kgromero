<script>
  import { Copy, Check } from '@lucide/svelte';

  /** @type {{ code: string, label?: string, class?: string }} */
  let { code, label = 'code', class: className = '' } = $props();

  let copied = $state(false);
  /** @type {ReturnType<typeof setTimeout> | undefined} */
  let timer;

  // Older browsers, non-secure contexts, or a clipboard call that never settles
  // (e.g. a pending permission prompt): copy through a hidden textarea instead.
  function legacyCopy() {
    const el = document.createElement('textarea');
    el.value = code;
    el.setAttribute('readonly', '');
    el.style.position = 'fixed';
    el.style.opacity = '0';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    el.remove();
  }

  async function copy() {
    try {
      const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 1000));
      await Promise.race([navigator.clipboard.writeText(code), timeout]);
    } catch {
      legacyCopy();
    }
    copied = true;
    clearTimeout(timer);
    timer = setTimeout(() => (copied = false), 2000);
  }
</script>

<div class="relative group {className}">
  <pre class="bg-gray-100 dark:bg-gray-800 p-4 pr-14 rounded-sm border-2 border-neo-black dark:border-dark-border overflow-auto max-h-[32rem] text-sm"><code>{code}</code></pre>
  <button
    type="button"
    onclick={copy}
    class="absolute top-2 right-2 p-1.5 bg-white dark:bg-dark-card border-2 border-neo-black dark:border-dark-border rounded-sm
           hover:bg-neo-accent hover:text-neo-cream dark:hover:bg-dark-hover dark:hover:text-neo-accent transition-colors
           focus:outline-hidden focus-visible:ring-2 focus-visible:ring-neo-black dark:focus-visible:ring-neo-accent"
    aria-label={copied ? 'Copied' : `Copy ${label}`}
    title={copied ? 'Copied!' : 'Copy'}
  >
    {#if copied}
      <Check size={16} aria-hidden="true" />
    {:else}
      <Copy size={16} aria-hidden="true" />
    {/if}
  </button>
  <span class="sr-only" aria-live="polite">{copied ? 'Copied to clipboard' : ''}</span>
</div>

<style>
  pre, code {
    font-family: 'Courier New', Courier, monospace;
  }
</style>
