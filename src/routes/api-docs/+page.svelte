<script>
  import { tick } from 'svelte';
  import { openApiSpec as apiSpec } from '$lib/openapi.js';
  import NavBar from '$lib/components/NavBar.svelte';
  import CodeBlock from '$lib/components/CodeBlock.svelte';
  import { ChartLine, Code2 } from '@lucide/svelte';

  const SITE = 'https://kgromero.com';
  const MCP_URL = `${SITE}/mcp`;

  const mcpClients = [
    { name: 'Claude Code', label: 'Claude Code command', code: `claude mcp add --transport http kgromero ${MCP_URL}` },
    {
      name: 'Cursor, VS Code, and other clients (JSON config)',
      label: 'JSON config',
      code: JSON.stringify({ mcpServers: { kgromero: { url: MCP_URL } } }, null, 2),
    },
  ];

  const mcpTools = [
    ['get_profile', 'Title, summary, location, current role, years of experience'],
    ['list_experience / get_experience', 'Career timeline and full details for each role'],
    ['get_career_timeline', 'Every title held, including promotions'],
    ['get_skills', 'Skills by category and by where they were used'],
    ['list_side_projects', 'Personal projects with GitHub links'],
    ['list_documents', 'Resume downloads, diagrams, write-ups, and lab reports'],
    ['get_contact, get_education, get_interests, get_travel', 'Everything else on the site'],
    ['search', 'Keyword search across all of the above'],
  ];

  let selectedEndpoint = $state('/api/resume');
  let responseData = $state(null);
  let responseMeta = $state(null);
  let loading = $state(false);
  let error = $state(null);
  /** @type {HTMLElement | undefined} */
  let tryItSection = $state();

  const examples = $derived([
    { name: 'cURL', code: `curl ${SITE}${selectedEndpoint}` },
    {
      name: 'JavaScript / Fetch',
      code: `const response = await fetch('${SITE}${selectedEndpoint}');\nconst data = await response.json();\nconsole.log(data);`,
    },
    {
      name: 'Python',
      code: `import requests\n\nresponse = requests.get('${SITE}${selectedEndpoint}')\ndata = response.json()\nprint(data)`,
    },
  ]);

  async function tryEndpoint(endpoint, scroll = false) {
    selectedEndpoint = endpoint;
    loading = true;
    error = null;
    responseData = null;
    responseMeta = null;
    if (scroll) {
      await tick();
      tryItSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    const started = performance.now();
    try {
      const response = await fetch(endpoint);
      const text = await response.text();
      responseMeta = {
        status: response.status,
        ok: response.ok,
        ms: Math.round(performance.now() - started),
        kb: (new Blob([text]).size / 1024).toFixed(1),
      };
      responseData = JSON.stringify(JSON.parse(text), null, 2);
    } catch (e) {
      error = 'Failed to fetch data from endpoint';
      console.error(e);
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>API & MCP Documentation - Kyle Romero</title>
  <meta name="description" content="Kyle Romero's resume API and MCP server: connect Claude or other AI assistants, or fetch resume and site data as JSON." />
</svelte:head>

<a href="#main-content" class="skip-link">
  Skip to main content
</a>

<div class="min-h-screen bg-neo-cream dark:bg-gray-900 flex flex-col">
  <header class="sticky top-0 z-50 mx-2 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-24 2xl:mx-32">
    <NavBar />
  </header>

  <main id="main-content" class="grow">
    <div class="mx-2 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-24 2xl:mx-32 py-4">
  <!-- Header -->
  <div class="neo-card mb-8">
    <div class="p-6">
      <h1 class="text-4xl font-bold mb-4">API & MCP Documentation</h1>
      <p class="text-lg mb-4">
        Two ways to use my resume and site data: connect an AI assistant to the <strong>MCP server</strong>, or fetch JSON from the <strong>REST API</strong>.
      </p>
      <nav aria-label="On this page" class="flex flex-wrap gap-3 text-sm items-center">
        <a href="#mcp" class="neo-button">MCP Server</a>
        <a href="#endpoints" class="neo-button-ghost">REST Endpoints</a>
        <a href="#try-it" class="neo-button-ghost">Try It Out</a>
        <a href="#examples" class="neo-button-ghost">Code Examples</a>
        <a href="/api/openapi.json" target="_blank" class="neo-button-ghost">OpenAPI Spec</a>
        <span class="text-gray-600 dark:text-gray-400">v{apiSpec.info.version} · {apiSpec.info.contact.email}</span>
      </nav>
    </div>
  </div>

  <!-- MCP Server -->
  <section id="mcp" class="neo-card mb-8 scroll-mt-24">
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">MCP Server (for AI assistants)</h2>
      <p class="mb-4">
        Connect Claude, Cursor, or any other <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer" class="underline text-neo-accent">MCP</a> client to ask questions about my experience, skills, projects, and documents. Read-only, no sign-in needed.
        <a href="https://github.com/romero927/kgromero-mcp" target="_blank" rel="noopener noreferrer" class="underline text-neo-accent">Source on GitHub</a>.
      </p>

      <div class="space-y-6">
        <div>
          <h3 class="font-bold mb-2">Server URL (Streamable HTTP)</h3>
          <CodeBlock code={MCP_URL} label="MCP server URL" />
        </div>
        <div>
          <h3 class="font-bold mb-2">Claude (web and desktop)</h3>
          <p>Settings → Connectors → Add custom connector, then paste the URL above.</p>
        </div>
        {#each mcpClients as client}
          <div>
            <h3 class="font-bold mb-2">{client.name}</h3>
            <CodeBlock code={client.code} label={client.label} />
          </div>
        {/each}

        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <h3 class="font-bold mb-2">Tools</h3>
            <ul class="space-y-1 text-sm">
              {#each mcpTools as [name, desc]}
                <li><code class="font-bold">{name}</code>: {desc}</li>
              {/each}
            </ul>
          </div>
          <div>
            <h3 class="font-bold mb-2">Things to ask</h3>
            <ul class="list-disc pl-6 space-y-1 text-sm">
              <li>"What has Kyle built with AWS, and when?"</li>
              <li>"Summarize Kyle's leadership experience."</li>
              <li>"How well does Kyle fit this job description?" (paste a posting)</li>
              <li>"Show me Kyle's architecture diagrams from MEARS."</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

    <!-- Endpoints Section -->
    <section id="endpoints" class="neo-card mb-8 scroll-mt-24">
      <div class="p-6">
        <h2 class="text-2xl font-bold mb-4">REST Endpoints</h2>
        <p class="mb-4 text-sm">All endpoints are public, CORS-enabled, and return JSON.</p>

        {#each Object.entries(apiSpec.paths) as [path, methods]}
          <div class="mb-6 border-2 border-neo-black rounded-lg p-4 dark:border-dark-border">
            <div class="flex flex-wrap items-center gap-4 mb-2">
              <span class="px-3 py-1 bg-green-500 text-white font-bold rounded-sm">GET</span>
              <code class="text-lg font-mono break-all">{path}</code>
            </div>

            {#if methods.get}
              <p class="mb-4">{methods.get.description}</p>
              <CodeBlock code={`${SITE}${path}`} label={`${path} URL`} class="mb-4" />
              <button class="neo-button" onclick={() => tryEndpoint(path, true)}>
                Try it out
              </button>
            {/if}
          </div>
        {/each}
      </div>
    </section>

    <!-- Interactive Test Section -->
    <section id="try-it" bind:this={tryItSection} class="neo-card mb-8 scroll-mt-24">
      <div class="p-6">
        <h2 class="text-2xl font-bold mb-4">Try It Out</h2>

        <div class="flex flex-wrap gap-4 items-end mb-4">
          <div class="grow">
            <label for="endpoint-select" class="block font-bold mb-2">Endpoint:</label>
            <select
              id="endpoint-select"
              bind:value={selectedEndpoint}
              class="neo-input w-full"
              onchange={() => tryEndpoint(selectedEndpoint)}
            >
              {#each Object.keys(apiSpec.paths) as path}
                <option value={path}>{path}</option>
              {/each}
            </select>
          </div>
          <button class="neo-button" onclick={() => tryEndpoint(selectedEndpoint)} disabled={loading}>
            {loading ? 'Loading...' : 'Execute Request'}
          </button>
        </div>

        {#if error}
          <div class="p-4 bg-red-100 border-2 border-red-500 rounded-sm mb-4 dark:bg-red-900 dark:border-red-600">
            <p class="text-red-700 dark:text-red-200">{error}</p>
          </div>
        {/if}

        {#if responseData}
          <div>
            <div class="flex flex-wrap items-center gap-3 mb-2">
              <h3 class="font-bold">Response</h3>
              {#if responseMeta}
                <span class="px-2 py-0.5 text-xs font-bold rounded-sm text-white {responseMeta.ok ? 'bg-green-600' : 'bg-red-600'}">
                  {responseMeta.status}
                </span>
                <span class="text-xs text-gray-600 dark:text-gray-400">{responseMeta.ms} ms · {responseMeta.kb} KB</span>
              {/if}
            </div>
            <CodeBlock code={responseData} label="response" />
          </div>
        {:else if !loading && !error}
          <p class="text-sm text-gray-600 dark:text-gray-400">Pick an endpoint and run it to see the response here.</p>
        {/if}
      </div>
    </section>

    <!-- Schema Documentation -->
    {#if apiSpec.components?.schemas?.Resume}
      <section class="neo-card mb-8">
        <div class="p-6">
          <h2 class="text-2xl font-bold mb-4">Resume Schema</h2>
          <p class="mb-4"><code>/api/resume</code> follows the <a href="https://jsonresume.org/schema/" target="_blank" rel="noopener noreferrer" class="underline text-neo-accent">JSON Resume</a> standard schema.</p>
          <div class="space-y-2">
            {#each Object.entries(apiSpec.components.schemas.Resume.properties) as [key, value]}
              <div class="border-l-4 border-neo-accent pl-4 py-2 dark:border-dark-border">
                <code class="font-bold">{key}</code>
                <span class="text-sm ml-2 text-gray-600 dark:text-gray-400">({value.type})</span>
                {#if value.description}
                  <p class="text-sm mt-1">{value.description}</p>
                {/if}
              </div>
            {/each}
          </div>
        </div>
      </section>
    {/if}

    <!-- Usage Examples -->
    <section id="examples" class="neo-card scroll-mt-24">
      <div class="p-6">
        <h2 class="text-2xl font-bold mb-2">Code Examples</h2>
        <p class="mb-4 text-sm">For <code>{selectedEndpoint}</code>. Change the endpoint in Try It Out to update these.</p>
        <div class="space-y-6">
          {#each examples as example}
            <div>
              <h3 class="font-bold mb-2">{example.name}</h3>
              <CodeBlock code={example.code} label={`${example.name} example`} />
            </div>
          {/each}
        </div>
      </div>
    </section>
    </div>
  </main>

  <footer class="neo-bold-card p-0 mx-2 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-24 2xl:mx-32 mb-2">
    <div class="text-center justify-center items-center flex flex-wrap w-full gap-1 sm:gap-2 py-1 px-2 text-xs sm:text-sm">
      <span class="whitespace-nowrap"><b>© {new Date().getFullYear()} Kyle Romero</b></span>
      <a href="https://github.com/romero927/kgromero" target="_blank" rel="noopener noreferrer" aria-label="View source code on GitHub" class="ml-1"><Code2 size="1em" aria-hidden="true" /></a>
      <a href="https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fkgromero.com%2F" target="_blank" rel="noopener noreferrer" aria-label="View PageSpeed Insights" class="ml-1"><ChartLine size="1em" aria-hidden="true" /></a>
    </div>
  </footer>
</div>

<style>
  code {
    font-family: 'Courier New', Courier, monospace;
  }
</style>
