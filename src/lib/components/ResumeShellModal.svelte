<script>
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import Modal from './Modal.svelte';
  import { portal } from '$lib/utils.js';
  import { t, yearsExperience } from '$lib/i18n';

  let { open = $bindable(false) } = $props();

  let input = $state('');
  let output = $state([
    { type: 'system', content: 'Welcome to Kyle Romero\'s interactive terminal! Explore my professional information using terminal commands.' },
    { type: 'system', content: 'Type "help" for available commands. Tab completes, ↑/↓ recalls history.' }
  ]);
  let outputElement = $state();

  // Sourced at runtime from the canonical JSON Resume served at /kgromero.json
  // (same file the /api/resume endpoint serves) so the terminal never drifts
  // from the rest of the site. Files in static/ can't be imported into client
  // JS, so we fetch instead.
  let resumeData = $state({
    name: '', label: '', location: '', email: '', phone: '', linkedin: '', github: '', website: '',
    summary: '', experience: [], education: []
  });

  onMount(async () => {
    try {
      const res = await fetch('/kgromero.json');
      if (!res.ok) return;
      const resume = await res.json();
      const profileUrl = (network) => (resume.basics?.profiles || []).find((p) => p.network === network)?.url ?? '';
      resumeData = {
        name: resume.basics?.name ?? '',
        label: resume.basics?.label ?? '',
        location: [resume.basics?.location?.city, resume.basics?.location?.region].filter(Boolean).join(', '),
        email: resume.basics?.email ?? '',
        phone: resume.basics?.phone ?? '',
        linkedin: profileUrl('LinkedIn'),
        github: profileUrl('GitHub'),
        website: resume.basics?.website ?? '',
        summary: resume.basics?.summary ?? '',
        experience: (resume.work || []).map((w) => ({
          startDate: w.startDate,
          endDate: w.endDate || 'present',
          title: w.position,
          company: w.company,
          location: w.location || '',
          summary: w.summary || '',
          website: w.website || '',
          highlights: w.highlights || []
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

  const RESUME_PDF = '/Kyle_Romero-Resume.pdf';

  // Name + description pairs drive both `help` and tab completion.
  const COMMANDS = [
    ['summary', 'Display a brief summary'],
    ['experience', 'Career timeline (try: experience tenna)'],
    ['education', 'Show education details'],
    ['skills', 'Tech stack by company (try: skills tenna, skills all)'],
    ['projects', 'Side projects with links'],
    ['contact', 'Display contact information'],
    ['resume', 'Open the PDF resume'],
    ['whoami', 'Who is this?'],
    ['neofetch', 'System info, Kyle edition'],
    ['ls', 'List files'],
    ['cat', 'Print a file (try: cat about.txt)'],
    ['clear', 'Clear the screen'],
    ['exit', 'Close the terminal'],
    ['help', 'Show this help message']
  ];
  const COMMAND_NAMES = COMMANDS.map(([name]) => name);

  // Fake filesystem for `ls` / `cat`; each file just runs a command.
  const FILES = {
    'about.txt': 'summary',
    'contact.txt': 'contact',
    'experience.txt': 'experience',
    'skills.txt': 'skills',
    'projects.txt': 'projects',
    'resume.pdf': 'resume'
  };

  // Command history for the up/down arrow keys.
  let history = [];
  let historyIndex = 0;

  function handleSubmit(event) {
    event.preventDefault();
    if (input.trim()) {
      history = [...history, input];
    }
    historyIndex = history.length;
    processCommand(input);
    input = '';
    scrollToBottom();
  }

  function handleKeydown(event) {
    if (event.key === 'ArrowUp') {
      if (!history.length) return;
      event.preventDefault();
      historyIndex = Math.max(0, historyIndex - 1);
      input = history[historyIndex];
    } else if (event.key === 'ArrowDown') {
      if (!history.length) return;
      event.preventDefault();
      historyIndex = Math.min(history.length, historyIndex + 1);
      input = history[historyIndex] ?? '';
    } else if (event.key === 'Tab') {
      event.preventDefault();
      completeInput();
    }
  }

  // Completes the command name, or the file name after `cat`.
  function completeInput() {
    const match = input.match(/^(\s*cat\s+)(\S*)$/i);
    const [prefix, partial, options] = match
      ? [match[1], match[2].toLowerCase(), Object.keys(FILES)]
      : ['', input.trim().toLowerCase(), COMMAND_NAMES];
    if (!match && /\s/.test(input.trim())) return;

    const hits = options.filter((o) => o.startsWith(partial));
    if (hits.length === 1) {
      input = prefix + hits[0] + (match ? '' : ' ');
    } else if (hits.length > 1) {
      output = [...output, { type: 'command', content: input }, { type: 'response', content: hits.join('  ') }];
      scrollToBottom();
    }
  }

  // `echo` is false when `cat` re-runs a command, so the prompt line isn't repeated.
  function processCommand(cmd, echo = true) {
    const [rawName = '', ...args] = cmd.trim().split(/\s+/);
    const command = rawName.toLowerCase();
    const arg = args.join(' ').toLowerCase();
    if (echo) output = [...output, { type: 'command', content: cmd }];
    if (!command) return;

    let response = '';

    switch (command) {
      case 'help':
        response = ['Available commands:', ...COMMANDS.map(([name, desc]) => `  ${name.padEnd(11)}- ${desc}`)].join('\n');
        break;
      case 'summary':
        response = resumeData.summary;
        break;
      case 'experience':
        response = arg ? experienceDetail(arg) : generateExperienceTimeline();
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
      case 'skills':
        response = skillsOutput(arg);
        break;
      case 'projects':
        response = [
          ...$t.other.projects.map((p) => `${p.name}\n  ${p.description}\n  ${p.link}`),
          'More on GitHub: https://github.com/romero927?tab=repositories'
        ].join('\n\n');
        break;
      case 'contact':
        response = [
          `Name:     ${resumeData.name}`,
          `Email:    ${resumeData.email}`,
          `Phone:    ${resumeData.phone}`,
          `LinkedIn: ${resumeData.linkedin}`,
          `GitHub:   ${resumeData.github}`,
          `Website:  ${resumeData.website}`
        ].join('\n');
        break;
      case 'resume':
        window.open(RESUME_PDF, '_blank', 'noopener');
        response = `Opening resume in a new tab...\nIf nothing opened: ${RESUME_PDF}`;
        break;
      case 'whoami':
        response = `${resumeData.name || 'Kyle Romero'}: ${resumeData.label || 'Software Engineering Leader'}, ${yearsExperience} years in the industry, based in ${resumeData.location || 'Jersey City, NJ'}.\nCurrently: ${$t.experience.timeline[0].title}.`;
        break;
      case 'neofetch':
        response = neofetch();
        break;
      case 'ls':
        response = Object.keys(FILES).join('  ');
        break;
      case 'cat':
        if (!arg) {
          response = 'usage: cat <file>   (try "ls")';
        } else if (arg === 'resume.pdf') {
          response = '%PDF-1.7 ����\u0000\u0000 ...binary garbage...\nTry "resume" instead.';
        } else if (FILES[arg]) {
          processCommand(FILES[arg], false);
          return;
        } else {
          response = `cat: ${arg}: No such file or directory`;
        }
        break;
      case 'sudo':
        response = arg === 'hire-kyle' || arg === 'hire kyle'
          ? [
              '[sudo] password for recruiter: ********',
              'Verifying credentials........ OK',
              'Checking references.......... OK',
              'Negotiating salary........... pending',
              '',
              `Great choice! Let's talk: ${resumeData.email || 'kgromero@gmail.com'}`
            ].join('\n')
          : `${arg || 'sudo'}: permission denied. (Hint: try "sudo hire-kyle")`;
        break;
      case 'clear':
        output = [];
        return;
      case 'exit':
        open = false;
        return;
      default: {
        const guess = closestCommand(command);
        response = `Command not found: ${command}.` + (guess ? ` Did you mean "${guess}"?` : ' Type "help" for available commands.');
      }
    }

    output = [...output, { type: 'response', content: response }];
  }

  function skillsOutput(arg) {
    if (arg === 'all') {
      return $t.skills.allSkills.categories.map((c) => `${c.name}:\n  ${c.skills}`).join('\n\n');
    }
    const companies = $t.skills.companies.filter((c) => !arg || c.name.toLowerCase().includes(arg));
    if (!companies.length) {
      return `No company matching "${arg}". Try: ${$t.skills.companies.map((c) => c.name.split(/[\s,]/)[0].toLowerCase()).join(', ')}, all`;
    }
    return companies.map((c) => `${c.name}\n  ${c.techStack}`).join('\n\n') + (arg ? '' : '\n\nTip: "skills all" lists skills by category.');
  }

  function experienceDetail(arg) {
    const jobs = resumeData.experience.filter((e) => e.company.toLowerCase().includes(arg));
    if (!jobs.length) {
      const names = [...new Set(resumeData.experience.map((e) => e.company.split(/[\s,]/)[0].toLowerCase()))];
      return `No company matching "${arg}". Try: ${names.join(', ')}`;
    }
    return jobs
      .map((j) => {
        const lines = [`${j.title} @ ${j.company}`, `${monthYear(j.startDate)} → ${monthYear(j.endDate)}${j.location ? `  |  ${j.location}` : ''}`];
        if (j.summary) lines.push(j.summary);
        if (j.website) lines.push(j.website);
        return [...lines, '', ...j.highlights.map((h) => `• ${h}`)].join('\n');
      })
      .join('\n\n────────────────────────────────────────\n\n');
  }

  // "2025-10-01" -> "Oct 2025"; leaves "present" or unparseable values as-is.
  function monthYear(d) {
    const ms = Date.parse(d);
    return Number.isNaN(ms) ? d : new Date(ms).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
  }

  function neofetch() {
    const art = [
      ' ██╗  ██╗██████╗ ',
      ' ██║ ██╔╝██╔══██╗',
      ' █████╔╝ ██████╔╝',
      ' ██╔═██╗ ██╔══██╗',
      ' ██║  ██╗██║  ██║',
      ' ╚═╝  ╚═╝╚═╝  ╚═╝',
      '',
      ''
    ];
    const info = [
      `kyle@kgromero`,
      '─'.repeat(13),
      `Role:     ${resumeData.label || 'Software Engineering Leader'}`,
      `Current:  ${$t.experience.timeline[0].title}`,
      `Uptime:   ${yearsExperience} years in tech`,
      `Location: ${resumeData.location || 'Jersey City, NJ'}`,
      `Shell:    resume-sh`,
      `Site:     SvelteKit + Tailwind on Netlify`
    ];
    return art.map((line, i) => `${line.padEnd(20)}${info[i] ?? ''}`).join('\n');
  }

  function closestCommand(word) {
    const candidates = [...COMMAND_NAMES, 'sudo'];
    let best = null;
    let bestDist = Infinity;
    for (const c of candidates) {
      const d = editDistance(word, c);
      if (d < bestDist) [best, bestDist] = [c, d];
    }
    return bestDist <= 2 ? best : null;
  }

  function editDistance(a, b) {
    const row = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
      let prev = row[0];
      row[0] = i;
      for (let j = 1; j <= b.length; j++) {
        const tmp = row[j];
        row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
        prev = tmp;
      }
    }
    return row[b.length];
  }

  // Splits output text so URLs, emails, and site files render as links.
  const LINK_PATTERN = /(https?:\/\/[^\s]+|[\w.+-]+@[\w-]+\.[\w.]+|\/Kyle_Romero-Resume\.pdf)/g;
  function linkify(text) {
    return String(text ?? '')
      .split(LINK_PATTERN)
      .map((part, i) => {
        if (i % 2 === 0) return { text: part };
        const href = part.includes('@') && !part.startsWith('http') ? `mailto:${part}` : part;
        return { text: part, href };
      });
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

  // Window controls: yellow docks the terminal as a tab in the bottom-right
  // corner (the popup closes so the page is usable), green fills the viewport.
  let minimized = $state(false);
  let maximized = $state(false);

  function minimize() {
    minimized = true;
    open = false;
  }

  function restore() {
    open = true;
    scrollToBottom();
  }

  function toggleMaximize() {
    maximized = !maximized;
    scrollToBottom();
  }

  // Opening by any route clears the dock; a real close (not a minimize) also
  // resets the size so the next open starts normal.
  $effect(() => {
    if (open) minimized = false;
    else if (!minimized) maximized = false;
  });

  function scrollToBottom() {
    setTimeout(() => {
      if (outputElement) outputElement.scrollTop = outputElement.scrollHeight;
    }, 0);
  }

</script>

{#snippet prompt()}<span class="text-green-300">kyle@resume</span><span class="text-green-700">:</span><span class="text-emerald-500">~</span><span class="text-green-700">$</span>{/snippet}

{#snippet windowDots()}
  <!-- macOS-style window controls; symbols appear on hover/focus like the real thing -->
  <div class="group flex gap-1.5">
    {#each [
      { label: 'Close terminal', color: 'bg-red-500/80 hover:bg-red-500', path: 'M3 3l6 6M9 3l-6 6', action: () => (open = false) },
      { label: 'Minimize terminal', color: 'bg-yellow-500/80 hover:bg-yellow-500', path: 'M2.5 6h7', action: minimize },
      { label: maximized ? 'Restore terminal size' : 'Maximize terminal', color: 'bg-green-500/80 hover:bg-green-500', path: maximized ? 'M8.5 3.5l-5 5M3.5 5v3.5H7' : 'M6 2.5v7M2.5 6h7', action: toggleMaximize }
    ] as dot (dot.color)}
      <button
        type="button"
        onclick={dot.action}
        aria-label={dot.label}
        title={dot.label}
        class="flex h-3 w-3 items-center justify-center rounded-full p-0 text-black/0 transition-colors group-hover:text-black/60 group-focus-within:text-black/60 focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:outline-hidden {dot.color}"
      ><svg viewBox="0 0 12 12" class="h-3 w-3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d={dot.path} /></svg></button>
    {/each}
  </div>
{/snippet}

<Modal
  bind:open
  title="kyle@resume: ~"
  label="Kyle's Resume Bash Shell"
  theme="terminal"
  size={maximized ? 'max-w-none h-[90svh]' : 'max-w-6xl'}
  bodyClass="flex flex-col"
  headerStart={windowDots}
>
  <div bind:this={outputElement} class="terminal-scroll {maximized ? 'min-h-0 flex-1' : 'h-[70svh]'} overflow-y-auto p-4 whitespace-pre-wrap">
    {#each output as line}
      {#if line.type === 'command'}
        <div class="mb-1">{@render prompt()} <span class="text-green-200">{line.content}</span></div>
      {:else if line.type === 'system'}
        <div class="mb-2 text-green-600">{line.content}</div>
      {:else}
        <div class="mb-3 text-green-400">{#each linkify(line.content) as part}{#if part.href}<a href={part.href} target={part.href.startsWith('mailto:') ? undefined : '_blank'} rel="noopener noreferrer" class="text-emerald-300 underline underline-offset-2 hover:text-green-100">{part.text}</a>{:else}{part.text}{/if}{/each}</div>
      {/if}
    {/each}
  </div>
  <form onsubmit={handleSubmit} class="flex items-center border-t border-green-900/70 bg-green-950/20 px-4 py-3">
    <label for="resume-shell-input" class="mr-2 shrink-0">{@render prompt()}</label>
    <input
      id="resume-shell-input"
      data-autofocus
      bind:value={input}
      onkeydown={handleKeydown}
      type="text"
      autocomplete="off"
      autocapitalize="off"
      spellcheck="false"
      aria-label="Terminal command"
      placeholder="type help"
      class="grow bg-transparent text-green-200 caret-green-400 focus:outline-hidden placeholder:text-green-800"
    />
  </form>
</Modal>

{#if minimized && !open}
  <!-- Phones don't get the terminal (see NavBar), so neither do they get its dock -->
  <button
    use:portal
    type="button"
    onclick={restore}
    aria-label="Restore Kyle's resume terminal"
    title="Restore terminal"
    class="fixed right-4 bottom-4 z-50 hidden items-center gap-2 rounded-lg border border-green-900/70 bg-[#0a0f0b]/95 px-3 py-2 font-mono text-sm text-green-400 shadow-[0_0_24px_rgba(34,197,94,0.15)] [text-shadow:0_0_6px_rgba(74,222,128,0.3)] transition-colors hover:border-green-600 hover:text-green-300 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:outline-hidden sm:flex"
    transition:fly={{ y: 16, duration: 200 }}
  >
    <span class="h-2 w-2 animate-pulse rounded-full bg-green-500" aria-hidden="true"></span>
    kyle@resume: ~
  </button>
{/if}
