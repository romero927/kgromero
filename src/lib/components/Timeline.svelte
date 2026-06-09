<script>
  let { items = [] } = $props();
  </script>
  
  <div class="relative pl-6">
    <!-- Vertical line -->
    <div class="absolute left-[7px] top-2 bottom-2 w-[2px] bg-neo-black/15 dark:bg-gray-700"></div>

    <!-- Timeline items -->
    {#each items as item}
      <div class="relative mb-4 last:mb-0 group">
        <!-- Dot -->
        <div class="absolute left-[-22px] top-[5px] h-3 w-3 rounded-full border-2 border-neo-black
                    dark:border-neo-orange bg-neo-cream dark:bg-dark-card transition-all duration-200
                    group-hover:bg-neo-orange group-hover:scale-110"></div>

        <!-- Content -->
        <div class="block transition-transform duration-200 origin-left group-hover:translate-x-0.5 cursor-default">
          <span class="card-eyebrow">{item.date}</span>
          <div class="mt-0.5 text-xs sm:text-[13px] font-bold text-neo-black dark:text-gray-100 leading-snug">
            {item.title}
          </div>
        </div>
      </div>
    {/each}
  </div>