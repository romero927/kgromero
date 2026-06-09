<script>
  import { t } from '$lib/i18n';
</script>

<div class="neo-card max-w-full" role="region" aria-label="About Me">
  <h2 class="card-title mb-4">{$t.aboutMe.title}</h2>
  <p class="text-sm sm:text-[15px] text-pretty break-words leading-relaxed text-neo-black/85 dark:text-gray-300">
    {$t.aboutMe.content}
  </p>
</div>
