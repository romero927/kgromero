<script>
  import { Copy, Check } from '@lucide/svelte';
  import BrandIcon from './BrandIcon.svelte';
  import { copyText } from '$lib/clipboard.js';

  // Works in any assistant: MCP-capable tools use the server, others read the Markdown resume.
  const PROMPT = `I'd like to learn about Kyle Romero, a software engineering leader.

If you can use MCP tools, connect to his MCP server at https://kgromero.com/mcp (setup: https://kgromero.com/api-docs#mcp). Otherwise, read his resume at https://kgromero.com/kgromero.md and his site data at https://kgromero.com/api/site.json.

Then give me a short summary of his experience, strengths, and the kinds of roles he'd be a good fit for, and offer to answer follow-up questions.`;

  const logos = [
    { name: 'claude', label: 'Claude', color: 'text-[#D97757]' },
    { name: 'openai', label: 'ChatGPT', color: 'text-neo-black dark:text-gray-100' },
    { name: 'gemini', label: 'Gemini', color: 'text-[#8E75B2]' },
  ];

  let copied = $state(false);
  /** @type {ReturnType<typeof setTimeout> | undefined} */
  let timer;

  async function copy() {
    await copyText(PROMPT);
    copied = true;
    clearTimeout(timer);
    timer = setTimeout(() => (copied = false), 4000);
  }
</script>

<div class="neo-card max-w-full" role="region" aria-label="Ask your AI about me">
  <div class="flex items-baseline justify-between gap-3 mb-2">
    <h2 class="card-title">Ask Your AI About Me</h2>
    <a href="/api-docs#mcp" class="shrink-0 text-xs underline text-neo-black/60 hover:text-neo-accent dark:text-gray-400">MCP setup</a>
  </div>
  <p class="text-sm text-neo-black/85 dark:text-gray-300 mb-3">
    Get a quick summary from any AI assistant.
  </p>

  <button
    type="button"
    onclick={copy}
    class="group w-full sm:w-fit xl:w-full flex items-center gap-3 px-2 py-1.5 rounded-full border-2 border-neo-black dark:border-dark-border
           bg-white dark:bg-dark-card shadow-neo dark:shadow-neo-dark transition-all
           hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none
           focus:outline-hidden focus-visible:ring-2 focus-visible:ring-neo-accent focus-visible:ring-offset-2"
    aria-label="Copy a prompt for your AI assistant"
  >
    <span class="flex -space-x-2 shrink-0" aria-hidden="true">
      {#each logos as logo}
        <span class="w-8 h-8 rounded-full bg-neo-cream dark:bg-dark-bg border-2 border-neo-black/15 dark:border-dark-border flex items-center justify-center" title={logo.label}>
          <BrandIcon name={logo.name} class="text-base {logo.color}" />
        </span>
      {/each}
    </span>
    <span class="grow text-left text-sm font-bold text-neo-black dark:text-gray-100 whitespace-nowrap">
      {copied ? 'Copied! Paste it in' : 'Copy a prompt'}
    </span>
    <span class="shrink-0 pr-2 text-neo-black/60 group-hover:text-neo-accent dark:text-gray-400" aria-hidden="true">
      {#if copied}
        <Check size={18} />
      {:else}
        <Copy size={18} />
      {/if}
    </span>
  </button>
  <span class="sr-only" aria-live="polite">{copied ? 'Prompt copied to clipboard' : ''}</span>

</div>
