<script>
    import { Terminal } from 'lucide-svelte';
    export let onClick;
  </script>
  
  <button
    on:click={onClick}
    class="items-center justify-center w-5 h-4 ml-3 mt-2 mb-3 md:mt-3 bg-gray-600 text-green-400 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
  >
  <Terminal class="mr-2 pb-1" size={20} />
  </button>