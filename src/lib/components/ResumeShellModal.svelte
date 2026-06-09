<script>
  import { run, preventDefault } from 'svelte/legacy';

  import { onMount } from 'svelte';
  import { Terminal } from 'lucide-svelte';
  import { fade } from 'svelte/transition';
  import { portal } from '$lib/utils.js';

  /**
   * @typedef {Object} Props
   * @property {boolean} [isOpen]
   * @property {any} onClose
   */

  /** @type {Props} */
  let { isOpen = false, onClose } = $props();

  let input = $state('');
  let output = $state([
    { type: 'system', content: 'Welcome to Kyle Romero\'s interactive terminal! Explore my professional information using terminal commands.' },
    { type: 'system', content: 'Type "help" for available commands.' }
  ]);
  let inputElement = $state();
  let outputElement = $state();

  // Sourced at runtime from the canonical JSON Resume served at /kgromero.json
  // (same file the /api/resume endpoint serves) so the terminal never drifts
  // from the rest of the site. Files in static/ can't be imported into client
  // JS, so we fetch instead.
  let resumeData = $state({
    name: '', location: '', email: '', phone: '', linkedin: '', website: '',
    summary: '', experience: [], education: []
  });

  onMount(async () => {
    try {
      const res = await fetch('/kgromero.json');
      if (!res.ok) return;
      const resume = await res.json();
      const linkedinProfile = (resume.basics?.profiles || []).find((p) => p.network === 'LinkedIn');
      resumeData = {
        name: resume.basics?.name ?? '',
        location: [resume.basics?.location?.city, resume.basics?.location?.region].filter(Boolean).join(', '),
        email: resume.basics?.email ?? '',
        phone: resume.basics?.phone ?? '',
        linkedin: linkedinProfile ? linkedinProfile.url.replace(/^https?:\/\/(www\.)?linkedin\.com\//, '') : '',
        website: (resume.basics?.website || '').replace(/^https?:\/\//, '').replace(/\/$/, ''),
        summary: resume.basics?.summary ?? '',
        experience: (resume.work || []).map((w) => ({
          startDate: w.startDate,
          endDate: w.endDate || 'present',
          title: w.position,
          company: w.company,
          location: w.location || ''
        })),
        education: (resume.education || []).map((e) => ({
          startDate: e.startDate,
          endDate: e.endDate,
          degree: [e.studyType, e.area].filter(Boolean).join(' in '),
          school: e.institution,
          location: e.location || ''
        }))
      };
    } catch (err) {
      console.error('Failed to load resume data', err);
    }
  });

  run(() => {
    if (isOpen && inputElement) {
      setTimeout(() => inputElement.focus(), 0);
    }
  });

  function handleSubmit() {
    processCommand(input);
    input = '';
    scrollToBottom();
  }

  function processCommand(cmd) {
    const command = cmd.trim().toLowerCase();
    output = [...output, { type: 'command', content: cmd }];
    
    let response = '';

    switch (command) {
      case 'help':
        response = [
          'Available commands:',
          '  summary - Display a brief summary',
          '  experience - Show work experience and education timeline',
          '  education - Show education details',
          '  contact - Display contact information',
          '  clear - Clear the screen',
          '  exit - Close the terminal',
          '  help - Show this help message'
        ].join('\n');
        break;
      case 'summary':
        response = resumeData.summary;
        break;
      case 'experience':
        response = generateExperienceTimeline();
        break;
      case 'education':
        response = resumeData.education
          .map((e) => {
            const year = e.endDate ? ` (${new Date(e.endDate).getFullYear()})` : '';
            const where = e.location ? `, ${e.location}` : '';
            return `${e.degree}\n${e.school}${where}${year}`;
          })
          .join('\n\n');
        break;
      case 'contact':
        response = `Name: ${resumeData.name}\nEmail: ${resumeData.email}\nPhone: ${resumeData.phone}\nLinkedIn: ${resumeData.linkedin}\nWebsite: ${resumeData.website}`;
        break;
      case 'clear':
        output = [];
        return;
      case 'exit':
        onClose();
        return;
      default:
        response = `Command not found: ${command}. Type "help" for available commands.`;
    }

    output = [...output, { type: 'response', content: response }];
  }

  function generateExperienceTimeline() {
    let timeline = '╔═══════════════════════ Career Timeline ═════════════════════════════╗\n';
    const yearOf = (d) => {
      const ms = Date.parse(d);
      return Number.isNaN(ms) ? null : new Date(ms).getFullYear();
    };

    const allExperiences = [...resumeData.experience, ...resumeData.education]
      .sort((a, b) => (Date.parse(b.startDate) || 0) - (Date.parse(a.startDate) || 0));

    allExperiences.forEach((exp, index) => {
      const isPresent = exp.endDate === 'present' || !exp.endDate;
      const startYear = yearOf(exp.startDate);
      const endYear = isPresent ? 'present' : yearOf(exp.endDate);

      // Only show a year range/duration when we actually have a start year.
      let period;
      if (startYear !== null) {
        const endNum = isPresent ? new Date().getFullYear() : endYear;
        const duration = endNum !== null ? endNum - startYear : null;
        period = `${startYear} - ${endYear}` + (duration !== null ? ` (${duration} years)` : '');
      } else {
        period = endYear !== null ? `${endYear}` : '';
      }

      let line1, line2;
      if ('degree' in exp) {
        line1 = period.padEnd(21) + `│ ${exp.degree}`;
        line2 = ' '.repeat(21) + `│ ${[exp.school, exp.location].filter(Boolean).join(', ')}`;
      } else {
        line1 = period.padEnd(21) + `│ ${exp.title}`;
        line2 = ' '.repeat(21) + `│ ${[exp.company, exp.location].filter(Boolean).join(', ')}`;
      }
      
      timeline += `║ ${line1.padEnd(70)}\n`;
      timeline += `║ ${line2.padEnd(70)}\n`;
      
      if (index < allExperiences.length - 1) {
        timeline += `║${'─'.repeat(21)}┼${'─'.repeat(48)}\n`;
      }
    });
    
    timeline += '╚═════════════════════════════════════════════════════════════════════╝';
    return timeline;
  }

  function scrollToBottom() {
    setTimeout(() => {
      outputElement.scrollTop = outputElement.scrollHeight;
    }, 0);
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      onClose();
    }
  }
</script>

{#if isOpen}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div use:portal transition:fade="{{ duration: 200 }}" class="z-50 fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4" onkeydown={handleKeydown}>
    <div class="w-full max-w-3xl bg-black bg-opacity-90 text-green-500 font-mono rounded-lg shadow-lg">
      <div class="flex items-center justify-between p-4 border-b border-green-900">
        <div class="flex items-center">
          <Terminal class="mr-2 text-green-500" size={20} />
          <h2 class="text-xl font-bold text-green-500">Kyle's Resume Bash Shell</h2>
        </div>
        <button 
          onclick={onClose} 
          class="text-green-500 hover:text-green-400 focus:outline-none"
          aria-label="Close terminal">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div bind:this={outputElement} class="h-96 overflow-y-auto p-4 whitespace-pre-wrap bg-black bg-opacity-90">
        {#each output as line}
          {#if line.type === 'command'}
            <div class="mb-1 text-green-500">$ {line.content}</div>
          {:else}
            <div class="mb-2 text-green-400">{line.content}</div>
          {/if}
        {/each}
      </div>
      <form onsubmit={preventDefault(handleSubmit)} class="flex p-4 border-t border-green-900">
        <span class="mr-2 text-green-500">$</span>
        <input
          bind:this={inputElement}
          bind:value={input}
          type="text"
          class="flex-grow bg-transparent text-green-500 focus:outline-none placeholder-green-700"
        />
      </form>
    </div>
  </div>
{/if}

<style>
  input::placeholder {
    color: rgb(21, 128, 61);
  }
</style>
