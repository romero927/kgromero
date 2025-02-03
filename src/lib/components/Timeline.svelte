<script>
    export let items = [];
  </script>
  
  <div class="relative pl-6">
    <!-- Vertical line -->
    <div class="absolute left-[7px] top-2 bottom-2 w-[1px] bg-gray-500 dark:bg-gray-500"></div>
   
    <!-- Timeline items -->
    {#each items as item}
      <div class="relative mb-5 last:mb-0 group">
        <!-- Dot -->
        <div class="absolute left-[-22px] top-[6px] h-3 w-3 rounded-full border border-neo-white 
                    dark:border-gray-500 bg-dark-card transition-transform duration-200 
                    group-hover:scale-150 group-hover:bg-neo-orange"></div>
       
        <!-- Content -->
        <div class="block transition-all duration-200 origin-left hover:scale-105 cursor-default">
          <span class="text-xs text-gray-500 dark:text-gray-300">{item.date}</span>
          <div class="mt-1 text-xs font-bold text-neo-black dark:text-neo-orange">
            {item.title}
          </div>
        </div>
      </div>
    {/each}
  </div>