<script>
  import { run, preventDefault } from 'svelte/legacy';

  import { onMount } from 'svelte';
  import { Terminal } from 'lucide-svelte';
  import { fade } from 'svelte/transition';

  /**
   * @typedef {Object} Props
   * @property {boolean} [isOpen]
   * @property {any} onClose
   */

  /** @type {Props} */
  let { isOpen = false, onClose } = $props();

  let input = $state('');
  let output = $state([
    { type: 'system', content: 'Welcome to Kyle Romero\'s bash shell! You can use this terminal to interactively explore my information. This functionality was completely built using Claude AI 3.5 Sonnet.' },
    { type: 'system', content: 'Type "help" for available commands.' }
  ]);
  let inputElement = $state();
  let outputElement = $state();

  const resumeData = {
    name: "Kyle Romero",
    location: "Jersey City, NJ",
    email: "kgromero@gmail.com",
    phone: "(281) 857-9006",
    linkedin: "in/kyleromero",
    website: "kgromero.com",
    summary: "Results-driven technology leader with 10+ years in software engineering and 7 years in management, specializing in digital transformation, software architecture, DevOps, and Agile methodologies. Proven track record of optimizing development operations, mentoring high-performing teams, and delivering scalable, business-aligned solutions. Passionate about driving innovation, streamlining processes, and leading technology organizations to success.",
    experience: [
      {
        startDate: "2023-03",
        endDate: "2024-05",
        title: "Director of Software Development",
        company: "Raymour & Flanigan",
        location: "Jersey City, NJ (remote)"
      },
      {
        startDate: "2021-04",
        endDate: "2023-03",
        title: "Director of Software Development",
        company: "MEARS Group",
        location: "Jersey City, NJ (remote)"
      },
      {
        startDate: "2020-03",
        endDate: "2021-04",
        title: "Senior Manager of Software Development",
        company: "MEARS Group",
        location: "Jersey City, NJ (remote)"
      },
      {
        startDate: "2017-10",
        endDate: "2020-03",
        title: "Manager of Software Development",
        company: "MEARS Group",
        location: "Jersey City, NJ (remote)"
      },
      {
        startDate: "2016-04",
        endDate: "2017-10",
        title: "Team Lead",
        company: "Worldwide Machinery",
        location: "Houston, TX"
      },
      {
        startDate: "2013-12",
        endDate: "2016-02",
        title: "Technical Lead",
        company: "HP",
        location: "Houston, TX"
      },
      {
        startDate: "2011-12",
        endDate: "2013-12",
        title: "Senior Developer",
        company: "HP",
        location: "Houston, TX"
      },
      {
        startDate: "2007-07",
        endDate: "2011-12",
        title: "Software Developer",
        company: "X-Fab, Texas",
        location: "Lubbock, TX"
      },
      {
        startDate: "2007-05",
        endDate: "2007-07",
        title: "Software Development Intern",
        company: "X-Fab, Texas",
        location: "Lubbock, TX"
      }
    ],
    education: {
      startDate: "2005-05",
      endDate: "2009-12",
      degree: "Bachelor of Science in Computer Engineering",
      school: "Texas Tech University",
      location: "Lubbock, TX"
    }
  };

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
        response = `${resumeData.education.degree}\n${resumeData.education.school}, ${resumeData.education.location} (${resumeData.education.endDate})\n`;
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
    const allExperiences = [...resumeData.experience, resumeData.education].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    
    allExperiences.forEach((exp, index) => {
      const startDate = new Date(exp.startDate);
      const endDate = exp.endDate === 'present' ? new Date() : new Date(exp.endDate);
      const duration = endDate.getFullYear() - startDate.getFullYear();
      const startYear = startDate.getFullYear();
      const endYear = endDate.getFullYear();
      
      let line1, line2;
      if ('degree' in exp) {
        line1 = `${startYear} - ${endYear} (${duration} years)`.padEnd(21) + `│ ${exp.degree}`;
        line2 = ' '.repeat(21) + `│ ${exp.school}, ${exp.location}`;
      } else {
        line1 = `${startYear} - ${endYear} (${duration} years)`.padEnd(21) + `│ ${exp.title}`;
        line2 = ' '.repeat(21) + `│ ${exp.company}, ${exp.location}`;
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
  <div transition:fade="{{ duration: 200 }}" class="z-50 fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4" onkeydown={handleKeydown}>
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