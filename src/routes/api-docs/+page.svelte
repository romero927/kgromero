<script>
  import { onMount } from 'svelte';
  import NavBar from '$lib/components/NavBar.svelte';
  import { t } from '$lib/i18n';
  import { faChartLine } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa';
  
  let apiSpec = null;
  let selectedEndpoint = '/api/resume';
  let responseData = null;
  let loading = false;
  let error = null;
  
  onMount(async () => {
    try {
      const response = await fetch('/api/openapi.json');
      apiSpec = await response.json();
    } catch (e) {
      error = 'Failed to load API specification';
      console.error(e);
    }
  });
  
  async function tryEndpoint(endpoint) {
    loading = true;
    error = null;
    responseData = null;
    
    try {
      const response = await fetch(endpoint);
      responseData = await response.json();
    } catch (e) {
      error = 'Failed to fetch data from endpoint';
      console.error(e);
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>API Documentation - Kyle Romero</title>
  <meta name="description" content="Interactive API documentation for Kyle Romero's resume API" />
</svelte:head>

<a href="#main-content" class="skip-link">
  Skip to main content
</a>

<div class="min-h-screen bg-neo-cream dark:bg-gray-900 flex flex-col">
  <header class="sticky top-0 z-50 mx-2 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-24 2xl:mx-32">
    <NavBar />
  </header>

  <main id="main-content" class="flex-grow">
    <div class="mx-2 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-24 2xl:mx-32 py-4">
  <!-- Header -->
  <div class="neo-card mb-8">
    <div class="p-6">
      <h1 class="text-4xl font-bold mb-4">Resume API Documentation</h1>
      {#if apiSpec}
        <p class="text-lg mb-2">{apiSpec.info.description}</p>
        <div class="flex gap-4 text-sm">
          <span><strong>Version:</strong> {apiSpec.info.version}</span>
          <span><strong>Contact:</strong> {apiSpec.info.contact.email}</span>
        </div>
      {/if}
    </div>
  </div>

  {#if apiSpec}
    <!-- Endpoints Section -->
    <div class="neo-card mb-8">
      <div class="p-6">
        <h2 class="text-2xl font-bold mb-4">Available Endpoints</h2>
        
        {#each Object.entries(apiSpec.paths) as [path, methods]}
          <div class="mb-6 border-2 border-neo-black rounded-lg p-4 dark:border-dark-border">
            <div class="flex items-center gap-4 mb-2">
              <span class="px-3 py-1 bg-green-500 text-white font-bold rounded">GET</span>
              <code class="text-lg font-mono">{path}</code>
            </div>
            
            {#if methods.get}
              <p class="mb-4">{methods.get.description}</p>
              
              <!-- Try It Out Button -->
              <button
                class="neo-button mb-4"
                onclick={() => {
                  selectedEndpoint = path;
                  tryEndpoint(path);
                }}
              >
                Try it out
              </button>

              <!-- Response Schema -->
              {#if methods.get.responses['200']}
                <div class="mt-4">
                  <h4 class="font-bold mb-2">Response: 200 OK</h4>
                  <p class="text-sm mb-2">{methods.get.responses['200'].description}</p>
                </div>
              {/if}
            {/if}
          </div>
        {/each}
      </div>
    </div>

    <!-- Interactive Test Section -->
    <div class="neo-card mb-8">
      <div class="p-6">
        <h2 class="text-2xl font-bold mb-4">Try It Out</h2>
        
        <div class="mb-4">
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

        <button
          class="neo-button mb-4"
          onclick={() => tryEndpoint(selectedEndpoint)}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Execute Request'}
        </button>

        {#if error}
          <div class="p-4 bg-red-100 border-2 border-red-500 rounded mb-4 dark:bg-red-900 dark:border-red-600">
            <p class="text-red-700 dark:text-red-200">{error}</p>
          </div>
        {/if}

        {#if responseData}
          <div>
            <h3 class="font-bold mb-2">Response:</h3>
            <pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded border-2 border-neo-black dark:border-dark-border overflow-x-auto"><code>{JSON.stringify(responseData, null, 2)}</code></pre>
          </div>
        {/if}
      </div>
    </div>

    <!-- Schema Documentation -->
    <div class="neo-card mb-8">
      <div class="p-6">
        <h2 class="text-2xl font-bold mb-4">Data Schema</h2>
        
        {#if apiSpec.components?.schemas?.Resume}
          <div class="space-y-4">
            <p class="mb-4">The API follows the <a href="https://jsonresume.org/schema/" target="_blank" class="underline text-neo-orange">JSON Resume</a> standard schema.</p>
            
            <div>
              <h3 class="font-bold text-xl mb-2">Resume Object</h3>
              <div class="space-y-2">
                {#each Object.entries(apiSpec.components.schemas.Resume.properties) as [key, value]}
                  <div class="border-l-4 border-neo-orange pl-4 py-2 dark:border-dark-border">
                    <code class="font-bold">{key}</code>
                    <span class="text-sm ml-2 text-gray-600 dark:text-gray-400">({value.type})</span>
                    {#if value.description}
                      <p class="text-sm mt-1">{value.description}</p>
                    {/if}
                  </div>
                {/each}
              </div>
            </div>
          </div>
        {/if}
      </div>
    </div>

    <!-- Usage Examples -->
    <div class="neo-card">
      <div class="p-6">
        <h2 class="text-2xl font-bold mb-4">Code Examples</h2>
        
        <div class="space-y-6">
          <!-- cURL -->
          <div>
            <h3 class="font-bold mb-2">cURL</h3>
            <pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded border-2 border-neo-black dark:border-dark-border overflow-x-auto"><code>curl {apiSpec.servers[0].url}/api/resume</code></pre>
          </div>

          <!-- JavaScript -->
          <div>
            <h3 class="font-bold mb-2">JavaScript / Fetch</h3>
            <pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded border-2 border-neo-black dark:border-dark-border overflow-x-auto"><code>const response = await fetch('{apiSpec.servers[0].url}/api/resume');
const resume = await response.json();
console.log(resume.basics.name);</code></pre>
          </div>

          <!-- Python -->
          <div>
            <h3 class="font-bold mb-2">Python</h3>
            <pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded border-2 border-neo-black dark:border-dark-border overflow-x-auto"><code>import requests

response = requests.get('{apiSpec.servers[0].url}/api/resume')
resume = response.json()
print(resume['basics']['name'])</code></pre>
          </div>
        </div>
      </div>
    </div>
  {:else if error}
    <div class="neo-card">
      <div class="p-6">
        <p class="text-red-600 dark:text-red-400">{error}</p>
      </div>
    </div>
  {:else}
    <div class="neo-card">
      <div class="p-6">
        <p>Loading API documentation...</p>
      </div>
    </div>
  {/if}
    </div>
  </main>

  <footer class="neo-bold-card p-0 mx-2 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-24 2xl:mx-32 mb-2">
    <div class="text-center justify-center items-center flex flex-wrap w-full gap-1 sm:gap-2 py-1 px-2 text-xs sm:text-sm">
      <span class="whitespace-nowrap"><b>© {new Date().getFullYear()} Kyle Romero</b></span>
      <span class="hidden sm:inline">|</span>
      <span class="whitespace-nowrap">{$t.footerMessage.replace(/\s*\|\s*/g, '').trim()}</span>
      <a href="https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fkgromero.com%2F" target="_blank" rel="noopener noreferrer" aria-label="View PageSpeed Insights" class="ml-1"><Fa icon={faChartLine} /></a>
    </div>
  </footer>
</div>

<style>
  code {
    font-family: 'Courier New', Courier, monospace;
  }
  
  pre {
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.875rem;
  }
</style>
