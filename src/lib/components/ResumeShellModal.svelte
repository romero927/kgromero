<script>
  import { onMount } from 'svelte';
  import Modal from './Modal.svelte';

  let { open = $bindable(false) } = $props();

  let input = $state('');
  let output = $state([
    { type: 'system', content: 'Welcome to Kyle Romero\'s interactive terminal! Explore my professional information using terminal commands.' },
    { type: 'system', content: 'Type "help" for available commands.' }
  ]);
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

  function handleSubmit(event) {
    event.preventDefault();
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
        open = false;
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
      if (outputElement) outputElement.scrollTop = outputElement.scrollHeight;
    }, 0);
  }

</script>

<Modal bind:open title="Kyle's Resume Bash Shell" theme="terminal" size="max-w-3xl" bodyClass="flex flex-col">
  <div bind:this={outputElement} class="h-96 max-h-[60svh] overflow-y-auto p-4 whitespace-pre-wrap">
    {#each output as line}
      {#if line.type === 'command'}
        <div class="mb-1 text-green-500">$ {line.content}</div>
      {:else}
        <div class="mb-2 text-green-400">{line.content}</div>
      {/if}
    {/each}
  </div>
  <form onsubmit={handleSubmit} class="flex p-4 border-t border-green-900">
    <label for="resume-shell-input" class="mr-2 text-green-500">$</label>
    <input
      id="resume-shell-input"
      data-autofocus
      bind:value={input}
      type="text"
      autocomplete="off"
      autocapitalize="off"
      spellcheck="false"
      aria-label="Terminal command"
      class="flex-grow bg-transparent text-green-500 focus:outline-none placeholder-green-700"
    />
  </form>
</Modal>
